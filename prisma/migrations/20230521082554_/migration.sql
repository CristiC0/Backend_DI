/*
  Warnings:

  - You are about to drop the column `group` on the `Orar` table. All the data in the column will be lost.
  - Added the required column `groupId` to the `Orar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orar" DROP COLUMN "group",
ADD COLUMN     "groupId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Orar" ADD CONSTRAINT "Orar_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
