/*
  Warnings:

  - The values [em_estoque,utimas_unidades,fora_de_estoque] on the enum `ItemStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ItemStatus_new" AS ENUM ('in_stock', 'last_units', 'out_of_stock');
ALTER TYPE "ItemStatus" RENAME TO "ItemStatus_old";
ALTER TYPE "ItemStatus_new" RENAME TO "ItemStatus";
DROP TYPE "ItemStatus_old";
COMMIT;
