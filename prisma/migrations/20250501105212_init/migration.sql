-- CreateEnum
CREATE TYPE "Handedness" AS ENUM ('left_handed', 'right_handed');

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "ranking" INTEGER NOT NULL,
    "number_of_titles" INTEGER NOT NULL,
    "handedness" "Handedness" NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "racket_brand" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Racket" (
    "brand_name" TEXT NOT NULL,

    CONSTRAINT "Racket_pkey" PRIMARY KEY ("brand_name")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_racket_brand_fkey" FOREIGN KEY ("racket_brand") REFERENCES "Racket"("brand_name") ON DELETE RESTRICT ON UPDATE CASCADE;
