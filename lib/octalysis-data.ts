import { CoreDriver, GameTechnique, EducationalObjective } from './types';

export const CORE_DRIVERS: CoreDriver[] = [
  {
    id: 1,
    slug: 'epic-meaning',
    name: 'Significado Épico e Chamado',
    englishName: 'Epic Meaning & Calling',
    shortDescription: 'O aluno sente que faz parte de uma missão nobre ou de algo maior que ele mesmo.',
    fullDescription: 'Este Core Driver é ativado quando o estudante acredita que está realizando um papel vital para o mundo, sua comunidade ou sua equipe. Não se trata apenas de "fazer uma lição de casa", mas de salvar um bioma, desvendar um enigma histórico ou construir um legado coletivo.',
    pedagogicalImpact: 'Aumenta exponencialmente a motivação intrínseca, dando propósito claro ao aprendizado e combatendo a clássica pergunta: "Professor, para que serve isso na vida?".',
    classroomExamples: [
      'Narrativa interdisciplinar onde a turma assume o papel de cientistas encarregados de deter uma crise ambiental fictícia.',
      'Projeto em que os alunos produzem audiolivros ou guias acessíveis para crianças da comunidade local.',
      'Criação de um "Museu Virtual da História da Cidade", valorizando a herança cultural regional.'
    ],
    color: '#3B82F6', // Blue
    hemisphere: 'right', // Intrinsic
    hat: 'white', // Positive
    keywords: ['Propósito', 'Narrativa', 'Missão Nobre', 'Herói', 'Impacto Real']
  },
  {
    id: 2,
    slug: 'development-accomplishment',
    name: 'Desenvolvimento e Conquista',
    englishName: 'Development & Accomplishment',
    shortDescription: 'O impulso interno de progredir, desenvolver habilidades e superar desafios difíceis.',
    fullDescription: 'Focado no senso de maestria e competência. Os alunos se sentem estimulados ao perceberem que seu esforço gera evolução tangível através de pontos de experiência, níveis, insígnias de mérito e superação de marcos desafiadores.',
    pedagogicalImpact: 'Estimula o "Mindset de Crescimento" de Carol Dweck, pois celebra o esforço contínuo e a evolução do aluno em vez de notas punitivas fixas.',
    classroomExamples: [
      'Trilha de Níveis de Aprendizagem (Novato -> Aprendiz -> Especialista -> Mestre da Matéria).',
      'Desafios de "Boss Fight" (Chefe de Fase) onde a turma usa todo o conteúdo aprendido para resolver um caso complexo.',
      'Quadro de Conquistas onde badges são desbloqueados por critérios específicos de dedicação e domínio.'
    ],
    color: '#10B981', // Emerald Green
    hemisphere: 'left', // Extrinsic
    hat: 'white', // Positive
    keywords: ['Maestria', 'Níveis', 'Badges', 'Pontos de XP', 'Superação']
  },
  {
    id: 3,
    slug: 'empowerment-creativity',
    name: 'Empoderamento da Criatividade e Feedback',
    englishName: 'Empowerment of Creativity & Feedback',
    shortDescription: 'Libera a imaginação dos alunos através de experimentação, criação e feedback imediato.',
    fullDescription: 'Considerado um dos motores mais poderosos da gamificação "Evergreen" (sustentável a longo prazo). Os alunos recebem ferramentas, componentes e liberdade para desenhar suas próprias soluções, testar hipóteses e ver os resultados instantaneamente sem medo de errar.',
    pedagogicalImpact: 'Promove autonomia, pensamento divergente e solução de problemas complexos. Transforma o aluno de receptor passivo em autor ativo.',
    classroomExamples: [
      'Atividades abertas onde os estudantes podem escolher o formato final da entrega (podcast, animação, maquete, jogo).',
      'Desafios de criação tipo Lego / Minecraft para construir modelos históricos ou moléculas químicas.',
      'Ciclos rápidos de prototipagem com feedback formativo entre colegas antes da versão final.'
    ],
    color: '#F59E0B', // Amber
    hemisphere: 'right', // Intrinsic
    hat: 'white', // Positive
    keywords: ['Autonomia', 'Criação', 'Experimentação', 'Feedback Imediato', 'Estratégia']
  },
  {
    id: 4,
    slug: 'ownership-possession',
    name: 'Propriedade e Posse',
    englishName: 'Ownership & Possession',
    shortDescription: 'Sensação de controle, personalização e orgulho sobre o que foi construído ou conquistado.',
    fullDescription: 'Quando os estudantes sentem que são donos de um projeto, avatar, portfólio ou espaço de aprendizagem, eles naturalmente se dedicam mais a aprimorá-lo, protegê-lo e compartilhá-lo com orgulho.',
    pedagogicalImpact: 'Desenvolve responsabilidade e compromisso com o próprio percurso pedagógico, incentivando a autoavaliação.',
    classroomExamples: [
      'Portfólio Digital Vivo (curado e customizado pelo próprio estudante ao longo do ano letivo).',
      'Criação e evolução do avatar do estudante com itens e títulos desbloqueados com dedicação.',
      'Gestão de uma "Base de Operações" ou cidade virtual que prospera conforme a turma completa tarefas.'
    ],
    color: '#8B5CF6', // Purple
    hemisphere: 'left', // Extrinsic
    hat: 'white', // Leans White Hat
    keywords: ['Personalização', 'Portfólio', 'Coleção', 'Avatar', 'Pertencimento']
  },
  {
    id: 5,
    slug: 'social-influence',
    name: 'Influência Social e Relacionamento',
    englishName: 'Social Influence & Relatedness',
    shortDescription: 'Conexões sociais, mentoria entre pares, cooperação e competição amigável.',
    fullDescription: 'Abrange todas as dinâmicas sociais humanas: aceitação, pertencimento a grupos, trabalho em equipe, tutoria entre pares e comparações saudáveis. Em sala de aula, transforma o isolamento em sinergia.',
    pedagogicalImpact: 'Desenvolve habilidades socioemocionais (BNCC), empatia, comunicação assertiva e capacidade de negociação coletiva.',
    classroomExamples: [
      'Guildas de Estudo multidisciplinares com papéis complementares (Pesquisador, Redator, Designer, Apresentador).',
      'Tutoria entre Pares (Peer Instruction): alunos mestres auxiliam colegas com dúvidas pontuais e ganham bônus de mentoria.',
      'Missões Coletivas onde toda a turma precisa atingir uma meta conjunta para obter uma recompensa pedagógica.'
    ],
    color: '#EC4899', // Pink
    hemisphere: 'right', // Intrinsic
    hat: 'white', // Can lean Black Hat if toxic, but White Hat when collaborative
    keywords: ['Colaboração', 'Guildas', 'Mentoria', 'Trabalho em Grupo', 'Pertencimento']
  },
  {
    id: 6,
    slug: 'scarcity-impatience',
    name: 'Escassez e Impaciência',
    englishName: 'Scarcity & Impatience',
    shortDescription: 'O desejo humano de querer algo exclusivo, difícil de obter ou com tempo limitado.',
    fullDescription: 'Utiliza janelas de oportunidade delimitadas, limites de recursos ou privilégios especiais que não estão disponíveis o tempo todo. Gera foco imediato e priorização de tarefas.',
    pedagogicalImpact: 'Estimula a agilidade mental, gestão de tempo e foco concentrado quando usado com moderação pedagógica.',
    classroomExamples: [
      'Janela de "Missão Relâmpago" de 15 minutos em sala para resolver um desafio bônus surpresa.',
      'Acesso antecipado a materiais exclusivos para quem conclui as etapas básicas no prazo estipulado.',
      'Vagas limitadas para representar a sala em um workshop especial ou júri simulado.'
    ],
    color: '#F97316', // Orange
    hemisphere: 'left', // Extrinsic
    hat: 'black', // Urgency
    keywords: ['Prazo', 'Exclusividade', 'Missão Relâmpago', 'Foco', 'Urgência']
  },
  {
    id: 7,
    slug: 'unpredictability-curiosity',
    name: 'Imprevisibilidade e Curiosidade',
    englishName: 'Unpredictability & Curiosity',
    shortDescription: 'O fascínio pelo desconhecido, surpresas agradáveis e investigação investigativa.',
    fullDescription: 'O cérebro humano é naturalmente atraído por padrões incompletos e mistérios. Quando o aluno não sabe exatamente o que vai acontecer a seguir, sua atenção atinge o nível máximo de alerta cognitivo.',
    pedagogicalImpact: 'Combate o tédio e a previsibilidade da aula tradicional, despertando o espírito investigativo e a curiosidade científica.',
    classroomExamples: [
      'Caixa Misteriosa ou "Mystery Box" pedagógica aberta apenas quando a turma atinge uma meta de aprendizado.',
      'Easter Eggs (segredos escondidos) nas apresentações e roteiros de estudo que dão pistas adicionais.',
      'Narrativa com reviravolta (Plot Twist) na história da aula que altera as regras de uma atividade.'
    ],
    color: '#06B6D4', // Cyan
    hemisphere: 'right', // Intrinsic
    hat: 'black', // Excitement / Suspense
    keywords: ['Mistério', 'Surpresa', 'Easter Egg', 'Investigação', 'Plot Twist']
  },
  {
    id: 8,
    slug: 'loss-avoidance',
    name: 'Perda e Evitação',
    englishName: 'Loss & Avoidance',
    shortDescription: 'A motivação para evitar perder algo valioso, manter sequências de conquistas e prevenir retrocessos.',
    fullDescription: 'As pessoas tendem a se esforçar mais para não perder algo que já possuem do que para ganhar algo novo. Em educação, deve ser trabalhado com foco positivo: preservar uma "sequência de hábitos" (streaks) ou defender um recurso coletivo conquistado.',
    pedagogicalImpact: 'Auxilia na consolidação de rotinas saudáveis, assiduidade e entregas regulares de tarefas de casa.',
    classroomExamples: [
      'Sequência de Dias Ativos (Streaks de Pontualidade) que desbloqueia vantagens coletivas na semana.',
      '"Escudo de Vida" onde cada grupo começa com 3 vidas e perde uma apenas se violar acordos de convivência.',
      'Prazo com amortecimento: a tarefa entregue no prazo garante 100% dos pontos da atividade.'
    ],
    color: '#EF4444', // Red
    hemisphere: 'left', // Extrinsic
    hat: 'black', // Risk avoidance
    keywords: ['Streaks', 'Sequência', 'Preservação', 'Rotina', 'Pontualidade']
  }
];

