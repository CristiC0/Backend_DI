/*
  Warnings:

  - You are about to drop the column `socials` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "socials",
ADD COLUMN     "links" TEXT[];
