import type { Plan, Resource, User as DbUser } from '../../generated/prisma/client';
import { GamificationPlan, SharedResource, User } from '../types';
import { planTechniquesSchema } from './validation';

export function toUser(user: DbUser): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    school: user.school ?? undefined,
    subject: user.subject ?? undefined,
  };
}

export function toPlan(plan: Plan): GamificationPlan {
  const techniques = planTechniquesSchema.safeParse(plan.techniques);
  return {
    id: plan.id,
    userId: plan.userId,
    title: plan.title,
    subject: plan.subject,
    targetAudience: plan.targetAudience,
    description: plan.description ?? undefined,
    selectedObjectiveIds: plan.objectiveIds,
    selectedDriverIds: plan.driverIds,
    selectedTechniques: techniques.success ? techniques.data : [],
    createdAt: plan.createdAt.toISOString(),
    updatedAt: plan.updatedAt.toISOString(),
  };
}

export function toResource(resource: Resource & { user: { name: string } }): SharedResource {
  return {
    id: resource.id,
    userId: resource.userId,
    authorName: resource.user.name,
    techniqueId: resource.techniqueId,
    title: resource.title,
    description: resource.description,
    type: resource.type,
    url: resource.url ?? undefined,
    fileName: resource.fileName ?? undefined,
    fileSize: resource.fileSize ? formatFileSize(resource.fileSize) : undefined,
    fileUrl: resource.type === 'file' ? `/api/resources/${resource.id}/file` : undefined,
    isPublic: resource.isPublic,
    createdAt: resource.createdAt.toISOString(),
  };
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
