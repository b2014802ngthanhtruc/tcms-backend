/*
  Warnings:

  - Made the column `updated_at` on table `educational_quatifications` required. This step will fail if there are existing NULL values in that column.
  - Made the column `class` on table `job_references` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "educational_quatifications" ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "job_references" ALTER COLUMN "class" SET NOT NULL;
