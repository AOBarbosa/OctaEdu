'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, GamificationPlan, SharedResource } from '../lib/types';
import {
  getCurrentUser,
  setCurrentUser,
  getStoredUsers,
  saveUser,
  getStoredPlans,
  savePlan,
  deletePlan as storageDeletePlan,
  duplicatePlan as storageDuplicatePlan,
  getStoredResources,
  saveResource as storageSaveResource
} from '../lib/storage';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => { success: boolean; message?: string };
  register: (name: string, email: string, password: string, school?: string, subject?: string) => { success: boolean; message?: string };
  logout: () => void;
  plans: GamificationPlan[];
  userPlans: GamificationPlan[];
  refreshPlans: () => void;
  createOrUpdatePlan: (plan: GamificationPlan) => void;
  deletePlan: (planId: string) => void;
  duplicatePlan: (planId: string) => GamificationPlan | null;
  resources: SharedResource[];
  refreshResources: () => void;
  addResource: (resource: Omit<SharedResource, 'id' | 'createdAt' | 'userId' | 'authorName'>) => SharedResource;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState<GamificationPlan[]>([]);
  const [resources, setResources] = useState<SharedResource[]>([]);

  useEffect(() => {
    // Initial client hydration
    const user = getCurrentUser();
    setUserState(user);
    setPlans(getStoredPlans());
    setResources(getStoredResources());
    setLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const users = getStoredUsers();
    const matched = users.find(u => u.email.toLowerCase() === cleanEmail && u.passwordHash === password);

    if (!matched) {
      return { success: false, message: 'E-mail ou senha incorretos. Por favor, verifique suas credenciais.' };
    }

    const authenticatedUser: User = {
      id: matched.id,
      name: matched.name,
      email: matched.email,
      school: matched.school,
      subject: matched.subject
    };

    setCurrentUser(authenticatedUser);
    setUserState(authenticatedUser);
    return { success: true };
  };

  const register = (name: string, email: string, password: string, school?: string, subject?: string) => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
      return { success: false, message: 'Por favor, preencha todos os campos obrigatórios.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return { success: false, message: 'O formato do e-mail inserido é inválido.' };
    }

    if (password.length < 6) {
      return { success: false, message: 'A senha deve conter no mínimo 6 caracteres.' };
    }

    const users = getStoredUsers();
    const alreadyExists = users.some(u => u.email.toLowerCase() === cleanEmail);
    if (alreadyExists) {
      return { success: false, message: 'Este endereço de e-mail já está cadastrado na plataforma.' };
    }

    const newUser: User = {
      id: 'user-' + Date.now(),
      name: cleanName,
      email: cleanEmail,
      school: school?.trim() || 'Escola não informada',
      subject: subject?.trim() || 'Geral'
    };

    saveUser(newUser, password);
    setCurrentUser(newUser);
    setUserState(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setUserState(null);
  };

  const refreshPlans = () => {
    setPlans(getStoredPlans());
  };

  const createOrUpdatePlan = (plan: GamificationPlan) => {
    savePlan(plan);
    refreshPlans();
  };

  const deletePlanItem = (planId: string) => {
    storageDeletePlan(planId);
    refreshPlans();
  };

  const duplicatePlanItem = (planId: string) => {
    if (!currentUser) return null;
    const duplicated = storageDuplicatePlan(planId, currentUser.id);
    refreshPlans();
    return duplicated;
  };

  const refreshResources = () => {
    setResources(getStoredResources());
  };

  const addResource = (resData: Omit<SharedResource, 'id' | 'createdAt' | 'userId' | 'authorName'>) => {
    const newRes: SharedResource = {
      ...resData,
      id: 'res-' + Date.now(),
      userId: currentUser?.id || 'anon',
      authorName: currentUser?.name || 'Professor Convidado',
      createdAt: new Date().toISOString()
    };
    storageSaveResource(newRes);
    refreshResources();
    return newRes;
  };

  const userPlans = currentUser ? plans.filter(p => p.userId === currentUser.id) : [];

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        login,
        register,
        logout,
        plans,
        userPlans,
        refreshPlans,
        createOrUpdatePlan,
        deletePlan: deletePlanItem,
        duplicatePlan: duplicatePlanItem,
        resources,
        refreshResources,
        addResource
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
