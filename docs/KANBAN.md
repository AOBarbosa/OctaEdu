# Quadro Kanban do OctaEdu

As tarefas do projeto são organizadas em um quadro Kanban do GitHub Projects:

**https://github.com/users/AOBarbosa/projects/1**

Este guia explica como o quadro funciona e como cada contribuidor deve usá-lo no dia a dia.

## Sumário

- [O que é o quadro](#o-que-é-o-quadro)
- [Acesso](#acesso)
- [Colunas](#colunas)
- [Prioridade](#prioridade)
- [Automações](#automações)
- [Fluxo de trabalho](#fluxo-de-trabalho)
- [Como escrever uma boa issue](#como-escrever-uma-boa-issue)
- [Labels](#labels)
- [Boas práticas](#boas-práticas)
- [Perguntas frequentes](#perguntas-frequentes)

## O que é o quadro

Cada card do quadro é uma **issue** do repositório `AOBarbosa/OctaEdu`. O quadro só organiza essas issues: o título, a descrição, os comentários e o histórico ficam na própria issue.

O quadro tem dois campos próprios, que não existem na issue:

| Campo | Para que serve |
|---|---|
| **Status** | Em que etapa a tarefa está. Define a coluna do card. |
| **Prioridade** | O quanto a tarefa é urgente. Define a ordem dentro da coluna. |

## Acesso

O projeto é **privado**. Para ver e mexer no quadro, peça ao dono do repositório para adicionar você em **⋯ → Settings → Manage access** do projeto, com permissão de **Write**.

Ter acesso ao repositório não dá acesso automático ao quadro.

## Colunas

As colunas vêm do campo **Status** e seguem esta ordem:

| Coluna | Quando o card fica aqui | Quem move |
|---|---|---|
| **Backlog** | Ideias, bugs e tarefas registrados, mas ainda não priorizados. | Entra sozinho ao ser adicionado ao quadro. |
| **A fazer** | Tarefas escolhidas para o próximo ciclo de trabalho, já com descrição clara. | Quem organiza o ciclo. |
| **Em andamento** | Alguém está trabalhando na tarefa agora. O card deve ter um responsável (*Assignee*). | O responsável, ao começar. |
| **Em revisão** | O trabalho terminou e há um PR aberto aguardando revisão. | O responsável, ao abrir o PR. |
| **Concluído** | O PR foi mesclado ou a issue foi fechada. | Automático. |

Regra geral: **um card só anda para a direita** quando a etapa anterior estiver de fato concluída. Se uma revisão pedir mudanças grandes, volte o card para **Em andamento**.

## Prioridade

| Prioridade | Significado |
|---|---|
| 🔴 **Alta** | Bloqueia o uso da plataforma ou a pesquisa com professores. Pegue estas primeiro. |
| 🟡 **Média** | Importante, mas pode esperar o próximo ciclo. |
| ⚪ **Baixa** | Melhoria sem urgência. |

Para ver a prioridade nos cards, abra a seta ao lado do nome da aba do quadro e marque **Prioridade** em **Fields**. Em **Sort by**, escolha **Prioridade** para que os cards de prioridade Alta fiquem no topo de cada coluna.

## Automações

O quadro tem estes workflows ligados (**⋯ → Workflows**):

| Workflow | O que faz |
|---|---|
| **Item added to project** | Todo card novo entra em **Backlog**. |
| **Item closed** | Ao fechar uma issue, o card vai para **Concluído**. |
| **Pull request merged** | Ao mesclar um PR, o card dele vai para **Concluído**. |
| **Auto-add sub-issues to project** | Sub-issues de uma issue do quadro entram no quadro também. |

### Ligar o PR à issue

Para que a issue seja fechada (e o card vá para **Concluído**) quando o PR for mesclado, escreva na descrição do PR:

```
Closes #7
```

Também funcionam `Fixes #7` e `Resolves #7`. Para mais de uma issue, repita a palavra: `Closes #4, closes #5`.

As outras mudanças de coluna (**A fazer**, **Em andamento** e **Em revisão**) são feitas à mão, arrastando o card ou mudando o campo **Status**.

## Fluxo de trabalho

### 1. Registrar a tarefa

Crie uma issue no repositório e adicione ao projeto **OctaEdu - Kanban** no painel lateral (**Projects**). Ela cai em **Backlog**.

Também dá para criar direto no quadro: clique em **+ Add item** no fim de uma coluna, digite `#` para buscar uma issue existente ou escreva um título e depois use **Convert to issue**.

### 2. Priorizar

Quem organiza o ciclo revisa o **Backlog**, define a **Prioridade** e move para **A fazer** as tarefas que serão feitas a seguir.

### 3. Começar

1. Escolha um card em **A fazer**, de preferência de prioridade Alta.
2. Atribua a issue a você (*Assignees*).
3. Mova o card para **Em andamento**.
4. Crie uma branch a partir da `main`:

   ```bash
   git switch main && git pull
   git switch -c feat/limite-login-banco
   ```

   Use os prefixos `feat/` (funcionalidade), `fix/` (correção) e `docs/` (documentação).

### 4. Abrir o PR

1. Antes de abrir o PR, rode as checagens do projeto:

   ```bash
   npx tsc --noEmit -p .
   pnpm lint
   ```

2. Atualize o `README.md` se a funcionalidade mudou.
3. Abra o PR para a `main` com `Closes #<número>` na descrição.
4. Mova o card para **Em revisão**.

### 5. Concluir

Quando o PR for aprovado e mesclado, a issue fecha e o card vai sozinho para **Concluído**.

## Como escrever uma boa issue

Uma issue boa deixa claro **o que** fazer e **quando está pronta**. Use este modelo:

```markdown
Contexto do problema ou da necessidade, em uma ou duas frases.

- [ ] Passo 1
- [ ] Passo 2
- [ ] Atualizar o README
```

- **Título**: comece com um verbo e diga o resultado esperado. Ex.: "Guardar limite de tentativas de login fora da memória".
- **Checklist**: o GitHub mostra o progresso da checklist no card (ex.: 1 de 3).
- **Tarefa grande?** Divida em sub-issues. Elas entram no quadro sozinhas.
- **Dados pessoais**: não coloque e-mail, senha, token nem conteúdo de planos de professores na issue (regra de LGPD do projeto).

## Labels

| Label | Uso |
|---|---|
| `bug` | Algo não funciona como deveria. |
| `enhancement` | Funcionalidade nova ou melhoria. |
| `documentation` | Mudança só em documentação. |
| `question` | Precisa de decisão ou pesquisa antes de codar (ex.: validar mapeamentos do Octalysis). |
| `accessibility` | Barreira de acessibilidade. |
| `good first issue` | Boa para quem está começando no projeto. |
| `help wanted` | Precisa de ajuda extra. |

## Boas práticas

- **Uma pessoa, poucos cards em andamento.** Termine antes de começar outro. Evite ter mais de 2 cards seus em **Em andamento**.
- **Card parado?** Se uma tarefa travou, comente na issue o motivo e, se for o caso, volte o card para **A fazer**.
- **Discussão fica na issue.** Decisões tomadas em conversa devem ser registradas como comentário na issue.
- **Nada fora do quadro.** Se vai trabalhar em algo, crie a issue antes, mesmo que seja pequena.

## Perguntas frequentes

**Fechei a issue sem querer. E agora?**
Reabra a issue (**Reopen issue**) e volte o card para a coluna certa.

**O card não foi para Concluído depois do merge.**
Confira se a descrição do PR tinha `Closes #<número>`. Se não tinha, feche a issue à mão.

**Não vejo o quadro.**
O projeto é privado. Veja a seção [Acesso](#acesso).

**Posso criar uma coluna nova?**
Converse antes com o grupo. As colunas são opções do campo **Status** e mudar o nome de uma delas exige ajustar os workflows em **⋯ → Workflows**.
