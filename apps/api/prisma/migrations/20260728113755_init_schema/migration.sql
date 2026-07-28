-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'OWNER', 'ADMIN');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('APARTMENT_BUILDING', 'VILLA', 'HOUSE', 'DORMITORY', 'COMPOUND');

-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('APARTMENT', 'ROOM', 'BED', 'STUDIO');

-- CreateEnum
CREATE TYPE "GenderRestriction" AS ENUM ('MALE', 'FEMALE', 'MIXED');

-- CreateEnum
CREATE TYPE "AvailabilityStatus" AS ENUM ('AVAILABLE', 'RESERVED', 'OCCUPIED', 'MAINTENANCE', 'UNAVAILABLE');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'PAUSED', 'RENTED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "StayRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('STAY_REQUEST_RECEIVED', 'STAY_REQUEST_ACCEPTED', 'STAY_REQUEST_REJECTED', 'STAY_REQUEST_CANCELLED', 'VERIFICATION_APPROVED', 'VERIFICATION_REJECTED', 'SYSTEM');

-- CreateTable
CREATE TABLE "governorate" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,

    CONSTRAINT "governorate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "city" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "governorate_id" TEXT NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "city_id" TEXT NOT NULL,

    CONSTRAINT "area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "university" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,

    CONSTRAINT "university_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "role" "UserRole" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_blocked" BOOLEAN NOT NULL DEFAULT false,
    "phone_verified_at" TIMESTAMP(3),
    "last_login_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_profile" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "user_id" TEXT NOT NULL,
    "university_id" TEXT NOT NULL,
    "faculty" TEXT,
    "academic_year" TEXT,

    CONSTRAINT "student_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owner_profile" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "user_id" TEXT NOT NULL,
    "national_id" TEXT,
    "occupation" TEXT,

    CONSTRAINT "owner_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_request" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "user_id" TEXT NOT NULL,
    "status" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewed_at" TIMESTAMP(3),
    "review_notes" TEXT,
    "reviewed_by_id" TEXT,

    CONSTRAINT "verification_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "owner_profile_id" TEXT NOT NULL,
    "governorate_id" TEXT NOT NULL,
    "city_id" TEXT NOT NULL,
    "area_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "property_type" "PropertyType" NOT NULL,

    CONSTRAINT "property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_image" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "property_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "property_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "property_id" TEXT NOT NULL,
    "unit_number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "monthly_rent" DECIMAL NOT NULL,
    "security_deposit" DECIMAL NOT NULL,
    "capacity" INTEGER NOT NULL,
    "available_beds" INTEGER NOT NULL,
    "available_from" TIMESTAMP(3) NOT NULL,
    "unit_type" "UnitType" NOT NULL,
    "gender_restriction" "GenderRestriction" NOT NULL,
    "availability_status" "AvailabilityStatus" NOT NULL,

    CONSTRAINT "unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit_image" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "unit_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "unit_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listing" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "unit_id" TEXT NOT NULL,
    "status" "ListingStatus" NOT NULL DEFAULT 'DRAFT',
    "published_at" TIMESTAMP(3),
    "unpublished_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3),
    "is_featured" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "student_profile_id" TEXT NOT NULL,
    "listing_id" TEXT NOT NULL,

    CONSTRAINT "favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stay_request" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "listing_id" TEXT NOT NULL,
    "student_profile_id" TEXT NOT NULL,
    "message" TEXT,
    "move_in_date" TIMESTAMP(3) NOT NULL,
    "duration_months" INTEGER NOT NULL,
    "status" "StayRequestStatus" NOT NULL DEFAULT 'PENDING',
    "owner_response" TEXT,
    "responded_at" TIMESTAMP(3),

    CONSTRAINT "stay_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "user_id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "read_at" TIMESTAMP(3),
    "reference_id" TEXT,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "governorate_name_key" ON "governorate"("name");

-- CreateIndex
CREATE INDEX "idx_governorate_name" ON "governorate"("name");

-- CreateIndex
CREATE INDEX "idx_city_name" ON "city"("name");

-- CreateIndex
CREATE INDEX "idx_city_governorate_id" ON "city"("governorate_id");

-- CreateIndex
CREATE UNIQUE INDEX "city_governorate_id_name_key" ON "city"("governorate_id", "name");

-- CreateIndex
CREATE INDEX "idx_area_name" ON "area"("name");

-- CreateIndex
CREATE INDEX "idx_area_city_id" ON "area"("city_id");

