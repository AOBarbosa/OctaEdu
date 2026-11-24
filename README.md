# OctaEdu - Plataforma de Gamificação no Ensino de Testes de Software com Octalysis

Plataforma educacional desenvolvida para apoiar professores e instrutores no ensino prático de **Testes e Qualidade de Software** com estratégias de gamificação fundamentadas no framework **Octalysis** (criado por Yu-kai Chou), equilibrando os 8 Core Drivers motivacionais e técnicas aplicadas a laboratórios de programação e QA.

---

## 🚀 Funcionalidades Implementadas (Histórias de Usuário)

- **HU01 - Cadastrar-se na Plataforma:**
  - Cadastro de professores com Nome, E-mail e Senha (mínimo 8 caracteres). Escola/Instituição e Disciplina são opcionais.
  - Aceite obrigatório do Termo de Uso e da Política de Privacidade, com data e versão guardadas.
  - Validação de formato de e-mail e duplicidade no servidor.

- **HU02 - Entrar no Sistema (Login):**
  - Autenticação por e-mail e senha com sessão segura (cookie httpOnly de 7 dias).
  - Bloqueio temporário após várias tentativas erradas.
  - Todas as páginas exigem login, exceto login, cadastro, Termo de Uso e Política de Privacidade.
  - Botões de preenchimento rápido com contas de demonstração, só quando `NEXT_PUBLIC_SHOW_DEMO_LOGIN=true`.

- **HU03 - Consultar Core Drivers (Octógono Interativo):**
  - Visualizador gráfico interativo em SVG do octógono do Octalysis.
  - Destaque das dimensões *White Hat vs Black Hat* e *Cérebro Esquerdo vs Cérebro Direito*.
  - Descrição de cada Core Drive conforme os estudos selecionados pela equipe, com os fatores da Teoria da Autodeterminação ligados a ele.

- **HU04 - Consultar Técnicas de Jogos:**
  - Catálogo filtrável por Core Driver, foco de teste (`Unitário / TDD`, `Integração / API`, `E2E / Sistema`, `Exploratório / Funcional`) e busca textual.
  - 57 técnicas, com descrição, exemplo geral e uma atividade para aulas de teste de software, com as ferramentas e materiais de apoio.
  - Atividades que usam um **Objeto de Aprendizagem** da equipe têm um selo amarelo em destaque e um botão para abrir o objeto.
  - Filtro de atividades por duração (até 30 min, uma aula, várias aulas), dificuldade (Fácil, Médio, Difícil) e "Com Objeto de Aprendizagem". Atividades com duração ou dificuldade ainda não definidas aparecem como "a definir" e não somem com esses filtros.

- **HU05 - Definir Objetivos da Atividade:**
  - Seleção de múltiplos objetivos educacionais (Motivação e realização; Colaboração, trabalho em grupo e atividades surpresa; Criatividade e construção de experiências; Propriedade e posse), com a justificativa de cada um nos estudos.

- **HU06 - Receber Recomendações de Gamificação:**
  - Algoritmo inteligente que pondera e destaca os Core Drivers mais eficientes para os objetivos escolhidos com cálculo de afinidade e justificativa pedagógica.
  - Seleção e customização de técnicas, com atividades filtráveis por duração, dificuldade e uso de Objeto de Aprendizagem.
  - Alerta de uso moderado ao escolher Core Drivers Black Hat (CD6, CD7 e CD8).
  - Rascunho salvo automaticamente: o professor pode sair e continuar depois, e voltar a qualquer etapa já feita pelo stepper.

- **HU07 - Salvar e Gerenciar Planejamento:**
  - Painel/Dashboard de planos de gamificação do professor, salvos no banco de dados. Cada professor vê só os seus.
  - Ações para Visualizar em detalhes, Editar, Duplicar planos para novas turmas e Excluir.
  - Editar abre o assistente completo com o plano carregado (objetivos, Core Drivers, técnicas, anotações e dados), mantendo o mesmo plano ao salvar.
  - Opção para imprimir/exportar o plano formatado em PDF.
  - Avisos rápidos (toast) ao salvar, editar, duplicar e excluir planos.

