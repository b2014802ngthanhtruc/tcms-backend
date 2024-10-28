/*
  Warnings:

  - Made the column `full_address` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "full_address" SET NOT NULL;
