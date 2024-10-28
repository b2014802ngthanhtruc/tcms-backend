/*
  Warnings:

  - You are about to drop the column `is_user` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_user",
ADD COLUMN     "is_complete_signup" BOOLEAN NOT NULL DEFAULT false;
