-- CreateTable
CREATE TABLE "area_expects" (
    "id" VARCHAR(36) NOT NULL,
    "tutor_id" VARCHAR(36) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "district" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "area_expects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "area_expects" ADD CONSTRAINT "area_expects_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "tutors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
