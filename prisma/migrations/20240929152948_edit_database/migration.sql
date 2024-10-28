/*
  Warnings:

  - You are about to drop the column `location` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `tutors` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address_id]` on the table `classes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address_id]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address_id]` on the table `tutors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address_id` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_id` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_id` to the `tutors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classes" DROP COLUMN "location",
ADD COLUMN     "address_id" VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "address",
ADD COLUMN     "address_id" VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE "tutors" DROP COLUMN "address",
ADD COLUMN     "address_id" VARCHAR(36) NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "id" VARCHAR(36) NOT NULL,
    "lng" DOUBLE PRECISION,
    "lat" DOUBLE PRECISION,
    "address" VARCHAR(255) NOT NULL,
    "ward" VARCHAR(255) NOT NULL,
    "district" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3),
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" VARCHAR(36) NOT NULL,
    "country_id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" VARCHAR(36) NOT NULL,
    "city_id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ward" (
    "id" VARCHAR(36) NOT NULL,
    "district_id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Ward_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "classes_address_id_key" ON "classes"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "students_address_id_key" ON "students"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "tutors_address_id_key" ON "tutors"("address_id");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutors" ADD CONSTRAINT "tutors_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ward" ADD CONSTRAINT "Ward_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
