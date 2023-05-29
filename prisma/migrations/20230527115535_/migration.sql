-- DropForeignKey
ALTER TABLE "Orar" DROP CONSTRAINT "Orar_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Orar" DROP CONSTRAINT "Orar_teacherId_fkey";

-- AlterTable
ALTER TABLE "Orar" ALTER COLUMN "courseId" DROP NOT NULL,
ALTER COLUMN "room" DROP NOT NULL,
ALTER COLUMN "teacherId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Orar" ADD CONSTRAINT "Orar_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orar" ADD CONSTRAINT "Orar_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
