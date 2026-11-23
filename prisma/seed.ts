import { TERMS_VERSION } from '../lib/legal';
import { db } from '../lib/server/db';
import { hashPassword } from '../lib/server/passwords';

const DEMO_PASSWORD = 'senha123';

const DEMO_USERS = [
  {
    id: 'demo-user-1',
    name: 'Profa. Ana Silva',
    email: 'ana.silva@escola.edu.br',
    school: 'Instituto Federal de Tecnologia',
    subject: 'Teste e Qualidade de Software',
  },
  {
    id: 'demo-user-2',
    name: 'Prof. Carlos Eduardo',
    email: 'carlos.eduardo@escola.edu.br',
    school: 'Faculdade de Engenharia de Software',
    subject: 'Automação de Testes e TDD',
  },
];

const DEMO_PLANS = [
  {
    id: 'demo-plan-1',
    userId: 'demo-user-1',
    title: 'Operação Guardiões da Produção - Bug Bash & Sabotagem',
    subject: 'Teste e Qualidade de Software',
    targetAudience: '5º Período - Engenharia de Software',
    description:
      'Laboratório prático combinando caça a bugs em sistema crítico de saúde, sabotagem cruzada entre esquadrões e testes exploratórios guiados por heurísticas.',
    objectiveIds: ['obj-colaboracao', 'obj-pensamento-critico', 'obj-engajamento'],
    driverIds: [1, 5, 7],
    techniques: [
      {
        techniqueId: 'gt-narrative-quest',
        customNotes: 'Narrativa: Equipes atuam como engenheiros de confiabilidade auditando um módulo de triagem médica.',
      },
      {
        techniqueId: 'gt-guilds-squads',
        customNotes: 'Esquadrões de 4 alunos com papéis: Explorador, Automatizador, Analista de Logs e Relator de Issue.',
      },
      {
        techniqueId: 'gt-mystery-box',
        customNotes: 'Sorteio de uma Carta de Caos na metade da aula simulando latência e payload corrompido na API.',
      },
    ],
  },
  {
    id: 'demo-plan-2',
    userId: 'demo-user-1',
    title: 'Dojo de TDD e Boss Fight contra Mutantes',
    subject: 'Verificação, Validação e Testes',
    targetAudience: '6º Período - Ciência da Computação',
    description: 'Prática intensiva do ciclo Red-Green-Refactor seguida de batalha coletiva para eliminar mutantes sobreviventes com Stryker.',
    objectiveIds: ['obj-criatividade', 'obj-competicao', 'obj-rotina'],
    driverIds: [2, 3, 8],
    techniques: [
      {
        techniqueId: 'gt-instant-feedback-loops',
        customNotes: 'Coding Dojo Randori em duplas com rotação a cada 7 minutos mantendo os testes unitários no verde.',
      },
      {
        techniqueId: 'gt-boss-fight',
        customNotes: 'Repositório com 25 mutantes sobreviventes; a turma vence quando o escore de mutação passar de 90%.',
      },
      {
        techniqueId: 'gt-habit-streaks',
        customNotes: 'Green Build Streak semanal acompanhada via GitHub Actions da turma.',
      },
    ],
  },
];

const DEMO_RESOURCES = [
  {
    id: 'demo-resource-1',
    userId: 'demo-user-1',
    techniqueId: 'gt-sandbox-lab',
    title: 'Cartas de Heurísticas para Sessões de Teste Exploratório (SBTM)',
    description: 'Baralho de referência com heurísticas de valor limite, entradas maliciosas e estados de exceção para usar em laboratório.',
    url: 'https://docs.google.com/presentation/d/sample-heuristicas-teste-exploratorio',
  },
  {
    id: 'demo-resource-2',
    userId: 'demo-user-2',
    techniqueId: 'gt-boss-fight',
    title: 'Repositório Template: Boss Fight de Teste de Mutação (Vitest + Stryker)',
    description: 'Projeto Node/TypeScript pronto para aula prática com módulo de descontos cheio de mutantes sobreviventes e placar de cobertura.',
    url: 'https://github.com/stryker-mutator/stryker-js',
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
