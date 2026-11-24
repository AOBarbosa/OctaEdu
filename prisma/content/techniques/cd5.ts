import { CoreDriveTechniques, text } from '../types';

export const CD5: CoreDriveTechniques = {
  coreDriveId: 5,
  techniques: [
    {
      id: 'mentoria',
      name: 'Mentoria',
      description:
        'Chou (2026) descreve esta técnica como a situação em que há um membro mais experiente em um determinado contexto que é designado para acompanhar um novo membro, de modo que oferece orientação e apoio emocional; além de manter os jogadores veteranos engajados até o final do jogo.',
      generalExample:
        'A exemplo disto, a existência de um mentor no ambiente de trabalho, auxiliará os funcionários a se conectarem melhor com a cultura e o ambiente de trabalho que estão sendo inseridos.',
      activity: {
        description:
          'No início da aula, o professor faz um aquecimento rápido de 5 minutos: todos testam um campo simples e anotam quantos erros acharam. Quem achou mais vira mentor, e quem achou menos vira aprendiz. O professor forma as duplas mentor-aprendiz. O mentor não pode dar a resposta pronta nem usar o computador do colega. O papel dele é acompanhar o aprendiz e fazer perguntas que o ajudem a descobrir sozinho, como "O que acontece se você deixar o campo vazio?" ou "E se a data for no futuro?". O mentor também dá apoio e incentivo ("boa, você achou um!"), porque o objetivo é o aprendiz se sentir seguro. A missão da dupla é encontrar pelo menos 3 bugs. No final, o aprendiz escreve o relato de um bug e o mentor revisa e dá um feedback. A dupla apresenta um bug para a turma, e o mentor ganha o título simbólico de "Mentor de Testes", o que mantém os alunos mais experientes engajados até o fim da aula.',
        learningObjectIds: ['pizzatest'],
      },
    },
    {
      id: 'botoes-de-ostentacao',
      name: 'Botões de Ostentação e Prateleira de Troféus',
      description:
        'A ostentação ocorre quando o jogador explicita verbalmente as suas conquistas e realizações, enquanto uma prateleira de troféus permite a exibição do que se foi conquistado, sem que isso tenha sido dito (Chou, 2016). Esse incentivo para que os jogadores se gabem e exibam suas conquistas é útil para recrutar novos jogadores e manter os veteranos ativos (Chou, 2016).',
      generalExample:
        'Esta, pode ser exemplificada por meio do compartilhamento da realização de missões em uma rede social.',
      activity: {
        description:
          'A turma testa uma Lista de Tarefas simples, em que o usuário digita uma tarefa e clica em "Adicionar". Os alunos testam ideias como tarefa vazia, tarefa muito longa, caracteres especiais, a mesma tarefa repetida e muitas tarefas seguidas. O professor escreve no quadro o nome de cada equipe, uma coluna por equipe, e esse quadro é a prateleira de troféus. A cada bug válido encontrado, o professor desenha ao lado do nome da equipe um troféu (ou uma estrela) e escreve o nome do bug (ex.: "Tarefa Vazia"). Assim, todos veem as conquistas de cada equipe sem ninguém precisar falar nada. Quem vê o quadro cheio de troféus dos colegas sente vontade de conquistar mais, e as equipes que já têm vários continuam motivadas a manter a liderança até o fim da aula.',
        learningObjectIds: ['todolist', 'pizzatest'],
      },
    },
    {
      id: 'missoes-em-grupo',
      name: 'Missões em Grupo',
      description:
        'A aplicação desta técnica ocorre quando são implementados desafios nos quais os jogadores trabalham juntos em equipe para alcançar um objetivo comum, incentivando o trabalho em equipe e a cooperação (Inano, 2024).',
      generalExample:
        'A exemplo disso, existem jogos com missões que desafiam uma equipe inteira para que seja resolvido, cada um especializado nas próprias responsabilidades para concluir a missão (Chou, 2026).',
      activity: {
        description: text(
          'A turma é dividida em equipes de 4 alunos, e cada equipe recebe a mesma missão: garantir que um pedido de pizza funcione do começo ao fim no PizzaTest, sem nenhum erro. Para isso, cada aluno recebe um papel com uma responsabilidade própria:',
          '- Testador de Entrega: testa as zonas de entrega (0 a 3 km, 3 a 7 km e 7 a 15 km) e o valor da taxa',
          '- Testador de Cardápio: testa os tamanhos (P, M e G) e o cálculo do sub-total',
          '- Testador de Cupom e Extras: testa o cupom BBTEST, o embrulho, a retirada no balcão e os pontos de fidelidade',
          '- Relator: junta os bugs dos três colegas e escreve o relatório final da equipe',
          'A missão só é concluída quando os quatro entregam a sua parte, porque o relatório precisa cobrir todas as áreas. Se uma parte ficar de fora, a equipe não fecha a missão. Durante a aula, os colegas podem se ajudar, pois o objetivo é da equipe e não individual. No final, cada equipe lê em voz alta o seu relatório, e o professor confere se a missão foi cumprida, ou seja, se o pedido completo foi testado em todas as áreas.',
        ),
        learningObjectIds: ['pizzatest'],
      },
    },
    {
      id: 'tesouros-sociais',
      name: 'Tesouros Sociais e Economia da Gratidão',
      description:
        'Os tesouros sociais representam presentes ou recompensas que só podem ser dados a um jogador por outros jogadores (Chou, 2026); como é o caso de presentear um amigo com tempo extra para a resolução de uma questão. Quando os ecossistemas gamificados geram um ambiente de generosidade e que recompense este ato, as pessoas poderão se sentir mais à vontade, uma vez que não são suficientemente valorizadas em suas atividades diárias (Chou, 2026).',
      activity: {
        description: text(
          'O professor aplica a atividade que já tinha planejado (testar um sistema, criar casos de teste, fazer um exercício de técnica etc.) e só acrescenta uma regra no começo: "Hoje cada um tem 2 cartas de presente que não pode usar para si, só pode dar a um colega." As cartas são os tesouros sociais, e podem ser de dois tipos:',
          '- Carta "Tempo Extra": o colega ganha 2 minutos a mais na atividade',
          '- Carta "Dica": o aluno ajuda o colega com uma dica sem entregar a resposta',
          'Durante a atividade, o aluno decide a quem dar cada carta, por exemplo, a quem o ajudou ou a quem está com dificuldade. Para criar a economia da gratidão, no final da aula o professor pergunta: "Quem quer agradecer a um colega?" e escreve no quadro o nome de quem foi agradecido e o motivo (ex.: "Ana, por explicar o valor limite"). Assim, o ato de ajudar é reconhecido e valorizado, sem mudar nada na atividade original.',
        ),
        supportTools: 'Cartas presentes podem ser enviadas como notícia pelo SIGAA.',
        learningObjectIds: [],
      },
    },
    {
      id: 'produtos-sociais',
      name: 'Produtos Sociais',
      description:
        'Nesta ação, há um esforço mínimo para gerar uma interação social (Chou, 2016). Como por exemplo, a recomendação de perfis profissionais em plataformas de divulgação e seleção de empregos (Chou, 2026).',
      activity: {
        description:
          'O professor cria um repositório no GitHub para a turma, e cada equipe registra os bugs que encontrar como issues, usando um sistema ou código com erros que o professor já ia aplicar na aula. Cada issue tem um título e três campos: passos para reproduzir, resultado esperado e resultado obtido. Em seguida, o professor abre uma rodada de recomendações rápidas, inspirada nas recomendações do LinkedIn: cada aluno reage com um clique às issues das outras equipes que achou claras ou interessantes, usando as reações do GitHub (👍 para "relato claro", 🎯 para "bug difícil de achar", 💡 para "boa ideia"). O esforço é mínimo, só um clique, então todos participam, e cada aluno vê na hora quantas reações o seu relato recebeu. Se quiser, o aluno também pode escrever um comentário curto na issue (ex.: "Reproduzi aqui também"). No final, o professor ordena as issues pelas mais reagidas, comenta as três primeiras e explica por que são bons relatos.',
        supportTools: 'GitHub Issues (repositório da turma, com a aba Issues ativada)',
        learningObjectIds: [],
      },
    },
    {
      id: 'bebedouros',
      name: 'Bebedouros',
      description:
        'Esta técnica também é uma forma de ancoragem, por meio do estabelecimento de espaços de convivência, fazendo analogia ao bebedouro de uma empresa (Chou, 2026). A exemplo desta, a implementação de fóruns de discussão em um site, que são úteis para se conectar, compartilhar ideias e experiências (Chou, 2026).',
      activity: {
        description: text(
          'O professor cria, na turma virtual do SIGAA, um fórum chamado "Bebedouro dos Testadores", descrito como um espaço livre e informal para conversar sobre teste de software, sem nota e sem obrigação. Ele abre alguns tópicos leves para dar o primeiro empurrão:',
          '- "Qual o bug mais estranho que você já viu?": os alunos contam bugs de apps, jogos ou sites que usam no dia a dia',
          '- "Dúvida de teste? Pergunte aqui": qualquer aluno pode postar uma dúvida, e os colegas respondem antes do professor',
          '- "Achei isso e achei legal": espaço para compartilhar notícias, vídeos ou ferramentas de teste',
        ),
        supportTools: 'Aba "Fóruns" da turma virtual do SIGAA',
        learningObjectIds: [],
      },
    },
    {
      id: 'ancora-de-conformidade',
      name: 'Âncora de Conformidade',
      description:
        'Durante a aplicação desta técnica, é incorporado um efeito de produtos e experiências que mostra aos usuários por meio de mecanismos de feedback, o quão próximos das normas sociais eles estão (Chou, 2016). Esta, pode ser observada a partir de campanhas para motivar famílias a consumirem menos energia, utilizando gráficos sobre o consumo dos seus vizinhos (Chou, 2026); gerando um efeito de comparação.',
      activity: {
        description: text(
          'A turma testa a Lista de Tarefas simples, em que o usuário digita uma tarefa e clica em "Adicionar". Depois de 10 minutos de teste livre, o professor faz uma checagem rápida com a turma e anota no quadro uma tabela com tipos de teste comuns:',
          '- Tarefa vazia',
          '- Tarefa muito longa',
          '- Caracteres especiais',
          '- Mesma tarefa repetida',
          '- Muitas tarefas seguidas',
          'O professor pergunta, por levantar de mãos: "Quem já testou isso?" e escreve ao lado de cada tipo a porcentagem aproximada da turma (ex.: "Tarefa vazia: 90%", "Muitas tarefas seguidas: 20%"). Com isso, cada equipe vê o quão perto está do que a maioria faz. Quem ainda não testou o que quase todos já testaram percebe que está fora do padrão e corre para fazê-lo. Quem já fez algo que só poucos fizeram se sente à frente e pode compartilhar a ideia. O professor repete a checagem no fim da aula, e a turma vê como os números se aproximaram. É a mesma lógica das contas de energia que mostram o consumo dos vizinhos: o feedback de comparação empurra as pessoas para o comportamento esperado.',
        ),
        learningObjectIds: ['todolist'],
      },
    },
  ],
};
