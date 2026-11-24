import { ActivityFilter, matchesActivityFilter } from './activity-filter';
import { CoreDriver, GameTechnique, OctalysisContent, TestingFocus } from './types';

// O conteúdo (Core Drives, objetivos, técnicas e atividades) vem do banco,
// pela API. Aqui ficam só as regras que trabalham sobre ele.

export const TESTING_FOCUSES: Exclude<TestingFocus, 'Todos'>[] = [
  'Unitário / TDD',
  'Integração / API',
  'E2E / Sistema',
  'Exploratório / Funcional',
];

export function findDriver(content: OctalysisContent, id: number): CoreDriver | undefined {
  return content.coreDrivers.find((d) => d.id === id);
}

export function findTechnique(content: OctalysisContent, id: string): GameTechnique | undefined {
  return content.techniques.find((t) => t.id === id);
}

export function techniqueUsesLearningObject(technique: GameTechnique) {
  return technique.activities.some((a) => a.learningObjects.length > 0);
}

export function filterActivities(technique: GameTechnique, filter: ActivityFilter) {
  return technique.activities.filter((a) => matchesActivityFilter(a, filter));
}

export function countTechniqueActivities(technique: GameTechnique, filter: ActivityFilter) {
  return { total: technique.activities.length, matching: filterActivities(technique, filter).length };
}

export function getRecommendationsForObjectives(content: OctalysisContent, selectedObjectiveIds: string[]) {
  const selectedObjs = content.objectives.filter((obj) => selectedObjectiveIds.includes(obj.id));

  const driverScores = new Map<number, { score: number; relatedObjectives: string[] }>(
    content.coreDrivers.map((d) => [d.id, { score: 0, relatedObjectives: [] }]),
  );

  selectedObjs.forEach((obj) => {
    obj.priorityDriverIds.forEach((driverId, index) => {
      const entry = driverScores.get(driverId);
      if (!entry) return;
      entry.score += index === 0 ? 3 : 2;
      if (!entry.relatedObjectives.includes(obj.name)) entry.relatedObjectives.push(obj.name);
    });
  });

  const rankedDrivers = content.coreDrivers
    .map((driver) => ({
      driver,
      score: driverScores.get(driver.id)?.score ?? 0,
      relatedObjectives: driverScores.get(driver.id)?.relatedObjectives ?? [],
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return { rankedDrivers };
}
