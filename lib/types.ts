export type BrainHemisphere = 'left' | 'right'; // Left: Extrinsic/Logic, Right: Intrinsic/Creativity
export type HatType = 'white' | 'black'; // White Hat: Positive/Empowering, Black Hat: Urgency/Obsession

export interface CoreDriver {
  id: number;
  slug: string;
  name: string;
  englishName: string;
  description: string;
  // Fatores da Teoria da Autodeterminação ligados ao Core Drive.
  sdtFactors: string[];
  color: string;
  hemisphere: BrainHemisphere;
  hat: HatType;
}

export type TestingFocus =
  | 'Unitário / TDD'
  | 'Integração / API'
  | 'E2E / Sistema'
  | 'Exploratório / Funcional'
  | 'Todos';

export type ActivityLength = 'rapida' | 'aula' | 'continua';
export type ActivityDifficulty = 'Fácil' | 'Médio' | 'Difícil';

// Objeto de Aprendizagem desenvolvido pela equipe (faz parte da pesquisa).
export interface LearningObject {
  id: string;
  name: string;
  url: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  supportTools?: string;
  // Dificuldade, duração e tempo ainda podem estar sem definição.
  difficulty: ActivityDifficulty | null;
  length: ActivityLength | null;
  estimatedTime: string | null;
  learningObjects: LearningObject[];
}

export interface GameTechnique {
  id: string;
  driverId: number;
  title: string;
  description: string;
  generalExample?: string;
  testingFocus: TestingFocus[];
  activities: Activity[];
}

export interface EducationalObjective {
  id: string;
  name: string;
  description: string;
  rationale: string;
  // Em ordem de prioridade.
  priorityDriverIds: number[];
}

export interface OctalysisContent {
  coreDrivers: CoreDriver[];
  objectives: EducationalObjective[];
  techniques: GameTechnique[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  school?: string;
  subject?: string;
}

export interface GamificationPlan {
  id: string;
  userId: string;
  title: string;
  subject: string;
  targetAudience: string;
  description?: string;
  selectedObjectiveIds: string[];
  selectedDriverIds: number[];
  selectedTechniques: {
    techniqueId: string;
    customNotes?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface SharedResource {
  id: string;
  userId: string;
  authorName: string;
  techniqueId: string;
  title: string;
  description: string;
  type: 'file' | 'link';
  url?: string;
  fileName?: string;
  fileSize?: string;
  fileUrl?: string;
  isPublic: boolean;
  createdAt: string;
}
