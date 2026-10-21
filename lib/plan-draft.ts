'use client';

import { useMemo, useSyncExternalStore } from 'react';
import { GamificationPlan } from './types';

const PLAN_DRAFT_KEY = 'octaedu_plan_draft_v1';

export interface PlanDraft {
  activeStep: number;
  selectedObjectiveIds: string[];
  selectedDriverIds: number[];
  selectedTechniqueIds: string[];
  techniqueNotes: Record<string, string>;
  title: string;
  subject: string;
  targetAudience: string;
  description: string;
}

export const EMPTY_PLAN_DRAFT: PlanDraft = {
  activeStep: 0,
  selectedObjectiveIds: [],
  selectedDriverIds: [],
  selectedTechniqueIds: [],
  techniqueNotes: {},
  title: '',
  subject: '',
  targetAudience: '',
  description: '',
};

export function draftFromPlan(plan: GamificationPlan): PlanDraft {
  return {
    activeStep: 0,
    selectedObjectiveIds: plan.selectedObjectiveIds,
    selectedDriverIds: plan.selectedDriverIds,
    selectedTechniqueIds: plan.selectedTechniques.map((t) => t.techniqueId),
    techniqueNotes: Object.fromEntries(
      plan.selectedTechniques.filter((t) => t.customNotes).map((t) => [t.techniqueId, t.customNotes ?? '']),
    ),
    title: plan.title,
    subject: plan.subject,
    targetAudience: plan.targetAudience,
    description: plan.description ?? '',
  };
}

export function hasDraftProgress(draft: PlanDraft) {
  return (
    draft.selectedObjectiveIds.length > 0 ||
    draft.selectedDriverIds.length > 0 ||
    draft.selectedTechniqueIds.length > 0 ||
    Boolean(draft.title.trim() || draft.subject.trim())
  );
}

function parsePlanDraft(raw: string | null): PlanDraft | null {
  if (!raw) return null;
  try {
    return { ...EMPTY_PLAN_DRAFT, ...JSON.parse(raw) };
  } catch {
    return null;
  }
}

function readRawPlanDraft() {
  try {
    return localStorage.getItem(PLAN_DRAFT_KEY);
  } catch {
    return null;
  }
}

const subscribeToNothing = () => () => {};

export function useStoredPlanDraft(): PlanDraft | null | undefined {
  const raw = useSyncExternalStore<string | null | undefined>(
    subscribeToNothing,
    readRawPlanDraft,
    () => undefined,
  );
  return useMemo(() => (raw === undefined ? undefined : parsePlanDraft(raw)), [raw]);
}

export function savePlanDraft(draft: PlanDraft) {
  try {
    if (hasDraftProgress(draft)) {
      localStorage.setItem(PLAN_DRAFT_KEY, JSON.stringify(draft));
    } else {
      localStorage.removeItem(PLAN_DRAFT_KEY);
    }
  } catch {
    return;
  }
}

export function clearPlanDraft() {
  try {
    localStorage.removeItem(PLAN_DRAFT_KEY);
  } catch {
    return;
  }
}
