-- CreateTable
CREATE TABLE "bom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "updatedAt" DATE,

    CONSTRAINT "bom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bom_email_key" ON "bom"("email");
