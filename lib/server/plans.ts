import { db } from './db';
import { PlanInput } from './validation';

export function planData(input: PlanInput) {
  return {
    title: input.title,
    subject: input.subject,
    targetAudience: input.targetAudience,
    description: input.description,
    objectiveIds: input.selectedObjectiveIds,
    driverIds: input.selectedDriverIds,
    techniques: input.selectedTechniques,
  };
}

export function findUserPlan(userId: string, planId: string) {
  return db.plan.findFirst({ where: { id: planId, userId } });
}
