import { db } from '@/lib/server/db';
import { notFound, unauthorized } from '@/lib/server/http';
import { getSessionUser } from '@/lib/server/session';
import { deleteUpload } from '@/lib/server/uploads';

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const { id } = await params;
  const resource = await db.resource.findFirst({ where: { id, userId: user.id } });
  if (!resource) return notFound();

  await db.resource.delete({ where: { id } });
  if (resource.storedFileName) await deleteUpload(resource.storedFileName);
  return new Response(null, { status: 204 });
}
