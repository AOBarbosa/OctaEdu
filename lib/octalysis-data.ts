import { CoreDriver, GameTechnique, EducationalObjective, TestingFocus } from './types';

export const TESTING_FOCUSES: Exclude<TestingFocus, 'Todos'>[] = [
  'Unitário / TDD',
  'Integração / API',
  'E2E / Sistema',
  'Exploratório / Funcional',
];

export const CORE_DRIVERS: CoreDriver[] = [
  {
    id: 1,
    slug: 'epic-meaning',
    name: 'Significado Épico e Chamado',
    englishName: 'Epic Meaning & Calling',
    shortDescription: 'O estudante sente que testar software protege vidas, dados críticos e a confiança de milhares de usuários.',
    fullDescription:
      'Este Core Driver é ativado quando a turma percebe que a qualidade de software não é uma burocracia técnica, mas uma missão essencial para evitar falhas críticas em hospitais, aviões, bancos e serviços públicos. Cada bug encontrado ou evitado tem impacto humano e social concreto.',
    pedagogicalImpact:
      'Desperta senso de responsabilidade ética e engenharia segura, combatendo a visão de que escrever testes é uma tarefa secundária ou cansativa.',
    classroomExamples: [
      'Simulação de auditoria de qualidade em que a turma atua como o esquadrão de confiabilidade de um sistema de triagem hospitalar.',
      'Testes de acessibilidade e usabilidade aplicados em plataformas reais de ONGs ou serviços públicos locais.',
      'Construção coletiva de um repositório aberto de casos de teste e boas práticas para ajudar turmas iniciantes de programação.',
    ],
    color: '#3B82F6',
    hemisphere: 'right',
    hat: 'white',
    keywords: ['Confiabilidade', 'Impacto Crítico', 'Ética em QA', 'Missão de Qualidade', 'Legado Aberto'],
  },
  {
    id: 2,
    slug: 'development-accomplishment',
    name: 'Desenvolvimento e Conquista',
    englishName: 'Development & Accomplishment',
    shortDescription: 'O impulso de evoluir na engenharia de testes, aumentar cobertura relevante e vencer desafios técnicos.',
    fullDescription:
      'Focado no senso de maestria técnica. Os alunos acompanham sua evolução tangível ao avançar pela Pirâmide de Testes, eliminar mutantes em testes de mutação, conquistar insígnias de domínio em ferramentas de automação e superar suítes de alta complexidade.',
    pedagogicalImpact:
      'Transforma métricas técnicas (cobertura de branches, escore de mutação, asserts) em indicadores visíveis de evolução do estudante.',
    classroomExamples: [
      'Trilha de Maestria em QA (Caçador de Bugs -> Construtor de Testes Unitários -> Arquiteto de Automação -> Mestre em Mutação).',
      'Desafio "Boss Fight" onde um módulo legado cheio de defeitos ocultos perde pontos de vida a cada bug isolado com teste automatizado.',
      'Badges desbloqueados ao atingir 90% de escore de mutação ou ao automatizar um fluxo ponta a ponta sem flakiness.',
    ],
    color: '#10B981',
    hemisphere: 'left',
    hat: 'white',
    keywords: ['Pirâmide de Testes', 'Escore de Mutação', 'Cobertura', 'Badges de QA', 'Superação Técnica'],
  },
  {
    id: 3,
    slug: 'empowerment-creativity',
    name: 'Empoderamento da Criatividade e Feedback',
    englishName: 'Empowerment of Creativity & Feedback',
    shortDescription: 'Liberdade para desenhar estratégias de teste, criar cenários inusitados e receber feedback imediato do runner.',
    fullDescription:
      'Um dos motores mais sustentáveis no ensino de testes. O ciclo rápido do TDD (Red-Green-Refactor) e a liberdade do teste exploratório permitem que o aluno formule hipóteses de falha, execute experimentos no código e veja o resultado em segundos.',
    pedagogicalImpact:
      'Estimula o pensamento crítico e investigativo sobre casos de borda, entradas maliciosas e arquitetura testável.',
    classroomExamples: [
      'Laboratório de TDD com ciclo de feedback instantâneo: o aluno cria o teste falhando, implementa a solução mínima e refatora ao vivo.',
      'Sessões de Teste Exploratório baseadas em cartas de heurísticas onde cada dupla escolhe sua estratégia para quebrar a aplicação.',
      'Desafios de Property-Based Testing em que os estudantes criam geradores criativos de entradas para descobrir falhas inesperadas.',
    ],
    color: '#F59E0B',
    hemisphere: 'right',
    hat: 'white',
    keywords: ['Ciclo TDD', 'Teste Exploratório', 'Feedback Instantâneo', 'Casos de Borda', 'Heurísticas'],
  },
  {
    id: 4,
    slug: 'ownership-possession',
    name: 'Propriedade e Posse',
    englishName: 'Ownership & Possession',
    shortDescription: 'Senso de autoria e orgulho sobre a própria suíte de testes, planos de qualidade e catálogo de bugs.',
    fullDescription:
      'Quando o estudante é dono de um módulo, de um framework de automação autoral ou de um portfólio vivo de relatórios de defeitos, ele passa a cuidar da saúde daquele código, mantendo os testes limpos, rápidos e bem documentados.',
    pedagogicalImpact:
      'Desenvolve zelo por código de teste limpo (Clean Tests), manutenção de suítes e documentação clara de defeitos.',
    classroomExamples: [
      'Portfólio de Engenharia de Qualidade no GitHub com suítes unitárias, de API e E2E construídas pelo próprio aluno ao longo do curso.',
      'Adoção de um módulo do projeto integrador: cada grupo é guardião oficial da cobertura e da saúde da pipeline daquele serviço.',
      'Coleção pessoal de "Troféus de Bugs" documentando as falhas mais sutis encontradas e corrigidas pelo estudante no semestre.',
    ],
    color: '#8B5CF6',
    hemisphere: 'left',
    hat: 'white',
    keywords: ['Suíte Autoral', 'Clean Tests', 'Portfólio QA', 'Guardião de Módulo', 'Catálogo de Bugs'],
  },
  {
    id: 5,
    slug: 'social-influence',
    name: 'Influência Social e Relacionamento',
    englishName: 'Social Influence & Relatedness',
    shortDescription: 'Dinâmicas colaborativas entre desenvolvedores e testadores, Pair Testing, Coding Dojos e Bug Bashes.',
    fullDescription:
      'Integra práticas sociais da engenharia de software moderna: testes em par, revisão cruzada de casos de teste, dinâmicas de sabotagem amigável entre equipes e sessões coletivas de caça a bugs.',
    pedagogicalImpact:
      'Rompe a rivalidade entre quem desenvolve e quem testa, fortalecendo a comunicação técnica para relatar e reproduzir defeitos.',
    classroomExamples: [
      'Bug Bash em Esquadrões com papéis rotativos (Explorador, Automatizador, Relator de Issue e Analista de Logs).',
      'Dinâmica de Sabotagem Cruzada (Fault Seeding): uma equipe injeta defeitos sutis em uma branch e a outra tenta detectá-los com testes.',
      'Sessões de Pair Testing e revisão por pares de Pull Requests focada na qualidade das asserções e cenários cobertos.',
    ],
    color: '#EC4899',
    hemisphere: 'right',
    hat: 'white',
    keywords: ['Bug Bash', 'Pair Testing', 'Coding Dojo', 'Revisão de Testes', 'Sabotagem Cruzada'],
  },
  {
    id: 6,
    slug: 'scarcity-impatience',
    name: 'Escassez e Impaciência',
    englishName: 'Scarcity & Impatience',
    shortDescription: 'Desafios com tempo delimitado (Timebox), orçamentos restritos de execução e janelas de caça a bugs.',
    fullDescription:
      'Na prática profissional, não é possível testar tudo infinitamente. Ao limitar o tempo de uma sessão exploratória ou o número de casos de teste permitidos, o aluno aprende a priorizar riscos e selecionar técnicas como Particionamento de Equivalência e Análise de Valor Limite.',
    pedagogicalImpact:
      'Ensina priorização baseada em risco, eficiência na seleção de casos de teste e foco sob restrições reais de projeto.',
    classroomExamples: [
      'Speed Run de Timebox Testing: 15 minutos cronometrados para encontrar o maior número de falhas críticas em uma API recém-lançada.',
      'Desafio do Orçamento Enxuto: o aluno só pode escrever 5 casos de teste para validar um formulário complexo, exigindo Valor Limite.',
      'Bounties exclusivos para os primeiros grupos que isolarem um bug de concorrência ou falha intermitente da semana.',
    ],
    color: '#F97316',
    hemisphere: 'left',
    hat: 'black',
    keywords: ['Timebox Testing', 'Priorização de Risco', 'Valor Limite', 'Orçamento de Testes', 'Foco'],
  },
  {
    id: 7,
    slug: 'unpredictability-curiosity',
    name: 'Imprevisibilidade e Curiosidade',
    englishName: 'Unpredictability & Curiosity',
    shortDescription: 'Investigação de bugs misteriosos, mutantes ocultos, entradas caóticas e cenários surpresa.',
    fullDescription:
      'Testar software é, por natureza, uma investigação detetivesca. Quando o professor esconde defeitos sutis (Easter Eggs de falha), aplica Chaos Engineering simplificado ou propõe enigmas de depuração, a curiosidade técnica da turma atinge o pico.',
    pedagogicalImpact:
      'Estimula o raciocínio abdutivo, a formulação de hipóteses de causa raiz e o hábito de não confiar apenas no "caminho feliz".',
    classroomExamples: [
      'Caixa-Preta Misteriosa: um binário ou endpoint sem documentação interna em que os alunos deduzem as regras e falhas via testes.',
      'Escape Room de Depuração: cada teste corrigido revela uma pista nos logs para destravar o próximo microsserviço.',
      'Roleta de Cenários Adversos (Chaos Card): sorteio de uma condição inesperada (latência alta, payload corrompido, fuso horário) durante a aula.',
    ],
    color: '#06B6D4',
    hemisphere: 'right',
    hat: 'black',
    keywords: ['Caixa-Preta', 'Caça a Mutantes', 'Investigação de Logs', 'Chaos Card', 'Causa Raiz'],
  },
  {
    id: 8,
    slug: 'loss-avoidance',
    name: 'Perda e Evitação',
    englishName: 'Loss & Avoidance',
    shortDescription: 'Proteção contra regressões, manutenção da pipeline verde (Green Build Streak) e preservação da qualidade.',
    fullDescription:
      'Conecta diretamente a psicologia da perda ao papel fundamental de uma suíte de regressão: impedir que funcionalidades que já estavam prontas quebrem em produção. Manter a sequência de builds verdes e proteger os "escudos de estabilidade" cria disciplina contínua.',
    pedagogicalImpact:
      'Consolida o hábito de rodar e atualizar testes a cada commit, valorizando a prevenção de regressões e a integração contínua.',
    classroomExamples: [
      'Green Build Streak: contador de dias ou entregas consecutivas em que a branch principal da equipe permanece com todos os testes passando.',
      'Escudo de Estabilidade em Produção: cada equipe começa a sprint com 3 escudos e perde um se um bug escapar para a branch de release.',
      'Alerta de Queda de Cobertura: commits que reduzem a cobertura de testes críticos bloqueiam o avanço até que novos testes protejam o código.',
    ],
    color: '#EF4444',
    hemisphere: 'left',
    hat: 'black',
    keywords: ['Prevenção de Regressão', 'Green Build Streak', 'CI/CD', 'Estabilidade', 'Quality Gate'],
  },
];