-- CreateIndex
CREATE UNIQUE INDEX "area_city_id_name_key" ON "area"("city_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "university_name_key" ON "university"("name");

-- CreateIndex
CREATE INDEX "idx_university_name" ON "university"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE INDEX "idx_user_email" ON "user"("email");

-- CreateIndex
CREATE INDEX "idx_user_phone" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "student_profile_user_id_key" ON "student_profile"("user_id");

-- CreateIndex
CREATE INDEX "idx_student_profile_university_id" ON "student_profile"("university_id");

-- CreateIndex
CREATE UNIQUE INDEX "owner_profile_user_id_key" ON "owner_profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "owner_profile_national_id_key" ON "owner_profile"("national_id");

-- CreateIndex
CREATE INDEX "idx_owner_profile_national_id" ON "owner_profile"("national_id");

-- CreateIndex
CREATE INDEX "idx_verification_request_user_id" ON "verification_request"("user_id");

-- CreateIndex
CREATE INDEX "idx_property_owner_profile_id" ON "property"("owner_profile_id");

-- CreateIndex
CREATE INDEX "idx_property_governorate_id" ON "property"("governorate_id");

-- CreateIndex
CREATE INDEX "idx_property_city_id" ON "property"("city_id");

-- CreateIndex
CREATE INDEX "idx_property_area_id" ON "property"("area_id");

-- CreateIndex
CREATE INDEX "idx_property_type" ON "property"("property_type");

-- CreateIndex
CREATE INDEX "idx_property_image_property_id" ON "property_image"("property_id");

-- CreateIndex
CREATE INDEX "idx_property_image_display_order" ON "property_image"("display_order");

-- CreateIndex
CREATE INDEX "idx_unit_property_id" ON "unit"("property_id");

-- CreateIndex
CREATE INDEX "idx_unit_unit_type" ON "unit"("unit_type");

-- CreateIndex
CREATE INDEX "idx_unit_availability_status" ON "unit"("availability_status");

-- CreateIndex
CREATE INDEX "idx_unit_gender_restriction" ON "unit"("gender_restriction");

-- CreateIndex
CREATE INDEX "idx_unit_monthly_rent" ON "unit"("monthly_rent");

-- CreateIndex
CREATE INDEX "idx_unit_available_from" ON "unit"("available_from");

-- CreateIndex
CREATE UNIQUE INDEX "unit_property_id_unit_number_key" ON "unit"("property_id", "unit_number");

-- CreateIndex
CREATE INDEX "idx_unit_image_unit_id" ON "unit_image"("unit_id");

-- CreateIndex
CREATE INDEX "idx_unit_image_display_order" ON "unit_image"("display_order");

-- CreateIndex
CREATE INDEX "idx_listing_unit_id" ON "listing"("unit_id");

-- CreateIndex
CREATE INDEX "idx_listing_status" ON "listing"("status");

-- CreateIndex
CREATE INDEX "idx_listing_published_at" ON "listing"("published_at");

-- CreateIndex
CREATE INDEX "idx_favorite_student_profile_id" ON "favorite"("student_profile_id");

-- CreateIndex
CREATE INDEX "idx_favorite_listing_id" ON "favorite"("listing_id");

-- CreateIndex
CREATE UNIQUE INDEX "favorite_student_profile_id_listing_id_key" ON "favorite"("student_profile_id", "listing_id");

-- CreateIndex
CREATE INDEX "idx_stay_request_listing_id" ON "stay_request"("listing_id");

-- CreateIndex
CREATE INDEX "idx_stay_request_student_profile_id" ON "stay_request"("student_profile_id");

-- CreateIndex
CREATE INDEX "idx_stay_request_status" ON "stay_request"("status");

-- CreateIndex
CREATE INDEX "idx_stay_request_move_in_date" ON "stay_request"("move_in_date");

-- CreateIndex
CREATE INDEX "idx_notification_user_id" ON "notification"("user_id");

-- CreateIndex
CREATE INDEX "idx_notification_user_unread" ON "notification"("user_id", "is_read");

-- CreateIndex
CREATE INDEX "idx_notification_created_at" ON "notification"("created_at");

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_governorate_id_fkey" FOREIGN KEY ("governorate_id") REFERENCES "governorate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_profile" ADD CONSTRAINT "student_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_profile" ADD CONSTRAINT "student_profile_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "university"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owner_profile" ADD CONSTRAINT "owner_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verification_request" ADD CONSTRAINT "verification_request_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verification_request" ADD CONSTRAINT "verification_request_reviewed_by_id_fkey" FOREIGN KEY ("reviewed_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_owner_profile_id_fkey" FOREIGN KEY ("owner_profile_id") REFERENCES "owner_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_governorate_id_fkey" FOREIGN KEY ("governorate_id") REFERENCES "governorate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_image" ADD CONSTRAINT "property_image_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit" ADD CONSTRAINT "unit_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit_image" ADD CONSTRAINT "unit_image_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listing" ADD CONSTRAINT "listing_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_student_profile_id_fkey" FOREIGN KEY ("student_profile_id") REFERENCES "student_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stay_request" ADD CONSTRAINT "stay_request_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stay_request" ADD CONSTRAINT "stay_request_student_profile_id_fkey" FOREIGN KEY ("student_profile_id") REFERENCES "student_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
