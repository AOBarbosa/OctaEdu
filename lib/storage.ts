'use client';

import { User, GamificationPlan, SharedResource } from './types';

const USERS_STORAGE_KEY = 'octaedu_users_v1';
const CURRENT_USER_KEY = 'octaedu_current_user_v1';
const PLANS_STORAGE_KEY = 'octaedu_plans_v1';
const RESOURCES_STORAGE_KEY = 'octaedu_resources_v1';

// Seed Initial Registered Users
const DEFAULT_USERS: (User & { passwordHash: string })[] = [
  {
    id: 'user-1',
    name: 'Profa. Ana Silva',
    email: 'ana.silva@escola.edu.br',
    school: 'Colégio Estadual Dom Pedro II',
    subject: 'Ciências e Biologia',
    passwordHash: 'senha123'
  },
  {
    id: 'user-2',
    name: 'Prof. Carlos Eduardo',
    email: 'carlos.eduardo@escola.edu.br',
    school: 'Instituto de Educação Básica',
    subject: 'Matemática e Raciocínio Lógico',
    passwordHash: 'senha123'
  }
];

// Seed Initial Gamification Plans
const DEFAULT_PLANS: GamificationPlan[] = [
  {
    id: 'plan-demo-1',
    userId: 'user-1',
    title: 'Missão Ecossistema Vivo - 7º Ano B',
    subject: 'Ciências da Natureza',
    targetAudience: '7º Ano do Ensino Fundamental',
    description: 'Gamificação bimestral com narrativa épica investigativa sobre o impacto do microplástico nos oceanos.',
    selectedObjectiveIds: ['obj-colaboracao', 'obj-criatividade', 'obj-engajamento'],
    selectedDriverIds: [1, 3, 5],
    selectedTechniques: [
      {
        techniqueId: 'gt-narrative-quest',
        customNotes: 'Narrativa: Estudantes são cientistas da base oceanográfica e recebem áudios com alertas semanais.'
      },
      {
        techniqueId: 'gt-guilds-squads',
        customNotes: 'Guildas de 4 alunos com papéis: Ecólogo, Químico, Relator e Orador.'
      },
      {
        techniqueId: 'gt-choice-board',
        customNotes: 'Menu de entrega final: protótipo de filtro de água, maquete ou documentário em vídeo.'
      }
    ],
    createdAt: '2026-03-10T14:30:00.000Z',
    updatedAt: '2026-03-15T18:20:00.000Z'
  },
  {
    id: 'plan-demo-2',
    userId: 'user-1',
    title: 'Torneio dos Mestres dos Vetores',
    subject: 'Física e Matemática',
    targetAudience: '1º Ano do Ensino Médio',
    description: 'Uso de desafios progressivos e Boss Fight para desmistificar o cálculo vetorial.',
    selectedObjectiveIds: ['obj-competicao', 'obj-rotina'],
    selectedDriverIds: [2, 6, 8],
    selectedTechniques: [
      {
        techniqueId: 'gt-boss-fight',
        customNotes: 'Batalha cooperativa projetada no telão no encerramento da unidade.'
      },
      {
        techniqueId: 'gt-habit-streaks',
        customNotes: 'Streak semanal de resolução de 3 problemas no caderno sem atraso.'
      }
    ],
    createdAt: '2026-03-18T10:00:00.000Z',
    updatedAt: '2026-03-18T10:00:00.000Z'
  }
];

