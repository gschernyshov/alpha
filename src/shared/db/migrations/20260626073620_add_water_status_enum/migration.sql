-- CreateEnum
CREATE TYPE "WaterStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'MANUAL');

-- AlterTable
ALTER TABLE "WaterLog" ADD COLUMN     "status" "WaterStatus",
ALTER COLUMN "waterAt" DROP NOT NULL;
