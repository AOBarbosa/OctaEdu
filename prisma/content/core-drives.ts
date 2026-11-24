import { CoreDriveContent, text } from './types';

// Nome, descrição e fatores da Teoria da Autodeterminação vêm dos documentos.
// Cor, hemisfério e chapéu seguem o framework de Chou e a interface atual.
export const CORE_DRIVES: CoreDriveContent[] = [
  {
    id: 1,
    slug: 'epic-meaning',
    name: 'Significado Épico e Vocação',
    englishName: 'Epic Meaning and Calling',
    description:
      'Este Core Drive é um dos principais impulsionadores da gamificação, este motivador impulsiona um indivíduo porque eles acreditam estar envolvidos em algo maior do que si mesmos (Chou 2016). Têm-se a motivação como a causa que normalmente leva as pessoas a prestarem ações de caridade, ou para escolher uma profissão que acredita que contribuirá para alguma melhoria da sociedade (Brito, 2017). Além disso, essa motivação pode ser associada com o talento natural de algumas pessoas para uma determinada área, de modo que acreditem que foram escolhidos para a exercê-la (Brito, 2017).',
    sdtFactors: ['Autonomia', 'Competência'],
    color: '#3B82F6',
    hemisphere: 'right',
    hat: 'white',
  },
  {
    id: 2,
    slug: 'development-accomplishment',
    name: 'Desenvolvimento e Realização',
    englishName: 'Development and Accomplishment',
    description:
      'A realização é um forte impulsionador, este Core Drive motiva os indivíduos por meio da sensação de crescimento e necessidade de alcançar uma meta específica (Chou, 2016). Essa motivação busca realizar algo para progredir, superar obstáculos e evoluir, normalmente relacionada a estes desafios e metas que o jogador deseja alcançar (Brito, 2017). Essa busca por avanço e crescimento faz com que desenvolvamos novas habilidades, comprometimento com o aprendizado, além da geração de entusiasmo, direcionando o foco (Chou, 2016).',
    sdtFactors: ['Autonomia', 'Competência'],
    color: '#10B981',
    hemisphere: 'left',
    hat: 'white',
  },
  {
    id: 3,
    slug: 'empowerment-creativity',
    name: 'Criatividade e Experiência',
    englishName: 'Empowerment of Creativity & Feedback',
    description:
      'Este Core Drive está relacionado com a motivação provinda da liberdade de escolha que uma pessoa pode ter sobre a maneira como realizará uma determinada tarefa (Brito, 2017). Os seres humanos são naturalmente criativos, anseiam por aprender e imaginar ou inventar, então, a essência deste impulso está na sua capacidade perene de envolver os indivíduos continuamente em todos os momentos da vida (Chou, 2016).',
    sdtFactors: ['Autonomia', 'Competência'],
    color: '#F59E0B',
    hemisphere: 'right',
    hat: 'white',
  },
  {
    id: 4,
    slug: 'ownership-possession',
    name: 'Propriedade e Possessão',
    englishName: 'Ownership and Possession',
    description: text(
      'Este quarto Core Drive, representa a motivação que é impulsionada pela sensação de possuir algo e, consequentemente, pelo desejo de melhorar, proteger e obter mais deste item (Chou, 2016). A incorporação desses recursos que incentivam a formação de coleções, pode-se aproveitar o desejo natural dos indivíduos, impulsionando o engajamento, que ao reforçar a sensação de propriedade, melhora a experiência geral dos indivíduos (Inano, 2024).',
      'O impulso de propriedade e posse está posicionado à extremidade esquerda do Octalysis; isto quer dizer que representa o impulso que exerce maior influência sobre o "lado esquerdo do cérebro", associado ao pensamento analítico, com ações baseadas na lógica e análise, reforçadas pelo desejo de posse como motivador primordial (Chou, 2016).',
    ),
    sdtFactors: ['Conectividade'],
    color: '#8B5CF6',
    hemisphere: 'left',
    hat: 'white',
  },
  {
    id: 5,
    slug: 'social-influence',
    name: 'Influência Social e Relacionamentos',
    englishName: 'Social Influence and Relatedness',
    description: text(
      'Este Core Drive envolve atividades inspiradas no que outras pessoas pensam, fazem ou dizem, que pode ser motivado por meio de temáticas como: mentoria, competição, inveja e missões em grupo, tesouros sociais e companheirismo (Chou, 2016). Sendo assim, uma motivação provocada pela necessidade de interação social, seja de caráter competitivo ou colaborativo (Brito, 2017).',
      'Este tipo de impulso pode ser observado comumente em redes sociais, as quais os usuários estão constantemente realizando ações para compartilhar com sua rede de amigos e outros usuários (Brito, 2017). Quando bem empregado, este impulso pode ser uma das motivações mais fortes e duradouras para conectar e engajar experiências (Chou, 2016).',
    ),
    sdtFactors: ['Conectividade'],
    color: '#EC4899',
    hemisphere: 'right',
    hat: 'white',
  },
  {
    id: 6,
    slug: 'scarcity-impatience',
    name: 'Escassez e Intolerância',
    englishName: 'Scarcity and Impatience',
    description: text(
      'A escassez e a intolerância compõem o sexto impulso do Octalysis, a motivação provinda dele deve-se ao contexto quando não se pode ter algo imediatamente ou porque há alguma dificuldade para sua obtenção (Chou, 2016). Desse modo, relaciona-se com a sensação de ter e pertencer a um grupo que possui acesso limitado (Brito, 2017).',
      'Os seres humanos têm uma tendência natural de querer coisas que não podem ter (Chou, 2016). Assim, o objetivo deste Core Drive é criar uma sensação de exclusividade e expectativa ao limitar acesso a determinados recursos ou experiências (Inano, 2024).',
    ),
    sdtFactors: ['Conectividade'],
    color: '#F97316',
    hemisphere: 'left',
    hat: 'black',
  },
  {
    id: 7,
    slug: 'unpredictability-curiosity',
    name: 'Imprevisibilidade e Curiosidade',
    englishName: 'Unpredictability and Curiosity',
    description: text(
      'Este Core Drive reflete a principal força por trás do fascínio dos seres humanos por experiências incertas e que envolvem o acaso (Chou, 2016). A imprevisibilidade e a curiosidade significam a capacidade de cativar os indivíduos ao satisfazer a sua inclinação natural por novidades, aventura e novas descobertas, assim, mantendo o engajamento e incentivando as interações recorrentes (Inano, 2024).',
      'Este impulso tem vasta utilização em estratégias de marketing, que buscam criar expectativas sobre um determinado produto ou negócio revelando poucas informações sobre estes, incentivando a curiosidade do público (Brito, 2017).',
    ),
    sdtFactors: ['Autonomia', 'Competência', 'Conectividade'],
    color: '#06B6D4',
    hemisphere: 'right',
    hat: 'black',
  },
  {
    id: 8,
    slug: 'loss-avoidance',
    name: 'Perda e Evasão',
    englishName: 'Loss and Avoidance',
    description: text(
      'O oitavo Core Drive motiva os indivíduos pelo medo de perder algo ou de que eventos indesejáveis ocorram (Chou, 2016). Baseia-se na inclinação natural dos seres humanos para evitar resultados negativos e proteger perdas, girando em torno do medo de ficar de fora, do desejo de evitar contratempos e do impulso de preservar status e posses atuais (Inano, 2024).',
      'Este impulso pode ser observado em projetos de longa duração em que a equipe não desiste para não desperdiçar todo o trabalho desenvolvido até aquele momento; atuando como uma motivação para evitar punições ou prejuízos (Brito, 2017).',
    ),
    sdtFactors: ['Autonomia', 'Competência', 'Conectividade'],
    color: '#EF4444',
    hemisphere: 'left',
    hat: 'black',
  },
];
