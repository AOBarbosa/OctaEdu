import { db } from '@/lib/server/db';
import { jsonError, readJson, unauthorized } from '@/lib/server/http';
import { toUser } from '@/lib/server/mappers';
import { verifyPassword } from '@/lib/server/passwords';
import { deleteSession, getSessionUser } from '@/lib/server/session';
import { deleteUpload } from '@/lib/server/uploads';
import { accountDeleteSchema, accountUpdateSchema } from '@/lib/server/validation';

export async function PATCH(request: Request) {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const { data, error } = await readJson(request, accountUpdateSchema);
  if (error) return error;

  if (data.email !== user.email) {
    const taken = await db.user.findUnique({ where: { email: data.email }, select: { id: true } });
    if (taken) return jsonError(409, 'Este e-mail já está cadastrado.');
  }

  const updated = await db.user.update({ where: { id: user.id }, data });
  return Response.json({ user: toUser(updated) });
}

export async function DELETE(request: Request) {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const { data, error } = await readJson(request, accountDeleteSchema);
  if (error) return error;

  if (!(await verifyPassword(data.password, user.passwordHash))) {
    return jsonError(403, 'Senha incorreta.');
  }

  const files = await db.resource.findMany({
    where: { userId: user.id, storedFileName: { not: null } },
    select: { storedFileName: true },
  });

  await deleteSession();
  await db.user.delete({ where: { id: user.id } });
  await Promise.all(files.map((f) => (f.storedFileName ? deleteUpload(f.storedFileName) : null)));

  return new Response(null, { status: 204 });
}
