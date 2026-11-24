// Carrega o conteúdo do Octalysis (prisma/content/) no banco.
// Pode rodar várias vezes: atualiza o que mudou e remove o que saiu do arquivo.
// Diferente do seed, também roda em produção.
import { CONTENT, validateContent } from './content';

try {
  process.loadEnvFile();
} catch {
  // Sem .env: as variáveis vêm do ambiente (Docker/VM).
}

async function main() {
  // Importado depois de carregar o .env, porque o cliente lê DATABASE_URL ao ser criado.
  const { db } = await import('../lib/server/db');
  const errors = validateContent();
  if (errors.length > 0) {
    throw new Error(`Conteúdo inválido:\n${errors.join('\n')}`);
  }

  const techniques = CONTENT.techniquesByCoreDrive.flatMap((group) =>
    group.techniques.map((technique, position) => ({ ...technique, coreDriveId: group.coreDriveId, position })),
  );

  await db.$transaction(async (tx) => {
    for (const { id, ...data } of CONTENT.coreDrives) {
      await tx.coreDrive.upsert({ where: { id }, update: data, create: { id, ...data } });
    }

    for (const { id, ...data } of CONTENT.learningObjects) {
      await tx.learningObject.upsert({ where: { id }, update: data, create: { id, ...data } });
    }

    for (const [position, { id, coreDriveIds, ...data }] of CONTENT.objectives.entries()) {
      await tx.educationalObjective.upsert({
        where: { id },
        update: { ...data, position },
        create: { id, ...data, position },
      });
      await tx.objectiveCoreDrive.deleteMany({ where: { objectiveId: id } });
      await tx.objectiveCoreDrive.createMany({
        data: coreDriveIds.map((coreDriveId, index) => ({ objectiveId: id, coreDriveId, position: index })),
      });
    }

    for (const { id, activity, generalExample, ...data } of techniques) {
      const techniqueData = { ...data, generalExample: generalExample ?? null };
      await tx.gameTechnique.upsert({ where: { id }, update: techniqueData, create: { id, ...techniqueData } });

      // Por enquanto, uma atividade por técnica, com o nome da técnica como título.
      const activityId = `${id}-1`;
      const activityData = {
        title: data.name,
        description: activity.description,
        supportTools: activity.supportTools ?? null,
        position: 0,
        learningObjects: { set: activity.learningObjectIds.map((loId) => ({ id: loId })) },
      };
      await tx.activity.upsert({
        where: { id: activityId },
        update: activityData,
        create: {
          id: activityId,
          techniqueId: id,
          ...activityData,
          learningObjects: { connect: activity.learningObjectIds.map((loId) => ({ id: loId })) },
        },
      });
    }

    // Remove o que não está mais no arquivo de conteúdo.
    const techniqueIds = techniques.map((t) => t.id);
    await tx.activity.deleteMany({ where: { id: { notIn: techniqueIds.map((id) => `${id}-1`) } } });
    await tx.gameTechnique.deleteMany({ where: { id: { notIn: techniqueIds } } });
    await tx.educationalObjective.deleteMany({ where: { id: { notIn: CONTENT.objectives.map((o) => o.id) } } });
    await tx.learningObject.deleteMany({ where: { id: { notIn: CONTENT.learningObjects.map((lo) => lo.id) } } });
  }, { timeout: 60_000 });

  const withLo = techniques.filter((t) => t.activity.learningObjectIds.length > 0).length;
  console.log(
    `Conteúdo carregado: ${CONTENT.coreDrives.length} Core Drives, ${CONTENT.objectives.length} objetivos, ` +
      `${techniques.length} técnicas, ${techniques.length} atividades (${withLo} com Objeto de Aprendizagem), ` +
      `${CONTENT.learningObjects.length} Objetos de Aprendizagem.`,
  );
  await db.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
