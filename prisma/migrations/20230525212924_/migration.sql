/*
  Warnings:

  - You are about to drop the column `contacts` on the `Teacher` table. All the data in the column will be lost.
  - The `title` column on the `Teacher` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "contacts",
DROP COLUMN "title",
ADD COLUMN     "title" TEXT[];
