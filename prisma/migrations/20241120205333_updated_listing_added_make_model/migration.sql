/*
  Warnings:

  - You are about to drop the column `brand` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `makeId` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelId` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "brand",
DROP COLUMN "model",
ADD COLUMN     "makeId" TEXT NOT NULL,
ADD COLUMN     "modelId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Make" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Make_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "makeId" TEXT NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_makeId_fkey" FOREIGN KEY ("makeId") REFERENCES "Make"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_makeId_fkey" FOREIGN KEY ("makeId") REFERENCES "Make"("id") ON DELETE CASCADE ON UPDATE CASCADE;
