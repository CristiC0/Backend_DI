/*
  Warnings:

  - Added the required column `teacherId` to the `Orar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "acronym" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Orar" ADD COLUMN     "teacherId" TEXT NOT NULL,
ADD COLUMN     "week" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Orar" ADD CONSTRAINT "Orar_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
