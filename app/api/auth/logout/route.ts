import { deleteSession } from '@/lib/server/session';

export async function POST() {
  await deleteSession();
  return new Response(null, { status: 204 });
}
