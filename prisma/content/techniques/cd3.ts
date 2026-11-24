import { CoreDriveTechniques, text } from '../types';

export const CD3: CoreDriveTechniques = {
  coreDriveId: 3,
  techniques: [
    {
      id: 'boosters',
      name: 'Boosters',
      description:
        'Esta técnica de jogo significa a utilização de reforços para que o jogador obtenha ajuda para alcançar uma vitória de forma mais eficaz, estando geralmente sujeitos a condições (Chou, 2016). Essa sensação de fortalecimento atua como um potente motivador para o engajamento. Chou (2016), exemplifica este efeito com o uso de mecânicas que oferecem uma quantidade limitada de "boosters", para superar desafios.',
      generalExample:
        'O Super Cogumelo ou a Estrela em Super Mario Bros., ou os doces especiais em Candy Crush Saga. Eles dão ao jogador um poder temporário ou ajuda estratégica para vencer uma fase difícil, mantendo a motivação quando o desafio parece grande demais (Chou, 2016).',
      activity: {
        description:
          'Durante uma atividade complexa de testes, o aluno pode acionar um "Booster" (como um trecho de mock pré-configurado ou uma carta de dica sobre casos de borda) para destravar na tarefa sem precisar desistir.',
        supportTools: text(
          'Restrição de acesso e atividades condicionais do Moodle, ou branches de apoio no GitHub. O aluno libera o material de ajuda automaticamente quando necessário, sem que o professor precise atender individualmente cada bloqueio básico.',
          'Catálogo de Boosters de Teste de Software (cartas de dicas de Particionamento de Equivalência, esqueletos de mocks e exemplos de asserções) prontos para consulta sob demanda.',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'desbloqueio-por-marcos',
      name: 'Desbloqueio por Marcos',
      description:
        'Para aplicar esta técnica, dividem-se os objetivos em etapas menores, para que os usuários desbloqueiem novos conteúdos, recursos e níveis à medida que avançam, para manter o engajamento (Inano, 2024). Esta, pode ser demonstrada por meio de jogos que após a conclusão de cada nível, desbloqueia novas habilidades para as próximas fases. Essa perspectiva voltada para o futuro é o motivo pelo qual os designers de jogos criam desbloqueios ao invés de simples recompensas (Chou, 2026).',
      generalExample:
        'Jogos de estratégia e RPG, como StarCraft ou The Legend of Zelda, em que concluir uma missão libera novos mapas, ferramentas ou classes de personagem. O jogador continua motivado porque quer experimentar as novas possibilidades que se abrem a cada marco (Chou, 2026).',
      activity: {
        description:
          'A disciplina é dividida em marcos técnicos: ao dominar e entregar os testes unitários básicos, o aluno desbloqueia o módulo de testes de integração e dublês de teste (mocks), e em seguida desbloqueia o desafio de testes automatizados de interface (E2E).',
        supportTools: text(
          'Restrição de acesso por conclusão de atividade no Moodle. Assim que o aluno atinge a nota ou critério do marco atual, o Moodle libera automaticamente o próximo nível da trilha.',
          'Mapa de progressão da disciplina com os marcos técnicos e os critérios claros de desbloqueio de cada etapa.',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'escolha-do-veneno',
      name: 'Escolha do Veneno ou Percepção de Escolha',
      description:
        'Esta técnica proporciona aos jogadores a sensação de escolha, mesmo quando as opções não alteram significativamente o desfecho de um jogo (Chou, 2026). Os seres humanos tendem a preferir algo quando lhes são dadas múltiplas escolhas, em comparação a uma única oferta (Chou, 2016). No design de jogos, esta técnica se manifesta em opções de diálogo que não alteram a trama principal mas que permite que os jogadores expressem a sua personalidade (Chou, 2026).',
      generalExample:
        'Em jogos de RPG, o jogador escolhe entre diferentes caminhos ou opções de diálogo que levam à mesma missão principal, ou quando um serviço oferece dois planos em vez de um só. O simples fato de poder escolher aumenta o senso de autonomia e aceitação da tarefa (Chou, 2016; Chou, 2026).',
      activity: {
        description:
          'Na atividade prática da unidade, o aluno pode escolher qual módulo ou sistema deseja testar (por exemplo: um módulo de carrinho de compras, um sistema bancário ou uma API de biblioteca). Todos exigem a mesma aplicação de técnicas de teste e cobertura, mas o aluno escolhe o contexto que mais lhe agrada.',
        supportTools: text(
          'Atividade "Escolha" do Moodle vinculada a repositórios temáticos no GitHub Classroom. O aluno seleciona seu tema preferido e recebe o repositório correspondente automaticamente.',
          'Catálogo de sistemas-alvo com complexidade equivalente (mesmo número de classes, regras de negócio e defeitos plantados) para escolha dos alunos.',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'controle-em-tempo-real',
      name: 'Controle em Tempo Real',
      description:
        'Os usuários podem moldar a sua experiência por meio de configurações personalizadas, interfaces interativas e mecânicas de jogos que sejam dinâmicas e respondam ao seu comportamento, o que aumenta a sensação de apropriação (Inano, 2024). A exemplo disso, estão os jogos que carecem de manobras constantes de elementos ou personagens, os reflexos e a velocidade de respostas tornam-se fundamentais (Chou, 2026).',
      generalExample:
        'Jogos de ação ou estratégia em tempo real em que cada comando do jogador altera imediatamente a posição e o comportamento dos elementos na tela, gerando imersão e controle direto sobre a estratégia adotada (Chou, 2026).',
      activity: {
        description:
          'Durante a criação de testes automatizados de interface ou de API, o aluno utiliza um executor visual interativo que permite inspecionar o estado da aplicação a cada comando, pausar a execução, alterar seletores e ver o navegador responder em tempo real.',
        supportTools: text(
          'Cypress Test Runner (ou Playwright UI Mode). A interface interativa mostra o navegador executando cada passo do teste ao vivo e permite viajar no tempo (time-travel) entre os comandos sem esforço extra de configuração pelo professor.',
          'Guia prático de laboratório interativo com roteiro de inspeção e manipulação de testes em tempo real.',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'feedback-instantaneo',
      name: 'Feedback Instantâneo',
      description:
        'Durante esta técnica, ao executar uma ação desejada, algo é mudado dinamicamente para o jogador, sem necessidade de recarregamento da página (Chou, 2026). Chou (2026) exemplifica isto com a utilização de formulários extensos que contém várias páginas, a aplicação de feedbacks dinâmicos poderia ser uma janela que fornecesse uma resposta em tempo real sempre que uma pergunta fosse respondida.',
      generalExample:
        'Em jogos como Tetris ou em formulários modernos na web, cada ação mostra na hora se a jogada encaixou ou se o campo está válido, com cores e sons imediatos, permitindo que o usuário ajuste sua estratégia no mesmo segundo (Chou, 2026).',
      activity: {
        description:
          'Enquanto o aluno escreve seus casos de teste ou refatora o código, os testes rodam automaticamente em segundo plano a cada salvamento de arquivo, mudando o indicador visual de vermelho para verde instantaneamente na tela.',
        supportTools: text(
          'Executores de teste em modo de observação contínua (watch mode), como Jest/Vitest (--watch), Pytest-watch ou a aba de testes do VS Code / IntelliJ IDEA. O aluno recebe o retorno na hora na própria IDE, sem precisar esperar a correção do professor.',
          'Template de repositório inicial já configurado com scripts de execução contínua (watch mode) e destaque visual de cobertura na IDE.',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'espacos-em-branco',
      name: 'Preenchimento de Espaços em Branco e Autonomia Voluntária',
      description:
        'Ao oferecer telas em branco ou comandos abertos, há um estímulo para a resolução criativa de problemas, que promove o engajamento cognitivo e uma expressão pessoal única (Inano, 2024). A exemplo disso, proporcionar um espaço em branco durante a resolução de um problema que envolve raciocínio lógico, permite que os indivíduos organizem as suas ideias de acordo com a sua própria percepção.',
      generalExample:
        'Jogos sandbox como Minecraft ou desafios de palavras e lógica com lacunas abertas, em que o jogador recebe os blocos ou uma estrutura parcial e tem liberdade criativa para construir sua própria solução (Inano, 2024; Chou, 2026).',
      activity: {
        description:
          'Sessões de Teste Exploratório baseadas em Charters (cartas de missão abertas), em que o aluno tem liberdade para investigar o software criativamente em busca de falhas não óbvias, ou exercícios de código com lacunas estratégicas (// TODO) onde ele cria suas próprias entradas e asserções.',
        supportTools: text(
          'Extensão Exploratory Testing do Chrome (para registrar notas, telas e bugs durante a exploração livre) ou templates de código no GitHub Classroom.',
          'Modelo de Charter (Carta de Missão) de Teste Exploratório com espaços estruturados para o aluno planejar sua estratégia livre, registrar hipóteses de teste e documentar os defeitos encontrados.',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'combo-em-cadeia',
      name: 'Combo em Cadeia',
      description:
        'Esta é uma técnica de jogo que ao executar uma ação desejada repetidamente dentro de um determinado período de tempo, acumula bônus crescentes (Chou, 2026). Esta pode ser implementada através de uma premiação após o jogador concluir uma quantidade específica de dias jogados.',
      generalExample:
        'Em jogos de luta como Street Fighter ou em aplicativos de ensino como o Duolingo (ofensiva de dias seguidos), acertar uma sequência de ações sem errar ativa um multiplicador de pontos ou bônus visual crescente, incentivando a consistência (Chou, 2026).',
      activity: {
        description:
          'O aluno ou equipe acumula um "Combo de Qualidade" a cada entrega ou pull request consecutivo em que todos os testes passam na integração contínua (CI) sem quebrar funcionalidades antigas (zero regressão) e mantendo a meta de cobertura.',
        supportTools: text(
          'GitHub Actions (Integração Contínua). O workflow roda a suíte de testes a cada envio e registra automaticamente o histórico de builds aprovados consecutivamente (sequência de checks verdes).',
          'Tabela de regras e multiplicadores do "Combo de Testes" (por exemplo: 3 entregas consecutivas com build verde de primeira concedem bônus de XP na unidade).',
        ),
        learningObjectIds: [],
      },
    },
  ],
};
