'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AccountPayload, api, ApiError, errorMessage, PlanPayload, RegisterPayload } from '../lib/api-client';
import { clearPlanDraft } from '../lib/plan-draft';
import { GamificationPlan, OctalysisContent, SharedResource, User } from '../lib/types';

type ActionResult = { success: true } | { success: false; message: string };

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  // Conteúdo do Octalysis vindo do banco. Fica null enquanto carrega.
  content: OctalysisContent | null;
  login: (email: string, password: string) => Promise<ActionResult>;
  register: (payload: RegisterPayload) => Promise<ActionResult>;
  logout: () => Promise<void>;
  updateAccount: (payload: AccountPayload) => Promise<ActionResult>;
  deleteAccount: (password: string) => Promise<ActionResult>;
  plans: GamificationPlan[];
  savePlan: (payload: PlanPayload, planId?: string) => Promise<GamificationPlan>;
  deletePlan: (planId: string) => Promise<void>;
  duplicatePlan: (planId: string) => Promise<GamificationPlan>;
  resources: SharedResource[];
  addResource: (form: FormData) => Promise<SharedResource>;
  deleteResource: (resourceId: string) => Promise<void>;
}

const PUBLIC_PATHS = new Set(['/login', '/cadastro', '/termos', '/privacidade']);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState<GamificationPlan[]>([]);
  const [resources, setResources] = useState<SharedResource[]>([]);
  const [content, setContent] = useState<OctalysisContent | null>(null);

  const resetState = useCallback(() => {
    setCurrentUser(null);
    setPlans([]);
    setResources([]);
    setContent(null);
    clearPlanDraft();
  }, []);

  const loadUserData = useCallback(async (user: User) => {
    const [userPlans, sharedResources, octalysisContent] = await Promise.all([
      api.listPlans(),
      api.listResources(),
      api.getContent(),
    ]);
    setCurrentUser(user);
    setPlans(userPlans);
    setResources(sharedResources);
    setContent(octalysisContent);
  }, []);

  useEffect(() => {
    let active = true;
    api
      .me()
      .then((user) => (active ? loadUserData(user) : undefined))
      .catch(() => {
        if (active) setCurrentUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [loadUserData]);

  useEffect(() => {
    if (!loading && !currentUser && !PUBLIC_PATHS.has(pathname)) {
      router.replace('/login');
    }
  }, [loading, currentUser, pathname, router]);

  const guard = useCallback(
    async <T,>(action: () => Promise<T>): Promise<T> => {
      try {
        return await action();
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) resetState();
        throw error;
      }
    },
    [resetState],
  );

  const login = async (email: string, password: string): Promise<ActionResult> => {
    try {
      await loadUserData(await api.login(email, password));
      return { success: true };
    } catch (error) {
      return { success: false, message: errorMessage(error) };
    }
  };

  const register = async (payload: RegisterPayload): Promise<ActionResult> => {
    try {
      await loadUserData(await api.register(payload));
      return { success: true };
    } catch (error) {
      return { success: false, message: errorMessage(error) };
    }
  };

  const logout = async () => {
    await api.logout().catch(() => undefined);
    resetState();
  };

  const updateAccount = async (payload: AccountPayload): Promise<ActionResult> => {
    try {
      setCurrentUser(await guard(() => api.updateAccount(payload)));
      return { success: true };
    } catch (error) {
      return { success: false, message: errorMessage(error) };
    }
  };

  const deleteAccount = async (password: string): Promise<ActionResult> => {
    try {
      await guard(() => api.deleteAccount(password));
      resetState();
      return { success: true };
    } catch (error) {
      return { success: false, message: errorMessage(error) };
    }
  };

  const savePlan = async (payload: PlanPayload, planId?: string) => {
    const saved = await guard(() => (planId ? api.updatePlan(planId, payload) : api.createPlan(payload)));
    setPlans((prev) => [saved, ...prev.filter((p) => p.id !== saved.id)]);
    return saved;
  };

  const deletePlan = async (planId: string) => {
    await guard(() => api.deletePlan(planId));
    setPlans((prev) => prev.filter((p) => p.id !== planId));
  };

  const duplicatePlan = async (planId: string) => {
    const copy = await guard(() => api.duplicatePlan(planId));
    setPlans((prev) => [copy, ...prev]);
    return copy;
  };

  const addResource = async (form: FormData) => {
    const created = await guard(() => api.createResource(form));
    setResources((prev) => [created, ...prev]);
    return created;
  };

  const deleteResource = async (resourceId: string) => {
    await guard(() => api.deleteResource(resourceId));
    setResources((prev) => prev.filter((r) => r.id !== resourceId));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        content,
        login,
        register,
        logout,
        updateAccount,
        deleteAccount,
        plans,
        savePlan,
        deletePlan,
        duplicatePlan,
        resources,
        addResource,
        deleteResource,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