export const GAME_TECHNIQUES: GameTechnique[] = [
  // CD1: Epic Meaning & Calling
  {
    id: 'gt-narrative-quest',
    driverId: 1,
    title: 'Missão Crítica: Guardiões da Confiabilidade',
    englishTitle: 'Narrative Quest',
    summary: 'Contextualiza a disciplina como uma operação de defesa de sistemas críticos contra falhas catastróficas.',
    description:
      'Em vez de listas de exercícios soltas, o curso coloca os estudantes como engenheiros de confiabilidade convocados para auditar e blindar sistemas vitais (como controle de tráfego aéreo, prontuário médico ou votação eletrônica) antes do lançamento.',
    pedagogicalApplication:
      'Ideal para introduzir fundamentos de qualidade, gravidade vs. prioridade de bugs e responsabilidade profissional na engenharia de software.',
    virtualResources: [
      {
        name: 'GitHub Issues & Projects',
        type: 'platform',
        description: 'Quadro de missões e rastreamento de incidentes críticos da narrativa.',
        url: 'https://github.com/features/issues',
      },
      {
        name: 'Genially',
        type: 'platform',
        description: 'Criação de briefings interativos de incidentes e dossiês de sistemas sob risco.',
        url: 'https://genially.com',
      },
    ],
    testingFocus: ['Todos'],
  },
  {
    id: 'gt-higher-purpose',
    driverId: 1,
    title: 'Auditoria de Qualidade em Software Real / Open Source',
    englishTitle: 'Higher Calling Project',
    summary: 'Os alunos testam aplicações reais da comunidade ou projetos open source e submetem relatórios ou testes úteis.',
    description:
      'A turma seleciona sistemas acadêmicos, portais públicos ou bibliotecas open source para executar baterias de testes funcionais, de acessibilidade ou unitários, gerando issues bem documentadas ou Pull Requests reais.',
    pedagogicalApplication:
      'Aprendizagem Baseada em Projetos (PBL) onde o relatório de bug e a suíte de teste geram valor real além da nota.',
    virtualResources: [
      {
        name: 'GitHub',
        type: 'platform',
        description: 'Submissão de issues estruturadas e Pull Requests com novos testes.',
        url: 'https://github.com',
      },
      {
        name: 'Axe DevTools / Lighthouse',
        type: 'tool',
        description: 'Auditoria automatizada e exploratória de acessibilidade e qualidade web.',
        url: 'https://developer.chrome.com/docs/lighthouse',
      },
    ],
    testingFocus: ['E2E / Sistema', 'Exploratório / Funcional'],
  },
  {
    id: 'gt-humanitarian-oracle',
    driverId: 1,
    title: 'Oráculo de Bugs & Base de Heurísticas da Turma',
    englishTitle: 'Humanitarian Oracle',
    summary: 'Construção coletiva de um catálogo vivo de armadilhas de código, oráculos de teste e casos de borda.',
    description:
      'Cada turma documenta os bugs mais interessantes encontrados, padrões de falha recorrentes (datas bissextas, encoding, concorrência) e receitas de como testá-los, deixando uma base de consulta para as próximas turmas.',
    pedagogicalApplication:
      'Desenvolve repertório de heurísticas de teste e sistematização do conhecimento técnico em equipe.',
    virtualResources: [
      {
        name: 'Notion / GitBook',
        type: 'platform',
        description: 'Wiki colaborativa para catalogar heurísticas, payloads de teste e post-mortems.',
        url: 'https://notion.so',
      },
    ],
    testingFocus: ['Exploratório / Funcional', 'Unitário / TDD'],
  },

  // CD2: Development & Accomplishment
  {
    id: 'gt-boss-fight',
    driverId: 2,
    title: 'Boss Fight: O Monólito Legado / Suíte de Mutantes',
    englishTitle: 'Boss Fight Challenge',
    summary: 'Desafio coletivo ou em grupos para derrotar um sistema repleto de bugs e mutantes sobreviventes.',
    description:
      'O professor disponibiliza um repositório com código cheio de defeitos ou com escore de mutação baixo (o "Chefe"). A barra de HP do chefe diminui conforme a turma escreve testes que detectam as falhas e matam os mutantes.',
    pedagogicalApplication:
      'Substitui provas estáticas por uma avaliação prática de escrita de asserções fortes, análise de cobertura e teste de mutação.',
    virtualResources: [
      {
        name: 'Stryker Mutator / PITest',
        type: 'tool',
        description: 'Frameworks de teste de mutação para medir a eficácia real da suíte contra o Boss.',
        url: 'https://stryker-mutator.io',
      },
      {
        name: 'SonarQube / Codecov',
        type: 'platform',
        description: 'Visualização em tempo real da queda de vulnerabilidades e avanço da cobertura.',
        url: 'https://www.sonarsource.com',
      },
    ],
    testingFocus: ['Unitário / TDD', 'Integração / API'],
  },
  {
    id: 'gt-skill-tree',
    driverId: 2,
    title: 'Árvore de Habilidades da Pirâmide de Testes',
    englishTitle: 'Skill Tree / Progress Bar',
    summary: 'Trilha visual de competências que vai de testes unitários básicos até automação E2E, mocks e contratos.',
    description:
      'O conteúdo da disciplina é organizado como uma árvore de RPG baseada na Pirâmide de Testes. Dominar asserções e dublês de teste (stubs, mocks, spies) desbloqueia ramos avançados como Testes de Contrato, E2E e Performance.',
    pedagogicalApplication:
      'Dá clareza sobre a progressão técnica e permite que cada aluno visualize exatamente quais competências de QA já consolidou.',
    virtualResources: [
      {
        name: 'Miro / FigJam',
        type: 'tool',
        description: 'Mapa visual interativo da árvore de habilidades de testes da turma.',
        url: 'https://miro.com',
      },
      {
        name: 'Canvas Badges / Credly',
        type: 'platform',
        description: 'Emissão de insígnias para cada nível da pirâmide conquistado.',
        url: 'https://badgr.com',
      },
    ],
    testingFocus: ['Todos'],
  },
  {
    id: 'gt-fixed-milestones',
    driverId: 2,
    title: 'Marcos de Qualidade por Sprint (Quality Milestones)',
    englishTitle: 'Fixed Milestones',
    summary: 'Divide o projeto de testes do semestre em entregas graduais e verificáveis a cada etapa.',
    description:
      'Em vez de cobrar toda a suíte de testes no fim do semestre, o projeto é dividido em marcos claros: 1) Plano e Partições de Equivalência, 2) Testes Unitários e Mocks, 3) Testes de Integração/API e 4) Automação E2E na Pipeline.',
    pedagogicalApplication:
      'Evita que os estudantes deixem os testes para a véspera da entrega e garante feedback incremental do professor.',
    virtualResources: [
      {
        name: 'GitHub Actions',
        type: 'platform',
        description: 'Validação automática do cumprimento de cada marco a cada push.',
        url: 'https://github.com/features/actions',
      },
      {
        name: 'Trello / Jira',
        type: 'tool',
        description: 'Acompanhamento visual dos marcos de qualidade por sprint.',
        url: 'https://trello.com',
      },
    ],
    testingFocus: ['Todos'],
  },

  // CD3: Empowerment of Creativity & Feedback
  {
    id: 'gt-choice-board',
    driverId: 3,
    title: 'Tabuleiro de Estratégias de Teste (Choice Board)',
    englishTitle: 'Choice Board & Strategy',
    summary: 'Permite que o estudante escolha quais técnicas e ferramentas combinar para atingir a meta de qualidade.',
    description:
      'O professor apresenta uma matriz 3x3 com diferentes desafios (ex.: criar testes parametrizados, automatizar um fluxo crítico em Cypress, aplicar tabela de decisão ou escrever um mock de serviço externo). O aluno escolhe sua rota estratégica.',
    pedagogicalApplication:
      'Estimula a autonomia na tomada de decisão técnica sobre qual abordagem de teste oferece melhor custo-benefício para cada problema.',
    virtualResources: [
      {
        name: 'Vitest / Jest / JUnit',
        type: 'tool',
        description: 'Frameworks versáteis para implementar diferentes estilos de testes unitários e de integração.',
        url: 'https://vitest.dev',
      },
    ],
    testingFocus: ['Todos'],
  },
  {
    id: 'gt-sandbox-lab',
    driverId: 3,
    title: 'Sandbox de Teste Exploratório & Fuzzing Criativo',
    englishTitle: 'Blank Canvas / Sandbox',
    summary: 'Ambiente seguro com aplicações vulneráveis a falhas lógicas para experimentação livre de heurísticas.',
    description:
      'Os alunos recebem acesso a um ambiente isolado (API ou web app de laboratório) onde podem testar entradas extremas, simular concorrência, manipular estados e experimentar ferramentas de automação sem receio de quebrar o ambiente.',
    pedagogicalApplication:
      'Excelente para ensinar Teste Exploratório baseado em sessão (SBTM), heurísticas de teste e descoberta empírica de defeitos.',
    virtualResources: [
      {
        name: 'Postman / Insomnia',
        type: 'tool',
        description: 'Exploração interativa e criação de coleções de testes para APIs REST.',
        url: 'https://www.postman.com',
      },
      {
        name: 'Playwright Trace Viewer',
        type: 'tool',
        description: 'Inspeção visual passo a passo do comportamento da aplicação durante os testes.',
        url: 'https://playwright.dev',
      },
    ],
    testingFocus: ['Exploratório / Funcional', 'Integração / API', 'E2E / Sistema'],
  },
  {
    id: 'gt-instant-feedback-loops',
    driverId: 3,
    title: 'Ciclo Red-Green-Refactor (Dojo de Feedback Instantâneo)',
    englishTitle: 'Instant Feedback Loop',
    summary: 'Prática guiada de TDD em que o executor de testes fornece retorno visual imediato a cada linha alterada.',
    description:
      'Utilizando testes em modo watch ou plataformas interativas de kata, os alunos vivenciam o ritmo do Desenvolvimento Guiado por Testes: escrever um pequeno teste que falha (Red), fazê-lo passar rápido (Green) e melhorar o design (Refactor).',
    pedagogicalApplication:
      'Reduz a carga cognitiva da programação e cria reforço positivo imediato a cada teste que fica verde.',
    virtualResources: [
      {
        name: 'Cyber-Dojo',
        type: 'platform',
        description: 'Ambiente online gratuito focado na prática deliberada de TDD com semáforos Red/Amber/Green.',
        url: 'https://cyber-dojo.org',
      },
      {
        name: 'Jest / Vitest Watch Mode',
        type: 'tool',
        description: 'Execução contínua de testes no terminal ou IDE com feedback em milissegundos.',
        url: 'https://jestjs.io',
      },
    ],
    testingFocus: ['Unitário / TDD'],
  },

  // CD4: Ownership & Possession
  {
    id: 'gt-learning-portfolio',
    driverId: 4,
    title: 'Portfólio Vivo de Automação & Relatórios de QA',
    englishTitle: 'Build From Scratch / Portfolio',
    summary: 'O aluno constrói e mantém seu próprio repositório modelo de testes automatizados e planos de teste.',
    description:
      'Ao longo da disciplina, cada estudante estrutura um repositório autoral com exemplos práticos de testes unitários, mocks, testes de API, E2E e relatórios de bugs, servindo como vitrine técnica profissional.',
    pedagogicalApplication:
      'Gera senso de propriedade sobre a qualidade do código de teste e prepara o estudante para o mercado de engenharia de software.',
    virtualResources: [
      {
        name: 'GitHub Pages / Allure Report',
        type: 'tool',
        description: 'Publicação de relatórios visuais da suíte de testes do estudante.',
        url: 'https://allurereport.org',
      },
    ],
    testingFocus: ['Todos'],
  },
  {
    id: 'gt-avatar-evolution',
    driverId: 4,
    title: 'Evolução de Patente QA & Coleção de Insígnias de Bugs',
    englishTitle: 'Avatar Customization',
    summary: 'Progressão de perfil técnico com títulos e troféus desbloqueados pelos tipos de defeitos encontrados.',
    description:
      'O estudante coleciona insígnias temáticas conforme encontra diferentes classes de problemas (ex.: "Caçador de NullPointer", "Domador de Race Condition", "Mestre do Valor Limite", "Exterminador de Flaky Tests").',
    pedagogicalApplication:
      'Incentiva o aluno a diversificar suas técnicas de teste para completar sua coleção de especialidades em qualidade.',
    virtualResources: [
      {
        name: 'Badgr / GitHub Profile README',
        type: 'platform',
        description: 'Exibição de insígnias e conquistas desbloqueadas na disciplina.',
        url: 'https://badgr.com',
      },
    ],
    testingFocus: ['Todos'],
  },

  // CD5: Social Influence & Relatedness
  {
    id: 'gt-guilds-squads',
    driverId: 5,
    title: 'Esquadrões de Bug Bash & Sabotagem Cruzada',
    englishTitle: 'Guilds & Team Quests',
    summary: 'Equipes estruturadas que competem e cooperam em sessões de caça a defeitos e injeção de falhas.',
    description:
      'Na modalidade Bug Bash, esquadrões com papéis definidos auditam um sistema em conjunto. Na modalidade Sabotagem Cruzada (Fault Seeding), a Equipe A planta 5 bugs sutis no código e a Equipe B precisa descobri-los escrevendo testes automatizados.',
    pedagogicalApplication:
      'Altíssimo engajamento coletivo: para plantar um bom bug, o aluno precisa entender onde os testes costumam falhar; para achá-lo, precisa criar testes rigorosos.',
    virtualResources: [
      {
        name: 'GitHub Pull Requests',
        type: 'platform',
        description: 'Troca de branches entre esquadrões para rodadas de sabotagem e detecção.',
        url: 'https://github.com',
      },
      {
        name: 'Discord / Slack',
        type: 'platform',
        description: 'Canais de coordenação em tempo real para os esquadrões durante o Bug Bash.',
        url: 'https://discord.com',
      },
    ],
    testingFocus: ['Exploratório / Funcional', 'Unitário / TDD', 'Integração / API'],
  },
  {
    id: 'gt-peer-instruction',
    driverId: 5,
    title: 'Pair Testing & Code Review de Suítes de Teste',
    englishTitle: 'Mentorship / Peer Helper',
    summary: 'Duplas trabalhando juntas na exploração de bugs ou revisando a clareza e cobertura dos testes do colega.',
    description:
      'No Pair Testing, um aluno controla o teclado/ferramenta (Piloto) enquanto o outro observa, sugere cenários de borda e anota achados (Navegador), trocando de papel a cada 15 minutos. No Review Cruzado, colegas avaliam se os testes do par realmente falham quando o código quebra.',
    pedagogicalApplication:
      'Desenvolve argumentação técnica, escrita de testes legíveis (padrão Arrange-Act-Assert) e troca de repertório entre alunos.',
    virtualResources: [
      {
        name: 'VS Code Live Share',
        type: 'tool',
        description: 'Edição e execução colaborativa de testes em tempo real entre duplas.',
        url: 'https://visualstudio.microsoft.com/services/live-share/',
      },
    ],
    testingFocus: ['Todos'],
  },

  // CD6: Scarcity & Impatience
  {
    id: 'gt-countdown-challenge',
    driverId: 6,
    title: 'Timebox Bug Hunt & Desafio do Orçamento de Testes',
    englishTitle: 'Countdown Timer & Scarcity',
    summary: 'Sessões curtas e intensivas com limite estrito de tempo ou de quantidade máxima de casos de teste.',
    description:
      'O professor impõe uma restrição clara: "Vocês têm 15 minutos e podem escrever no máximo 6 casos de teste para encontrar o maior número de defeitos nesta função". Obriga o uso imediato de Particionamento de Equivalência e Valor Limite em vez de tentativa e erro aleatória.',
    pedagogicalApplication:
      'Demonstra na prática por que técnicas sistemáticas de projeto de casos de teste superam testes ad-hoc sob pressão de tempo.',
    virtualResources: [
      {
        name: 'Classroomscreen / Timer Online',
        type: 'tool',
        description: 'Cronômetro projetado no laboratório para marcar as rodadas de Timebox.',
        url: 'https://classroomscreen.com',
      },
    ],
    testingFocus: ['Unitário / TDD', 'Exploratório / Funcional'],
  },
  {
    id: 'gt-exclusive-perks',
    driverId: 6,
    title: 'Cartas de Dica de Oráculo & Privilégios de Pipeline',
    englishTitle: 'Appointment Dynamics & Rare Perks',
    summary: 'Recursos limitados que as equipes podem acionar estrategicamente durante desafios complexos de teste.',
    description:
      'Cada equipe recebe fichas raras no semestre, como "Inspeção de Código-Fonte por 3 Minutos" (transformando um teste caixa-preta em caixa-branca temporariamente), "Dica de Caso de Borda do Professor" ou "Execução Extra no Ambiente de Staging".',
    pedagogicalApplication:
      'Gera tomadas de decisão táticas em grupo e valoriza a análise cuidadosa antes de gastar um recurso escasso.',
    virtualResources: [
      {
        name: 'Deck.toys / Miro',
        type: 'platform',
        description: 'Distribuição e controle visual das cartas de vantagem de cada equipe.',
        url: 'https://miro.com',
      },
    ],
    testingFocus: ['Exploratório / Funcional', 'Integração / API'],
  },

  // CD7: Unpredictability & Curiosity
  {
    id: 'gt-mystery-box',
    driverId: 7,
    title: 'Caixa-Preta Misteriosa & Cartas de Caos (Chaos Cards)',
    englishTitle: 'Mystery Box / Easter Eggs',
    summary: 'Endpoints ou funções secretas cujo comportamento interno precisa ser desvendado via testes e surpresas de ambiente.',
    description:
      'O professor fornece uma função compilada ou API sem revelar a implementação, contendo comportamentos ocultos para entradas específicas. Durante a atividade, uma "Carta de Caos" pode ser sorteada alterando um requisito ou simulando queda de banco de dados.',
    pedagogicalApplication:
      'Treina a essência do Teste Funcional (Caixa-Preta), testes de resiliência e adaptação rápida a mudanças de especificação.',
    virtualResources: [
      {
        name: 'Wheel of Names',
        type: 'tool',
        description: 'Sorteio ao vivo de Cartas de Caos e condições adversas de teste.',
        url: 'https://wheelofnames.com',
      },
      {
        name: 'Swagger / OpenAPI',
        type: 'tool',
        description: 'Interface interativa para explorar e testar endpoints misteriosos.',
        url: 'https://swagger.io',
      },
    ],
    testingFocus: ['Exploratório / Funcional', 'Integração / API'],
  },
  {
    id: 'gt-escape-room',
    driverId: 7,
    title: 'Escape Room de Depuração e Rastreamento de Falhas',
    englishTitle: 'Escape Room & Clues',
    summary: 'Sequência de desafios técnicos em que corrigir um teste ou decifrar um stack trace libera a próxima etapa.',
    description:
      'As equipes recebem um sistema em pane com 4 cadeados lógicos. Para abrir cada cadeado, precisam analisar logs de falha, descobrir qual entrada causa o bug, escrever o teste que reproduz o defeito e obter a chave de acesso para o próximo nível.',
    pedagogicalApplication:
      'Transforma a leitura de stack traces, reprodução de defeitos e isolamento de causa raiz em uma investigação empolgante.',
    virtualResources: [
      {
        name: 'Google Forms / CTFd',
        type: 'platform',
        description: 'Validação de flags e chaves descobertas a cada bug reproduzido.',
        url: 'https://ctfd.io',
      },
    ],
    testingFocus: ['Unitário / TDD', 'Integração / API', 'Exploratório / Funcional'],
  },

  // CD8: Loss & Avoidance
  {
    id: 'gt-habit-streaks',
    driverId: 8,
    title: 'Green Build Streak (Sequência de Pipeline Verde)',
    englishTitle: 'Progress Streaks & Daily Habits',
    summary: 'Contador contínuo de entregas e semanas em que a suíte de testes passa 100% sem quebrar a build.',
    description:
      'A turma ou equipe mantém uma sequência ativa (streak) a cada commit/entrega semanal que inclui testes automatizados passando no CI e mantém a cobertura acima do limite mínimo combinado.',
    pedagogicalApplication:
      'Cria o hábito profissional de testar continuamente antes de integrar código, em vez de escrever testes apenas no fim do projeto.',
    virtualResources: [
      {
        name: 'GitHub Actions / GitLab CI',
        type: 'platform',
        description: 'Execução automática da suíte de testes a cada push com badges de status.',
        url: 'https://github.com/features/actions',
      },
    ],
    testingFocus: ['Unitário / TDD', 'Integração / API', 'E2E / Sistema'],
  },
  {
    id: 'gt-life-points',
    driverId: 8,
    title: 'Escudos de Produção & Defesa contra Regressão',
    englishTitle: 'Countdown / Life Preserver',
    summary: 'Cada equipe inicia o ciclo com escudos de estabilidade que protegem seu sistema contra bugs em produção.',
    description:
      'Durante o desenvolvimento iterativo do projeto, o professor (ou um script automatizado) executa testes de aceitação surpresa a cada release. Se uma funcionalidade antiga quebrar (regressão), a equipe perde um escudo, a menos que crie um teste de regressão imediato.',
    pedagogicalApplication:
      'Ensina de forma concreta o valor de manter uma suíte de testes de regressão confiável à medida que o software cresce.',
    virtualResources: [
      {
        name: 'Playwright / Cypress',
        type: 'tool',
        description: 'Suítes automatizadas de regressão E2E para proteger os fluxos críticos da equipe.',
        url: 'https://www.cypress.io',
      },
    ],
    testingFocus: ['E2E / Sistema', 'Integração / API'],
  },
];

