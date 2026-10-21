import { Activity, ActivityDifficulty, ActivityLength } from './types';

export interface ActivityFilter {
  length: ActivityLength | null;
  difficulty: ActivityDifficulty | null;
}

export const EMPTY_ACTIVITY_FILTER: ActivityFilter = { length: null, difficulty: null };

export const LENGTH_LABELS: Record<ActivityLength, string> = {
  rapida: 'Até 30 min',
  aula: 'Uma aula',
  continua: 'Várias aulas',
};

export const DIFFICULTIES: ActivityDifficulty[] = ['Fácil', 'Médio', 'Difícil'];

export function matchesActivityFilter(activity: Activity, filter: ActivityFilter) {
  return (
    (!filter.length || activity.length === filter.length) &&
    (!filter.difficulty || activity.difficulty === filter.difficulty)
  );
}

export function isActivityFilterActive(filter: ActivityFilter) {
  return Boolean(filter.length || filter.difficulty);
}
