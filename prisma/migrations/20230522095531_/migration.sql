/*
  Warnings:

  - A unique constraint covering the columns `[teacherId]` on the table `TeacherCourse` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseId]` on the table `TeacherCourse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TeacherCourse_teacherId_key" ON "TeacherCourse"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherCourse_courseId_key" ON "TeacherCourse"("courseId");
