-- CreateEnum
CREATE TYPE "ArtworkStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "Artwork" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "medium" TEXT,
    "width" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "imageUrl" TEXT,
    "status" "ArtworkStatus" NOT NULL DEFAULT 'DRAFT',
    "sellerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Artwork_sellerId_createdAt_idx" ON "Artwork"("sellerId", "createdAt");

-- CreateIndex
CREATE INDEX "Artwork_status_createdAt_idx" ON "Artwork"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
