/*
  Warnings:

  - You are about to drop the column `biografie` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `book` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `course` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `biografy` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "biografie",
DROP COLUMN "book",
DROP COLUMN "course",
ADD COLUMN     "biografy" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cycle" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "speciality" TEXT[],
    "socials" TEXT[],
    "content" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TeacherCourse" (
    "teacherId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "TeacherCourse_pkey" PRIMARY KEY ("teacherId","courseId")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_id_key" ON "Course"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Article_id_key" ON "Article"("id");

-- AddForeignKey
ALTER TABLE "TeacherCourse" ADD CONSTRAINT "TeacherCourse_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherCourse" ADD CONSTRAINT "TeacherCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
