import { db } from '@/lib/server/db';
import { jsonError, readJson } from '@/lib/server/http';
import { toUser } from '@/lib/server/mappers';
import { verifyPassword } from '@/lib/server/passwords';
import {
  clearFailures,
  clientIp,
  loginLimitKeys,
  registerFailure,
  secondsUntilUnblocked,
} from '@/lib/server/rate-limit';
import { createSession } from '@/lib/server/session';
import { loginSchema } from '@/lib/server/validation';

const INVALID_CREDENTIALS = 'E-mail ou senha incorretos.';

export async function POST(request: Request) {
  const { data, error } = await readJson(request, loginSchema);
  if (error) return error;

  const keys = loginLimitKeys(clientIp(request), data.email);
  const waitSeconds = secondsUntilUnblocked(keys);
  if (waitSeconds > 0) {
    const minutes = Math.ceil(waitSeconds / 60);
    return jsonError(429, `Muitas tentativas. Tente de novo em ${minutes} min.`);
  }

  const user = await db.user.findUnique({ where: { email: data.email } });
  const valid = await verifyPassword(data.password, user?.passwordHash);
  if (!user || !valid) {
    registerFailure(keys);
    return jsonError(401, INVALID_CREDENTIALS);
  }

  clearFailures(keys);
  await createSession(user.id);
  return Response.json({ user: toUser(user) });
}
