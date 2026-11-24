import type { ActivityDifficulty as DbDifficulty } from '../../generated/prisma/client';
import { ActivityDifficulty, OctalysisContent, TestingFocus } from '../types';
import { db } from './db';

const DIFFICULTY_LABELS: Record<DbDifficulty, ActivityDifficulty> = {
  facil: 'Fácil',
  medio: 'Médio',
  dificil: 'Difícil',
};

const TESTING_FOCUS_VALUES = new Set<string>([
  'Unitário / TDD',
  'Integração / API',
  'E2E / Sistema',
  'Exploratório / Funcional',
  'Todos',
]);

function isTestingFocus(value: string): value is TestingFocus {
  return TESTING_FOCUS_VALUES.has(value);
}

export async function loadContent(): Promise<OctalysisContent> {
  const [drivers, objectives, techniques] = await Promise.all([
    db.coreDrive.findMany({ orderBy: { id: 'asc' } }),
    db.educationalObjective.findMany({
      orderBy: { position: 'asc' },
      include: { coreDrives: { orderBy: { position: 'asc' } } },
    }),
    db.gameTechnique.findMany({
      orderBy: [{ coreDriveId: 'asc' }, { position: 'asc' }],
      include: {
        activities: {
          orderBy: { position: 'asc' },
          include: { learningObjects: { orderBy: { name: 'asc' } } },
        },
      },
    }),
  ]);

  return {
    coreDrivers: drivers.map((d) => ({
      id: d.id,
      slug: d.slug,
      name: d.name,
      englishName: d.englishName,
      description: d.description,
      sdtFactors: d.sdtFactors,
      color: d.color,
      hemisphere: d.hemisphere,
      hat: d.hat,
    })),
    objectives: objectives.map((o) => ({
      id: o.id,
      name: o.name,
      description: o.description,
      rationale: o.rationale,
      priorityDriverIds: o.coreDrives.map((cd) => cd.coreDriveId),
    })),
    techniques: techniques.map((t) => ({
      id: t.id,
      driverId: t.coreDriveId,
      title: t.name,
      description: t.description,
      generalExample: t.generalExample ?? undefined,
      testingFocus: t.testingFocus.filter(isTestingFocus),
      activities: t.activities.map((a) => ({
        id: a.id,
        title: a.title,
        description: a.description,
        supportTools: a.supportTools ?? undefined,
        difficulty: a.difficulty ? DIFFICULTY_LABELS[a.difficulty] : null,
        length: a.length,
        estimatedTime: a.estimatedTime,
        learningObjects: a.learningObjects.map((lo) => ({ id: lo.id, name: lo.name, url: lo.url })),
      })),
    })),
  };
}

interface ContentRefs {
  objectiveIds?: string[];
  driverIds?: number[];
  techniqueIds?: string[];
}

/** Confere se os IDs enviados existem no conteúdo. Retorna a mensagem de erro ou null. */
export async function findInvalidContentRef({ objectiveIds = [], driverIds = [], techniqueIds = [] }: ContentRefs) {
  const [objectives, drivers, techniques] = await Promise.all([
    objectiveIds.length ? db.educationalObjective.count({ where: { id: { in: objectiveIds } } }) : 0,
    driverIds.length ? db.coreDrive.count({ where: { id: { in: driverIds } } }) : 0,
    techniqueIds.length ? db.gameTechnique.count({ where: { id: { in: techniqueIds } } }) : 0,
  ]);
  if (objectives !== new Set(objectiveIds).size) return 'Objetivo inválido.';
  if (drivers !== new Set(driverIds).size) return 'Core Drive inválido.';
  if (techniques !== new Set(techniqueIds).size) return 'Técnica inválida.';
  return null;
}
