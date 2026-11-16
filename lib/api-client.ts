import { GamificationPlan, SharedResource, User } from './types';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

export type PlanPayload = Pick<
  GamificationPlan,
  'title' | 'subject' | 'targetAudience' | 'description' | 'selectedObjectiveIds' | 'selectedDriverIds' | 'selectedTechniques'
>;

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  school?: string;
  subject?: string;
  acceptTerms: boolean;
}

export interface AccountPayload {
  name: string;
  email: string;
  school?: string;
  subject?: string;
}

export const api = {
  me: () => request<{ user: User }>('/api/auth/me').then((r) => r.user),
  login: (email: string, password: string) =>
    request<{ user: User }>('/api/auth/login', jsonBody('POST', { email, password })).then((r) => r.user),
  register: (payload: RegisterPayload) =>
    request<{ user: User }>('/api/auth/register', jsonBody('POST', payload)).then((r) => r.user),
  logout: () => request<void>('/api/auth/logout', { method: 'POST' }),

  listPlans: () => request<{ plans: GamificationPlan[] }>('/api/plans').then((r) => r.plans),
  createPlan: (payload: PlanPayload) =>
    request<{ plan: GamificationPlan }>('/api/plans', jsonBody('POST', payload)).then((r) => r.plan),
  updatePlan: (id: string, payload: PlanPayload) =>
    request<{ plan: GamificationPlan }>(`/api/plans/${encodeURIComponent(id)}`, jsonBody('PUT', payload)).then(
      (r) => r.plan,
    ),
  deletePlan: (id: string) => request<void>(`/api/plans/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  duplicatePlan: (id: string) =>
    request<{ plan: GamificationPlan }>(`/api/plans/${encodeURIComponent(id)}/duplicate`, { method: 'POST' }).then(
      (r) => r.plan,
    ),

  listResources: () => request<{ resources: SharedResource[] }>('/api/resources').then((r) => r.resources),
  createResource: (form: FormData) =>
    request<{ resource: SharedResource }>('/api/resources', { method: 'POST', body: form }).then((r) => r.resource),
  deleteResource: (id: string) => request<void>(`/api/resources/${encodeURIComponent(id)}`, { method: 'DELETE' }),

  updateAccount: (payload: AccountPayload) =>
    request<{ user: User }>('/api/account', jsonBody('PATCH', payload)).then((r) => r.user),
  deleteAccount: (password: string) => request<void>('/api/account', jsonBody('DELETE', { password })),
};

export function errorMessage(error: unknown, fallback = 'Não foi possível concluir. Tente novamente.') {
  return error instanceof ApiError ? error.message : fallback;
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, { credentials: 'same-origin', ...init });
  } catch {
    throw new ApiError('Sem conexão com o servidor. Verifique sua internet.', 0);
  }

  if (response.status === 204) return undefined as T;

  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      body && typeof body === 'object' && 'error' in body && typeof body.error === 'string'
        ? body.error
        : 'Não foi possível concluir. Tente novamente.';
    throw new ApiError(message, response.status);
  }
  return body as T;
}

function jsonBody(method: string, payload: unknown): RequestInit {
  return { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) };
}
