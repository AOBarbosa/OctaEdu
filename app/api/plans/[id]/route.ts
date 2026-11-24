import { findInvalidContentRef } from '@/lib/server/content';
import { db } from '@/lib/server/db';
import { jsonError, notFound, readJson, unauthorized } from '@/lib/server/http';
import { toPlan } from '@/lib/server/mappers';
import { findUserPlan, planData } from '@/lib/server/plans';
import { getSessionUser } from '@/lib/server/session';
import { planSchema } from '@/lib/server/validation';

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: Params) {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const { id } = await params;
  if (!(await findUserPlan(user.id, id))) return notFound();

  const { data, error } = await readJson(request, planSchema);
  if (error) return error;
  const invalidRef = await findInvalidContentRef({
    objectiveIds: data.selectedObjectiveIds,
    driverIds: data.selectedDriverIds,
    techniqueIds: data.selectedTechniques.map((t) => t.techniqueId),
  });
  if (invalidRef) return jsonError(400, invalidRef);

  const plan = await db.plan.update({ where: { id }, data: planData(data) });
  return Response.json({ plan: toPlan(plan) });
}

export async function DELETE(_request: Request, { params }: Params) {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const { id } = await params;
  const { count } = await db.plan.deleteMany({ where: { id, userId: user.id } });
  if (count === 0) return notFound();
  return new Response(null, { status: 204 });
}
