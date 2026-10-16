export type BrainHemisphere = 'left' | 'right'; // Left: Extrinsic/Logic, Right: Intrinsic/Creativity
export type HatType = 'white' | 'black'; // White Hat: Positive/Empowering, Black Hat: Urgency/Obsession

export interface CoreDriver {
  id: number;
  slug: string;
  name: string;
  englishName: string;
  shortDescription: string;
  fullDescription: string;
  pedagogicalImpact: string;
  classroomExamples: string[];
  color: string;
  hemisphere: BrainHemisphere;
  hat: HatType;
  keywords: string[];
}

export interface GameTechnique {
  id: string;
  driverId: number;
  title: string;
  englishTitle?: string;
  summary: string;
  description: string;
  pedagogicalApplication: string;
  missionTemplate: string;
  virtualResources: {
    name: string;
    type: 'tool' | 'template' | 'platform';
    description: string;
    url?: string;
  }[];
  educationLevels: ('Fundamental' | 'Médio' | 'Superior' | 'Todos')[];
}

export interface EducationalObjective {
  id: string;
  name: string;
  category: 'Comportamental' | 'Cognitivo' | 'Social' | 'Emocional';
  description: string;
  priorityDriverIds: number[];
  rational: string;
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
  fileData?: string; // base64 or object URL for mock
  fileSize?: string;
  isPublic: boolean;
  createdAt: string;
}
