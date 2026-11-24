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

// Os IDs de objetivos e técnicas vêm de prisma/content/. Rode `pnpm db:content` antes.
const DEMO_PLANS = [
  {
    id: 'demo-plan-1',
    userId: 'demo-user-1',
    title: 'Missão FarmaTest - Caça aos Bugs em Equipe',
    subject: 'Teste e Qualidade de Software',
    targetAudience: '5º Período - Engenharia de Software',
    description:
      'Aula prática com o Objeto de Aprendizagem FarmaTest: a turma vira a equipe de qualidade da farmácia e trabalha em grupos para encontrar os erros do sistema.',
    objectiveIds: ['motivacao-realizacao', 'colaboracao-surpresa'],
    driverIds: [1, 5, 7],
    techniques: [
      {
        techniqueId: 'narrativa',
        customNotes: 'Abrir a aula com a história da farmácia que vai lançar o sistema novo.',
      },
      {
        techniqueId: 'missoes-em-grupo',
        customNotes: 'Equipes de 4 alunos, cada um responsável por uma área do sistema.',
      },
      {
        techniqueId: 'caixas-misteriosas',
        customNotes: 'Sorteio de uma recompensa a cada bug válido relatado.',
      },
    ],
  },
  {
    id: 'demo-plan-2',
    userId: 'demo-user-1',
    title: 'Dojo de TDD e Luta Contra o Chefe',
    subject: 'Verificação, Validação e Testes',
    targetAudience: '6º Período - Ciência da Computação',
    description:
      'Prática do ciclo do TDD em duplas, com feedback instantâneo dos testes, e desafio final contra um sistema cheio de defeitos.',
    objectiveIds: ['motivacao-realizacao', 'criatividade-experiencia'],
    driverIds: [1, 2, 3],
    techniques: [
      {
        techniqueId: 'co-criador',
        customNotes: 'Duplas alternando quem escreve o teste e quem escreve o código.',
      },
      {
        techniqueId: 'feedback-instantaneo',
        customNotes: 'Testes rodando em modo watch durante toda a aula.',
      },
      {
        techniqueId: 'luta-contra-o-chefe',
        customNotes: 'Chefão no fim da unidade, com teste de mutação no Stryker.',
      },
    ],
  },
];

const DEMO_RESOURCES = [
  {
    id: 'demo-resource-1',
    userId: 'demo-user-1',
    techniqueId: 'espacos-em-branco',
    title: 'Cartas de Missão para Sessões de Teste Exploratório',
    description: 'Modelos de charter com espaço para estratégia, hipóteses de teste e defeitos encontrados.',
    url: 'https://docs.google.com/presentation/d/sample-heuristicas-teste-exploratorio',
  },
  {
    id: 'demo-resource-2',
    userId: 'demo-user-2',
    techniqueId: 'luta-contra-o-chefe',
    title: 'Repositório Template: Chefão de Teste de Mutação (Vitest + Stryker)',
    description: 'Projeto pronto para aula prática com módulo de descontos cheio de mutantes sobreviventes.',
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