export const GAME_TECHNIQUES: GameTechnique[] = [
  // CD1: Epic Meaning & Calling
  {
    id: 'gt-narrative-quest',
    driverId: 1,
    title: 'Jornada Heroica & Narrativa Temática',
    englishTitle: 'Narrative Quest',
    summary: 'Transforma o currículo tradicional em uma história imersiva com começo, ápice e desfecho épico.',
    description: 'Em vez de módulos de aula isolados, o semestre é estruturado como episódios de uma narrativa onde os estudantes encarnam personagens chave (investigadores, astronautas, arqueólogos) com a missão de restaurar o equilíbrio ou resolver uma grande crise.',
    pedagogicalApplication: 'Excelente para engajamento no início do ano ou de novos conteúdos densos. Estimula a contextualização e empatia histórica/científica.',
    virtualResources: [
      { name: 'Genially', type: 'platform', description: 'Criação de apresentações interativas, mapas com pontos clicáveis e salas de escape.', url: 'https://genially.com' },
      { name: 'Twine', type: 'tool', description: 'Ferramenta aberta para criar narrativas interativas e histórias ramificadas.', url: 'https://twinery.org' }
    ],
    educationLevels: ['Todos']
  },
  {
    id: 'gt-higher-purpose',
    driverId: 1,
    title: 'Projeto de Impacto Real (Elitism / Chamado Nobre)',
    englishTitle: 'Higher Calling Project',
    summary: 'A atividade de aula resulta em um produto real que ajuda a escola ou a comunidade externa.',
    description: 'Os estudantes desenvolvem materiais, campanhas de conscientização, aplicativos ou hortas que solucionam dores reais. Eles percebem que seu esforço não é descartado após a nota.',
    pedagogicalApplication: 'Aprendizagem Baseada em Projetos (PBL) alinhada à cidadania e aos Objetivos de Desenvolvimento Sustentável (ODS da ONU).',
    virtualResources: [
      { name: 'Canva for Education', type: 'tool', description: 'Design colaborativo de materiais informativos e infográficos.', url: 'https://www.canva.com/education' },
      { name: 'Padlet', type: 'platform', description: 'Mural digital colaborativo para curadoria de ideias comunitárias.', url: 'https://padlet.com' }
    ],
    educationLevels: ['Fundamental', 'Médio', 'Superior']
  },
  {
    id: 'gt-humanitarian-oracle',
    driverId: 1,
    title: 'Oráculo da Sabedoria Compartilhada',
    englishTitle: 'Humanitarian Oracle',
    summary: 'Os estudantes geram uma base viva de conhecimentos para ajudar as próximas turmas.',
    description: 'Cada turma contribui com resumos, mapas mentais e soluções de exercícios difíceis, deixando um "legado" para os alunos que virão no ano seguinte.',
    pedagogicalApplication: 'Sentimento de pertencer a uma linhagem escolar e deixar sua marca positiva.',
    virtualResources: [
      { name: 'Notion', type: 'platform', description: 'Wiki colaborativa para documentar pesquisas e materiais de estudo.', url: 'https://notion.so' }
    ],
    educationLevels: ['Médio', 'Superior']
  },

  // CD2: Development & Accomplishment
  {
    id: 'gt-boss-fight',
    driverId: 2,
    title: 'Batalha contra o Chefe (Boss Fight)',
    englishTitle: 'Boss Fight Challenge',
    summary: 'Substitui a avaliação tradicional por um desafio cooperativo contra um grande obstáculo.',
    description: 'O professor apresenta um "monstro conceitual" ou caso clínico/jurídico de alta complexidade com uma barra de vida (HP coletivo). A cada questão respondida com argumentação correta por uma equipe, o chefe perde pontos de vida.',
    pedagogicalApplication: 'Reduz a ansiedade de testes formais, fomenta o estudo prévio colaborativo e celebra o domínio dos conteúdos mais desafiadores.',
    virtualResources: [
      { name: 'Classcraft / Kahoot', type: 'platform', description: 'Sistemas que permitem simular batalhas de chefes com perguntas e respostas.', url: 'https://kahoot.com' },
      { name: 'Mentimeter', type: 'tool', description: 'Quizzes interativos ao vivo com placar e feedback imediato.', url: 'https://mentimeter.com' }
    ],
    educationLevels: ['Todos']
  },
  {
    id: 'gt-skill-tree',
    driverId: 2,
    title: 'Árvore de Habilidades & Trilha de Maestria',
    englishTitle: 'Skill Tree / Progress Bar',
    summary: 'Visualização gráfica do avanço do aluno através de ramificações de competências.',
    description: 'Inspirado em jogos de RPG, o currículo é apresentado como uma árvore de habilidades. Ao dominar conceitos básicos, o aluno desbloqueia módulos avançados e ganha badges visuais.',
    pedagogicalApplication: 'Clareza cristalina sobre os pré-requisitos, autonomia para traçar rotas de estudo e visibilidade tangível do progresso.',
    virtualResources: [
      { name: 'Miro / FigJam', type: 'tool', description: 'Construção de fluxogramas e árvores de habilidades visuais e interativas.', url: 'https://miro.com' },
      { name: 'Badgr / Canvas Badges', type: 'platform', description: 'Emissão de microcredenciais digitais e insígnias verificáveis.', url: 'https://badgr.com' }
    ],
    educationLevels: ['Todos']
  },
  {
    id: 'gt-fixed-milestones',
    driverId: 2,
    title: 'Marcos de Conquista Graduais (Step Milestones)',
    englishTitle: 'Fixed Milestones',
    summary: 'Pequenas vitórias frequentes para manter a motivação ao longo de projetos longos.',
    description: 'Divide um trabalho acadêmico extenso (ex: TCC, feira de ciências) em 5 marcos com celebrações intermediárias e feedback rápido.',
    pedagogicalApplication: 'Evita a procrastinação e o desespero de entregas finais acumuladas.',
    virtualResources: [
      { name: 'Trello', type: 'tool', description: 'Gestão visual de tarefas em colunas Kanban.', url: 'https://trello.com' }
    ],
    educationLevels: ['Fundamental', 'Médio', 'Superior']
  },

  // CD3: Empowerment of Creativity & Feedback
  {
    id: 'gt-choice-board',
    driverId: 3,
    title: 'Menu de Escolhas / Choice Board',
    englishTitle: 'Choice Board & Strategy',
    summary: 'Dá ao estudante opções variadas de como aprender ou demonstrar seu aprendizado.',
    description: 'O professor disponibiliza um tabuleiro ou matriz 3x3 de atividades com pesos diferentes. O aluno escolhe 3 tarefas em linha para somar sua pontuação semanal, exercitando estratégia pessoal.',
    pedagogicalApplication: 'Atende aos princípios do Desenho Universal para a Aprendizagem (DUA) respeitando múltiplos estilos de inteligência.',
    virtualResources: [
      { name: 'Google Workspace for Education', type: 'platform', description: 'Documentos compartilhados com tabelas dinâmicas e hiperlinks.', url: 'https://workspace.google.com' }
    ],
    educationLevels: ['Todos']
  },
  {
    id: 'gt-sandbox-lab',
    driverId: 3,
    title: 'Laboratório Aberto (Sandbox & Experimentação)',
    englishTitle: 'Blank Canvas / Sandbox',
    summary: 'Ambiente seguro para experimentação livre com tentativa e erro sem punição.',
    description: 'Permite que os alunos combinem variáveis, cometam erros e descubram princípios científicos ou artísticos por dedução própria.',
    pedagogicalApplication: 'Estimula a curiosidade investigativa e o método científico sem a pressão da nota imediata.',
    virtualResources: [
      { name: 'PhET Simulações Interativas', type: 'tool', description: 'Simulações gratuitas de física, química, biologia e matemática.', url: 'https://phet.colorado.edu' },
      { name: 'Tinkercad', type: 'tool', description: 'Modelagem 3D e simulação de circuitos de eletrônica fácil de usar.', url: 'https://tinkercad.com' }
    ],
    educationLevels: ['Fundamental', 'Médio']
  },
  {
    id: 'gt-instant-feedback-loops',
    driverId: 3,
    title: 'Ciclos de Feedback Instantâneo',
    englishTitle: 'Instant Feedback Loop',
    summary: 'Mecanismos em que o estudante descobre na hora se está no caminho certo e pode recalcular a rota.',
    description: 'Formulários ramificados, quizzes gamificados ou avaliações formativas automáticas que explicam o erro imediatamente após a resposta.',
    pedagogicalApplication: 'Metacognição: o aluno corrige suas falhas no exato momento em que o raciocínio está quente.',
    virtualResources: [
      { name: 'Quizizz', type: 'platform', description: 'Quizzes com feedbacks detalhados e memes motivacionais ao vivo.', url: 'https://quizizz.com' },
      { name: 'GeoGebra', type: 'tool', description: 'Geometria dinâmica e álgebra com resposta visual em tempo real.', url: 'https://geogebra.org' }
    ],
    educationLevels: ['Todos']
  },

  // CD4: Ownership & Possession
  {
    id: 'gt-learning-portfolio',
    driverId: 4,
    title: 'Portfólio Vivo & Espaço do Aluno',
    englishTitle: 'Build From Scratch / Portfolio',
    summary: 'O aluno constrói e personaliza sua própria galeria de trabalhos ao longo do tempo.',
    description: 'O estudante decide como organizar suas melhores criações, reflete sobre seus avanços e decora seu espaço de aprendizagem com sua identidade visual.',
    pedagogicalApplication: 'Orgulho pelo trabalho realizado e desenvolvimento de pensamento crítico sobre sua própria trajetória.',
    virtualResources: [
      { name: 'Google Sites', type: 'tool', description: 'Criação de páginas web personalizadas para portfólios escolares.', url: 'https://sites.google.com' },
      { name: 'Wakelet', type: 'platform', description: 'Curadoria visual de links, artigos e vídeos.', url: 'https://wakelet.com' }
    ],
    educationLevels: ['Todos']
  },
  {
    id: 'gt-avatar-evolution',
    driverId: 4,
    title: 'Criação e Evolução de Avatar Pedagógico',
    englishTitle: 'Avatar Customization',
    summary: 'Customização visual do perfil do aluno que evolui conforme seus estudos avançam.',
    description: 'Conforme completam desafios e demonstram cooperação, os estudantes ganham pontos que podem ser trocados por títulos honoríficos e melhorias cosméticas no avatar.',
    pedagogicalApplication: 'Apego saudável ao perfil de estudante e senso de evolução individual.',
    virtualResources: [
      { name: 'Ready Player Me / Bitmoji', type: 'tool', description: 'Criação de avatares estilizados para uso em sala de aula.', url: 'https://bitmoji.com' }
    ],
    educationLevels: ['Fundamental', 'Médio']
  },

  // CD5: Social Influence & Relatedness
  {
    id: 'gt-guilds-squads',
    driverId: 5,
    title: 'Guildas & Esquadrões com Papéis Específicos',
    englishTitle: 'Guilds & Team Quests',
    summary: 'Equipes fixas onde cada membro tem uma função indispensável para o sucesso comum.',
    description: 'Em vez de grupos soltos onde um faz tudo e os outros assistem, cada aluno possui um crachá de função (ex: Pesquisador, Cronometrista, Comunicador, Questionador crítico).',
    pedagogicalApplication: 'Ensina responsabilidade compartilhada, liderança rotativa e cooperação genuína.',
    virtualResources: [
      { name: 'Discord / Slack Educacional', type: 'platform', description: 'Canais por equipe para comunicação e troca de materiais.', url: 'https://discord.com' }
    ],
    educationLevels: ['Todos']
  },
  {
    id: 'gt-peer-instruction',
    driverId: 5,
    title: 'Tutoria entre Pares (Peer Mentorship)',
    englishTitle: 'Mentorship / Peer Helper',
    summary: 'Alunos que dominaram um tópico recebem a missão de ajudar colegas com dificuldades pontuais.',
    description: 'Quem ensina aprende duas vezes. O tutor ganha pontos de "Mestre Generoso" e desenvolve paciência e didática.',
    pedagogicalApplication: 'Aprendizagem entre pares (Eric Mazur - Peer Instruction), fortalecendo laços e acolhimento.',
    virtualResources: [
      { name: 'Jamboard / Whiteboard.fi', type: 'tool', description: 'Lousa interativa compartilhada entre duplas de alunos.', url: 'https://whiteboard.fi' }
    ],
    educationLevels: ['Todos']
  },

  // CD6: Scarcity & Impatience
  {
    id: 'gt-countdown-challenge',
    driverId: 6,
    title: 'Missão de Contagem Regressiva (Speed Run)',
    englishTitle: 'Countdown Timer & Scarcity',
    summary: 'Janela curta e intensiva de tempo para resolver um enigma sob pressão moderada.',
    description: 'Um cronômetro em tela grande cria um pulso de adrenalina e foco absoluto em sala. Atividades de 10 a 15 minutos que quebram a sonolência.',
    pedagogicalApplication: 'Estimula raciocínio rápido, desinibição e foco em prioridades.',
    virtualResources: [
      { name: 'Classroomscreen', type: 'tool', description: 'Temporizadores, sorteadores e sinalizadores visuais para projetar na sala.', url: 'https://classroomscreen.com' }
    ],
    educationLevels: ['Fundamental', 'Médio']
  },
  {
    id: 'gt-exclusive-perks',
    driverId: 6,
    title: 'Privilégios Temporários & Itens Raros',
    englishTitle: 'Appointment Dynamics & Rare Perks',
    summary: 'Vantagens pedagógicas concedidas apenas em ocasiões especiais.',
    description: 'Cartas especiais como "Passe de Consulta ao Caderno de 2 Minutos", "Escolher a música de fundo da aula prática" ou "Dica Secreta do Professor".',
    pedagogicalApplication: 'Valorização de pequenas recompensas que não custam dinheiro mas geram entusiasmo.',
    virtualResources: [
      { name: 'Deck.toys', type: 'platform', description: 'Criação de caminhos com cartas mágicas e chaves de acesso.', url: 'https://deck.toys' }
    ],
    educationLevels: ['Todos']
  },

  // CD7: Unpredictability & Curiosity
  {
    id: 'gt-mystery-box',
    driverId: 7,
    title: 'Caixa Misteriosa & Cartas Surpresa',
    englishTitle: 'Mystery Box / Easter Eggs',
    summary: 'Elementos desconhecidos que introduzem suspense e curiosidade na rotina escolar.',
    description: 'Uma caixa física ou virtual que guarda o desafio do dia ou uma regra surpresa revelada apenas após o toque da campainha.',
    pedagogicalApplication: 'Gera expectativa imediata e atenção dos estudantes desde o primeiro minuto de aula.',
    virtualResources: [
      { name: 'Wheel of Names / Roleta de Nomes', type: 'tool', description: 'Roleta personalizável para sorteios e desafios imprevisíveis.', url: 'https://wheelofnames.com' }
    ],
    educationLevels: ['Todos']
  },
  {
    id: 'gt-escape-room',
    driverId: 7,
    title: 'Escape Room Pedagógico (Sala de Fuga)',
    englishTitle: 'Escape Room & Clues',
    summary: 'Sequência de enigmas encadeados onde cada resposta certa revela uma pista secreta.',
    description: 'Os alunos precisam cooperar para desbloquear cadeados virtuais no Google Forms ou Genially para concluir a missão.',
    pedagogicalApplication: 'Raciocínio lógico, leitura atenta de enunciados e persistência investigativa.',
    virtualResources: [
      { name: 'Google Forms (com validação de resposta)', type: 'tool', description: 'Criação de cadeados com senhas numéricas e de texto.', url: 'https://forms.google.com' }
    ],
    educationLevels: ['Todos']
  },

  // CD8: Loss & Avoidance
  {
    id: 'gt-habit-streaks',
    driverId: 8,
    title: 'Sequência de Fogo (Streaks de Presença e Tarefas)',
    englishTitle: 'Progress Streaks & Daily Habits',
    summary: 'Contador de dias ou semanas consecutivas em que a turma mantém o hábito positivo.',
    description: 'Inspirado no Duolingo, a turma cultiva um "fogo" coletivo: cada aula em que todos trazem o material ou participam ativamente mantém a chama acesa.',
    pedagogicalApplication: 'Criação de hábitos regulares de estudo sem necessidade de punição direta.',
    virtualResources: [
      { name: 'Habitica', type: 'platform', description: 'RPG de produtividade e consolidação de hábitos para turmas.', url: 'https://habitica.com' }
    ],
    educationLevels: ['Todos']
  },
  {
    id: 'gt-life-points',
    driverId: 8,
    title: 'Vidas da Equipe (Shield / Life Bar)',
    englishTitle: 'Countdown / Life Preserver',
    summary: 'Cada equipe começa o período com 3 escudos de vida e os protege através do bom convívio.',
    description: 'Evita a postura punitiva individual do professor. Se um aluno esquecer a regra de convivência, a equipe pode consumir um escudo e propor uma ação restaurativa.',
    pedagogicalApplication: 'Autorregulação de comportamento em grupo e justiça restaurativa em sala.',
    virtualResources: [
      { name: 'ClassDojo', type: 'platform', description: 'Gestão visual de feedback de atitudes e comportamento positivo.', url: 'https://classdojo.com' }
    ],
    educationLevels: ['Fundamental']
  }
];

