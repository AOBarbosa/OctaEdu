import { Activity, ActivityDifficulty, ActivityLength } from './types';

export interface ActivityFilter {
  length: ActivityLength | null;
  difficulty: ActivityDifficulty | null;
  learningObjectOnly: boolean;
}

export const EMPTY_ACTIVITY_FILTER: ActivityFilter = { length: null, difficulty: null, learningObjectOnly: false };

export const LENGTH_LABELS: Record<ActivityLength, string> = {
  rapida: 'Até 30 min',
  aula: 'Uma aula',
  continua: 'Várias aulas',
};

export const DIFFICULTIES: ActivityDifficulty[] = ['Fácil', 'Médio', 'Difícil'];

// Atividade sem duração ou dificuldade definida ainda não pode ser descartada
// por esses filtros, então continua aparecendo.
export function matchesActivityFilter(activity: Activity, filter: ActivityFilter) {
  return (
    (!filter.length || !activity.length || activity.length === filter.length) &&
    (!filter.difficulty || !activity.difficulty || activity.difficulty === filter.difficulty) &&
    (!filter.learningObjectOnly || activity.learningObjects.length > 0)
  );
}

export function isActivityFilterActive(filter: ActivityFilter) {
  return Boolean(filter.length || filter.difficulty || filter.learningObjectOnly);
}
