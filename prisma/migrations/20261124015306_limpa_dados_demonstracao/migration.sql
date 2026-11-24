-- Remove os planos e materiais de demonstração que usam o conteúdo antigo,
-- fixo no código: técnicas "gt-*" e objetivos "obj-*". Esses IDs não existem
-- no conteúdo carregado por `pnpm db:content`. Todos esses dados eram de
-- demonstração (decisão da equipe). Arquivos enviados ligados a esses
-- materiais continuam na pasta de uploads e podem ser apagados à mão.

DELETE FROM "Plan"
WHERE EXISTS (SELECT 1 FROM unnest("objectiveIds") AS id WHERE id LIKE 'obj-%')
   OR "techniques"::text LIKE '%"gt-%';

DELETE FROM "Resource"
WHERE "techniqueId" LIKE 'gt-%';
