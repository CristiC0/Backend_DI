/*
  Warnings:

  - Added the required column `priority` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "priority" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "management" BOOLEAN NOT NULL DEFAULT false;
