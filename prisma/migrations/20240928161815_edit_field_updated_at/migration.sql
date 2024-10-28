-- AlterTable
ALTER TABLE "answers" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "classes" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "documents" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "educational_quatifications" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "exams" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "fcm_devices" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "job_references" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "log_users" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "notifications" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "question_of_exam" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "questions" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "result_of_exam" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "schedules" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "student_answers" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "student_of_class" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "students" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "subject_expects" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "subjects" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "time_expects" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tutors" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updated_at" DROP NOT NULL;
