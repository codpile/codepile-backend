/*
  Warnings:

  - You are about to drop the column `SubjectId` on the `prediction` table. All the data in the column will be lost.
  - Added the required column `subjectId` to the `Prediction` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Prediction_SubjectId_idx` ON `prediction`;

-- AlterTable
ALTER TABLE `prediction` DROP COLUMN `SubjectId`,
    ADD COLUMN `subjectId` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE INDEX `Prediction_subjectId_idx` ON `Prediction`(`subjectId`);
