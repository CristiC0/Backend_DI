/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContactTypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherContacts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_contactTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_userId_fkey";

-- DropForeignKey
ALTER TABLE "ContactTypes" DROP CONSTRAINT "ContactTypes_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "ContactTypes" DROP CONSTRAINT "ContactTypes_userId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherContacts" DROP CONSTRAINT "TeacherContacts_contactId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherContacts" DROP CONSTRAINT "TeacherContacts_courseId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherContacts" DROP CONSTRAINT "TeacherContacts_teacherId_fkey";

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "contacts" JSONB NOT NULL DEFAULT 'null';

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "ContactTypes";

-- DropTable
DROP TABLE "TeacherContacts";
