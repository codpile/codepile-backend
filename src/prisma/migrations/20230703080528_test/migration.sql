/*
  Warnings:

  - Added the required column `attendance` to the `Prediction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prediction` ADD COLUMN `attendance` INTEGER NOT NULL;
