import { ActivityFilter, matchesActivityFilter } from './activity-filter';
import { Activity } from './types';

const TECHNIQUE_ACTIVITIES: Record<string, Activity[]> = {
  'gt-narrative-quest': [
    {
      title: 'A Missão Perdida',
      description: 'Os alunos recebem um "dossiê secreto" com o contexto narrativo do semestre. Em grupos, devem ler, interpretar e apresentar oralmente o papel de cada personagem da história para a turma.',
      difficulty: 'Fácil',
      estimatedTime: '30 minutos',
      length: 'rapida'
    },
    {
      title: 'Capítulo Vivo',
      description: 'Cada unidade do curso é um capítulo de uma história. Ao final da unidade, os alunos escrevem coletivamente o próximo capítulo com base no conteúdo aprendido, integrando os conceitos à narrativa.',
      difficulty: 'Médio',
      estimatedTime: '1h',
      length: 'aula'
    },
    {
      title: 'Jornada do Herói Acadêmico',
      description: 'O professor mapeia o conteúdo semestral usando a estrutura da Jornada do Herói (chamado, obstáculo, transformação). Os alunos criam um portfólio reflexivo acompanhando cada etapa como se fossem o protagonista.',
      difficulty: 'Difícil',
      estimatedTime: 'Ao longo do semestre',
      length: 'continua'
    },
  ],
  'gt-higher-purpose': [
    {
      title: 'Projeto Impacto Real',
      description: 'Grupos desenvolvem uma solução prática para um problema da comunidade local usando os conceitos da disciplina. O projeto é apresentado para representantes da comunidade no final do semestre.',
      difficulty: 'Difícil',
      estimatedTime: '4 semanas',
      length: 'continua'
    },
  ],
  'gt-humanitarian-oracle': [
    {
      title: 'Guia para Iniciantes',
      description: 'Alunos veteranos criam um guia ilustrado de conceitos básicos da disciplina para alunos que ainda vão cursar. O material é revisado pelo professor e disponibilizado na biblioteca da escola.',
      difficulty: 'Médio',
      estimatedTime: '2h',
      length: 'aula'
    },
  ],
  'gt-boss-fight': [
    {
      title: 'Missão Épica do Módulo',
      description: 'Uma missão de longa duração (2-3 semanas) com múltiplas etapas e checkpoints. Cada checkpoint desbloqueado revela a próxima parte da missão, mantendo o suspense.',
      difficulty: 'Difícil',
      estimatedTime: '3 semanas',
      length: 'continua'
    },
    {
      title: 'Desafio de Pontuação Máxima',
      description: 'Um módulo especial onde o aluno pode completar atividades opcionais de complexidade crescente para maximizar seus pontos. Cada nível de atividade exige a conclusão do anterior.',
      difficulty: 'Difícil',
      estimatedTime: '2 semanas',
      length: 'continua'
    },
  ],
  'gt-skill-tree': [
    {
      title: 'Árvore de Habilidades',
      description: 'O professor cria uma árvore de habilidades visual com nós desbloqueáveis. Ao completar atividades base, o aluno ganha acesso a atividades mais avançadas e criativas em ramos específicos.',
      difficulty: 'Médio',
      estimatedTime: 'Ao longo do semestre',
      length: 'continua'
    },
    {
      title: 'Meu Mapa de Progresso',
      description: 'Cada aluno recebe uma folha ou acesso a uma planilha com um mapa visual do semestre. Conforme completa atividades, colore ou marca as etapas, criando satisfação visual de conclusão.',
      difficulty: 'Fácil',
      estimatedTime: '5 minutos/semana',
      length: 'continua'
    },
    {
      title: 'Termômetro da Turma',
      description: 'Um termômetro coletivo exibido em sala mostra o progresso médio da turma no módulo atual. Quando chega a 100%, o professor revela uma surpresa ou bônus coletivo.',
      difficulty: 'Fácil',
      estimatedTime: 'Atualização semanal',
      length: 'continua'
    },
    {
      title: 'Mural de Conquistas',
      description: 'Crie um mural físico ou digital com as badges disponíveis no semestre. Cada aluno tem um espaço próprio onde as conquistas são afixadas/exibidas conforme são desbloqueadas.',
      difficulty: 'Fácil',
      estimatedTime: '20 minutos para configurar',
      length: 'rapida'
    },
  ],
  'gt-fixed-milestones': [
    {
      title: 'Quadro de Missões da Semana',
      description: 'O professor apresenta toda segunda-feira 3 missões principais e 2 missões bônus. As missões são apresentadas com nome, objetivo de aprendizado, recompensa e prazo de forma visual.',
      difficulty: 'Fácil',
      estimatedTime: '15 minutos de apresentação',
      length: 'rapida'
    },
    {
      title: 'Recompensa de Marco',
      description: 'A cada 25% do semestre concluído, uma recompensa diferente é revelada e entregue a quem alcançou o marco: 25% → badge, 50% → power-up, 75% → vantagem especial, 100% → prêmio final.',
      difficulty: 'Médio',
      estimatedTime: '4 momentos ao longo do semestre',
      length: 'continua'
    },
    {
      title: 'Caça às Medalhas',
      description: 'O professor revela apenas algumas das badges existentes. Os alunos tentam descobrir todas as conquistas secretas ao longo do semestre, criando curiosidade e exploração ativa.',
      difficulty: 'Médio',
      estimatedTime: 'Ao longo do semestre',
      length: 'continua'
    },
  ],
  'gt-choice-board': [
    {
      title: 'Apresentação no Meu Formato',
      description: 'Em vez de um formato fixo, o aluno escolhe como vai apresentar o conteúdo aprendido: vídeo, podcast, infográfico, mapa mental, cartaz, story de redes sociais ou apresentação tradicional.',
      difficulty: 'Médio',
      estimatedTime: '1 semana para produção',
      length: 'continua'
    },
    {
      title: 'Power-up da Semana',
      description: 'O professor disponibiliza semanalmente um "power-up" diferente: semana do feedback turbo (feedback mais detalhado), semana do tempo extra, semana do reenvio. Os alunos escolhem quando ativar.',
      difficulty: 'Fácil',
      estimatedTime: '5 minutos para ativar',
      length: 'rapida'
    },
  ],
  'gt-sandbox-lab': [
    {
      title: 'Hackathon de Ideias',
      description: 'Em 90 minutos, equipes usam ferramentas criativas disponíveis (post-its, lousa, aplicativos) para propor soluções para um problema real do contexto da disciplina. Apresentações ao final.',
      difficulty: 'Médio',
      estimatedTime: '1h30',
      length: 'aula'
    },
    {
      title: 'Laboratório de Decisões',
      description: 'Usando um simulador (ou roleplay estruturado), os alunos tomam decisões em tempo real e observam imediatamente as consequências no sistema. Cada decisão leva a um novo cenário ramificado.',
      difficulty: 'Médio',
      estimatedTime: '1h',
      length: 'aula'
    },
  ],
  'gt-instant-feedback-loops': [
    {
      title: 'Dashboard do Aluno',
      description: 'Cada aluno tem acesso a uma planilha ou ferramenta que mostra em tempo real: pontos acumulados, badges conquistados, posição no ranking e atividades pendentes.',
      difficulty: 'Fácil',
      estimatedTime: 'Configuração: 30 minutos',
      length: 'rapida'
    },
    {
      title: 'Primeiro Passo Épico',
      description: 'Um quiz de boas-vindas desenhado para ter alta taxa de acerto, mas com perguntas inteligentes sobre o contexto do curso. Todos que completam ganham o badge "Iniciado" e pontos de bônus.',
      difficulty: 'Fácil',
      estimatedTime: '20 minutos',
      length: 'rapida'
    },
  ],
  'gt-learning-portfolio': [
    {
      title: 'Projeto Próprio',
      description: 'O aluno propõe seu próprio projeto no início do semestre, alinhado aos objetivos da disciplina. O professor aprova e acompanha o desenvolvimento. O projeto é o fio condutor de toda a aprendizagem.',
      difficulty: 'Difícil',
      estimatedTime: 'Semestre inteiro',
      length: 'continua'
    },
    {
      title: 'Meu Glossário Vivo',
      description: 'Cada aluno constrói e mantém seu próprio glossário dos termos da disciplina, com definições nas próprias palavras, exemplos pessoais e conexões com conhecimentos anteriores.',
      difficulty: 'Fácil',
      estimatedTime: '10 minutos/semana',
      length: 'continua'
    },
    {
      title: 'Portfólio Progressivo',
      description: 'Cada atividade do semestre é uma peça do portfólio final. O portfólio só é avaliado por completo, peças perdidas reduzem significativamente a nota final, incentivando constância.',
      difficulty: 'Médio',
      estimatedTime: 'Semestre inteiro',
      length: 'continua'
    },
    {
      title: 'Álbum de Competências',
      description: 'O professor cria um "álbum" com todas as competências da disciplina. Os alunos "colam" cada competência ao demonstrá-la em atividades. Quem completar o álbum recebe distinção especial.',
      difficulty: 'Médio',
      estimatedTime: 'Semestre inteiro',
      length: 'continua'
    },
  ],
  'gt-avatar-evolution': [
    {
      title: 'Carta de Apresentação do Herói',
      description: 'No início do semestre, cada aluno cria sua "carta de herói": nome de personagem, três habilidades que traz para a turma, um objetivo pessoal para o semestre e uma imagem/símbolo representativo.',
      difficulty: 'Fácil',
      estimatedTime: '30 minutos',
      length: 'rapida'
    },
    {
      title: 'Evolução do Avatar',
      description: 'O avatar do aluno muda visualmente a cada nível de progresso: começa como "Aprendiz", evolui para "Explorador", "Especialista" e finalmente "Mestre". Cada nível tem requisitos claros.',
      difficulty: 'Médio',
      estimatedTime: 'Progressivo',
      length: 'continua'
    },
    {
      title: 'Economia da Sala de Aula',
      description: 'O professor cria uma moeda fictícia da turma. Os alunos ganham moedas por atividades e podem gastá-las em um "cardápio de benefícios" negociado coletivamente no início do semestre.',
      difficulty: 'Médio',
      estimatedTime: 'Configuração: 1h',
      length: 'aula'
    },
  ],
  'gt-guilds-squads': [
    {
      title: 'Quebra-Cabeça de Especialistas',
      description: 'Cada membro do grupo estuda uma parte diferente do conteúdo e se torna "especialista" naquela parte. O grupo só consegue completar a atividade quando todos compartilham e integram seus conhecimentos.',
      difficulty: 'Médio',
      estimatedTime: '1h30',
      length: 'aula'
    },
    {
      title: 'Operação em Equipe',
      description: 'Uma missão com etapas sequenciais onde cada membro é responsável por uma etapa específica. Se algum falhar, todos ficam bloqueados. Cria senso de responsabilidade coletiva.',
      difficulty: 'Médio',
      estimatedTime: '2h',
      length: 'aula'
    },
    {
      title: 'Hackathon por Equipes',
      description: 'Equipes competem para resolver o mesmo problema prático usando os conceitos da disciplina. Apresentam suas soluções e a turma vota na mais criativa, viável e bem fundamentada.',
      difficulty: 'Difícil',
      estimatedTime: '1 dia',
      length: 'continua'
    },
    {
      title: 'Torneio de Conhecimento',
      description: 'Quiz em formato de torneio onde equipes de 4-5 alunos competem em rodadas eliminatórias. As perguntas cobrem o conteúdo do módulo e aumentam em dificuldade a cada rodada.',
      difficulty: 'Fácil',
      estimatedTime: '1h',
      length: 'aula'
    },
  ],
  'gt-peer-instruction': [
    {
      title: 'Programa Padrinho',
      description: 'Alunos com melhor desempenho na primeira avaliação são convidados a ser "padrinhos" de alunos com maior dificuldade. Realizam ao menos 2 sessões de revisão e ambos ganham pontos ao final.',
      difficulty: 'Médio',
      estimatedTime: '2 sessões de 30 minutos',
      length: 'continua'
    },
    {
      title: 'Revisão Cruzada',
      description: 'Antes da entrega final, cada aluno revisa o trabalho de um colega usando um checklist estruturado pelo professor. O autor incorpora o feedback recebido e ambos ganham pontos pela participação.',
      difficulty: 'Fácil',
      estimatedTime: '45 minutos',
      length: 'aula'
    },
    {
      title: 'Tutoria em Par',
      description: 'Alunos com melhor desempenho são pareados com colegas com dificuldade para sessões semanais de 20 minutos de revisão. O tutor recebe pontos de reconhecimento por cada sessão realizada.',
      difficulty: 'Fácil',
      estimatedTime: '20 minutos/semana',
      length: 'continua'
    },
    {
      title: 'Moedas de Gratidão',
      description: 'Cada aluno recebe 3 "moedas de gratidão" por semana para dar a colegas que os ajudaram. As moedas são trocadas por pontos ao final da semana. Cria cultura de reconhecimento mútuo.',
      difficulty: 'Fácil',
      estimatedTime: '5 minutos/semana',
      length: 'continua'
    },
  ],
  'gt-countdown-challenge': [
    {
      title: 'Atividade Relâmpago',
      description: 'Uma atividade curta é disponibilizada por apenas 48h, com prazo e horário exatos de encerramento claramente comunicados. Quem completa no prazo ganha pontos bônus adicionais.',
      difficulty: 'Fácil',
      estimatedTime: '20 minutos',
      length: 'rapida'
    },
    {
      title: 'Desafio da Última Hora',
      description: 'Uma missão especial é liberada às 18h de quinta-feira e expira às 23h59, dando apenas algumas horas para completar. É mais curta que o normal mas com recompensa proporcional.',
      difficulty: 'Médio',
      estimatedTime: '30-45 minutos',
      length: 'aula'
    },
  ],
  'gt-exclusive-perks': [
    {
      title: 'Fila VIP do Feedback',
      description: 'O professor oferece 5 vagas por semana para feedback detalhado e personalizado (além do padrão). As vagas são preenchidas por ordem de inscrição. Cria motivação para agir rápido.',
      difficulty: 'Fácil',
      estimatedTime: 'Gestão contínua',
      length: 'continua'
    },
    {
      title: 'Grupo de Elite',
      description: 'Um grupo de estudo avançado com vagas limitadas (10 alunos) que se reúne quinzenalmente com o professor para aprofundamento. As vagas são disputadas por desempenho.',
      difficulty: 'Médio',
      estimatedTime: '1h quinzenal',
      length: 'continua'
    },
    {
      title: 'Leilão de Conhecimento',
      description: 'Ao final do módulo, os alunos usam pontos acumulados para "licitar" em benefícios: escolha de tema, prazo extra, tema do próximo seminário. O professor realiza o leilão ao vivo.',
      difficulty: 'Médio',
      estimatedTime: '45 minutos',
      length: 'aula'
    },
    {
      title: 'Kit de Boas-vindas',
      description: 'No início do semestre, o professor distribui um "kit" com 50 pontos de bônus, uma dica secreta do conteúdo e um recurso extra de aprendizado, sem condição prévia.',
      difficulty: 'Fácil',
      estimatedTime: '10 minutos',
      length: 'rapida'
    },
  ],
  'gt-mystery-box': [
    {
      title: 'Roleta da Sorte',
      description: 'Ao final de cada aula, o professor sorteia aleatoriamente um aluno que ganhou um "bônus misterioso" por participar. O bônus é revelado na hora e varia: pontos, privilege, item de coleção, etc.',
      difficulty: 'Fácil',
      estimatedTime: '5 minutos',
      length: 'rapida'
    },
    {
      title: 'Baú da Semana',
      description: 'Um "baú" digital é revelado ao final de cada semana com recompensas aleatórias distribuídas entre os alunos que completaram todas as atividades. Cada aluno recebe uma recompensa diferente.',
      difficulty: 'Médio',
      estimatedTime: '10 minutos/semana',
      length: 'continua'
    },
    {
      title: 'Aula Surpresa',
      description: 'Em um dia não anunciado, o professor chega à aula com uma atividade completamente diferente do planejado, uma visita virtual, um experimento, um jogo ou uma dinâmica especial.',
      difficulty: 'Fácil',
      estimatedTime: '1 aula',
      length: 'aula'
    },
    {
      title: 'O Envelope Lacrado',
      description: 'No início de cada módulo, o professor mostra fisicamente um envelope lacrado contendo a "recompensa especial" que será aberta quando o módulo for concluído. Fica visível na sala durante todo o módulo.',
      difficulty: 'Fácil',
      estimatedTime: '5 minutos',
      length: 'rapida'
    },
  ],
  'gt-escape-room': [
    {
      title: 'Mapa do Tesouro',
      description: 'Um mapa com pistas distribuídas ao longo dos materiais do módulo leva a um "tesouro", pode ser um conteúdo extra valioso, uma dica para a prova, ou uma recompensa especial.',
      difficulty: 'Médio',
      estimatedTime: 'Ao longo do módulo',
      length: 'continua'
    },
    {
      title: 'Leitura Atenta',
      description: 'O professor esconde uma palavra-chave em algum ponto dos materiais da semana. O aluno que encontrar e reportar corretamente ganha pontos bônus. Incentiva leitura cuidadosa dos textos.',
      difficulty: 'Fácil',
      estimatedTime: 'Tempo de leitura variável',
      length: 'continua'
    },
  ],
  'gt-habit-streaks': [
    {
      title: 'Streak de Presença',
      description: 'Um contador visível mostra a sequência de presenças de cada aluno. Alcançar marcos (7, 14, 21 dias) gera benefícios crescentes. Faltar reseta o contador, gerando motivação para manter a sequência.',
      difficulty: 'Fácil',
      estimatedTime: 'Atualização diária',
      length: 'continua'
    },
    {
      title: 'Segunda de Missão',
      description: 'Toda segunda-feira, uma nova missão da semana é revelada com tema, objetivo e recompensa específicos. A variedade das missões mantém a curiosidade sobre o que virá na semana seguinte.',
      difficulty: 'Fácil',
      estimatedTime: 'Gestão semanal',
      length: 'continua'
    },
  ],
  'gt-life-points': [
    {
      title: 'Nível em Risco',
      description: 'Alunos que ficam 2 semanas sem participar de nenhuma atividade opcional perdem um nível de progresso. O sistema envia um alerta amigável antes do downgrade acontecer.',
      difficulty: 'Médio',
      estimatedTime: 'Monitoramento semanal',
      length: 'continua'
    },
    {
      title: 'Vislumbre do Próximo Nível',
      description: 'O professor mostra aos alunos quais benefícios e privilégios existem no nível acima do atual: acesso a projetos avançados, escolha de temas, sessões exclusivas. Torna o objetivo concreto e desejável.',
      difficulty: 'Fácil',
      estimatedTime: '15 minutos',
      length: 'rapida'
    },
  ],
};

export function getTechniqueActivities(techniqueId: string): Activity[] {
  return TECHNIQUE_ACTIVITIES[techniqueId] ?? [];
}

export function countTechniqueActivities(techniqueId: string, filter: ActivityFilter) {
  const all = getTechniqueActivities(techniqueId);
  return { total: all.length, matching: all.filter((a) => matchesActivityFilter(a, filter)).length };
}
