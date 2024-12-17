/*
  Warnings:

  - Added the required column `dailyIndex` to the `Talon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Talon" ADD COLUMN     "dailyIndex" INTEGER NOT NULL;
