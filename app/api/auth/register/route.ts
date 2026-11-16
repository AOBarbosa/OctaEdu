import { TERMS_VERSION } from '@/lib/legal';
import { db } from '@/lib/server/db';
import { jsonError, readJson } from '@/lib/server/http';
import { toUser } from '@/lib/server/mappers';
import { hashPassword } from '@/lib/server/passwords';
import { createSession } from '@/lib/server/session';
import { registerSchema } from '@/lib/server/validation';

export async function POST(request: Request) {
  const { data, error } = await readJson(request, registerSchema);
  if (error) return error;

  const existing = await db.user.findUnique({ where: { email: data.email }, select: { id: true } });
  if (existing) return jsonError(409, 'Este e-mail já está cadastrado.');

  const user = await db.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash: await hashPassword(data.password),
      school: data.school,
      subject: data.subject,
      termsVersion: TERMS_VERSION,
      termsAcceptedAt: new Date(),
    },
  });

  await createSession(user.id);
  return Response.json({ user: toUser(user) }, { status: 201 });
}
