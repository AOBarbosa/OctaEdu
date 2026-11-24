import { findInvalidContentRef } from '@/lib/server/content';
import { db } from '@/lib/server/db';
import { jsonError, readJson, unauthorized } from '@/lib/server/http';
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
  const invalidRef = await findInvalidContentRef({
    objectiveIds: data.selectedObjectiveIds,
    driverIds: data.selectedDriverIds,
    techniqueIds: data.selectedTechniques.map((t) => t.techniqueId),
  });
  if (invalidRef) return jsonError(400, invalidRef);

  const plan = await db.plan.create({ data: { ...planData(data), userId: user.id } });
  return Response.json({ plan: toPlan(plan) }, { status: 201 });
}
