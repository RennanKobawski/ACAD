/*
  Warnings:

  - The `arrivalTime` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "vtr" SET DATA TYPE TEXT,
ALTER COLUMN "activationTime" DROP NOT NULL,
ALTER COLUMN "endTime" DROP NOT NULL,
DROP COLUMN "arrivalTime",
ADD COLUMN     "arrivalTime" TIMESTAMP(3);
