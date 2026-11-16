import LegalPage, { LegalSection } from '../../components/LegalPage';

const SECTIONS: LegalSection[] = [
  {
    title: '1. Quais dados coletamos',
    paragraphs: [
      'Nome, e-mail e senha (guardada apenas em formato criptografado). Escola e disciplina são opcionais.',
      'Também guardamos os planos e materiais que você cria, a data em que aceitou este termo e as sessões de acesso (data de entrada e de expiração).',
      'Não coletamos CPF, telefone nem dados de alunos.',
    ],
  },
  {
    title: '2. Para que usamos',
    paragraphs: [
      'Para identificar você no login, guardar seus planos e mostrar o autor dos materiais públicos. Não usamos seus dados para publicidade e não os vendemos ou compartilhamos com terceiros.',
    ],
  },
  {
    title: '3. Base legal',
    paragraphs: [
      'O tratamento se baseia no seu consentimento, dado no cadastro, e na execução do serviço que você solicitou (Lei nº 13.709/2018, LGPD, art. 7º, incisos I e V).',
    ],
  },
  {
    title: '4. Onde os dados ficam',
    paragraphs: [
      'Os dados ficam armazenados em servidor da UFRN. O acesso é protegido por senha e sessão segura, e cada professor só acessa os próprios planos.',
    ],
  },
  {
    title: '5. Seus direitos',
    paragraphs: [
      'Na página "Meus dados" você pode ver e corrigir seus dados, baixar uma cópia completa em arquivo e excluir sua conta. A exclusão apaga definitivamente seus planos, materiais e arquivos enviados.',
      'Você também pode retirar seu consentimento a qualquer momento excluindo a conta.',
    ],
  },
  {
    title: '6. Por quanto tempo guardamos',
    paragraphs: [
      'Enquanto sua conta existir. Ao excluir a conta, os dados são apagados na hora. Sessões de acesso expiram em 7 dias.',
    ],
  },
];

export default function PrivacidadePage() {
  return <LegalPage title="Política de Privacidade" sections={SECTIONS} />;
}
