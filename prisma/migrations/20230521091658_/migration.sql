/*
  Warnings:

  - Added the required column `room` to the `Orar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orar" ADD COLUMN     "room" TEXT NOT NULL;
