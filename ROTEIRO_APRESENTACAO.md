# 🎯 Roteiro Prático de Demonstração e Apresentação da Plataforma OctaEdu

Este documento foi elaborado para guiar a apresentação da plataforma **OctaEdu** na próxima reunião de equipe/stakeholders. Ele apresenta um roteiro cronometrado, os dados de acesso para teste ao vivo, a narrativa pedagógica e o passo a passo de cada fluxo funcional (HU01 a HU08).

---

## 🔑 1. Dados de Acesso para a Demonstração (Login)

A plataforma conta com contas de teste pré-configuradas e um botão de preenchimento automático com 1 clique na tela de login.

### Contas Disponíveis:
- **Conta Principal (Docente de Ciências/Biologia):**
  - **E-mail:** `ana.silva@escola.edu.br`
  - **Senha:** `senha123`
  - **Perfil:** Profa. Ana Silva (Colégio Estadual Dom Pedro II)
  - **Planos Prontos:** Já possui planos salvos no dashboard para exibição imediata.

- **Conta Secundária (Docente de Matemática/Física):**
  - **E-mail:** `carlos.eduardo@escola.edu.br`
  - **Senha:** `senha123`
  - **Perfil:** Prof. Carlos Eduardo (Instituto de Educação Básica)

- **URL de Acesso Local:** `http://localhost:3000`

---

## ⏱️ 2. Visão Geral da Demonstração (Tempo Estimado: 10 a 15 minutos)

| Bloco | Duração | Funcionalidades / Histórias de Usuário | Foco da Apresentação |
|---|---|---|---|
| **Bloco 1** | 2 min | Abertura & Sidebar Retrátil | Apresentar o propósito da plataforma e a nova navegação lateral responsiva. |
| **Bloco 2** | 2 min | HU01 e HU02: Autenticação Docente | Demonstrar o login com validações amigáveis e cadastro de novo professor. |
| **Bloco 3** | 3 min | HU03: Octógono Interativo Octalysis | Interagir com o gráfico SVG dos 8 Core Drivers e explicar White vs Black Hat. |
| **Bloco 4** | 2 min | HU04: Catálogo de Técnicas de Jogos | Mostrar os filtros pedagógicos, modelos de missões e links de ferramentas (Genially, Miro). |
| **Bloco 5** | 3 min | HU05 & HU06: Wizard de Gamificação | Definir objetivos pedagógicos e ver o cálculo automático de recomendações. |
| **Bloco 6** | 2 min | HU07: Gestão de Planos de Gamificação | Visualizar, editar, duplicar para outra turma e exportar plano em PDF. |
| **Bloco 7** | 1 min | HU08: Hub de Materiais & Uploads | Compartilhar links/arquivos anexos com controle de privacidade (público/privado). |
| **Bloco 8** | 1 min | Perfil no Rodapé & Encerramento | Mostrar o perfil fixado na base da barra lateral e realizar logout seguro. |

---

## 🎬 3. Passo a Passo Detalhado dos Fluxos para Apresentar

### 📌 Bloco 1: Abertura e Interface Retrátil
1. Acesse `http://localhost:3000/`.
2. **O que falar:**
   > *"O OctaEdu é uma plataforma desenvolvida para apoiar professores na concepção de experiências gamificadas reais e significativas, fundamentadas no framework Octalysis de Yu-kai Chou, superando a visão rasa de apenas atribuir notas e rankings."*
3. **Ação na tela:**
   - Mostre a **Sidebar Retrátil** no lado esquerdo.
   - Clique no ícone de recolher (`<`). A barra encolhe suavemente para o formato compacto (*mini-rail*), exibindo apenas ícones com tooltips elegantes ao passar o cursor.
   - Clique no botão (`>`) para expandi-la novamente.
   - Destaque que a navegação é limpa e moderna, com o ícone de perfil estrategicamente fixado como o **último elemento na base**.

---

### 📌 Bloco 2: Autenticação Docente (HU01 & HU02)
1. Na Sidebar, clique no botão de perfil ou acesse `/login`.
2. **O que falar:**
   > *"A segurança e personalização docente foram priorizadas. O professor pode entrar com suas credenciais ou criar uma conta em segundos."*