// Seed Initial Shared Resources (HU08)
const DEFAULT_RESOURCES: SharedResource[] = [
  {
    id: 'res-demo-1',
    userId: 'user-1',
    authorName: 'Profa. Ana Silva',
    techniqueId: 'gt-narrative-quest',
    title: 'Roteiro de Narrativa: Expedição aos Biomas Brasileiros',
    description: 'Guia em PDF com a história introdutória, cartas de desafio e regras para as equipes.',
    type: 'link',
    url: 'https://docs.google.com/presentation/d/sample-narrativa-biomas',
    isPublic: true,
    createdAt: '2026-03-12T11:00:00.000Z'
  },
  {
    id: 'res-demo-2',
    userId: 'user-2',
    authorName: 'Prof. Carlos Eduardo',
    techniqueId: 'gt-boss-fight',
    title: 'Template de Boss Fight no Genially com HP Coletivo',
    description: 'Modelo pronto e editável de tela de batalha contra o monstro conceitual com barra de vida sincronizada.',
    type: 'link',
    url: 'https://view.genial.ly/sample-boss-fight-template',
    isPublic: true,
    createdAt: '2026-03-14T16:45:00.000Z'
  },
  {
    id: 'res-demo-3',
    userId: 'user-1',
    authorName: 'Profa. Ana Silva',
    techniqueId: 'gt-guilds-squads',
    title: 'Crachás de Funções para Guildas de Aprendizagem (PDF)',
    description: 'Fichas imprimíveis com as descrições dos papéis (Líder, Escriba, Cronometrista, Pesquisador).',
    type: 'file',
    fileName: 'Crachas_Guildas_EnsinoFundamental.pdf',
    fileSize: '1.4 MB',
    fileData: 'data:application/pdf;base64,JVBERi0xLjQKJcTl8uXrp...',
    isPublic: true,
    createdAt: '2026-03-16T09:20:00.000Z'
  }
];

export function getStoredUsers(): (User & { passwordHash: string })[] {
  if (typeof window === 'undefined') return DEFAULT_USERS;
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_USERS;
  }
}

export function saveUser(user: User, passwordHash: string): void {
  if (typeof window === 'undefined') return;
  const users = getStoredUsers();
  users.push({ ...user, passwordHash });
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) {
      // Default to demo user if not logged out explicitly
      const defaultUser: User = {
        id: DEFAULT_USERS[0].id,
        name: DEFAULT_USERS[0].name,
        email: DEFAULT_USERS[0].email,
        school: DEFAULT_USERS[0].school,
        subject: DEFAULT_USERS[0].subject
      };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(defaultUser));
      return defaultUser;
    }
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null): void {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

// Plan Management (HU07)
export function getStoredPlans(): GamificationPlan[] {
  if (typeof window === 'undefined') return DEFAULT_PLANS;
  try {
    const raw = localStorage.getItem(PLANS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(DEFAULT_PLANS));
      return DEFAULT_PLANS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PLANS;
  }
}

export function savePlan(plan: GamificationPlan): void {
  if (typeof window === 'undefined') return;
  const plans = getStoredPlans();
  const existingIdx = plans.findIndex(p => p.id === plan.id);
  if (existingIdx >= 0) {
    plans[existingIdx] = plan;
  } else {
    plans.unshift(plan);
  }
  localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(plans));
}

export function deletePlan(planId: string): void {
  if (typeof window === 'undefined') return;
  const plans = getStoredPlans().filter(p => p.id !== planId);
  localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(plans));
}

export function duplicatePlan(planId: string, currentUserId: string): GamificationPlan | null {
  if (typeof window === 'undefined') return null;
  const plans = getStoredPlans();
  const target = plans.find(p => p.id === planId);
  if (!target) return null;

  const duplicated: GamificationPlan = {
    ...target,
    id: 'plan-' + Date.now(),
    userId: currentUserId,
    title: `${target.title} (Cópia)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  savePlan(duplicated);
  return duplicated;
}

// Resources & Uploads (HU08)
export function getStoredResources(): SharedResource[] {
  if (typeof window === 'undefined') return DEFAULT_RESOURCES;
  try {
    const raw = localStorage.getItem(RESOURCES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(RESOURCES_STORAGE_KEY, JSON.stringify(DEFAULT_RESOURCES));
      return DEFAULT_RESOURCES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_RESOURCES;
  }
}

export function saveResource(resource: SharedResource): void {
  if (typeof window === 'undefined') return;
  const list = getStoredResources();
  list.unshift(resource);
  localStorage.setItem(RESOURCES_STORAGE_KEY, JSON.stringify(list));
}