export const EDUCATIONAL_OBJECTIVES: EducationalObjective[] = [
  {
    id: 'obj-colaboracao',
    name: 'Testes em Par (Pair Testing) e Revisão de Suítes',
    category: 'Colaborativo',
    description:
      'Estimular a colaboração entre desenvolvimento e QA, revisão cruzada de casos de teste e clareza nos relatórios de bug.',
    priorityDriverIds: [5, 1],
    rational:
      'A qualidade coletiva floresce quando os alunos testam e revisam em par (CD5) alinhados ao propósito de proteger o usuário (CD1).',
  },
  {
    id: 'obj-criatividade',
    name: 'Prática de TDD e Projeto de Casos de Teste',
    category: 'Técnico',
    description:
      'Desenvolver o hábito do ciclo Red-Green-Refactor, criação de testes unitários limpos e uso de dublês de teste (mocks/stubs).',
    priorityDriverIds: [3, 2, 4],
    rational:
      'O TDD se apoia no feedback instantâneo da execução (CD3), no progresso visível da suíte (CD2) e no zelo pelo próprio código (CD4).',
  },
  {
    id: 'obj-engajamento',
    name: 'Engajamento Prático em Laboratório e Bug Bash',
    category: 'Colaborativo',
    description:
      'Transformar aulas teóricas de qualidade em sessões dinâmicas de caça a bugs, dojos de teste e desafios coletivos.',
    priorityDriverIds: [7, 5, 1],
    rational:
      'O engajamento imediato nasce da curiosidade para achar defeitos ocultos (CD7) somada à sinergia das dinâmicas em equipe (CD5).',
  },
  {
    id: 'obj-rotina',
    name: 'Integração Contínua (CI) e Prevenção de Regressão',
    category: 'Processo',
    description:
      'Consolidar a disciplina de manter a pipeline verde, executar testes a cada alteração e evitar que bugs antigos voltem.',
    priorityDriverIds: [8, 2, 4],
    rational:
      'A cultura de testes contínuos se sustenta na proteção contra regressões e manutenção da streak (CD8) aliada à evolução da suíte (CD2).',
  },
  {
    id: 'obj-competicao',
    name: 'Cobertura de Código, Valor Limite e Teste de Mutação',
    category: 'Técnico',
    description:
      'Superar métricas superficiais, exercitando partições de equivalência, análise de valor limite e eliminação de mutantes.',
    priorityDriverIds: [2, 6, 5],
    rational:
      'A busca por asserções fortes e alto escore de mutação ativa o senso de maestria (CD2) e priorização eficiente de casos (CD6).',
  },
  {
    id: 'obj-autonomia',
    name: 'Automação de Testes de API e Ponta a Ponta (E2E)',
    category: 'Técnico',
    description:
      'Capacitar o estudante a escolher ferramentas, estruturar suítes automatizadas resilientes e evitar testes frágeis (flaky).',
    priorityDriverIds: [3, 4, 2],
    rational:
      'Construir uma arquitetura de automação própria exige liberdade de estratégia (CD3), senso de autoria da suíte (CD4) e conquista (CD2).',
  },
  {
    id: 'obj-empatia',
    name: 'Confiabilidade, Acessibilidade e Impacto no Usuário',
    category: 'Analítico',
    description:
      'Sensibilizar a turma para o impacto humano de falhas críticas, testes de acessibilidade e experiência real de uso.',
    priorityDriverIds: [1, 5],
    rational:
      'Compreender o impacto real dos defeitos na vida das pessoas desperta o chamado ético (CD1) e a empatia com o usuário e a equipe (CD5).',
  },
  {
    id: 'obj-pensamento-critico',
    name: 'Testes Exploratórios, Heurísticas e Análise de Causa Raiz',
    category: 'Analítico',
    description:
      'Formular hipóteses de falha além do caminho feliz, investigar logs/stack traces e definir oráculos de teste consistentes.',
    priorityDriverIds: [7, 3, 6],
    rational:
      'A investigação de defeitos complexos combina curiosidade detetivesca (CD7), experimentação livre (CD3) e foco sob timebox (CD6).',
  },
];

