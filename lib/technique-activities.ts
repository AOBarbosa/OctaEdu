import { ActivityFilter, matchesActivityFilter } from './activity-filter';
import { Activity } from './types';

const TECHNIQUE_ACTIVITIES: Record<string, Activity[]> = {
  'gt-narrative-quest': [
    {
      title: 'Briefing do Incidente Crítico',
      description:
        'A turma recebe um dossiê simulando uma falha grave ocorrida em um sistema hospitalar ou financeiro. Em grupos, classificam os riscos, definem prioridades de teste e apresentam o plano de contenção em 20 minutos.',
      difficulty: 'Fácil',
      estimatedTime: '30 minutos',
      length: 'rapida',
    },
    {
      title: 'Episódio de Auditoria de Release',
      description:
        'Cada unidade da disciplina representa uma barreira de segurança antes do lançamento de um foguete ou sistema bancário. Ao final da aula, a turma valida se os critérios de aceite (Quality Gates) autorizam o deploy.',
      difficulty: 'Médio',
      estimatedTime: '1h',
      length: 'aula',
    },
    {
      title: 'Operação Guardiões da Produção',
      description:
        'Ao longo do semestre, as equipes assumem o papel de engenheiros de confiabilidade de um sistema evolutivo, respondendo a boletins de incidentes semanais com planos de teste, casos automatizados e post-mortems.',
      difficulty: 'Difícil',
      estimatedTime: 'Ao longo do semestre',
      length: 'continua',
    },
  ],
  'gt-higher-purpose': [
    {
      title: 'Auditoria Expressa de Acessibilidade',
      description:
        'Os estudantes analisam o portal da própria instituição ou de um serviço comunitário usando heurísticas de acessibilidade e leitores de tela, registrando os defeitos encontrados em relatórios padronizados.',
      difficulty: 'Fácil',
      estimatedTime: '30 minutos',
      length: 'rapida',
    },
    {
      title: 'Clínica de Testes em Projetos Reais',
      description:
        'A turma testa os projetos desenvolvidos por alunos de outros períodos ou softwares comunitários, entregando uma bateria documentada de issues reprodutíveis com passos claros, evidências e severidade.',
      difficulty: 'Médio',
      estimatedTime: '2h',
      length: 'aula',
    },
    {
      title: 'Contribuição de Testes para Open Source',
      description:
        'Grupos escolhem uma biblioteca ou aplicação de código aberto com baixa cobertura, criam testes unitários ou de integração relevantes e abrem Pull Requests reais para a comunidade.',
      difficulty: 'Difícil',
      estimatedTime: '4 semanas',
      length: 'continua',
    },
  ],
  'gt-humanitarian-oracle': [
    {
      title: 'Pílula de Bug Clássico',
      description:
        'No início da aula, uma dupla apresenta em 10 minutos um bug famoso ou sutil (ex.: estouro de inteiro, fuso horário, arredondamento float) e adiciona a receita de como testá-lo ao mural da turma.',
      difficulty: 'Fácil',
      estimatedTime: '15 minutos',
      length: 'rapida',
    },
    {
      title: 'Catálogo de Payloads & Casos de Borda',
      description:
        'A turma constrói colaborativamente um guia prático de entradas maliciosas, strings especiais, limites numéricos e datas críticas para ser usado nos testes funcionais de todas as equipes.',
      difficulty: 'Médio',
      estimatedTime: '1h30',
      length: 'aula',
    },
    {
      title: 'Enciclopédia Viva de Post-Mortems',
      description:
        'Ao longo do semestre, os alunos documentam os defeitos mais difíceis que encontraram, detalhando sintoma, causa raiz e qual técnica de teste teria evitado a falha, formando um acervo para as próximas turmas.',
      difficulty: 'Médio',
      estimatedTime: 'Ao longo do semestre',
      length: 'continua',
    },
  ],
  'gt-boss-fight': [
    {
      title: 'Mini-Boss: A Função Inquebrável',
      description:
        'O professor projeta uma função aparentemente simples, mas com 5 defeitos ocultos. A cada caso de teste proposto pela turma que falha a função, o Mini-Boss perde 20% de vida até ser derrotado.',
      difficulty: 'Fácil',
      estimatedTime: '25 minutos',
      length: 'rapida',
    },
    {
      title: 'Batalha contra os Mutantes Sobreviventes',
      description:
        'As equipes recebem um módulo com testes fracos e rodam teste de mutação (Stryker ou PITest). Cada mutante sobrevivente é um lacaio do Chefe que precisa ser eliminado com asserções mais precisas durante a aula.',
      difficulty: 'Difícil',
      estimatedTime: '2h',
      length: 'aula',
    },
    {
      title: 'Raid no Monólito Legado',
      description:
        'Uma missão de 3 semanas onde a turma refatora e blinda um sistema legado sem testes. A cada marco de cobertura de branches e cenários críticos atingido, uma nova camada do chefe é desbloqueada.',
      difficulty: 'Difícil',
      estimatedTime: '3 semanas',
      length: 'continua',
    },
  ],
  'gt-skill-tree': [
    {
      title: 'Check-in na Pirâmide de Testes',
      description:
        'Ao finalizar um laboratório, cada estudante marca em seu mapa individual quais habilidades desbloqueou (ex.: Asserções Básicas, Partição de Equivalência, Mocks, Teste de Contrato).',
      difficulty: 'Fácil',
      estimatedTime: '10 minutos',
      length: 'rapida',
    },
    {
      title: 'Desafio de Desbloqueio de Nível',
      description:
        'Uma atividade prática estruturada em três ramos (Unitário, API e E2E). Concluir os testes unitários libera o token de acesso para testar os endpoints da API, que por sua vez libera o fluxo E2E.',
      difficulty: 'Médio',
      estimatedTime: '1h40',
      length: 'aula',
    },
    {
      title: 'Árvore de Maestria em Engenharia de Qualidade',
      description:
        'O semestre inteiro é organizado em nós de competência visualizados em um painel da turma. Os estudantes escolhem especializações avançadas (Segurança, Performance, Mutação) após dominarem o tronco comum.',
      difficulty: 'Médio',
      estimatedTime: 'Ao longo do semestre',
      length: 'continua',
    },
  ],
  'gt-fixed-milestones': [
    {
      title: 'Planning das Missões de QA da Semana',
      description:
        'Toda semana o professor apresenta 3 entregas curtas de teste (ex.: modelar partições, automatizar 3 casos unitários, relatar 1 bug) com critérios objetivos de conclusão e pontuação.',
      difficulty: 'Fácil',
      estimatedTime: '15 minutos',
      length: 'rapida',
    },
    {
      title: 'Checkpoint de Cobertura e Asserções',
      description:
        'Sessão intermediária de laboratório em que as equipes rodam o linter de testes e verificador de cobertura junto com o professor para destravar a aprovação do marco atual.',
      difficulty: 'Fácil',
      estimatedTime: '50 minutos',
      length: 'aula',
    },
    {
      title: 'Trilha de 4 Sprints de Qualidade',
      description:
        'Divide o projeto prático da disciplina em 4 marcos progressivos (Plano de Testes -> Suíte Unitária -> Suíte de Integração -> Pipeline E2E), celebrando e validando cada entrega antes da próxima.',
      difficulty: 'Médio',
      estimatedTime: '4 marcos no semestre',
      length: 'continua',
    },
  ],
  'gt-choice-board': [
    {
      title: 'Escolha Seu Oráculo',
      description:
        'Diante de uma especificação com requisitos ambíguos, cada dupla escolhe entre 3 abordagens rápidas (Tabela de Decisão, Transição de Estados ou Partição de Equivalência) para modelar os casos em 25 minutos.',
      difficulty: 'Fácil',
      estimatedTime: '25 minutos',
      length: 'rapida',
    },
    {
      title: 'Tabuleiro 3x3 de Automação',
      description:
        'O professor oferece um grid 3x3 com tarefas de teste de diferentes pesos (ex.: criar mock de pagamento, testar erro 422 na API, validar formulário no Playwright). Os alunos escolhem 3 tarefas em linha para completar na aula.',
      difficulty: 'Médio',
      estimatedTime: '1h30',
      length: 'aula',
    },
    {
      title: 'Rota Customizada do Projeto de Testes',
      description:
        'As equipes montam sua estratégia para o projeto final escolhendo quais camadas e ferramentas aprofundar a partir de um menu de desafios técnicos pontuados.',
      difficulty: 'Médio',
      estimatedTime: 'Ao longo do semestre',
      length: 'continua',
    },
  ],
  'gt-sandbox-lab': [
    {
      title: 'Quebre Este Endpoint em 20 Minutos',
      description:
        'O professor sobe uma API em ambiente sandbox e desafia os alunos a enviarem requisições criativas via Postman ou curl até provocarem um erro 500 não tratado.',
      difficulty: 'Fácil',
      estimatedTime: '20 minutos',
      length: 'rapida',
    },
    {
      title: 'Sessão Guiada de Teste Exploratório (SBTM)',
      description:
        'Usando cartas de heurísticas (ex.: Zero-Um-Muitos, Interrupção de Fluxo, Dados Inválidos), as duplas exploram livremente uma aplicação web de laboratório e registram suas descobertas em um charter de sessão.',
      difficulty: 'Médio',
      estimatedTime: '1h20',
      length: 'aula',
    },
    {
      title: 'Laboratório de Fuzzing e Testes Baseados em Propriedades',
      description:
        'Os estudantes utilizam geradores automáticos de entradas (Property-Based Testing) para bombardear funções complexas de parsing e validação ao longo do módulo.',
      difficulty: 'Difícil',
      estimatedTime: '2 semanas',
      length: 'continua',
    },
  ],
  'gt-instant-feedback-loops': [
    {
      title: 'Desafio Red-Green Relâmpago',
      description:
        'Com o test runner em modo watch aberto, os alunos recebem 3 requisitos simples e precisam fazer os 3 testes passarem seguindo estritamente o ciclo Red -> Green -> Refactor.',
      difficulty: 'Fácil',
      estimatedTime: '25 minutos',
      length: 'rapida',
    },
    {
      title: 'Coding Dojo Randori de TDD',
      description:
        'A turma resolve um kata clássico (ex.: Calculadora de Frete, Validador de Senha ou Bowling Score) projetado no telão. A cada 7 minutos, a dupla no teclado gira, guiada pelo feedback instantâneo dos testes.',
      difficulty: 'Médio',
      estimatedTime: '1h30',
      length: 'aula',
    },
    {
      title: 'Trilha de Katas com Correção Automática',
      description:
        'Repositório semanal de exercícios de TDD em que o estudante recebe feedback imediato no terminal e no GitHub Classroom a cada caso de borda implementado.',
      difficulty: 'Médio',
      estimatedTime: 'Semanal',
      length: 'continua',
    },
  ],
  'gt-learning-portfolio': [
    {
      title: 'Vitrine do Melhor Teste da Semana',
      description:
        'Cada aluno seleciona o teste mais claro e bem estruturado (Arrange-Act-Assert) que escreveu na semana e adiciona ao seu repositório portfólio com uma breve explicação.',
      difficulty: 'Fácil',
      estimatedTime: '15 minutos/semana',
      length: 'rapida',
    },
    {
      title: 'Estruturação de Suíte Modelo',
      description:
        'Aula prática dedicada a organizar o repositório pessoal de QA do estudante com README técnico, relatórios visuais gerados automaticamente e exemplos de cada nível de teste.',
      difficulty: 'Médio',
      estimatedTime: '1h30',
      length: 'aula',
    },
    {
      title: 'Portfólio Progressivo de Engenharia de Testes',
      description:
        'Ao longo do semestre, o estudante constrói uma suíte autoral completa (unitários, mocks, API e E2E) sobre um domínio de sua escolha, culminando em um portfólio técnico pronto para entrevistas.',
      difficulty: 'Difícil',
      estimatedTime: 'Semestre inteiro',
      length: 'continua',
    },
  ],
  'gt-avatar-evolution': [
    {
      title: 'Ficha de Especialista em Qualidade',
      description:
        'No primeiro dia, cada estudante cria seu perfil de QA escolhendo sua classe inicial (ex.: Detetive Exploratório, Arquiteto de TDD, Guardião de API) e define suas metas técnicas.',
      difficulty: 'Fácil',
      estimatedTime: '20 minutos',
      length: 'rapida',
    },
    {
      title: 'Cerimônia de Desbloqueio de Insígnias de Bugs',
      description:
        'Ao final de um laboratório prático, os alunos que encontraram bugs de categorias específicas (Valor Limite, Concorrência, Segurança, Regressão) desbloqueiam a insígnia correspondente em seu perfil.',
      difficulty: 'Fácil',
      estimatedTime: '45 minutos',
      length: 'aula',
    },
    {
      title: 'Progressão de Patentes de QA no Semestre',
      description:
        'Os estudantes evoluem de "Estagiário de Testes" até "Engenheiro Principal de Qualidade" conforme acumulam XP em escrita de testes, revisão de código e caça a defeitos.',
      difficulty: 'Médio',
      estimatedTime: 'Progressivo no semestre',
      length: 'continua',
    },
  ],
  'gt-guilds-squads': [
    {
      title: 'Triage Party em Esquadrão',
      description:
        'Em 25 minutos, cada esquadrão analisa uma lista de 10 relatos de bugs misturados (alguns duplicados, outros incompletos ou críticos) e precisa classificá-los e priorizá-los corretamente.',
      difficulty: 'Fácil',
      estimatedTime: '25 minutos',
      length: 'rapida',
    },
    {
      title: 'Sabotagem Cruzada (Fault Seeding entre Equipes)',
      description:
        'Na primeira metade da aula, a Equipe A injeta 5 bugs sutis em uma branch do projeto. Na segunda metade, a Equipe B tenta encontrar os 5 defeitos escrevendo testes automatizados. Pontua quem achar mais falhas e quem criar o bug mais difícil de detectar.',
      difficulty: 'Médio',
      estimatedTime: '1h40',
      length: 'aula',
    },
    {
      title: 'Campeonato de Bug Bash Interequipes',
      description:
        'Esquadrões com papéis definidos (Explorador, Automatizador, Analista de Logs e Relator) auditam os sistemas das outras equipes ao longo de duas rodadas no semestre.',
      difficulty: 'Difícil',
      estimatedTime: '2 rodadas no semestre',
      length: 'continua',
    },
  ],
  'gt-peer-instruction': [
    {
      title: 'Code Review Cruzado de Asserções',
      description:
        'Em duplas, os alunos trocam seus arquivos de teste por 20 minutos usando um checklist: o nome do teste é claro? Segue Arrange-Act-Assert? O teste realmente falha se a lógica for comentada?',
      difficulty: 'Fácil',
      estimatedTime: '20 minutos',
      length: 'rapida',
    },
    {
      title: 'Sessão de Pair Testing (Piloto e Navegador)',
      description:
        'Dois alunos compartilham a mesma máquina para testar uma aplicação: o Piloto executa os comandos e escreve o teste, enquanto o Navegador consulta heurísticas, sugere casos de borda e registra anomalias, trocando a cada 15 minutos.',
      difficulty: 'Fácil',
      estimatedTime: '1h',
      length: 'aula',
    },
    {
      title: 'Mentoria de Automação e Correção de Flaky Tests',
      description:
        'Estudantes que já dominaram a configuração do framework auxiliam colegas a diagnosticar testes intermitentes e configurar mocks ao longo do módulo, recebendo bônus de mentoria.',
      difficulty: 'Médio',
      estimatedTime: '20 minutos/semana',
      length: 'continua',
    },
  ],
  'gt-countdown-challenge': [
    {
      title: 'Speed Run de Valor Limite (15 min)',
      description:
        'Com o cronômetro no telão, os alunos têm 15 minutos para identificar todas as classes de equivalência e valores limite de uma regra de negócio e encontrar os 3 bugs escondidos.',
      difficulty: 'Fácil',
      estimatedTime: '15 minutos',
      length: 'rapida',
    },
    {
      title: 'Desafio do Orçamento de 5 Testes',
      description:
        'Para testar um módulo complexo de carrinho de compras, cada dupla só tem permissão de executar 5 casos de teste na suíte. Eles precisam planejar estrategicamente quais cenários maximizam a detecção de defeitos.',
      difficulty: 'Médio',
      estimatedTime: '1h',
      length: 'aula',
    },
  ],
  'gt-exclusive-perks': [
    {
      title: 'Carta de Inspeção Caixa-Branca (3 min)',
      description:
        'Durante um exercício difícil de teste caixa-preta, a equipe pode gastar uma ficha especial para visualizar o código-fonte da função por exatos 3 minutos e descobrir qual condição lógica faltava cobrir.',
      difficulty: 'Fácil',
      estimatedTime: '10 minutos',
      length: 'rapida',
    },
    {
      title: 'Leilão de Vantagens de QA',
      description:
        'Ao final do módulo, as equipes usam os pontos acumulados caçando bugs para arrematar vantagens técnicas no projeto final, como dica extra de caso de borda do professor ou mentoria VIP na suíte E2E.',
      difficulty: 'Médio',
      estimatedTime: '45 minutos',
      length: 'aula',
    },
  ],
  'gt-mystery-box': [
    {
      title: 'Sorteio da Carta de Caos (Chaos Card)',
      description:
        'No meio do laboratório de testes, o professor gira uma roleta que introduz um evento inesperado no requisito (ex.: a API externa agora demora 5s ou retorna erro 503 intermitente), desafiando a resiliência dos testes.',
      difficulty: 'Fácil',
      estimatedTime: '15 minutos',
      length: 'rapida',
    },
    {
      title: 'Desafio da Caixa-Preta Misteriosa',
      description:
        'Os alunos recebem acesso a um serviço cujo requisito completo é desconhecido. Através de testes exploratórios sistemáticos e análise das respostas, precisam deduzir a regra de negócio oculta e achar 3 defeitos.',
      difficulty: 'Médio',
      estimatedTime: '1h20',
      length: 'aula',
    },
    {
      title: 'Caça ao Bug Fantasma da Semana',
      description:
        'Toda semana um "Easter Egg de defeito" (como uma falha que só ocorre em anos bissextos ou com caracteres Unicode) é escondido no repositório da disciplina, premiando os primeiros a escreverem o teste que o captura.',
      difficulty: 'Médio',
      estimatedTime: 'Semanal',
      length: 'continua',
    },
  ],
  'gt-escape-room': [
    {
      title: 'Enigma do Stack Trace',
      description:
        'Os alunos recebem um log de erro real e um trecho de código. Descobrir qual entrada exata disparou a exceção revela a senha numérica para abrir o formulário da atividade.',
      difficulty: 'Fácil',
      estimatedTime: '20 minutos',
      length: 'rapida',
    },
    {
      title: 'Escape Room: A Pipeline Trancada',
      description:
        'Em grupos, os estudantes precisam destravar 4 etapas de uma pipeline de deploy em pane: 1) corrigir um teste unitário falso-positivo, 2) isolar um bug de valor limite, 3) configurar um mock de API e 4) capturar a flag final no teste E2E.',
      difficulty: 'Difícil',
      estimatedTime: '1h40',
      length: 'aula',
    },
  ],
  'gt-habit-streaks': [
    {
      title: 'Check-in de Teste no Commit',
      description:
        'Verificação rápida no início da aula: todas as equipes que fizeram commit de código acompanhado de pelo menos um teste automatizado passando mantêm a chama da sua streak acesa no painel.',
      difficulty: 'Fácil',
      estimatedTime: '10 minutos',
      length: 'rapida',
    },
    {
      title: 'Green Build Streak da Turma',
      description:
        'Ao longo do projeto semestral, as equipes cultivam uma sequência semanal de builds verdes no GitHub Actions sem queda na cobertura mínima. Manter 4 semanas seguidas desbloqueia bônus na avaliação.',
      difficulty: 'Médio',
      estimatedTime: 'Acompanhamento semanal',
      length: 'continua',
    },
  ],
  'gt-life-points': [
    {
      title: 'Simulação de Deploy de Sexta-Feira',
      description:
        'Ao final da aula, o professor roda uma bateria secreta de 5 testes de aceitação contra o código da equipe. Para cada regressão detectada, a equipe perde um escudo, mas pode recuperá-lo escrevendo o teste de regressão em 15 minutos.',
      difficulty: 'Médio',
      estimatedTime: '30 minutos',
      length: 'rapida',
    },
    {
      title: 'Escudos de Estabilidade do Projeto',
      description:
        'Cada grupo inicia o semestre com 3 Escudos de Produção. Se um bug crítico escapar para a entrega de uma sprint, um escudo é consumido e a equipe realiza um post-mortem adicionando o teste que impede a reincidência.',
      difficulty: 'Médio',
      estimatedTime: 'Ao longo do semestre',
      length: 'continua',
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