3. **Ação na tela (HU02 - Login):**
   - Mostre o botão **"Acesso Rápido para Avaliação"** e clique em **"Profa. Ana Silva (Ciências)"**. Os campos de e-mail e senha são preenchidos automaticamente.
   - Mostre o botão de mostrar/ocultar senha (ícone de olho).
   - Clique em **"Entrar no Sistema"**. O sistema autentica e redireciona para a área logada.
4. **Demonstração do Cadastro (HU01 - Opcional):**
   - Mostre a tela `/cadastro`. Aponte os campos obrigatórios (Nome, E-mail, Senha) e opcionais (Escola e Disciplina) com validação de formato e e-mail único.

---

### 📌 Bloco 3: O Octógono Interativo dos 8 Core Drivers (HU03)
1. Na Sidebar, clique em **"Octógono Octalysis"** (`/octogono`).
2. **O que falar:**
   > *"Aqui o professor visualiza graficamente as 8 forças motivacionais humanas mapeadas pelo Octalysis, divididas nas dimensões White Hat (empoderamento/propósito), Black Hat (urgência/foco), Lado Esquerdo (lógica/extrínseco) e Lado Direito (criatividade/intrínseco)."*
3. **Ação na tela:**
   - Passe o mouse sobre os 8 vértices/fatias do Octógono SVG colorido.
   - Clique no **CD1 (Significado Épico e Chamado)**: observe a animação do gráfico e a atualização instantânea do painel detalhado à direita com:
     - Conceito e fundamentação psicológica;
     - Impacto pedagógico em sala de aula;
     - Exemplos práticos reais (ex: *"Narrativa interdisciplinar sobre crise ambiental fictícia"*).
   - Clique no **CD2 (Desenvolvimento e Conquista)** e no **CD7 (Imprevisibilidade e Curiosidade)** para demonstrar a alternância dinâmica.
   - Mostre o botão **"Ver Técnicas deste Core Driver"** que leva diretamente ao catálogo filtrado.

---

### 📌 Bloco 4: Catálogo de Técnicas e Recursos Virtuais (HU04)
1. Na Sidebar, clique em **"Técnicas de Jogos"** (`/tecnicas`).
2. **O que falar:**
   > *"Cada Core Driver se desdobra em técnicas e mecânicas aplicáveis. O professor não fica apenas na teoria: ele tem acesso a modelos de missões e sugestões de ferramentas virtuais prontas para uso."*
3. **Ação na tela:**
   - Utilize a **Barra de Pesquisa** e digite `Boss Fight` ou `Guildas`.
   - Alterne o filtro rápido de Core Drivers clicando nos botões `CD1`, `CD2`, `CD5` ou `CD7`.
   - Filtre por **Nível de Ensino** (ex: *Ensino Fundamental* ou *Ensino Médio*).
   - Abra um card de técnica (ex: *Batalha contra o Chefe* ou *Sequência de Fogo - Streaks*):
     - Destaque o bloco **"🎯 Modelo Prático de Missão"**;
     - Mostre as pílulas de **Recursos e Ferramentas Virtuais** com links diretos para plataformas conhecidas (ex: *Kahoot*, *Genially*, *Miro*, *Padlet*).

---

### 📌 Bloco 5: Wizard - Aplicar Gamificação por Objetivos (HU05 & HU06)
1. Na Sidebar, clique no botão destacado **"Aplicar Gamificação"** (`/planejamento/novo`).
2. **O que falar:**
   > *"Este é o coração da ferramenta. O professor não precisa ser um especialista em gamificação: ele informa o que quer atingir pedagogicamente e o sistema calcula a recomendação ideal."*
