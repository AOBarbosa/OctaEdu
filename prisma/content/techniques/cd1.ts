import { CoreDriveTechniques } from '../types';

const JUNIT = 'Compilador com Java (JUnit) para escrever os testes e o código';

export const CD1: CoreDriveTechniques = {
  coreDriveId: 1,
  techniques: [
    {
      id: 'narrativa',
      name: 'Narrativa',
      description:
        'A maioria dos jogos se iniciam a partir de uma narrativa que oferece ao jogador um contexto e uma motivação pela qual se deve jogar (Chou, 2016). Por meio de uma narrativa envolvente, nasce um propósito maior durante a interação com o jogador.',
      generalExample:
        'A exemplo disso, um jogo que propõe uma história sobre salvar o mundo, pode proporcionar ao jogador uma sensação de significado épico (Inano, 2024).',
      activity: {
        description:
          'O professor conta uma história para a turma: uma farmácia fictícia (FarmaTest) vai lançar um sistema novo de vendas e controle de estoque, mas ele está com problemas. Ele pode cobrar o preço errado, vender remédio vencido ou trocar um medicamento por outro. Os alunos integrarão a equipe de qualidade e, individualmente, precisam encontrar esses erros antes que clientes sejam prejudicados. No final, o professor mostra quais erros foram encontrados e quais problemas eles evitaram.',
        learningObjectIds: ['farmatest'],
      },
    },
    {
      id: 'elitismo',
      name: 'Elitismo',
      description:
        'Esta técnica permite que os usuários formem grupos baseados em interesses e condições em comum, para que se sintam parte de uma causa maior, incitando orgulho ao grupo, de maneira que cada membro deve buscar preservar esse orgulho por meio de ações específicas, além de tentar frustrar os rivais, para superar a concorrência (Chou, 2016).',
      generalExample:
        'Esta técnica pode ser ilustrada pela rivalidade entre times durante temporadas esportivas (Chou, 2016), em que ambos os lados têm o senso de elitismo instalado representando o orgulho presente em fazer parte de um determinado grupo.',
      activity: {
        description:
          'A turma é dividida em equipes de teste que competem entre si para encontrar o maior número de erros no sistema da farmácia FarmaTest. Cada equipe escolhe um nome, um grito de guerra e um símbolo (ex.: "Caçadores de Bugs"), criando orgulho de pertencer ao grupo. Os erros encontrados valem pontos, e as equipes só ganham se os relatos forem claros e válidos. Assim, cada equipe se esforça para manter sua reputação e superar as rivais. Ao final, a equipe campeã receberá o título de "Melhor Equipe de Qualidade da FarmaTest".',
        learningObjectIds: ['farmatest'],
      },
    },
    {
      id: 'heroi-da-humanidade',
      name: 'Herói da Humanidade',
      description:
        'O conceito desta técnica busca fazer com que os usuários possam sentir que estão causando um impacto positivo na humanidade por meio das suas ações (Inano, 2024). Quando há a incorporação de um tipo de impacto global a uma missão, pode-se conquistar ainda mais adesão durante o processo de integração (Chou, 2016).',
      generalExample:
        'A exemplo disto, Chou (2016) cita a efetivação de uma boa ação, como doações, a cada resposta correta provinda de perguntas educacionais.',
      activity: {
        description:
          'O professor pode utilizar um sistema que as pessoas realmente usam e possui problemas, como o site de uma biblioteca, e diz à turma: "Se esse site tem erros, muita gente tem dificuldade de usá-lo, como idosos, pessoas com deficiência ou quem tem internet lenta." Os alunos testam o site e anotam os problemas que encontram. No final, a turma monta uma lista de melhorias e a entrega para o professor ou para a instituição.',
        learningObjectIds: ['bibliotest'],
      },
    },
    {
      id: 'proposito-maior',
      name: 'Propósito Maior',
      description:
        'A partir das definições citadas por Chou (2016), entende-se que o elemento de jogo "propósito maior" consiste em uma atividade capaz de fazer com que os jogadores executem tarefas e façam sacrifícios pessoais em prol de uma missão específica para atingir um objetivo final.',
      generalExample:
        'Esta, pode ser ilustrada através da visão de longo prazo que um líder possui para um grupo, e então precisa sacrificar o seu próprio bem estar em prol do propósito maior que o apaixona (Chou, 2016).',
      activity: {
        description:
          'No início da aula, o professor apresenta o Objeto de Aprendizagem PhotoTest e diz: "Um fotógrafo vai usar esse sistema amanhã com clientes reais. Se o cálculo do orçamento ou o cadastro tiverem erros, ele pode perder dinheiro ou cobrar errado. Nesta aula, vocês são a última chance de ele ter um sistema confiável." A turma tem um único objetivo: montar, em conjunto, a lista dos erros do sistema antes do fim da aula. Cada aluno (ou dupla) fica responsável por uma parte: cadastro, cálculo do orçamento, comentários ou envio de imagens. Todos precisam testar e registrar suas descobertas rápido, porque a lista só fica completa se cada parte for entregue. No final, a turma junta tudo em uma lista única e o professor, no papel do fotógrafo, agradece e diz quantos erros importantes foram encontrados.',
        learningObjectIds: ['phototest'],
      },
    },
    {
      id: 'sorte-de-principiante',
      name: 'Sorte de Principiante',
      description:
        'Esta técnica de jogo está associada ao termo "Chamado", esse conceito faz com que os indivíduos acreditem que possuem um destino único para a realização de algo (Chou, 2016), dessa forma, o jogador tende a se sentir escolhido para agir.',
      generalExample:
        'Para exemplificá-la, se no primeiro dia, o jogador obtiver uma conquista poderosa no jogo aleatoriamente, é muito provável que ele não o abandone de imediato.',
      activity: {
        description:
          'No começo da aula, cada aluno recebe um "convite especial" dizendo que foi escolhido para encontrar os bugs de um formulário. O professor pede que cada um teste o formulário do jeito que quiser, sem nenhuma explicação antes. Quase todo mundo vai achar algo logo de cara, como o botão "Enviar", que é difícil de clicar, ou campos que aceitam dados estranhos. Esse acerto rápido dá a sensação de talento natural e de "sorte de principiante". Em seguida, o professor explica que o aluno usou, sem saber, a técnica de partição de equivalência: dividir os dados em grupos que se comportam do mesmo jeito (ex.: e-mail válido, e-mail sem "@", e-mail vazio) e testar um de cada grupo. A turma aplica a técnica de forma consciente nos campos Nome, Email e Data de Nascimento (testando datas no futuro, datas impossíveis como 31/02 e campos vazios). No final, o professor mostra que o primeiro acerto não foi sorte, e sim o começo de uma técnica que eles já sabem usar.',
        learningObjectIds: ['apenas-um-formulario'],
      },
    },
    {
      id: 'almoco-gratis',
      name: 'Almoço Grátis',
      description:
        'Este elemento de jogo também segue o conceito de "Chamado", ao oferecer brindes (que geralmente não são gratuitos) para pessoas selecionadas, de maneira com que sejam vinculadas a propostas mais amplas, pode fazer com que os indivíduos sintam-se especiais e incentivá-los a realizar novas ações (Chou, 2016).',
      generalExample:
        'Para exemplificá-lo, Chou (2016) cita a ação promovida por uma rede de restaurantes que ofereceu almoço grátis para qualquer mulher que dissesse à equipe que era bonita, em comemoração ao Dia Internacional da Mulher.',
      activity: {
        description:
          'No começo da aula, o professor diz que os alunos foram "selecionados" para testar o formulário "Apenas um Formulário" e, como presente de boas-vindas, cada um recebe um brinde sem ter feito nada ainda: uma "dica secreta" de teste (ex.: "teste sempre um campo vazio antes de qualquer outro valor"). Os que aceitarem o convite e começarem a testar ganham outro brinde simbólico, como uma "carta coringa" que permite pedir uma ajuda ao professor durante a atividade. O brinde está ligado a algo maior: a dica secreta é a base da técnica de partição de equivalência, que o professor explica no fim. Com ela, a turma entende que o campo vazio, o e-mail sem "@" e a data impossível são grupos diferentes de dados, e que basta testar um de cada grupo. Assim, o aluno se sente especial por ter recebido algo e aproveita para testar mais e melhor.',
        learningObjectIds: ['apenas-um-formulario'],
      },
    },
    {
      id: 'filho-do-destino',
      name: 'Filho do Destino',
      description:
        'Neste elemento de jogo, um jogador assume um papel importante na história da mitologia de um determinado mundo, ou em termos de jogabilidade (Raditya e Pratama, 2025).',
      generalExample:
        'Este, pode ser exemplificado por meio de um acontecimento inesperado em que o jogador ganha novas características e atribuições.',
      activity: {
        description:
          'O professor conta uma história: uma loja de ingressos vai lançar a venda de um grande show, mas a função que calcula o preço com desconto (estudante paga metade, idoso paga metade, os demais pagam o valor inteiro) ainda não existe. Cada dupla de alunos recebe um papel importante na história. Na primeira parte, o primeiro aluno é o "Guardião do Teste": ele escreve primeiro os testes dizendo o que a função deve fazer, antes de qualquer código existir, e vê os testes falharem. Depois, o professor faz uma virada na história: "O Guardião precisa passar a missão adiante". O aluno então troca de papel e sua dupla vira o "Herói do Código", escrevendo a função só para fazer os testes de um colega passarem. No final, a turma vê como o trabalho dos dois papéis foi decisivo para o lançamento e o professor explica o ciclo do TDD: teste falhando, código mínimo e teste passando.',
        supportTools: JUNIT,
        learningObjectIds: [],
      },
    },
    {
      id: 'co-criador',
      name: 'Co-Criador',
      description:
        'A co-criação consiste em uma espécie de produção colaborativa (Rodrigues et al., 2021). Ou seja, entende-se que o conceito de "co-criador" representa ações conjuntas para o desenvolvimento de algo ou para a obtenção de um objetivo final.',
      generalExample:
        'A exemplo disso, a criação em grupo de uma solução para resolver um dado problema imposto por uma missão.',
      activity: {
        description:
          'O professor propõe um problema para a turma: criar, em conjunto, uma função que valida a senha de um cadastro (mínimo de 8 caracteres, pelo menos um número, uma letra maiúscula, uma letra minúscula e um caractere especial). A turma é dividida em duplas que trabalham juntas, alternando os papéis. Na primeira rodada, o aluno A escreve um teste que falha e o aluno B escreve o código mínimo para fazê-lo passar. Na segunda rodada, os papéis se invertem: B escreve o próximo teste e A escreve o código. Repetem isso até a função cobrir todas as regras. Depois, duas duplas se juntam, comparam os testes que criaram e montam uma versão única e melhorada, decidindo juntas quais testes ficam. No final, o professor mostra que a solução foi construída pelo grupo, e que cada teste novo guiou a evolução do código.',
        supportTools: JUNIT,
        learningObjectIds: [],
      },
    },
  ],
};
