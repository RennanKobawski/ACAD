/*
  Warnings:

  - Added the required column `monthlyIndex` to the `Talon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Talon" ADD COLUMN     "monthlyIndex" INTEGER NOT NULL;