3. **Ação na tela:**
   - **Etapa 1 (HU05 - Objetivos Educacionais):**
     - Selecione: *Colaboração e Trabalho em Equipe* e *Criatividade e Resolução Aberta de Problemas*.
     - Clique em **"Avançar para Recomendações"**.
   - **Etapa 2 (HU06 - Recomendação Inteligente):**
     - Mostre o banner de **Sugestão Inteligente de Foco**. O algoritmo ponderou os objetivos e recomendou **CD5 (Influência Social)** e **CD3 (Criatividade e Feedback)** com pontuação de afinidade e justificativa explicativa.
     - Confirme os Core Drivers e clique em **"Ver Técnicas Recomendadas"**.
   - **Etapa 3 (HU06 - Seleção de Missões):**
     - O sistema lista as técnicas correspondentes aos drivers escolhidos.
     - Marque as técnicas desejadas (ex: *Guildas & Esquadrões* e *Menu de Escolhas / Choice Board*).
     - Mostre o campo de texto onde o professor pode adicionar suas próprias anotações de adaptação para a turma.
     - Clique em **"Finalizar Detalhes"**.
   - **Etapa 4 (HU07 - Dados e Salvamento):**
     - Preencha:
       - **Título:** `Projeto Guardiões do Futuro - 8º Ano`
       - **Disciplina:** `História e Geografia`
       - **Turma:** `8º Ano C`
     - Observe o painel de resumo lateral que sintetiza objetivos, drivers e técnicas.
     - Clique em **"Salvar Plano no Meu Painel"**. O sistema salva e redireciona para a listagem.

---

### 📌 Bloco 6: Gerenciamento dos Planos de Aula (HU07)
1. Você será direcionado para **"Meus Planos"** (`/planos`).
2. **O que falar:**
   > *"Todos os planejamentos ficam centralizados no painel docente, permitindo reuso contínuo, adaptações para novas turmas e exportação para impressão ou PDF."*
3. **Ação na tela:**
   - Mostre o plano recém-criado junto aos planos de demonstração já existentes.
   - Clique em **"Visualizar"**: abre a janela completa com resumo dos Core Drivers, objetivos e missões detalhadas.
   - Clique no botão **"Imprimir / Exportar PDF"** para demonstrar o layout pronto para impressão e documentação pedagógica.
   - Clique no menu de três pontinhos (`⋮`) de qualquer plano:
     - Clique em **"Duplicar para Nova Turma"**: uma cópia é criada instantaneamente com sufixo `(Cópia)`.
     - Mostre a opção **"Editar Plano"** para ajuste rápido de títulos e descrições.

---

### 📌 Bloco 7: Banco de Recursos & Uploads (HU08)
1. Na Sidebar, clique em **"Recursos & Uploads"** (`/recursos`).
2. **O que falar:**
   > *"O OctaEdu estimula uma comunidade de prática. Os professores podem anexar arquivos de roteiros ou links de materiais criados no Canva/Genially e escolher se o material é privado ou compartilhado com outros colegas."*
3. **Ação na tela:**
   - Mostre os materiais já existentes com filtros por técnica.
   - Clique no botão **"Fazer Upload de Exemplo"**:
     - Preencha um título fictício (ex: *Roteiro de Batalha contra Boss de História*);
     - Selecione a técnica associada;
     - Alterne entre **"Link"** e **"Upload de Arquivo (PDF, Imagem)"**;
     - Aponte o botão switch de visibilidade: **"Público para outros professores"** vs **"Privado"**;
     - Salve para mostrar a inclusão instantânea no mural.

---

### 📌 Bloco 8: Perfil no Rodapé da Sidebar & Logout
1. Aponte para a base da Sidebar:
   - Destaque o cartão com o avatar da **Profa. Ana Silva**, nome e área curricular.
   - Clique no perfil para abrir o menu suspenso.
   - Mostre os atalhos rápidos para *"Meus Planejamentos"* e *"Meus Materiais"*.
   - Clique em **"Sair da Conta"** para demonstrar o encerramento seguro de sessão e o retorno elegante aos botões de login/cadastro na base da barra lateral.

---

## 💡 4. Principais Argumentos de Valor para Destacar na Apresentação

1. **Rigor Pedagógico:** Não é um gerador genérico de pontos e medalhas; o OctaEdu trabalha motivação intrínseca, pertencimento e autonomia discente.
2. **Usabilidade para o Professor:** O assistente guiado em 4 passos reduz o tempo de planejamento de semanas para minutos.
3. **Interface Responsiva com Material UI:** Navegação retrátil ágil que maximiza a área de trabalho do professor tanto no computador quanto no tablet.
4. **Pronto para Sala de Aula:** Planos prontos para impressão/PDF, integração com ferramentas reais (Genially, Kahoot, Miro) e repositório de práticas.
