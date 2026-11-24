import { CoreDriveTechniques, text } from '../types';

const SAME_ACTIVITY =
  'O professor aplica a atividade que já tinha planejado para a aula, sobre qualquer conteúdo (exercícios, criação de casos de teste, teste de um sistema)';

export const CD7: CoreDriveTechniques = {
  coreDriveId: 7,
  techniques: [
    {
      id: 'escolhas-brilhantes',
      name: 'Escolhas Brilhantes',
      description:
        'Esta técnica de jogo utiliza o destaque para ações ou recursos específicos para guiar os usuários e fazer com que se sintam mais inteligentes (Chou, 2026). Esses elementos que atraem a atenção dos usuários e os incentiva a interagir, podem ser exemplificados por meio da atribuição de símbolos de missão em personagens de um jogo (Chou, 2026).',
      activity: {
        description: text(
          'O professor aplica a lista de exercícios que já tinha planejado sobre qualquer conteúdo da disciplina, mas marca algumas questões com símbolos de missão, como os que aparecem sobre os personagens de um jogo para indicar onde está a próxima missão:',
          '- ❗ Missão principal: as questões mais importantes do conteúdo (as que cobrem o conceito central da aula).',
          '- ⭐ Bônus: questões extras, um pouco mais desafiadoras, que valem pontos a mais.',
          '- Sem símbolo: questões de treino, que a equipe resolve se tiver tempo.',
          'A turma pode resolver as questões na ordem que quiser, mas os símbolos destacam o melhor caminho. Quem começa pelas ❗ sente que fez uma escolha esperta, porque está indo direto ao que mais importa. Quem completa as ❗ e parte para as ⭐ sente que está avançando como um jogador experiente. Quando uma equipe termina uma questão marcada, o professor desenha um "check" dourado ao lado do nome dela. No final, o professor mostra por que as questões marcadas eram as mais importantes (ex.: "as ❗ cobriam os três conceitos que mais caem na prova"), o que reforça nos alunos a sensação de terem escolhido bem.',
        ),
        supportTools: text(
          'Lista de exercícios que o professor já tinha preparado, com os símbolos ❗ e ⭐ acrescentados',
          'Legenda dos símbolos (um slide ou escrita no quadro)',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'caixas-misteriosas',
      name: 'Caixas Misteriosas ou Recompensas Aleatórias',
      description:
        'A aplicação destas técnicas incorpora a imprevisibilidade à experiência do recebimento de prêmios, alterando o contexto no qual a recompensa é concedida ou a própria natureza da mesma (Chou, 2016). Estas, recriam um sentimento de empolgação, sendo implementadas quando o jogador recebe uma recompensa desconhecida ao concluir uma missão, ou abrir um "baú do tesouro" ao atingir um estado de vitória (Chou, 2016).',
      activity: {
        description: text(
          'O professor aplica a lista de exercícios que já tinha planejado sobre qualquer conteúdo da disciplina e leva uma caixa misteriosa (pode ser uma caixa de sapato, uma sacola ou um envelope grande) para a sala. Dentro dela ficam papeizinhos dobrados com recompensas diferentes, que ninguém conhece de antemão:',
          '- Comuns (maioria): "Parabéns, continue assim!"',
          '- Raras (poucas): "Pule uma questão", "Peça uma dica ao professor"',
          '- Lendária (só uma): "5 décimos extra na nota da disciplina" ou "Escolha o tema da próxima aula".',
          'Cada vez que uma equipe resolve corretamente uma questão, ela vai até a frente, sorteia um papelzinho sem olhar e abre na hora, diante da turma. Como o prêmio é imprevisível, a equipe não sabe se vai ganhar algo simples ou uma recompensa rara, e isso cria expectativa a cada questão. A caixa também pode mudar o tipo de recompensa: às vezes é um ponto, às vezes uma vantagem, às vezes uma surpresa divertida. No final, o professor revela quais prêmios ficaram na caixa e quem tirou a lendária.',
        ),
        supportTools: text(
          'Caixa, sacola ou envelope grande (a "caixa misteriosa")',
          'Papeizinhos com as recompensas comuns, raras e lendária',
          'Roleta online (ex.: Wheel of Names)',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'ovos-de-pascoa',
      name: 'Ovos de Páscoa ou Recompensas Repentinas',
      description:
        'Estas técnicas de jogos baseiam-se no fornecimento de surpresas aos jogadores, sua aplicação consiste na oferta de recompensas baseadas em gatilhos inesperados (Chou, 2016). Essas recompensas, incentivam os jogadores a continuar jogando e manter a esperança de que possam sentir a mesma felicidade novamente; sua eficácia está na animação presente ao divulgar algo emocionante e inesperado, além de causar especulações sobre o que causou o gatilho, engajando a discussão sobre a missão (Chou, 2016). A exemplo disso, a implementação de missões surpresas, que oferecem um prêmio único ao ser concluída.',
      activity: {
        description: text(
          `${SAME_ACTIVITY}, e esconde 3 ou 4 surpresas que ninguém sabe que existem. Elas são ovos de Páscoa, ou seja, recompensas ligadas a gatilhos inesperados:`,
          '- Gatilho de comportamento: a primeira equipe que ajudar outra equipe ganha uma recompensa na hora ("Parabéns, vocês ganharam 1 décimo extra por colaboração!").',
          '- Gatilho de detalhe: a primeira equipe que perceber um erro de digitação escondido de propósito no enunciado (ou no slide) ganha um prêmio.',
          '- Gatilho de tempo: a equipe que entregar a atividade exatamente no minuto marcado em um papel escondido (ex.: dobrado sob o relógio da sala) ganha uma recompensa surpresa.',
          '- Missão surpresa: em um momento aleatório, o professor anuncia "Missão relâmpago!" e dá 2 minutos para resolver uma questão extra, com um prêmio único para quem acertar primeiro.',
          'Como ninguém sabe quando ou como as surpresas aparecem, os alunos ficam mais atentos durante toda a aula. Quando uma equipe ganha, a turma comenta e especula: "Como eles conseguiram?". Isso gera conversa sobre a atividade e a esperança de achar o próximo ovo. No final, o professor revela os ovos que ninguém encontrou e os gatilhos de cada um.',
        ),
        supportTools: 'Papel com a lista dos ovos de Páscoa, seus gatilhos e prêmios (só o professor vê)',
        learningObjectIds: [],
      },
    },
    {
      id: 'recompensas-rotativas',
      name: 'Recompensas Rotativas',
      description:
        'A ideia fundamental das recompensas rotativas baseia-se na regra de que alguém precisa ganhar em cada período, dessa maneira, enquanto o usuário permanece jogando, as chances de ganhar uma recompensa aumentam linearmente (Chou, 2016). Esta, pode ser exemplificada por meio da dinâmica empresarial de eleger um "funcionário da semana", de modo que os colaboradores se esforçam esperando conquistar um título de reconhecimento (Chou, 2016).',
      activity: {
        description: `${SAME_ACTIVITY}, e divide a aula em 4 rodadas curtas. Ao final de cada rodada, uma equipe ganha o título de "Destaque da Rodada". A regra é que alguém sempre ganha em cada rodada, e que uma equipe só pode ganhar o título uma vez. O professor escolhe o Destaque olhando o que foi entregue naquela rodada (o melhor relato, a resposta mais completa ou a equipe que mais ajudou) e escreve o nome da equipe no quadro, ao lado de uma estrela ⭐. Como o título passa de equipe em equipe, quem ainda não ganhou sabe que a sua chance aumenta a cada rodada: na rodada 1 há 4 equipes disputando, na rodada 2 restam 3, e assim por diante. Isso mantém todos esforçados até o fim da aula, porque quem desanimar perde a chance de levar o título. No final, o professor lembra que todas as equipes foram reconhecidas ao longo da aula e comenta o que cada Destaque fez de bom.`,
        supportTools: text(
          'Quadro da sala com a lista das equipes e uma coluna para as estrelas',
          'Cronômetro (celular ou tela) para marcar o fim de cada rodada',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'efeito-oraculo',
      name: 'Efeito Oráculo',
      description:
        'Esta técnica entra em ação quando os jogadores querem descobrir se suas previsões se concretizaram ou não (Chou, 2026). Como é o caso da tentativa de prever em quanto tempo uma determinada missão será completada, para cumprir um requisito de agilidade.',
      activity: {
        description: text(
          `${SAME_ACTIVITY}, e acrescenta uma etapa de previsão antes de cada parte. Antes de começar, cada equipe escreve em um papel, sem conversar com as outras, dois palpites:`,
          '- Palpite de tempo: "Vamos terminar esta parte em X minutos."',
          '- Palpite de acerto: "Vamos acertar X de Y itens" (questões corretas, casos de teste aceitos ou bugs válidos).',
          'O professor recolhe os papéis e a equipe trabalha normalmente. Quando todos terminam, o professor revela o tempo real e o resultado de cada equipe e compara com o palpite. Quem chegou mais perto do tempo ou do resultado ganha 1 ponto de "Oráculo", que o professor anota no quadro. A expectativa de descobrir se o palpite se confirmou mantém os alunos atentos ao próprio ritmo durante a atividade. No fim, o professor faz uma pergunta rápida: "Quem previu mais tempo do que precisou? Quem se atrapalhou e levou mais?". Isso ensina estimativa de esforço, algo muito usado em testes reais, quando a equipe precisa prever quanto tempo vai levar para testar uma funcionalidade.',
        ),
        supportTools: text(
          'Quadro da sala com os pontos de "Oráculo" de cada equipe',
          'Opcional: Mentimeter ou Google Forms, para a turma enviar os palpites de forma digital',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'travessuras',
      name: 'Travessuras',
      description:
        'A aplicação desta técnica acontece quando a imprevisibilidade e a curiosidade tomam conta no formato de aleatoriedades, tais como as travessuras; como é o caso da situação em que os jogadores ficam se perguntando o que acontecerá em seguida, ou quem executará uma determinada ação, motivando-os a seguir para as próximas fases (Chou, 2026).',
      activity: {
        description: text(
          `${SAME_ACTIVITY}, e acrescenta travessuras: pequenos eventos aleatórios e divertidos que podem acontecer a qualquer momento. Ele leva uma roleta ou um dado e, de tempos em tempos (por exemplo, a cada 10 minutos), avisa: "Hora da travessura!". Uma equipe é sorteada e a roleta decide o que acontece com ela:`,
          '- Troca de lugar: a equipe troca de lugar com a equipe vizinha e continua o trabalho dela por 2 minutos.',
          '- Sem falar: a equipe fica 2 minutos só se comunicando por gestos ou escrevendo.',
          '- Papel invertido: quem estava digitando passa a só ditar, e quem ditava passa a digitar.',
          '- Presente do professor: a equipe ganha uma dica ou 1 ponto extra.',
          '- Pergunta relâmpago: a equipe responde a uma pergunta rápida sobre o conteúdo para ganhar 1 ponto.',
          'Como ninguém sabe quando a próxima travessura vai acontecer, nem quem será sorteado, nem qual será o efeito, a turma fica curiosa e atenta o tempo todo. Quando a roleta gira, a sala inteira acompanha e comenta. No final, o professor pergunta qual travessura foi mais divertida e o que ela ensinou (ex.: trabalhar sem comunicação mostra a importância de relatos claros).',
        ),
        supportTools: 'Roleta online (ex.: Wheel of Names), com a lista de travessuras e os nomes das equipes',
        learningObjectIds: [],
      },
    },
    {
      id: 'mini-missoes',
      name: 'Mini-missões',
      description:
        'Esta técnica reflete o andamento de uma pequena missão como uma subtrama de outras tarefas (Chou, 2026). Tal como a resolução de pequenos problemas matemáticos para compor uma grande equação.',
      activity: {
        description: text(
          'O professor aplica a atividade que já tinha planejado, sobre qualquer conteúdo da disciplina, e só a divide em 3 mini-missões curtas, escritas no quadro como uma lista de tarefas:',
          '- Mini-missão 1: resolver as questões 1 e 2',
          '- Mini-missão 2: resolver as questões 3 e 4',
          '- Mini-missão 3: resolver a questão 5',
          'Abaixo da lista, o professor escreve a missão grande: "Completar as 3 mini-missões e entregar tudo antes do fim da aula". Cada vez que uma equipe termina uma mini-missão e o professor confere, ele marca ✅ ao lado do nome da equipe. Como cada mini-missão é pequena, o aluno sente que avança a cada passo, e as três juntas formam a missão grande. Quando a equipe completa as 3, o professor anuncia "Missão cumprida!" e entrega um prêmio simbólico, como 1 ponto extra ou um adesivo.',
        ),
        supportTools: text(
          'Lista de questões que o professor já tinha preparado, separada em 3 grupos',
          'Quadro da sala com as mini-missões e uma coluna de ✅ por equipe',
        ),
        learningObjectIds: [],
      },
    },
  ],
};
