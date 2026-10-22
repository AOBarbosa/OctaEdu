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
- Antes de entregar, rode `npx tsc --noEmit -p .` e `pnpm lint` e não introduza erros novos.

## React e Next

- Não chame `setState` de forma síncrona dentro de `useEffect` (regra `react-hooks/set-state-in-effect`). Use o estado inicial, handlers de evento ou `useSyncExternalStore`.
- Para feedback de ações (salvar, editar, excluir), use `useToast` de `context/ToastContext.tsx`, não um `Alert` local na página.

## Interface e conteúdo

- O público são professores: textos de UI em pt-BR, curtos, sem jargão técnico e com fonte legível.
- Não use travessão ("—") em textos de UI nem na documentação. Use hífen ou pontuação.
- Os mapeamentos objetivo → Core Drive (`lib/octalysis-data.ts`) e técnica → atividade (`lib/technique-activities.ts`) são provisórios e ainda precisam ser validados com a literatura do Octalysis. Não os trate como definitivos.

## Processo

- Ao mudar uma funcionalidade, atualize o `README.md` no mesmo trabalho. O `ROTEIRO_APRESENTACAO.md` não precisa ser mantido.

# Pendências conhecidas

- Código sem uso em arquivos que ainda não foram alterados (limpar quando forem mexidos):
  - `app/octogono/page.tsx`: `React`, `AutoAwesomeIcon`, `SchoolIcon` e a variável `selectedDriver`.
  - `components/Footer.tsx`: `React`.
  - `components/OctagonVisualizer.tsx`: `React`, `PsychologyIcon` e `ShieldIcon`.
