-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numCar" TEXT NOT NULL,
    "seatCount" INTEGER NOT NULL,
    "currentMileage" REAL NOT NULL DEFAULT 0,
    "brand" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'DISPONIBLE',
    "dateIn" TEXT,
    "dateEnd" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_numCar_key" ON "Vehicle"("numCar");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_dateIn_key" ON "Vehicle"("dateIn");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_dateEnd_key" ON "Vehicle"("dateEnd");
