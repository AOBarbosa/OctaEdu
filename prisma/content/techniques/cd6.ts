import { CoreDriveTechniques, text } from '../types';

export const CD6: CoreDriveTechniques = {
  coreDriveId: 6,
  techniques: [
    {
      id: 'pendurar',
      name: 'Pendurar e Justaposição Ancorada',
      description:
        'Para Chou (2016), esta técnica está relacionada com a exibição de uma recompensa tentadora ao alcance da visão, mas não do acesso imediato. Como é o caso da exibição de um recurso de jogo constantemente na tela do jogador, que para ser conquistado demoraria mais tempo mediante a completude das tarefas indicadas na missão mas, em contrapartida, pode ser obtido rapidamente se o jogador pagar alguma quantia pelo recurso.',
      activity: {
        description: text(
          'A turma testa o PizzaTest (cardápio, carrinho, zonas de entrega, cupom e extras). Antes de começar, o professor coloca sobre a mesa, bem à vista, um envelope com a etiqueta "Pista do Bug Secreto". O envelope fica visível durante toda a aula, mas ninguém pode abri-lo de imediato. No quadro, o professor escreve as duas formas de conseguir a pista:',
          '- Caminho lento (de graça): encontrar 5 bugs válidos',
          '- Caminho rápido (com custo): perder 10 minutos do tempo de teste. A equipe para de testar por 10 minutos e fica só olhando, e então recebe o envelope.',
          'Como o envelope está sempre à vista, as equipes pensam nele durante toda a aula e decidem se compensa parar um pouco para ganhar a pista ou continuar testando por conta própria. Dentro do envelope há só uma frase, que leva a um bug real do sistema: "Compare o valor da entrega nas 3 zonas." Quem seguir a pista vai ver que a Zona A (a mais perto) cobra R$ 20, a Zona B cobra R$ 8 e a Zona C cobra R$ 12, ou seja, a entrega mais perto é a mais cara. No final, o professor revela o bug para quem não abriu o envelope e a turma comenta se valeu mais a pena esperar ou pagar.',
        ),
        learningObjectIds: ['pizzatest'],
      },
    },
    {
      id: 'limites-magneticos',
      name: 'Limites Magnéticos',
      description:
        'Esta técnica consiste em restrições impostas à quantidade de vezes que um usuário pode realizar certas ações desejadas, que estimulam uma maior motivação para realizá-las (Chou, 2016). Um bom projetista deve conseguir controlar o fluxo da escassez e garantir que todos no sistemas continuem a se esforçar por um objetivo difícil, mas não impossível (Chou, 2026). A exemplo disto, a implementação de fases em um jogo, que deve aumentar a dificuldade e os desafios conforme o jogador avança.',
      activity: {
        description:
          'Em qualquer atividade que o professor já tinha planejado para a aula (testar um sistema, criar casos de teste, fazer um exercício de técnica), ele acrescenta uma regra simples no começo: cada equipe tem só 3 "pedidos de validação" para usar durante a aula inteira. Um pedido de validação é cada vez que a equipe chama o professor para confirmar se um bug é válido, se um caso de teste está correto ou se a resposta está certa. O professor desenha 3 círculos ao lado do nome de cada equipe no quadro e risca um círculo a cada pedido. Como os pedidos são poucos (o limite magnético), a equipe pensa antes de chamar ("Será que isso é mesmo um bug?"), revisa o trabalho e só pede validação quando está confiante. Quando os círculos acabam, a equipe continua trabalhando, mas passa a contar com os colegas e o material de apoio. No final da aula, o professor mostra quais equipes ainda tinham pedidos sobrando e comenta como essa escolha afetou o resultado.',
        learningObjectIds: ['farmatest'],
      },
    },
    {
      id: 'dinamica-de-agendamento',
      name: 'Dinâmica de Agendamento',
      description:
        'A aplicação desta técnica utiliza um tempo previamente definido ou recorrente, no qual os usuários precisam realizar as missões para alcançar o estado de vitória (Chou, 2026). Para exemplificá-la, pode-se utilizar o "Happy Hour", que ao chegar no horário indicado, os clientes recebem 50% de desconto em itens alimentícios, havendo um aguardo e planejamento de acordo com a programação (Chou, 2016).',
      activity: {
        description:
          'O professor aplica a tarefa que já tinha planejado para a aula, sobre qualquer conteúdo (criar casos de teste, resolver exercícios de técnica, testar um sistema, escrever relatos de bug etc.) e acrescenta só uma regra de tempo: o "Happy Hour". No começo da aula, ele escreve no quadro o horário da janela, por exemplo: "Happy Hour: das 15 às 25 minutos de aula". Fora da janela, cada item entregue vale 1 ponto (um caso de teste, uma resposta de exercício, um bug relatado, o que a tarefa pedir). Durante a janela, cada item vale o dobro. Como o horário é conhecido, as equipes se planejam: nos primeiros minutos elas trabalham e guardam o que já está pronto, para entregar na hora certa. Quando chega o horário, o professor avisa ("Começou o Happy Hour!") e as equipes entregam o que prepararam, o que cria um pico de energia na sala. Quando o tempo acaba, os pontos voltam ao normal. No final, o professor soma os pontos e comenta quem planejou melhor.',
        supportTools: text(
          'Cronômetro ou relógio da sala (celular ou tela projetada)',
          'Quadro da sala com o horário do Happy Hour e a pontuação das equipes',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'pausas-de-tortura',
      name: 'Pausas de Tortura',
      description:
        'Uma pausa de tortura significa uma interrupção repentina, geralmente acionada por um determinado gatilho de ações desejadas (Chou, 2016). A exemplo disso, jogos que possuem "vidas" limitadas e após a perda da última chance, o jogador precisa esperar um tempo antes de poder receber outra chance para subir de nível (Chou, 2026).',
      activity: {
        description:
          'Em qualquer atividade que o professor já tinha planejado (testar um sistema, criar casos de teste, resolver exercícios de técnica), ele acrescenta o sistema de vidas. No começo da aula, desenha 3 corações ao lado do nome de cada equipe no quadro. Cada vez que a equipe entrega algo que o professor recusa (um bug que não é válido, um caso de teste errado, uma resposta incorreta), ela perde 1 coração. Quando perde o último, acontece a pausa de tortura: a equipe fica 5 minutos parada, sem usar computador nem entregar nada, e só pode conversar baixinho sobre o que errou. Passados os 5 minutos, a equipe volta com 2 corações. A pausa é curta de propósito, para que a equipe sinta a frustração de ficar parada, mas volte motivada e mais cuidadosa. Enquanto isso, as outras equipes continuam avançando, o que aumenta a vontade de não perder a última vida. No final, o professor comenta que os erros foram uma chance de aprender e mostra quantos corações cada equipe ainda tinha.',
        supportTools: text(
          'Quadro da sala com giz ou marcador (3 corações ao lado de cada equipe)',
          'Cronômetro (celular ou tela projetada) para os minutos de pausa',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'interface-evoluida',
      name: 'Interface de Usuário Evoluída',
      description:
        'Esta técnica está associada a sobreposição de informações, seja de desempenho, equipe e demais recursos, sendo uma das interfaces de comunicação mais complexas que existem (Chou, 2026). Como é o caso da criação do Google Labs, que permite que os usuários lidem com recursos mais complexos para realizar tarefas (Chou, 2026).',
      activity: {
        description: text(
          'Em qualquer aula de conteúdo que o professor já tinha planejado (tipos de teste, técnicas de caixa-preta, níveis de teste), a turma constrói um Mapa do Conhecimento no Miro. O mapa começa simples e ganha camadas de informação conforme a aula avança, como uma tela de jogo que vai mostrando mais dados. O professor cria um quadro com o tema no centro e libera as camadas aos poucos:',
          '- Camada 1 (começo da aula): cada equipe cria uma nota adesiva com um conceito do tema (ex.: "valor limite", "partição de equivalência").',
          '- Camada 2 (depois da explicação): cada equipe acrescenta, ao lado da sua nota, uma definição em uma frase, com as próprias palavras.',
          '- Camada 3 (no fim da aula): cada equipe acrescenta um exemplo prático e liga o seu conceito a outro do mapa com um conector, escrevendo no conector como eles se relacionam (ex.: "usa a ideia de").',
          '- Camada 4 (opcional): cada equipe marca com uma cor o quanto domina o conceito: 🟢 entendi, 🟡 mais ou menos, 🔴 ainda tenho dúvida.',
          'Como as camadas aparecem aos poucos, o quadro nunca fica confuso no começo, e cada nova camada mostra mais sobre o que a turma sabe. No final, o professor olha as notas 🟡 e 🔴 e revisa só esses pontos, em vez de repetir tudo.',
        ),
        supportTools: 'Miro - https://miro.com/signup/',
        learningObjectIds: [],
      },
    },
    {
      id: 'ritmo-de-premiacao',
      name: 'Ritmo de Premiação',
      description:
        'Consiste em recompensas que são distribuídas aos poucos (Chou, 2026); como é o caso da distribuição de prêmios para a completude de peças de jogos, que poderiam ser colecionadas e resgatadas quando o jogador reunisse todas as peças de uma determinada categoria.',
      activity: {
        description: text(
          'O professor aplica a lista de exercícios ou questões que já tinha planejado sobre qualquer conteúdo da disciplina. Cada questão resolvida corretamente vale pontos de gamificação, e as recompensas vêm aos poucos, ao longo da aula, em vez de só no final:',
          '- A cada questão correta: a equipe ganha 10 pontos.',
          '- Aos 30 pontos (3 questões): ganha um prêmio pequeno, como uma "Dica do Professor".',
          '- Aos 60 pontos (6 questões): ganha um prêmio médio, como "Pular uma questão".',
          '- Aos 100 pontos (10 questões): ganha o prêmio final, como 5 décimos extras na disciplina ou o título de "Equipe Mestre do Teste".',
          'Quando uma equipe atinge uma faixa, o professor avisa em voz alta e entrega o prêmio na hora. Como sempre há um prêmio próximo, os alunos continuam motivados a resolver a questão seguinte, em vez de só esperarem o fim da aula.',
        ),
        supportTools:
          'Lista de questões que o professor já tinha preparado ou Google Forms, que somam os pontos sozinhos, se preferir uma versão digital',
        learningObjectIds: [],
      },
    },
    {
      id: 'contagem-regressiva',
      name: 'Contagem Regressiva',
      description:
        'Um cronômetro regressivo é um indicador visual para comunicar a passagem de tempo para um evento concreto; ou para anunciar o início ou fim de uma grande oportunidade (Chou, 2026). Esta, pode ser exemplificada por meio de missões que devem ser realizadas em um curto espaço de tempo.',
      activity: {
        description: text(
          'Em qualquer tarefa que o professor já tinha planejado para a aula (resolver questões, criar casos de teste, testar um sistema, escrever relatos de bug), ele transforma cada etapa em uma missão relâmpago com um cronômetro regressivo projetado na tela, visível para toda a turma. O professor divide a aula em 3 ou 4 missões curtas e, antes de cada uma, anuncia o que deve ser feito e o tempo disponível:',
          '- Missão 1 (5 minutos): "Listar 3 casos de teste para o campo de e-mail."',
          '- Missão 2 (8 minutos): "Resolver as questões 1 e 2 da lista."',
          '- Missão 3 (3 minutos): "Revisar a resposta com a equipe e escolher a melhor."',
          'Ao apertar o play, o cronômetro começa a descer em tela cheia, e quando faltam 60 segundos o professor avisa em voz alta ("Falta 1 minuto!"). Ao chegar a zero, toca um alarme, e as equipes precisam parar e entregar o que conseguiram. Cada missão concluída dentro do tempo vale 1 ponto, que o professor anota ao lado do nome da equipe. Como o tempo é curto e está sempre à vista, a turma foca no que é essencial e trabalha com mais energia. No final, o professor soma os pontos e comenta como a pressão do tempo afetou as respostas.',
        ),
        supportTools:
          'Cronômetro regressivo na tela (ex.: Online Stopwatch, TimeTimer, ou o timer do Google, que aparece ao pesquisar "timer 5 minutos")',
        learningObjectIds: [],
      },
    },
  ],
};
