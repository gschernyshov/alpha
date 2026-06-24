-- CreateTable
CREATE TABLE "Weather" (
    "id" SERIAL NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "illumination" DOUBLE PRECISION NOT NULL,
    "measuredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Weather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantProfile" (
    "id" SERIAL NOT NULL,
    "plantId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "latinName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lightRequirements" TEXT NOT NULL,
    "temperatureRequirements" TEXT NOT NULL,
    "wateringRequirements" TEXT NOT NULL,
    "wateringIntervalDays" INTEGER NOT NULL,

    CONSTRAINT "PlantProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoilMoisture" (
    "id" SERIAL NOT NULL,
    "plantId" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "measuredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SoilMoisture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterLog" (
    "id" SERIAL NOT NULL,
    "plantId" INTEGER NOT NULL,
    "waterAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaterLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Weather_measuredAt_idx" ON "Weather"("measuredAt");

-- CreateIndex
CREATE UNIQUE INDEX "Plant_title_key" ON "Plant"("title");

-- CreateIndex
CREATE INDEX "Plant_title_idx" ON "Plant"("title");

-- CreateIndex
CREATE UNIQUE INDEX "PlantProfile_plantId_key" ON "PlantProfile"("plantId");

-- CreateIndex
CREATE INDEX "PlantProfile_plantId_name_latinName_idx" ON "PlantProfile"("plantId", "name", "latinName");

-- CreateIndex
CREATE INDEX "SoilMoisture_plantId_measuredAt_idx" ON "SoilMoisture"("plantId", "measuredAt");

-- CreateIndex
CREATE INDEX "WaterLog_plantId_waterAt_idx" ON "WaterLog"("plantId", "waterAt");

-- AddForeignKey
ALTER TABLE "PlantProfile" ADD CONSTRAINT "PlantProfile_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoilMoisture" ADD CONSTRAINT "SoilMoisture_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaterLog" ADD CONSTRAINT "WaterLog_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
