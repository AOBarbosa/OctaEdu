import { CoreDriveTechniques, text } from '../types';

export const CD4: CoreDriveTechniques = {
  coreDriveId: 4,
  techniques: [
    {
      id: 'construir-do-zero',
      name: 'Construir do Zero',
      description:
        'Ao criar um produto ou serviço, muitas vezes pode ser desejável que os usuários sintam que têm uma participação mais ativa no processo criativo (Chou, 2016). Para Chou (2016), "construir do zero", significa que, invés de entregar tudo pronto, pode-se incluir os indivíduos no processo, gerando um sentimento de pertencimento.',
      generalExample:
        'Esta, deve ser oferecida aos usuários com alguns modelos rápidos que permitam um avanço ágil e personalizado, ou deve garantir que a propriedade técnica de criação do zero, seja uma primeira grande conquista que gere entusiasmo para jogar.',
      activity: {
        description:
          'O professor não entrega nenhum sistema nem indica a técnica a ser usada, só uma frase com a regra de negócio: "Uma lanchonete dá 10% de desconto para compras acima de R$ 50 e frete grátis para compras acima de R$ 100." Cada dupla recebe um modelo rápido de caso de teste em branco e decide livremente como vai testar: quais valores usar, quantos casos criar e como organizá-los. O professor só orienta que cada teste tenha o dado de entrada e o resultado esperado. Depois, as duplas trocam os casos de teste entre si e analisam o que o colega pensou e o que ficou de fora. No final, o professor mostra que cada dupla criou um conjunto diferente de testes e apresenta os nomes das técnicas que os alunos usaram, mesmo sem saber (ex.: valor limite, partição de equivalência). Os alunos sentem que o material é deles, pois foi criado do zero e do jeito que escolheram.',
        supportTools:
          'Modelo de caso de teste em branco (Google Planilhas ou papel), com as colunas: ID, entrada, resultado esperado',
        learningObjectIds: [],
      },
    },
    {
      id: 'conjuntos-de-colecao',
      name: 'Conjuntos de Coleção',
      description:
        'Ferramentas que incentivam os usuários a reunir itens e/ou conquistas relacionadas, criando uma sensação de propriedade e realização (Inano, 2024).',
      generalExample:
        'Chou (2016), exemplifica esta técnica por meio do oferecimento de itens, personagens ou emblemas aos jogadores, e os informe que fazem parte de um conjunto temático, isso desperta o desejo de coletar todos os elementos para completar o conjunto.',
      activity: {
        description:
          'No início da aula, o professor mostra um painel com emblemas vazios, sem dizer qual técnica de teste cada um representa. Os emblemas têm nomes por tipo de conquista, como "Primeiro Bug", "Bug Escondido", "Caso Inusitado", "Relato Claro" e "Teste em Dupla". A turma recebe o Reprodutor de Música e testa livremente, do jeito que quiser: tocar e pausar, mexer na barra de tempo, mudar o volume, ativar o filtro passa-baixa e combinar essas ações. Sempre que o aluno achar que cumpriu uma conquista, ele mostra ao professor e ganha o emblema. No final, o professor revela as técnicas que os alunos usaram sem perceber (ex.: o "Caso Inusitado" pode ter sido um teste de valor limite, como volume no mínimo e no máximo, ou o tempo em 0:00 e no fim da música) e conecta cada emblema a um conceito da disciplina. A vontade de completar o conjunto leva os alunos a testar de formas variadas, em vez de repetir o mesmo tipo de teste.',
        learningObjectIds: ['reprodutor-de-musica'],
      },
    },
    {
      id: 'pontos-trocaveis',
      name: 'Pontos Trocáveis ou Almoço Ganho',
      description:
        'Existem dois tipos principais de pontos que um sistema gamificado pode conceder aos seus usuários, os pontos de status (mencionados no Core Drive 1), e os pontos trocáveis, nos quais os usuários podem utilizar seus pontos acumulados de maneira estratégica e escassa para obter outros itens de valor (Chou, 2016).',
      generalExample:
        'Estes podem ter diversos modos de aplicação, tais como: pontos resgatados dentro da economia do jogo por itens de valor ou recompensas e a realização de trocas com pessoas que estão fora do sistema gamificado (Chou, 2016). É necessário considerar cuidadosamente as proporções corretas entre esforço, tempo, capacidade de troca e recompensa, ajustando constantemente o equilíbrio para garantir que os jogadores continuem valorizando seus pontos e sistema monetário (Chou, 2016).',
      activity: {
        description: text(
          'Divisão em duas aulas: Na primeira aula, cada equipe começa com 5 moedas de teste. A turma testa um sistema simples (ex.: o sistema CursoTest) e ganha moedas durante a atividade: 1 por bug válido encontrado, 2 por um relato de bug bem escrito e 1 por ajudar uma equipe de outro grupo. Durante a aula, as equipes podem gastar as moedas na "lojinha":',
          '- 2 moedas: uma dica do professor',
          '- 3 moedas: um minuto extra de teste',
          '- 10 moedas: 1 décimo na nota (a recompensa final, valendo uma vez por aluno)',
          'Como o décimo é caro, a equipe precisa decidir: gastar moedas em ajudas agora ou guardar tudo para o prêmio. Na segunda aula (ou nos últimos 15 minutos da primeira), as equipes fazem o "fechamento": somam as moedas que sobraram e trocam pelo décimo quem chegou a 10. O professor confere os relatos e mostra o placar final com o saldo de cada equipe. Para a aula ser equilibrada, o professor pode ajustar o preço do décimo durante a atividade, se perceber que nenhuma equipe vai conseguir ou que todas vão conseguir fácil.',
        ),
        learningObjectIds: ['cursotest'],
      },
    },
    {
      id: 'vinculo-de-monitoramento',
      name: 'Vínculo de Monitoramento',
      description:
        'Esta técnica de jogo permite que as pessoas desenvolvam um maior senso de propriedade em relação a algo, levando-as a monitorá-lo ou prestar-lhe atenção constantemente (Chou, 2016).',
      generalExample:
        'A exemplo disto, se um indivíduo acompanha constantemente a evolução de certos números, este, se envolve cada vez mais com o sucesso e crescimento deles (Chou, 2016).',
      activity: {
        description:
          'O professor divide a turma em equipes. Cada equipe "adota" uma parte do CursoTest, como se fosse dela: uma equipe adota o login, outra a busca de cursos, outra a avaliação de curso (nota de 1 a 5) e outra o botão de contraste. Como o foco do sistema é usabilidade, a equipe monitora números sobre a experiência de uso da sua parte: quantos problemas de usabilidade encontrou (ex.: texto difícil de ler, botão confuso, mensagem de erro pouco clara), quantos passos são necessários para concluir uma tarefa e quantos testes já fez. O painel fica visível na sala, e a cada 10 minutos o professor pede que as equipes atualizem os números e comparem com a rodada anterior. Como a parte é "delas", os alunos passam a se preocupar com a evolução do painel e com os problemas que ainda não descobriram. No final da aula, cada equipe apresenta o painel e explica onde acha que ainda podem existir problemas. Para durar duas aulas, a equipe retoma o painel na segunda aula e vê se os números continuam crescendo.',
        learningObjectIds: ['cursotest'],
      },
    },
    {
      id: 'efeito-alfred',
      name: 'Efeito Alfred',
      description:
        'Nesta técnica de jogo, o "Efeito Alfred" acontece quando os usuários sentem que um determinado produto ou serviço é tão personalizado para as suas necessidades que não conseguem se imaginar utilizando outro serviço (Chou, 2016).',
      generalExample:
        'Este, pode ser exemplificado por meio de recomendações de streamings (Chou, 2026), que atuam com elementos mapeados e personalizados.',
      activity: {
        description:
          'No início da aula, o professor mostra dois ou três sistemas prontos, de diferentes níveis de complexidade, e pede que cada aluno escolha o que mais combina com ele. Depois, o aluno escolhe também o seu estilo de teste em um cardápio de 3 opções: "Explorador" (testa livremente, sem roteiro), "Detetive" (procura erros em campos e botões) ou "Usuário" (testa como uma pessoa comum usaria). Ele anota as escolhas em uma ficha simples e testa do seu jeito. No final, cada aluno escreve duas linhas: "O que mais gostei de testar" e "O que eu faria diferente". Como o aluno montou o próprio caminho, ele sente que a atividade tem a ver com ele. O professor não precisa preparar nada individual, só deixar o cardápio pronto.',
        learningObjectIds: ['apenas-um-formulario', 'cursotest', 'pizzatest'],
      },
    },
    {
      id: 'bens-virtuais',
      name: 'Bens Virtuais',
      description:
        'São itens de propriedade digital que podem ser obtidos pelos usuários, personalizados ou até negociados dentro de uma experiência gamificada (Chou, 2026). Como é o caso de bens funcionais que podem promover reforço, ou itens que mudem a aparência ou a estética de um usuário, atuando como símbolos de conquista (Chou, 2026).',
      activity: {
        description: text(
          'A turma testa o PizzaTest, um sistema de pedidos de pizza que tem tamanhos (P, M e G), zonas de entrega por distância, um cupom de desconto e extras como embrulho e pontos de fidelidade. Cada equipe ganha fichas quando acha um bug e o professor confirma que ele é válido: 1 ficha por bug. Com as fichas, a equipe "compra" bens virtuais em uma mesa de trocas, que o professor monta uma única vez antes da aula, com uma lista de itens e preços:',
          '- Itens que ajudam na atividade: "Dica do Professor" (3 fichas) e "Minuto Extra" (5 fichas).',
          '- Itens só de aparência (símbolo de conquista): "Chapéu de Chef" (5 fichas), "Título de Mestre Pizzaiolo" (10 fichas).',
          'Os itens de aparência devem ser escritos no quadro da sala abaixo do nome de cada equipe. A equipe escolhe quais itens comprar e como montar o seu perfil. As equipes também podem trocar itens de ajuda entre si. No final, as equipes podem comparar as descobertas, e o professor só conta quantos bugs cada uma achou.',
        ),
        learningObjectIds: ['pizzatest'],
      },
    },
    {
      id: 'avatar',
      name: 'Avatar',
      description:
        'Os avatares são acessórios e ferramentas de engajamento, além de permitir que os usuários participem socialmente sem uma superexposição, que se tornem reconhecíveis sem precisar abrir mão da privacidade, de modo que se sintam representados dentro de um sistema (Chou, 2026).',
      generalExample:
        'A exemplo disso, a personalização da imagem de usuário, que pode ter itens adicionados após a conclusão de missões.',
      activity: {
        description:
          'Fazer uma atividade no Kahoot: No início da aula, cada aluno entra no Kahoot com um nome de avatar fictício (ex.: "Agente Bug", "Detetive Vírgula") em vez do nome real, e desenha ou escolhe uma imagem simples para o seu personagem. No placar do Kahoot aparecem só os nomes dos avatares, então ninguém se expõe ou é comparado diretamente com os colegas. O professor aplica perguntas sobre conceitos de um conteúdo de teste. No final, os avatares serão exibidos no pódio, e o professor comenta os resultados pelos nomes dos avatares. Assim, o aluno se sente representado e reconhecido na turma, sem se expor.',
        supportTools: 'Kahoot',
        learningObjectIds: [],
      },
    },
    {
      id: 'missao-do-protetor',
      name: 'Missão do Protetor',
      description:
        'Esta técnica baseia-se no conceito de ocorrência de pessoas que começam a desenvolver um relacionamento com algo que estão protegendo (Chou, 2026).',
      generalExample:
        'Chou (2026) exemplifica esta técnica, com um jogo que carece da proteção de certos animais contra predadores, precisando livrá-los do perigo iminente, e consequentemente, o jogador passa a sentir conexão com os animais, uma vez que o cérebro precisa justificar suas ações como significativas.',
      activity: {
        description:
          'O professor entrega a cada equipe um cartão de cliente fictício que ela precisa proteger, como "Dona Maria, 70 anos, mora a 12 km da pizzaria e vai usar o cupom BBTEST" ou "Lucas, estudante, quer retirar no balcão e usar pontos de fidelidade". A missão da equipe é fazer o pedido desse cliente no PizzaTest e proteger o cliente dos bugs, como cobrança errada, desconto que não aplica, taxa de entrega incorreta ou pedido que some. Cada bug encontrado é um "perigo evitado" para aquele cliente, e a equipe anota no cartão o que teria acontecido com ele (ex.: "Dona Maria pagaria R$ 8 a mais na entrega"). Ao final, cada equipe apresenta em 1 minuto: "Eu protegi [nome do cliente] de [bug]". Como cada equipe tem um cliente específico para cuidar, ela passa a se importar com o que acontece com ele, e o teste ganha um significado além de "achar defeitos".',
        learningObjectIds: ['pizzatest'],
      },
    },
  ],
};
