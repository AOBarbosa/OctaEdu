import LegalPage, { LegalSection } from '../../components/LegalPage';

const SECTIONS: LegalSection[] = [
  {
    title: '1. O que é o OctaEdu',
    paragraphs: [
      'O OctaEdu é uma ferramenta gratuita, desenvolvida em projeto acadêmico do Instituto Metrópole Digital (IMD/UFRN), que ajuda professores a planejar atividades gamificadas com base no modelo Octalysis.',
    ],
  },
  {
    title: '2. Sua conta',
    paragraphs: [
      'Para usar a ferramenta, você cria uma conta com nome, e-mail e senha. Você é responsável por manter sua senha em sigilo e pelas ações feitas com a sua conta.',
      'Você pode corrigir seus dados, baixar uma cópia deles ou excluir sua conta a qualquer momento na página "Meus dados".',
    ],
  },
  {
    title: '3. Conteúdo que você cria',
    paragraphs: [
      'Os planos de aula são seus e ficam visíveis só para você. Materiais marcados como públicos ficam visíveis para os outros professores cadastrados.',
      'Não envie conteúdo que viole direitos autorais, dados pessoais de alunos ou material ofensivo. Conteúdo assim pode ser removido.',
    ],
  },
  {
    title: '4. Limitações',
    paragraphs: [
      'As sugestões de técnicas e atividades são apoio pedagógico e não substituem o julgamento do professor. A ferramenta é um protótipo de pesquisa e pode passar por mudanças ou ficar fora do ar.',
    ],
  },
  {
    title: '5. Mudanças neste termo',
    paragraphs: [
      'Se este termo mudar, a nova versão será publicada nesta página e poderemos pedir um novo aceite.',
    ],
  },
];

export default function TermosPage() {
  return <LegalPage title="Termo de Uso" sections={SECTIONS} />;
}