export const EDUCATIONAL_OBJECTIVES: EducationalObjective[] = [
  {
    id: 'obj-colaboracao',
    name: 'Colaboração e Trabalho em Equipe',
    category: 'Social',
    description: 'Estimular a interação construtiva entre os alunos, divisão de papéis e senso de comunidade.',
    priorityDriverIds: [5, 1], // CD5: Influência Social, CD1: Significado Épico
    rational: 'A colaboração floresce quando os alunos se apoiam mutuamente (CD5) em prol de uma missão nobre e coletiva (CD1).'
  },
  {
    id: 'obj-criatividade',
    name: 'Criatividade e Resolução Aberta de Problemas',
    category: 'Cognitivo',
    description: 'Incentivar soluções originais, pensamento divergente, prototipagem e autonomia artística/científica.',
    priorityDriverIds: [3, 4], // CD3: Criatividade & Feedback, CD4: Propriedade & Posse
    rational: 'A criatividade exige autonomia e experimentação sem medo (CD3), resultando em criações das quais o aluno se apropria com orgulho (CD4).'
  },
  {
    id: 'obj-engajamento',
    name: 'Engajamento e Participação Ativa em Aula',
    category: 'Comportamental',
    description: 'Aumentar a atenção em sala de aula, tirar os alunos da apatia e estimular a manifestação oral.',
    priorityDriverIds: [7, 2, 1], // CD7: Curiosidade, CD2: Conquista, CD1: Significado
    rational: 'O engajamento imediato é disparado pela curiosidade e surpresa (CD7), ancorado na sensação de progresso visível (CD2).'
  },
  {
    id: 'obj-rotina',
    name: 'Rotina, Pontualidade e Hábitos de Estudo',
    category: 'Comportamental',
    description: 'Consolidar disciplina diária, entrega no prazo, estudo contínuo e responsabilidade pessoal.',
    priorityDriverIds: [8, 2, 4], // CD8: Perda/Streaks, CD2: Conquista, CD4: Propriedade
    rational: 'Hábitos se consolidam quando preservamos sequências de sucesso (CD8) e acompanhamos nossa evolução em direção à maestria (CD2).'
  },
  {
    id: 'obj-competicao',
    name: 'Competição Saudável e Domínio de Conteúdo',
    category: 'Cognitivo',
    description: 'Incentivar o estudo aprofundado através de desafios dinâmicos, gincanas e desafios com foco em superação.',
    priorityDriverIds: [2, 5, 6], // CD2: Conquista, CD5: Comparação social, CD6: Escassez
    rational: 'A competição saudável funciona como termômetro de maestria (CD2) e ritmo acelerado (CD6), mantendo o espírito desportivo (CD5).'
  },
  {
    id: 'obj-autonomia',
    name: 'Autonomia e Protagonismo Estudantil',
    category: 'Emocional',
    description: 'Dar poder de decisão para que o aluno seja o arquiteto do seu próprio percurso de aprendizagem.',
    priorityDriverIds: [3, 4, 1], // CD3: Escolha, CD4: Propriedade, CD1: Propósito
    rational: 'O protagonismo depende de liberdade de escolha de rotas (CD3) e personalização profunda do projeto individual (CD4).'
  },
  {
    id: 'obj-empatia',
    name: 'Empatia, Respeito e Cidadania',
    category: 'Social',
    description: 'Desenvolver escuta ativa, valorização da diversidade, combate ao bullying e causas sociais.',
    priorityDriverIds: [1, 5], // CD1: Significado Épico, CD5: Relacionamento Social
    rational: 'Projetos com significado comunitário real (CD1) fortalecem a empatia e o cuidado com o outro (CD5).'
  },
  {
    id: 'obj-pensamento-critico',
    name: 'Pensamento Crítico e Análise Investigativa',
    category: 'Cognitivo',
    description: 'Capacidade de questionar fontes, deduzir hipóteses, debater evidências e solucionar enigmas complexos.',
    priorityDriverIds: [7, 3, 2], // CD7: Curiosidade/Mistério, CD3: Feedback, CD2: Maestria
    rational: 'Investigar o desconhecido (CD7) com ferramentas analíticas abertas (CD3) constrói rigor intelectual e maestria (CD2).'
  }
];

