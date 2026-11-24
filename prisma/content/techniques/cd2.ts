import { CoreDriveTechniques, text } from '../types';

export const CD2: CoreDriveTechniques = {
  coreDriveId: 2,
  techniques: [
    {
      id: 'pontos-placares-premios',
      name: 'Pontos, Placares de Líderes e Ganhar Prêmios',
      description:
        'Entende-se que a utilização dessas técnicas de jogo transmitem a sensação de realização, com o objetivo de conquistar prêmios (Chou, 2016). Os pontos podem ser obtidos através da resolução de tarefas e realização de metas, já os placares de líderes, classificam os indivíduos com base em seu desempenho ou conquistas, para estimular a competição e a motivação (Inano, 2024); a pontuação e sua acumulação que refletem no placar são prêmios recebidos através da realização de tarefas durante a gamificação.',
      generalExample:
        'O Twitter (atual X) transformou o número de seguidores em pontuação. Em 2009, o ator Ashton Kutcher desafiou a CNN Breaking News para ver quem chegava primeiro a 1 milhão de seguidores, e venceu quando a CNN tinha 999.652 (Chou, 2016). O autor alerta que placares desmotivam quem está muito atrás. Ele recomenda mostrar só quem está logo acima e logo abaixo do usuário, usar placares por equipe ou reiniciá-los toda semana (Chou, 2016).',
      activity: {
        description:
          'Cada bug encontrado vale pontos conforme a severidade (baixa 1, média 3, crítica 5). O placar é por equipe e reinicia a cada unidade, para que quem ficou atrás não desista.',
        supportTools: text(
          'Level Up XP, um plugin do Moodle. Ele dá pontos automaticamente quando o aluno conclui uma atividade e monta o ranking sozinho, então o professor não precisa manter uma planilha.',
          'Modelo de placar por equipe, com a tabela de pontos por severidade de bug pronta.',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'barras-de-progresso',
      name: 'Barras de Progresso, Listas de Missões e Sinfonia de Evolução',
      description:
        'Estas técnicas funcionam como impulsionadores da motivação de modo que uma barra é preenchida à medida que um indivíduo cumpre as missões estabelecidas (Inano, 2024). O cérebro humano tende a sentir-se incomodado quando visualizam a exibição de itens incompletos, sugerindo que devem ser cumpridas ações para alcançar completamente o estado de vitória (Chou, 2016). A exemplo disto, pode-se citar o preenchimento de dados das informações pessoais de um usuário em um perfil de uma rede social, a cada campo preenchido, a barra avança, até que todas as informações tenham sido inseridas.',
      generalExample:
        'O LinkedIn colocou ao lado do perfil uma barra mostrando o quanto ele estava completo. Segundo Chou (2016), ela levou cerca de 2 horas para ser programada e aumentou em 55% o preenchimento dos perfis.',
      activity: {
        description:
          'Uma lista de missões da unidade (escrever casos de teste, automatizar, chegar a 80% de cobertura) com uma barra mostrando quanto falta. A porcentagem de cobertura de código também funciona como barra de progresso.',
        supportTools: text(
          'Relatório de cobertura do JaCoCo (Java) ou do Coverage.py (Python). Ele mostra em porcentagem quanto do código está coberto por testes, então a barra vem do próprio trabalho do aluno, sem esforço extra do professor.',
          'Checklist de missões por unidade, com barra de progresso, para imprimir ou acompanhar na ferramenta.',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'efeito-aura',
      name: 'Efeito Aura ou Efeito Rockstar, Coroação',
      description:
        'Durante a aplicação desta técnica de jogo, pode-se fazer com que um indivíduo sinta que todos estão loucos para interagir com eles (Chou, 2016). Para Chou (2016), se quem está aplicando esta técnica conseguir fazer com que os jogadores sintam que conquistaram um determinado status, eles sentirão tanto orgulho dessa conquista, que continuarão a executar as ações desejadas. Para exemplificar esta aplicação, durante uma abordagem gamificada, um aluno que completa todas as missões propostas durante a semana de aula e recebe o título de destaque da semana por seu desempenho, faz com que o mesmo se sinta motivado para continuar realizando as atividades.',
      generalExample:
        'Chou (2026) compara a Coroação a uma cerimônia de coroação de filme: tudo para, a música aumenta e a pessoa vira o centro das atenções. Ela deve durar pelo menos 5 a 10 segundos e ser reservada para conquistas realmente grandes. Usada para qualquer coisa, perde o valor.',
      activity: {
        description:
          'O título de "Caçador de Bugs da Semana" vai para quem encontrar o defeito mais crítico. Ele é anunciado no início da aula, e o aluno mostra o bug para a turma.',
        supportTools: text(
          'Mural do Padlet. O professor publica o destaque com a descrição do bug e ele fica visível para toda a turma, que é o que gera o status. O mural também guarda o histórico dos destaques do semestre.',
          'Modelos de títulos e certificados (Caçador de Bugs, Guardião da Cobertura) com o critério de cada um.',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'simbolos-de-conquista',
      name: 'Símbolos de Conquista e Recompensa por Ações Fixas',
      description:
        'A aplicação destas técnicas pode assumir diferentes formas, como os distintivos, estrelas, troféus, medalhas e etc; esta, pretende de fato, simbolizar a concretização de algo, fazendo com que os indivíduos se sintam verdadeiramente orgulhosos e realizados (Chou, 2016). A exemplo disto, o aluno que conquistar o efeito Rockstar após completar uma missão, poderá ganhar um símbolo da sua realização, para exibir a sua evolução.',
      generalExample:
        'Chou (2016) compara com as medalhas militares. Ninguém se orgulha de um distintivo de "Sobrevivi ao primeiro dia", mas uma Medalha de Honra por um ato de bravura gera orgulho. Da mesma forma, um badge de "Cliquei no primeiro botão" chega a ofender o usuário: o símbolo só motiva se representar uma conquista real.',
      activity: {
        description:
          'Badges por marco técnico difícil: "100% de cobertura", "Matou 10 mutantes", "Primeiro teste automatizado de interface".',
        supportTools: text(
          'Emblemas do Moodle. Eles são concedidos automaticamente quando o aluno cumpre o critério e seguem o padrão Open Badges, então o aluno pode exibi-los no LinkedIn ou no portfólio. Isso dá valor ao badge fora da disciplina.',
          'Kit de badges de Teste de Software (nome, critério e imagem) pronto para importar no Moodle.',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'toca-aqui',
      name: 'Toca Aqui!',
      description:
        'A técnica "Toca Aqui!", baseia-se em uma saudação após uma realização, consistindo em um conjunto de símbolos de reconhecimento criados para que os usuários possam elogiar uns aos outros baseados nas suas interações, promovendo o reforço positivo entre os pares (Rodrigues et al., 2022). O envio de mensagens de feedback após a completude de uma missão retrata a sua empregabilidade.',
      generalExample:
        'No MailChimp, depois que o usuário envia uma campanha de e-mail, uma mão de desenho animado atravessa a tela e "toca aqui" com ele. O Asana solta confetes quando uma tarefa é concluída (Chou, 2026). São recompensas rápidas e baratas para conquistas pequenas.',
      activity: {
        description:
          'Na revisão de código em duplas, o aluno reage com um "toca aqui" quando o colega escreve um teste bem feito ou encontra um caso de borda esquecido.',
        supportTools: text(
          'Reações em pull requests do GitHub. Os alunos já entregam o código pelo GitHub, então o elogio fica no mesmo lugar do trabalho, ligado à linha de teste elogiada.',
          'Cartões de elogio com motivos prontos ("Achou caso de borda", "Teste legível", "Boa asserção") para a revisão entre colegas.',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'luta-contra-o-chefe',
      name: 'Luta Contra o Chefe',
      description:
        'Nesta técnica, há uma luta do jogador contra um obstáculo significativo e desafiador que exige que os jogadores utilizem todos os recursos disponíveis e habilidades adquiridas (Chou, 2026). Esta, pode ser ilustrada por meio da aplicação de uma atividade avaliativa durante o processo de gamificação, atribuída como uma missão final para avaliar os conhecimentos de uma disciplina.',
      generalExample:
        'O Bowser, em Super Mario World. Depois de pular plataformas e enfrentar obstáculos menores, o tamanho e a postura dele mostram que agora o desafio é de verdade e vai testar tudo o que o jogador aprendeu (Chou, 2026). O autor recomenda que, no ensino, o chefe possa ser enfrentado de novo, não cause dano permanente e que o aluno escolha quando se sente pronto.',
      activity: {
        description:
          'No fim da unidade, a turma enfrenta um sistema "chefão" com defeitos plantados e precisa escrever testes que os encontrem. Cada defeito encontrado tira vida do chefe. Quem não vencer pode estudar e tentar de novo.',
        supportTools: text(
          'PIT (Java) ou Stryker (JavaScript), que fazem teste de mutação. Eles geram automaticamente versões do código com defeitos (os "mutantes") e mostram quantos os testes do aluno conseguem "matar". O número de mutantes vivos vira a vida do chefe, sem o professor ter que plantar bugs à mão.',
          'Roteiro de chefão com o sistema de exemplo, as regras de nova tentativa e a barra de vida do chefe.',
        ),
        learningObjectIds: [],
      },
    },
    {
      id: 'tutorial-passo-a-passo',
      name: 'Tutorial de Passo a Passo',
      description:
        'Esta técnica corresponde a uma série de escolhas que guiam o jogador por um fluxo completo de integração (Chou, 2026). Para ilustrar este processo, Chou (2026), menciona que um tutorial simulado para o agendamento de uma entrega, faz com que os usuários entendam que o sistema funcionará quando eles realmente precisarem.',
      generalExample:
        'Os jogos ensinam regras e mecânicas uma etapa por vez, em tutoriais interativos com mensagens como "Ótimo trabalho!" a cada acerto, em vez de um manual ou de um vídeo longo no início. Assim o usuário se sente capaz desde o começo (Chou, 2026).',
      activity: {
        description:
          'Na primeira aula, um exercício guiado: escrever o primeiro teste unitário, ver o teste falhar, corrigir o código e ver passar (ciclo do TDD), com uma mensagem de acerto a cada etapa, antes das atividades livres.',
        supportTools: text(
          'GitHub Classroom com correção automática. O aluno recebe o repositório já configurado e, a cada envio, vê na hora se a etapa passou, como o "Ótimo trabalho!" do tutorial. O professor não precisa montar o ambiente de cada aluno.',
          'Roteiro passo a passo da primeira aula, com o repositório inicial pronto.',
        ),
        learningObjectIds: [],
      },
    },
  ],
};
