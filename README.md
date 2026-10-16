# OctaEdu - Plataforma de Gamificação Pedagógica com Octalysis

Plataforma educacional desenvolvida para apoiar professores na concepção, estruturação e aplicação de estratégias de gamificação fundamentadas no framework **Octalysis** (criado por Yu-kai Chou), equilibrando os 8 Core Drivers motivacionais e técnicas de jogos aplicadas à sala de aula.

---

## 🚀 Funcionalidades Implementadas (Histórias de Usuário)

- **HU01 - Cadastrar-se na Plataforma:**
  - Cadastro completo de professores solicitando Nome, E-mail, Senha, Escola e Disciplina.
  - Validação estrita de formato de e-mail e duplicidade.
  - Mensagens claras de validação e redirecionamento automático com sessão ativa.

- **HU02 - Entrar no Sistema (Login):**
  - Autenticação por e-mail e senha com validação de credenciais.
  - Feedback visual e acessível em caso de erro.
  - Botão de preenchimento rápido com perfis de demonstração (Profa. Ana Silva / Prof. Carlos Eduardo).

- **HU03 - Consultar Core Drivers (Octógono Interativo):**
  - Visualizador gráfico interativo em SVG do octógono do Octalysis.
  - Destaque das dimensões *White Hat vs Black Hat* e *Cérebro Esquerdo vs Cérebro Direito*.
  - Detalhamento pedagógico com exemplos reais de aplicação em sala de aula e impacto motivacional.

- **HU04 - Consultar Técnicas de Jogos:**
  - Catálogo filtrável por Core Driver, nível de ensino (Fundamental, Médio, Superior) e busca textual.
  - Título, descrição, aplicação pedagógica, modelos de missão prontos para uso e recursos virtuais (Genially, Miro, Kahoot, Padlet, etc.).

- **HU05 - Definir Objetivos da Atividade:**
  - Seleção de múltiplos objetivos educacionais (Colaboração, Criatividade, Engajamento, Rotina, Competição Saudável, Autonomia, Empatia, Pensamento Crítico).

- **HU06 - Receber Recomendações de Gamificação:**
  - Algoritmo inteligente que pondera e destaca os Core Drivers mais eficientes para os objetivos escolhidos com cálculo de afinidade e justificativa pedagógica.
  - Seleção e customização de técnicas e modelos de missões adaptáveis.

- **HU07 - Salvar e Gerenciar Planejamento:**
  - Painel/Dashboard de planos de gamificação do professor.
  - Ações para Visualizar em detalhes, Editar informações, Duplicar planos para novas turmas e Excluir.
  - Opção para imprimir/exportar o plano formatado em PDF.

- **HU08 - Compartilhar e Fazer Upload de Exemplos:**
  - Envio de arquivos (PDF, imagens) ou links de recursos didáticos (Google Drive, YouTube, Miro).
  - Controle de visibilidade: privado (apenas o professor) ou público (comunidade de professores).

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Biblioteca de UI:** [Material UI (MUI v6/v7)](https://mui.com/)
- **Estilização Complementar:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Ícones:** `@mui/icons-material` & `lucide-react`
- **Linguagem:** TypeScript
- **Gerenciador de Pacotes:** `pnpm`

---

## 🏁 Como Executar o Projeto

1. Instale as dependências:
   ```bash
   pnpm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```

3. Abra o navegador em: [http://localhost:3000](http://localhost:3000)

4. Para testar o build de produção:
   ```bash
   pnpm build
   pnpm start
   ```

---

## 🎓 Contas de Demonstração para Teste Rápido

- **Profa. Ana Silva:**
  - E-mail: `ana.silva@escola.edu.br`
  - Senha: `senha123`
- **Prof. Carlos Eduardo:**
  - E-mail: `carlos.eduardo@escola.edu.br`
  - Senha: `senha123`
