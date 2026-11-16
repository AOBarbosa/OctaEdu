import { unauthorized } from '@/lib/server/http';
import { toUser } from '@/lib/server/mappers';
import { clearSessionCookie, getSessionUser } from '@/lib/server/session';

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    await clearSessionCookie();
    return unauthorized();
  }
  return Response.json({ user: toUser(user) });
}
