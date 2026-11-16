import { db } from '@/lib/server/db';
import { readJson, unauthorized } from '@/lib/server/http';
import { toPlan } from '@/lib/server/mappers';
import { planData } from '@/lib/server/plans';
import { getSessionUser } from '@/lib/server/session';
import { planSchema } from '@/lib/server/validation';

export async function GET() {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const plans = await db.plan.findMany({ where: { userId: user.id }, orderBy: { updatedAt: 'desc' } });
  return Response.json({ plans: plans.map(toPlan) });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const { data, error } = await readJson(request, planSchema);
  if (error) return error;

  const plan = await db.plan.create({ data: { ...planData(data), userId: user.id } });
  return Response.json({ plan: toPlan(plan) }, { status: 201 });
}
