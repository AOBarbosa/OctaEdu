import { db } from '@/lib/server/db';
import { notFound, unauthorized } from '@/lib/server/http';
import { toPlan } from '@/lib/server/mappers';
import { findUserPlan } from '@/lib/server/plans';
import { getSessionUser } from '@/lib/server/session';

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user) return unauthorized();

  const { id } = await params;
  const original = await findUserPlan(user.id, id);
  if (!original) return notFound();

  const copy = await db.plan.create({
    data: {
      userId: user.id,
      title: `${original.title} (Cópia)`.slice(0, 150),
      subject: original.subject,
      targetAudience: original.targetAudience,
      description: original.description,
      objectiveIds: original.objectiveIds,
      driverIds: original.driverIds,
      techniques: original.techniques ?? [],
    },
  });
  return Response.json({ plan: toPlan(copy) }, { status: 201 });
}
