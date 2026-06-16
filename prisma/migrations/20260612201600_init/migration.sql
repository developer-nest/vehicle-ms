-- CreateEnum
CREATE TYPE "StatusVehicle" AS ENUM ('trabajando en la ciudad', 'interior', 'disponible', 'taller', 'otro');

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "numCar" TEXT NOT NULL,
    "seatCount" INTEGER NOT NULL,
    "currentMileage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "brand" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "status" "StatusVehicle" NOT NULL DEFAULT 'disponible',
    "dateIn" TEXT,
    "dateEnd" TEXT,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_numCar_key" ON "Vehicle"("numCar");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_dateIn_key" ON "Vehicle"("dateIn");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_dateEnd_key" ON "Vehicle"("dateEnd");

-- CreateIndex
CREATE INDEX "Vehicle_isActive_idx" ON "Vehicle"("isActive");
