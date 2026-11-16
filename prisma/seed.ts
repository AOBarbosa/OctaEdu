import { TERMS_VERSION } from '../lib/legal';
import { db } from '../lib/server/db';
import { hashPassword } from '../lib/server/passwords';

const DEMO_PASSWORD = 'senha123';

const DEMO_USERS = [
  {
    id: 'demo-user-1',
    name: 'Profa. Ana Silva',
    email: 'ana.silva@escola.edu.br',
    school: 'Colégio Estadual Dom Pedro II',
    subject: 'Ciências e Biologia',
  },
  {
    id: 'demo-user-2',
    name: 'Prof. Carlos Eduardo',
    email: 'carlos.eduardo@escola.edu.br',
    school: 'Instituto de Educação Básica',
    subject: 'Matemática e Raciocínio Lógico',
  },
];

const DEMO_PLANS = [
  {
    id: 'demo-plan-1',
    userId: 'demo-user-1',
    title: 'Missão Ecossistema Vivo - 7º Ano B',
    subject: 'Ciências da Natureza',
    targetAudience: '7º Ano do Ensino Fundamental',
    description:
      'Gamificação bimestral com narrativa épica investigativa sobre o impacto do microplástico nos oceanos.',
    objectiveIds: ['obj-colaboracao', 'obj-criatividade', 'obj-engajamento'],
    driverIds: [1, 3, 5],
    techniques: [
      {
        techniqueId: 'gt-narrative-quest',
        customNotes: 'Narrativa: Estudantes são cientistas da base oceanográfica e recebem áudios com alertas semanais.',
      },
      { techniqueId: 'gt-guilds-squads', customNotes: 'Guildas de 4 alunos com papéis: Ecólogo, Químico, Relator e Orador.' },
      {
        techniqueId: 'gt-choice-board',
        customNotes: 'Menu de entrega final: protótipo de filtro de água, maquete ou documentário em vídeo.',
      },
    ],
  },
  {
    id: 'demo-plan-2',
    userId: 'demo-user-1',
    title: 'Torneio dos Mestres dos Vetores',
    subject: 'Física e Matemática',
    targetAudience: '1º Ano do Ensino Médio',
    description: 'Uso de desafios progressivos e Boss Fight para desmistificar o cálculo vetorial.',
    objectiveIds: ['obj-competicao', 'obj-rotina'],
    driverIds: [2, 6, 8],
    techniques: [
      { techniqueId: 'gt-boss-fight', customNotes: 'Batalha cooperativa projetada no telão no encerramento da unidade.' },
      { techniqueId: 'gt-habit-streaks', customNotes: 'Streak semanal de resolução de 3 problemas no caderno sem atraso.' },
    ],
  },
];

const DEMO_RESOURCES = [
  {
    id: 'demo-resource-1',
    userId: 'demo-user-1',
    techniqueId: 'gt-narrative-quest',
    title: 'Roteiro de Narrativa: Expedição aos Biomas Brasileiros',
    description: 'Guia com a história introdutória, cartas de desafio e regras para as equipes.',
    url: 'https://docs.google.com/presentation/d/sample-narrativa-biomas',
  },
  {
    id: 'demo-resource-2',
    userId: 'demo-user-2',
    techniqueId: 'gt-boss-fight',
    title: 'Template de Boss Fight no Genially com HP Coletivo',
    description: 'Modelo pronto e editável de tela de batalha contra o monstro conceitual com barra de vida sincronizada.',
    url: 'https://view.genial.ly/sample-boss-fight-template',
  },
];

async function main() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('O seed cria contas com senha conhecida e não deve rodar em produção.');
  }

  const passwordHash = await hashPassword(DEMO_PASSWORD);
  for (const user of DEMO_USERS) {
    await db.user.upsert({
      where: { email: user.email },
      update: {},
      create: { ...user, passwordHash, termsVersion: TERMS_VERSION, termsAcceptedAt: new Date() },
    });
  }
  for (const plan of DEMO_PLANS) {
    await db.plan.upsert({ where: { id: plan.id }, update: {}, create: plan });
  }
  for (const resource of DEMO_RESOURCES) {
    await db.resource.upsert({
      where: { id: resource.id },
      update: {},
      create: { ...resource, type: 'link', isPublic: true },
    });
  }
  console.log(`Seed concluído: ${DEMO_USERS.length} contas de demonstração (senha: ${DEMO_PASSWORD}).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
