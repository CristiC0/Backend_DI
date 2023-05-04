/*
  Warnings:

  - You are about to drop the column `contacts` on the `Teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "contacts";

-- CreateTable
CREATE TABLE "TeacherContacts" (
    "teacherId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "courseId" TEXT,

    CONSTRAINT "TeacherContacts_pkey" PRIMARY KEY ("teacherId","contactId")
);

-- AddForeignKey
ALTER TABLE "TeacherContacts" ADD CONSTRAINT "TeacherContacts_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherContacts" ADD CONSTRAINT "TeacherContacts_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherContacts" ADD CONSTRAINT "TeacherContacts_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
