/*
  Warnings:

  - Made the column `color` on table `Group` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "color" SET NOT NULL;
