-- CreateTable
CREATE TABLE "public"."Education" (
    "id" SERIAL NOT NULL,
    "school" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "resumeSubmissionsId" INTEGER,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Experience" (
    "id" SERIAL NOT NULL,
    "employer" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "duties" TEXT NOT NULL,
    "resumeSubmissionsId" INTEGER,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Skill" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "resumeSubmissionsId" INTEGER,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Certificate" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "resumeSubmissionsId" INTEGER,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ResumeSubmissions" (
    "id" SERIAL NOT NULL,
    "age" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "proficiency" TEXT NOT NULL,
    "authorizationStatus" TEXT NOT NULL,

    CONSTRAINT "ResumeSubmissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Profiles" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_email_key" ON "public"."Profiles"("email");

-- AddForeignKey
ALTER TABLE "public"."Education" ADD CONSTRAINT "Education_resumeSubmissionsId_fkey" FOREIGN KEY ("resumeSubmissionsId") REFERENCES "public"."ResumeSubmissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Experience" ADD CONSTRAINT "Experience_resumeSubmissionsId_fkey" FOREIGN KEY ("resumeSubmissionsId") REFERENCES "public"."ResumeSubmissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Skill" ADD CONSTRAINT "Skill_resumeSubmissionsId_fkey" FOREIGN KEY ("resumeSubmissionsId") REFERENCES "public"."ResumeSubmissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Certificate" ADD CONSTRAINT "Certificate_resumeSubmissionsId_fkey" FOREIGN KEY ("resumeSubmissionsId") REFERENCES "public"."ResumeSubmissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
