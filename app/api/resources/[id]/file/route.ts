import { db } from '@/lib/server/db';
import { notFound, unauthorized } from '@/lib/server/http';
import { getSessionUser } from '@/lib/server/session';
import { readUpload, safeDownloadName } from '@/lib/server/uploads';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const { id } = await params;
  const resource = await db.resource.findFirst({
    where: { id, type: 'file', OR: [{ isPublic: true }, { userId: user.id }] },
  });
  if (!resource?.storedFileName || !resource.fileMime) return notFound();

  let bytes: Buffer;
  try {
    bytes = await readUpload(resource.storedFileName);
  } catch {
    return notFound();
  }

  const fileName = safeDownloadName(resource.fileName ?? 'arquivo');
  return new Response(new Uint8Array(bytes), {
    headers: {
      'Content-Type': resource.fileMime,
      'Content-Length': String(bytes.length),
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'private, no-store',
    },
  });
}
