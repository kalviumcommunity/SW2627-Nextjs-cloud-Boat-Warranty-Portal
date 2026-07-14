-- CreateEnum
CREATE TYPE "RepairStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Repair" (
    "id" SERIAL NOT NULL,
    "issue" TEXT NOT NULL,
    "repairStatus" "RepairStatus" NOT NULL DEFAULT 'PENDING',
    "estimatedCompletion" TIMESTAMP(3),
    "technicianNotes" TEXT,
    "repairDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Repair_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Repair" ADD CONSTRAINT "Repair_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
