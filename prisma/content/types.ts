// Formato do conteúdo do Octalysis transcrito dos documentos da equipe
// ("Objetivos + Core Drives" e "Octalysis + Técnicas de Jogos").

export interface CoreDriveContent {
  id: number;
  slug: string;
  name: string;
  englishName: string;
  description: string;
  sdtFactors: string[];
  color: string;
  hemisphere: 'left' | 'right';
  hat: 'white' | 'black';
}

export interface ObjectiveContent {
  id: string;
  name: string;
  description: string;
  rationale: string;
  // Em ordem de prioridade.
  coreDriveIds: number[];
}

export interface LearningObjectContent {
  id: string;
  name: string;
  url: string;
}

export interface ActivityContent {
  description: string;
  // Ferramentas e artefatos de apoio que não são Objetos de Aprendizagem.
  supportTools?: string;
  learningObjectIds: string[];
}

export interface TechniqueContent {
  id: string;
  name: string;
  description: string;
  generalExample?: string;
  activity: ActivityContent;
}

export interface CoreDriveTechniques {
  coreDriveId: number;
  techniques: TechniqueContent[];
}

// Junta parágrafos ou itens de lista em um texto só.
export function text(...parts: string[]) {
  return parts.join('\n');
}
