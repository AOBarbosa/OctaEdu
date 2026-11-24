-- CreateEnum
CREATE TYPE "Hemisphere" AS ENUM ('left', 'right');

-- CreateEnum
CREATE TYPE "Hat" AS ENUM ('white', 'black');

-- CreateEnum
CREATE TYPE "ActivityDifficulty" AS ENUM ('facil', 'medio', 'dificil');

-- CreateEnum
CREATE TYPE "ActivityLength" AS ENUM ('rapida', 'aula', 'continua');

-- CreateTable
CREATE TABLE "CoreDrive" (
    "id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "englishName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sdtFactors" TEXT[],
    "color" TEXT NOT NULL,
    "hemisphere" "Hemisphere" NOT NULL,
    "hat" "Hat" NOT NULL,

    CONSTRAINT "CoreDrive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationalObjective" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rationale" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "EducationalObjective_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObjectiveCoreDrive" (
    "objectiveId" TEXT NOT NULL,
    "coreDriveId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "ObjectiveCoreDrive_pkey" PRIMARY KEY ("objectiveId","coreDriveId")
);

-- CreateTable
CREATE TABLE "GameTechnique" (
    "id" TEXT NOT NULL,
    "coreDriveId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "generalExample" TEXT,
    "testingFocus" TEXT[] DEFAULT ARRAY['Todos']::TEXT[],
    "position" INTEGER NOT NULL,

    CONSTRAINT "GameTechnique_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "techniqueId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "supportTools" TEXT,
    "difficulty" "ActivityDifficulty",
    "length" "ActivityLength",
    "estimatedTime" TEXT,
    "position" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningObject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "LearningObject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ActivityToLearningObject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ActivityToLearningObject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "CoreDrive_slug_key" ON "CoreDrive"("slug");

-- CreateIndex
CREATE INDEX "GameTechnique_coreDriveId_idx" ON "GameTechnique"("coreDriveId");

-- CreateIndex
CREATE INDEX "Activity_techniqueId_idx" ON "Activity"("techniqueId");

-- CreateIndex
CREATE INDEX "_ActivityToLearningObject_B_index" ON "_ActivityToLearningObject"("B");

-- AddForeignKey
ALTER TABLE "ObjectiveCoreDrive" ADD CONSTRAINT "ObjectiveCoreDrive_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "EducationalObjective"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjectiveCoreDrive" ADD CONSTRAINT "ObjectiveCoreDrive_coreDriveId_fkey" FOREIGN KEY ("coreDriveId") REFERENCES "CoreDrive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameTechnique" ADD CONSTRAINT "GameTechnique_coreDriveId_fkey" FOREIGN KEY ("coreDriveId") REFERENCES "CoreDrive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_techniqueId_fkey" FOREIGN KEY ("techniqueId") REFERENCES "GameTechnique"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToLearningObject" ADD CONSTRAINT "_ActivityToLearningObject_A_fkey" FOREIGN KEY ("A") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToLearningObject" ADD CONSTRAINT "_ActivityToLearningObject_B_fkey" FOREIGN KEY ("B") REFERENCES "LearningObject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
