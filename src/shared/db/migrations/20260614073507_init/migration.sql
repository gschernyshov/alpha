-- CreateTable
CREATE TABLE "Weather" (
    "id" SERIAL NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" INTEGER NOT NULL,
    "illumination" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Weather_pkey" PRIMARY KEY ("id")
);
