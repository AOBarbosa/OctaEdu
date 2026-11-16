import { db } from '@/lib/server/db';
import { jsonError, unauthorized, validate } from '@/lib/server/http';
import { toResource } from '@/lib/server/mappers';
import { getSessionUser } from '@/lib/server/session';
import { MAX_UPLOAD_BYTES, saveUpload, UploadError } from '@/lib/server/uploads';
import { resourceSchema } from '@/lib/server/validation';

const withAuthor = { user: { select: { name: true } } } as const;

export async function GET() {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const resources = await db.resource.findMany({
    where: { OR: [{ isPublic: true }, { userId: user.id }] },
    include: withAuthor,
    orderBy: { createdAt: 'desc' },
  });
  return Response.json({ resources: resources.map(toResource) });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_UPLOAD_BYTES + 64 * 1024) {
    return jsonError(413, 'O arquivo deve ter no máximo 10 MB.');
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return jsonError(400, 'Requisição inválida.');
  }

  const { data, error } = validate(resourceSchema, {
    techniqueId: form.get('techniqueId'),
    title: form.get('title'),
    description: form.get('description') ?? '',
    type: form.get('type'),
    url: form.get('url') || undefined,
    isPublic: form.get('isPublic') === 'true',
  });
  if (error) return error;

  let fileFields = {};
  if (data.type === 'file') {
    const file = form.get('file');
    if (!(file instanceof File)) return jsonError(400, 'Selecione um arquivo para enviar.');
    try {
      const saved = await saveUpload(file);
      fileFields = {
        fileName: file.name.slice(0, 200),
        fileSize: saved.size,
        fileMime: saved.mime,
        storedFileName: saved.storedFileName,
      };
    } catch (uploadError) {
      if (uploadError instanceof UploadError) return jsonError(400, uploadError.message);
      throw uploadError;
    }
  }

  const resource = await db.resource.create({
    data: {
      userId: user.id,
      techniqueId: data.techniqueId,
      title: data.title,
      description: data.description,
      type: data.type,
      url: data.type === 'link' ? data.url : null,
      isPublic: data.isPublic,
      ...fileFields,
    },
    include: withAuthor,
  });
  return Response.json({ resource: toResource(resource) }, { status: 201 });
}
