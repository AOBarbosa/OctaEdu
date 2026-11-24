import { CoreDriveTechniques, text } from '../types';

export const CD8: CoreDriveTechniques = {
  coreDriveId: 8,
  techniques: [
    {
      id: 'heranca-legitima',
      name: 'Herança Legítima',
      description:
        'A aplicação desta técnica ocorre quando um sistema primeiramente faz com que o usuário acredite que algo lhe pertence por direito, e depois o faz sentir que isso será tirado dele caso não complete uma ação desejada (Chou, 2016). Esta, por vezes pode ser implementada usando mudanças de palavras, como por exemplo, ao invés de exibir apenas uma opção de "cadastrar-se", mudar para "cadastre-se e receba uma recompensa por ativação de conta".',
      activity: {
        description:
          'O professor aplica a atividade que já tinha planejado para a aula, sobre qualquer conteúdo (exercícios, criação de casos de teste, teste de um sistema), e muda só a forma de falar sobre o décimo. No começo da aula, ele escreve no quadro, ao lado do nome de cada equipe, "1 décimo 🔒" e diz: "Cada equipe já começa a aula com 1 décimo na disciplina. Ele é de vocês." Em seguida, avisa a condição: "Para manter o décimo, a equipe precisa entregar a atividade completa até o fim da aula. Quem não entregar perde o décimo." Em vez de ter que conquistar o décimo, a equipe já se sente dona dele e trabalha para não perdê-lo. Quando faltarem 10 minutos, o professor lembra: "Faltam 10 minutos para vocês garantirem o seu décimo!". No fim da aula, ele risca o décimo de quem não entregou e troca o 🔒 por ✅ nas equipes que entregaram.',
        supportTools: 'Quadro da sala com os nomes das equipes e "1 décimo 🔒" ao lado de cada uma',
        learningObjectIds: [],
      },
    },
    {
      id: 'status-quo-fomo',
      name: 'Preguiça do Status Quo e Medo de Ficar de Fora (FOMO)',
      description:
        'A "preguiça de status quo" está relacionada a falta de vontade de mudar o seu comportamento (Chou, 2016); a técnica de FOMO, utiliza a pressão social para impulsionar o engajamento do usuário, destacando atividades ou conquistas de outros usuários (Inano, 2024). A exemplo disso, quando um jogador realiza uma ação desejada, uma recompensa variável pode ser oferecida, incentivando-os a fazer investimentos que culminarão em elementos valiosos para si mesmos, e com isso, a vontade de continuar jogando para não ficar de fora.',
      activity: {
        description:
          'O professor aplica a atividade que já tinha planejado, sobre qualquer conteúdo da disciplina, e acrescenta uma regra simples: as 3 primeiras equipes a entregar ganham 1 décimo extra. Ele desenha no quadro um pódio com 3 vagas vazias (🥇 🥈 🥉). Para vencer a preguiça de status quo, o primeiro passo é bem pequeno: logo no começo, a equipe só precisa escrever o nome e a primeira resposta em um papel e mostrar ao professor, que já anota o nome dela no quadro. Começar fica fácil, e depois é mais simples continuar. Para criar o FOMO, cada vez que uma equipe entrega, o professor escreve o nome dela em uma vaga do pódio e avisa a turma em voz alta: "A equipe 2 acabou de garantir o primeiro lugar!". As equipes que ainda não entregaram veem as vagas sumindo e sentem vontade de se apressar para não ficar de fora. Quando as 3 vagas são preenchidas, o professor avisa, e as demais equipes continuam e entregam normalmente, sem o décimo extra.',
        supportTools: text(
          'Quadro da sala com o pódio de 3 vagas',
          'Opcional: cronômetro (celular ou tela) para mostrar o tempo da atividade',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'oportunidades-efemeras',
      name: 'Oportunidades Efêmeras e Contadores de Tempo',
      description:
        'Uma oportunidade efêmera é aquela que desaparece se o usuário não realizar uma determinada ação desejada imediatamente, já os cronômetros de tempo garantem que os usuários percebam a existência e uma oportunidade de curta duração (Chou, 2016). A exemplo disso, a realização de uma tarefa surpresa que deve ser enviada em um curto período de tempo.',
      activity: {
        description:
          'O professor aplica a atividade que já tinha planejado para a aula, sobre qualquer conteúdo da disciplina, e no meio dela lança uma "Oferta Relâmpago", uma oportunidade que some se não for aproveitada na hora. Sem avisar antes, ele projeta na tela um cronômetro de 3 minutos e anuncia: "Oferta relâmpago! Quem enviar agora, no fórum da disciplina (previamente aberto), uma pergunta sobre o conteúdo de hoje ganha 1 décimo extra. Quando o tempo acabar, a oferta some!" Cada equipe tem só esses 3 minutos para escrever e entregar a pergunta. O cronômetro fica visível para todos, e o professor avisa quando falta 1 minuto. Quando chega a zero, a oferta é encerrada, e nenhuma pergunta entregue depois vale ponto. Como a oportunidade é curta e imediata, as equipes precisam agir rápido, em vez de deixar para depois. O professor pode repetir a oferta relâmpago uma ou duas vezes durante a aula, em momentos diferentes, e usar as perguntas recebidas para revisar o conteúdo no final.',
        supportTools: text(
          'Cronômetro regressivo na tela (ex.: o timer do Google, ao pesquisar "timer 3 minutos")',
          'Fórum da turma no SIGAA, para as equipes enviarem a pergunta',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'custo-irrecuperavel',
      name: 'Custo Irrecuperável e Perda de Progresso',
      description:
        'Este pode ser um dos mecanismos mais poderosos, mas também traiçoeiro, a técnica de custos irreparáveis ocorre quando o jogador investe tanto tempo em algo que mesmo quando a atividade deixa de ser prazerosa, continua realizando as ações desejadas para não sentir a perda da desistência (Chou, 2016). Associa-se também ao risco de perder conquistas, recompensas ou avanços que motivam os usuários a permanecerem ativos e engajados (Inano, 2024). Como é o caso de um jogador que está jogando há muito tempo e então o jogo começa a ficar entediante, mas, continua jogando para não perder o tempo, os pontos e personalização investida ao longo do processo (Chou, 2016).',
      activity: {
        description: text(
          'A turma testa o PizzaTest, e o professor desenha no quadro uma corrente de progresso para cada equipe, com 6 elos vazios (⛓), um para cada área do sistema:',
          '1. Cardápio e busca',
          '2. Carrinho e sub-total',
          '3. Zonas de entrega',
          '4. Cupom BBTEST',
          '5. Extras (embrulho, retirada no balcão e pontos de fidelidade)',
          '6. Finalizar pedido',
          'Para preencher um elo, a equipe testa aquela área e mostra ao professor um bug válido ou uma conferência bem feita (ex.: "o valor do embrulho no resumo não bate com o que a tela anuncia"). Cada elo preenchido é o registro de tempo e esforço que a equipe já investiu, e quanto mais elos ela tem, menos quer parar no meio. Para criar a perda de progresso, vale a regra: se a equipe entregar um bug recusado (que não é um erro do sistema), perde o último elo preenchido, mas pode refazê-lo. Quem já tem 4 ou 5 elos pensa duas vezes antes de entregar algo sem revisar e continua testando até o fim, para não deixar o trabalho feito sem valor. Ao fechar os 6 elos, a equipe ganha um prêmio simbólico, como 1 ponto extra ou um adesivo.',
          'Pontos de atenção: a perda deve ser pequena (1 elo, recuperável), o prêmio simbólico, e o professor deve deixar claro que errar faz parte de testar. Não é recomendável ligar a perda à nota.',
        ),
        supportTools: 'Quadro da sala com a lista das 6 áreas e uma corrente de 6 elos por equipe',
        learningObjectIds: ['pizzatest'],
      },
    },
    {
      id: 'melodias-chorosas',
      name: 'Melodias Chorosas e Túmulos Visuais',
      description:
        'Esta técnica é utilizada para fornecer feedbacks negativos quando o jogador perde uma fase (Chou, 2026). Esta, pode ser demonstrada por meio de sinais sonoros ou recursos visuais que identificam uma perda.',
      activity: {
        description: text(
          'O professor aplica uma atividade oral de perguntas e respostas, com a turma dividida em equipes, e acrescenta sinais de perda e de acerto. Cada equipe começa com 3 vidas (❤❤❤) em um slide projetado, e o professor muda o slide conforme as respostas. Antes de começar, ele combina com a turma: "Os sons são brincadeira, não valem nota e qualquer equipe pode pedir para trocá-los por um sinal neutro." Para mostrar que o clima é leve, ele faz a primeira pergunta de propósito de um jeito errado e toca o som de derrota em si mesmo. Depois, a cada resposta:',
          '- Quando a equipe erra: o professor toca um som curto e engraçado de derrota (como o "trombone triste"), tira um coração no slide da equipe, sem escrever qual pergunta errou. Em seguida, dá um retorno rápido em voz alta ("Vale rever a diferença entre valor limite e partição").',
          '- Quando a equipe acerta: o professor toca um som de comemoração (palmas ou fanfarra), para que o som de derrota não seja a única reação da turma.',
          'A equipe que perde uma vida pode recuperá-la ao acertar a próxima pergunta, e o professor apaga a lápide. Assim, o erro é marcado de forma leve, não fica registrado por muito tempo e leva a equipe a tentar de novo.',
          'Pontos de atenção: vale que as equipes tenham pelo menos 3 alunos, para ninguém ser identificado como o autor do erro, e que a perda de vida não afete a nota. Se alguma equipe ficar desconfortável, o professor troca o som por um sinal neutro (como um "ding" simples).',
        ),
        supportTools: text(
          'Myinstants (site de botões de som, com opções como "sad trombone" e "aplausos", para ter os sons prontos em abas abertas)',
          'Google Slides ou PowerPoint (um slide com 3 corações e uma lápide por equipe, que o professor edita durante a aula)',
          'Alternativa sem projeção: quadro da sala com 3 corações por equipe, desenhados com giz ou marcador',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'marca-escarlate',
      name: 'Marca Escarlate',
      description:
        'A aplicação desta técnica acontece quando os jogadores podem ver o progresso (ou a falta dele) uns dos outros, o que pode ter um efeito desagradável socialmente (Chou, 2026). Chou (2026) a exemplifica com a possibilidade de outros jogadores conseguirem ver quantos dias um amigo está preso em um determinado nível.',
      activity: {
        description: text(
          'O professor aplica um quiz de Kahoot sobre qualquer conteúdo da disciplina, jogado em equipes (ou com apelidos fictícios, para ninguém se expor). A marca escarlate vem do placar, que fica projetado para toda a turma depois de cada pergunta. Todos veem quem está na frente e quem está ficando para trás.',
          'Para tornar o efeito mais forte, o professor faz 3 paradas de placar, em que exibe o ranking e comenta só os números, sem apontar ninguém:',
          '- Depois da pergunta 3: "A diferença entre o 1º e o último já é de 800 pontos."',
          '- Depois da pergunta 6: "Duas equipes ainda não acertaram nenhuma em sequência."',
          '- Depois da pergunta 9: "Olhem quem subiu no placar desde a parada anterior."',
          'Como o progresso (ou a falta dele) fica visível para todos, as equipes que estão atrás sentem o incômodo social de aparecer embaixo no placar e tendem a se concentrar mais nas perguntas seguintes. As que estão na frente sentem orgulho e querem manter a posição. No final, o professor revisa as perguntas que mais equipes erraram e pergunta: "Quem subiu no placar? O que mudou na forma de responder?"',
          'Pontos de atenção: esta técnica pode constranger. Por isso, vale usar só nomes de equipe ou apelidos, nunca o nome real de um aluno, e não ligar o ranking à nota. O professor também pode usar o placar como sinal para revisar o conteúdo com quem ficou para trás, e não para expor.',
        ),
        supportTools: text(
          'Kahoot (quiz com cerca de 10 perguntas sobre o conteúdo da aula, em modo de equipes ou com apelidos)',
          'Projetor ou tela compartilhada, para a turma ver o placar',
        ),
        learningObjectIds: [],
      },
    },
  ],
};