- **HU08 - Compartilhar e Fazer Upload de Exemplos:**
  - Envio de arquivos (PDF ou imagem, até 10 MB) ou links de recursos didáticos (Google Drive, YouTube, Miro).
  - Controle de visibilidade: privado (apenas o professor) ou público (comunidade de professores).
  - Download real dos arquivos e exclusão dos próprios materiais.

- **Meus dados (LGPD):**
  - O professor vê e corrige seus dados, baixa uma cópia completa em JSON e exclui a conta (apaga planos, materiais e arquivos).

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Biblioteca de UI:** [Material UI (MUI v6/v7)](https://mui.com/)
- **Estilização Complementar:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Ícones:** `@mui/icons-material` & `lucide-react`
- **API:** Route Handlers do Next.js (`app/api`)
- **Banco de dados:** PostgreSQL 17 com [Prisma 7](https://www.prisma.io/)
- **Linguagem:** TypeScript
- **Gerenciador de Pacotes:** `pnpm`

---

## 🏁 Como Executar o Projeto

Requisitos: Node 24, pnpm 9 e Docker.

1. Crie o arquivo de ambiente e troque a senha do banco:
   ```bash
   cp .env.example .env
   ```

2. Suba o banco PostgreSQL (porta 5440 local):
   ```bash
   pnpm db:up
   ```

3. Instale as dependências (gera o cliente do Prisma):
   ```bash
   pnpm install
   ```

4. Crie as tabelas, carregue o conteúdo do Octalysis e as contas de demonstração:
   ```bash
   pnpm db:migrate
   pnpm db:content
   pnpm db:seed
   ```

5. Inicie o servidor de desenvolvimento e abra [http://localhost:3000](http://localhost:3000):
   ```bash
   pnpm dev
   ```

Ao mudar `prisma/schema.prisma`, rode `pnpm db:migrate` e dê um nome à migration.

### Conteúdo do Octalysis

Os Core Drives, objetivos educacionais, técnicas de jogos, atividades e Objetos de Aprendizagem vêm dos artigos e estudos selecionados pela equipe. Eles ficam em `prisma/content/` (um arquivo por Core Drive em `techniques/`) e são gravados no banco por `pnpm db:content`.

- Para corrigir ou acrescentar conteúdo, edite os arquivos de `prisma/content/` e rode `pnpm db:content` de novo. O script pode rodar várias vezes: atualiza o que mudou e remove o que saiu dos arquivos.
- Atividades que usam um Objeto de Aprendizagem devem listá-lo em `learningObjectIds`, porque esse uso faz parte de uma das etapas da pesquisa.
- Dificuldade, duração e foco de teste das novas atividades ainda não foram definidos e ficam vazios.
- As telas leem esse conteúdo do banco pela rota `/api/content`, que exige login.

---

## 🖥️ Implantação (VM)

O `docker-compose.yml` sobe o banco, aplica as migrations, carrega o conteúdo do Octalysis e inicia o app:

```bash
cp .env.example .env
docker compose --profile app up -d --build
```

- No `.env` da VM, use uma senha forte em `POSTGRES_PASSWORD` e `NEXT_PUBLIC_SHOW_DEMO_LOGIN=false`.
- O app fica na porta `APP_PORT` (padrão 3000). Coloque um proxy reverso com HTTPS na frente: o cookie de sessão só funciona em HTTPS em produção. Só use `COOKIE_SECURE=false` para testes temporários sem HTTPS.
- Banco e arquivos enviados ficam nos volumes `db-data` e `uploads`. Faça backup dos dois.
- Não rode `pnpm db:seed` em produção: ele cria contas com senha conhecida.

---

## 🎓 Contas de Demonstração (apenas desenvolvimento)

Criadas pelo `pnpm db:seed`:

- **Profa. Ana Silva:**
  - E-mail: `ana.silva@escola.edu.br`
  - Senha: `senha123`
- **Prof. Carlos Eduardo:**
  - E-mail: `carlos.eduardo@escola.edu.br`
  - Senha: `senha123`

---

## 📋 Organização do Projeto

As tarefas ficam no [quadro Kanban do GitHub Projects](https://github.com/users/AOBarbosa/projects/1). Veja em [docs/KANBAN.md](docs/KANBAN.md) como o quadro funciona e como contribuir.