// Helper to recommend Core Drivers and Game Techniques based on selected objective IDs
export function getRecommendationsForObjectives(selectedObjectiveIds: string[]) {
  const selectedObjs = EDUCATIONAL_OBJECTIVES.filter(obj => selectedObjectiveIds.includes(obj.id));
  
  // Count frequency and weight of core drivers
  const driverScores: Record<number, { score: number; relatedObjectives: string[] }> = {};
  CORE_DRIVERS.forEach(d => {
    driverScores[d.id] = { score: 0, relatedObjectives: [] };
  });

  selectedObjs.forEach(obj => {
    obj.priorityDriverIds.forEach((driverId, index) => {
      const weight = index === 0 ? 3 : 2; // Primary gets 3 pts, secondary gets 2
      driverScores[driverId].score += weight;
      if (!driverScores[driverId].relatedObjectives.includes(obj.name)) {
        driverScores[driverId].relatedObjectives.push(obj.name);
      }
    });
  });

  // Sort drivers by score
  const rankedDrivers = CORE_DRIVERS.map(driver => ({
    driver,
    score: driverScores[driver.id]?.score || 0,
    relatedObjectives: driverScores[driver.id]?.relatedObjectives || []
  }))
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score);

  // Recommended techniques for top drivers
  const topDriverIds = rankedDrivers.slice(0, 3).map(r => r.driver.id);
  const recommendedTechniques = GAME_TECHNIQUES.filter(tech => topDriverIds.includes(tech.driverId));

  return {
    rankedDrivers,
    recommendedTechniques
  };
}
