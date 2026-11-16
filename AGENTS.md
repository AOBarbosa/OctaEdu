<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Regras do projeto

## Código

- Ao alterar um arquivo, remova as importações, variáveis e funções que ficarem sem uso nele. Confira com `npx tsc --noEmit -p . --noUnusedLocals --noUnusedParameters` e `pnpm lint`.
- Não use `any`. Tipe tudo, reaproveitando os tipos de `lib/types.ts`.
- Deixe dados e regras em `lib/` (ex.: `lib/activity-filter.ts`, `lib/plan-draft.ts`). As páginas em `app/` só montam a tela.
- A API fica em `app/api/**/route.ts` e o código que só roda no servidor (banco, sessão, upload, validação) em `lib/server/`. O front chama a API só por `lib/api-client.ts`, via `useAuth`.
- Banco: altere `prisma/schema.prisma` e gere a migration com `pnpm db:migrate`. Não edite migrations já versionadas nem a pasta `generated/`.
- Antes de entregar, rode `npx tsc --noEmit -p .` e `pnpm lint` e não introduza erros novos.

## React e Next

- Não chame `setState` de forma síncrona dentro de `useEffect` (regra `react-hooks/set-state-in-effect`). Use o estado inicial, handlers de evento ou `useSyncExternalStore`.
- Para feedback de ações (salvar, editar, excluir), use `useToast` de `context/ToastContext.tsx`, não um `Alert` local na página.

## Interface e conteúdo

- O público são professores: textos de UI em pt-BR, curtos, sem jargão técnico e com fonte legível.
- Não use travessão ("—") em textos de UI nem na documentação. Use hífen ou pontuação.
- Os mapeamentos objetivo → Core Drive (`lib/octalysis-data.ts`) e técnica → atividade (`lib/technique-activities.ts`) são provisórios e ainda precisam ser validados com a literatura do Octalysis. Não os trate como definitivos.

## Segurança

O sistema é usado em pesquisa acadêmica com professores, então as regras abaixo valem para todo código de API, banco e login.

### Autenticação e sessão

- Senha sempre com hash bcrypt (custo mínimo 10). Nunca salve a senha em texto, nunca a registre em log e nunca a devolva em resposta da API.
- Sessão em cookie `httpOnly`, `sameSite=lax`, `secure` em produção e expiração de 7 dias. O banco guarda só o hash do token. Logout apaga a sessão do banco.
- No login, responda sempre "E-mail ou senha incorretos.", sem indicar qual dos dois está errado, para não revelar e-mails cadastrados.
- Limite as tentativas de login erradas por IP e por e-mail, com bloqueio temporário.

### API

- Toda rota confere a sessão e o dono do recurso no servidor: o professor só lê e altera o que é dele (materiais públicos são exceção apenas para leitura). O `proxy.ts` só redireciona e não substitui essa checagem.
- Upload aceita só PDF e imagem de até 10 MB, conferindo o tipo real do arquivo. Salve fora de `public/`, com nome gerado pelo servidor, e sirva por uma rota que verifica a permissão.
- Segredos ficam fora do repositório: `.env` no `.gitignore` e `.env.example` sem valores reais. Nada de senha de banco ou chave no código nem no `docker-compose.yml` versionado.

## LGPD

- Colete o mínimo: nome e e-mail obrigatórios, escola e disciplina opcionais. Sem CPF, telefone ou dados de alunos. Campo pessoal novo só entra com justificativa registrada no PR.
- Cadastro exige aceite do Termo de Uso e da Política de Privacidade, guardando a data e a versão aceita.
- O professor consegue ver, corrigir e exportar os próprios dados e excluir a conta. A exclusão apaga planos, materiais, arquivos enviados e sessões.
- Logs e mensagens de erro não trazem e-mail, senha, token nem conteúdo de planos.

## Processo

- Ao mudar uma funcionalidade, atualize o `README.md` no mesmo trabalho. O `ROTEIRO_APRESENTACAO.md` não precisa ser mantido.

# Pendências conhecidas

- O texto do Termo de Uso e da Política de Privacidade (`app/termos`, `app/privacidade`) é um rascunho e precisa ser revisado, incluindo o contato do responsável pelos dados. Ao mudar o texto, suba `TERMS_VERSION` em `lib/legal.ts`.
- O limite de tentativas de login fica em memória: vale para uma instância do app só e zera ao reiniciar.