export function getRecommendationsForObjectives(selectedObjectiveIds: string[]) {
  const selectedObjs = EDUCATIONAL_OBJECTIVES.filter((obj) => selectedObjectiveIds.includes(obj.id));

  const driverScores: Record<number, { score: number; relatedObjectives: string[] }> = {};
  CORE_DRIVERS.forEach((d) => {
    driverScores[d.id] = { score: 0, relatedObjectives: [] };
  });

  selectedObjs.forEach((obj) => {
    obj.priorityDriverIds.forEach((driverId, index) => {
      const weight = index === 0 ? 3 : 2;
      driverScores[driverId].score += weight;
      if (!driverScores[driverId].relatedObjectives.includes(obj.name)) {
        driverScores[driverId].relatedObjectives.push(obj.name);
      }
    });
  });

  const rankedDrivers = CORE_DRIVERS.map((driver) => ({
    driver,
    score: driverScores[driver.id]?.score || 0,
    relatedObjectives: driverScores[driver.id]?.relatedObjectives || [],
  }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const topDriverIds = rankedDrivers.slice(0, 3).map((r) => r.driver.id);
  const recommendedTechniques = GAME_TECHNIQUES.filter((tech) => topDriverIds.includes(tech.driverId));

  return {
    rankedDrivers,
    recommendedTechniques,
  };
}
