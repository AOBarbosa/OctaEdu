import { CORE_DRIVES } from './core-drives';
import { LEARNING_OBJECTS } from './learning-objects';
import { OBJECTIVES } from './objectives';
import { CD1 } from './techniques/cd1';
import { CD2 } from './techniques/cd2';
import { CD3 } from './techniques/cd3';
import { CD4 } from './techniques/cd4';
import { CD5 } from './techniques/cd5';
import { CD6 } from './techniques/cd6';
import { CD7 } from './techniques/cd7';
import { CD8 } from './techniques/cd8';

export const CONTENT = {
  coreDrives: CORE_DRIVES,
  objectives: OBJECTIVES,
  learningObjects: LEARNING_OBJECTS,
  techniquesByCoreDrive: [CD1, CD2, CD3, CD4, CD5, CD6, CD7, CD8],
};

// Confere referências e IDs repetidos antes de gravar no banco.
export function validateContent() {
  const errors: string[] = [];
  const driverIds = new Set(CONTENT.coreDrives.map((d) => d.id));
  const loIds = new Set(CONTENT.learningObjects.map((lo) => lo.id));
  const techniqueIds = new Set<string>();

  for (const objective of CONTENT.objectives) {
    for (const id of objective.coreDriveIds) {
      if (!driverIds.has(id)) errors.push(`Objetivo ${objective.id}: Core Drive ${id} não existe.`);
    }
  }
  for (const group of CONTENT.techniquesByCoreDrive) {
    if (!driverIds.has(group.coreDriveId)) errors.push(`Core Drive ${group.coreDriveId} não existe.`);
    for (const technique of group.techniques) {
      if (techniqueIds.has(technique.id)) errors.push(`Técnica repetida: ${technique.id}.`);
      techniqueIds.add(technique.id);
      for (const id of technique.activity.learningObjectIds) {
        if (!loIds.has(id)) errors.push(`Técnica ${technique.id}: Objeto de Aprendizagem ${id} não existe.`);
      }
    }
  }
  return errors;
}
