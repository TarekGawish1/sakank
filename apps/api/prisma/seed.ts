import { PrismaClient, UserRole, Gender, PropertyType, ListingStatus, UnitType, StayRequestStatus, NotificationType } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Clearing existing database records...');

  // Delete in order of dependencies
  await prisma.deviceToken.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.stayRequest.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.unitImage.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.propertyImage.deleteMany();
  await prisma.property.deleteMany();
  await prisma.verificationRequest.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.ownerProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.university.deleteMany();
  await prisma.area.deleteMany();
  await prisma.city.deleteMany();
  await prisma.governorate.deleteMany();

  console.log('🌱 Starting MASSIVE fresh database seeding...');

  // 1. Locations
  console.log('1. Seeding Governorates, Cities, and Areas...');
  const locationsData = [
    {
      name: 'القاهرة',
      cities: [
        { name: 'مدينة نصر', areas: ['مكرم عبيد', 'عباس العقاد', 'المنطقة السادسة', 'المنطقة الأولى'] },
        { name: 'المعادي', areas: ['دجلة', 'المعادي الجديدة', 'زهراء المعادي', 'سارايات المعادي'] },
        { name: 'التجمع الخامس', areas: ['النرجس', 'الياسمين', 'البنفسج', 'الحي الأول'] },
      ],
    },
    {
      name: 'الجيزة',
      cities: [
        { name: 'الدقي', areas: ['مصدق', 'محي الدين أبو العز', 'شارع التحرير'] },
        { name: 'المهندسين', areas: ['جامعة الدول', 'البطل أحمد عبدالعزيز', 'شهاب', 'سوريا'] },
        { name: '6 أكتوبر', areas: ['الحي المتميز', 'الحي الأول', 'الحي الرابع'] },
      ],
    },
    {
      name: 'الإسكندرية',
      cities: [
        { name: 'سموحة', areas: ['ميدان فيكتور عمانويل', 'شارع ألبرت الأول'] },
        { name: 'الشاطبي', areas: ['مجمع الكليات', 'شارع بورسعيد'] },
        { name: 'ميامي', areas: ['شارع إسكندر إبراهيم', 'خالد بن الوليد'] },
      ],
    },
  ];

  const createdAreas: { id: string; name: string; cityId: string; govId: string }[] = [];

  for (const loc of locationsData) {
    const gov = await prisma.governorate.create({ data: { name: loc.name } });

    for (const c of loc.cities) {
      const city = await prisma.city.create({ data: { name: c.name, governorateId: gov.id } });

      for (const areaName of c.areas) {
        const area = await prisma.area.create({ data: { name: areaName, cityId: city.id } });
        createdAreas.push({ id: area.id, name: area.name, cityId: city.id, govId: gov.id });
      }
    }
  }

  // 2. Universities
  console.log('2. Seeding Universities...');
  const unisData = ['جامعة القاهرة', 'جامعة عين شمس', 'جامعة الإسكندرية', 'جامعة حلوان', 'الجامعة الأمريكية بالقاهرة', 'جامعة 6 أكتوبر'];
  const createdUnis = [];
  for (const name of unisData) {
    const uni = await prisma.university.create({ data: { name } });
    createdUnis.push(uni);
  }

  // 3. Users (Admin, Students, Owners)
  console.log('3. Seeding Admin, Students, and Owners...');
  const password = await bcrypt.hash('password123', 12);

  // Admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@sakank.com',
      password,
      phone: '+201000000001',
      firstName: 'Admin',
      lastName: 'System',
      gender: Gender.MALE,
      role: UserRole.ADMIN,
      emailVerifiedAt: new Date(),
    },
  });

  // 20 Students
  const createdStudents = [];
  for (let i = 1; i <= 20; i++) {
    const student = await prisma.user.create({
      data: {
        email: `student${i}@sakank.com`,
        password,
        phone: `+2010111111${i.toString().padStart(2, '0')}`,
        firstName: `طالب_${i}`,
        lastName: `أحمد`,
        gender: i % 2 === 0 ? Gender.FEMALE : Gender.MALE,
        role: UserRole.STUDENT,
        emailVerifiedAt: new Date(),
        studentProfile: {
          create: {
            universityId: createdUnis[i % createdUnis.length].id,
            faculty: i % 2 === 0 ? 'كلية الهندسة' : 'كلية الحاسبات والمعلومات',
            academicYear: `السنة ${((i % 4) + 1)}`,
          },
        },
      },
      include: { studentProfile: true },
    });
    createdStudents.push(student);
  }

  // 20 Owners
  const createdOwners = [];
  for (let i = 1; i <= 20; i++) {
    const owner = await prisma.user.create({
      data: {
        email: `owner${i}@sakank.com`,
        password,
        phone: `+2010222222${i.toString().padStart(2, '0')}`,
        firstName: `مالك_${i}`,
        lastName: `محمود`,
        gender: Gender.MALE,
        role: UserRole.OWNER,
        emailVerifiedAt: new Date(),
        ownerProfile: {
          create: {
            nationalId: `298010112345${i.toString().padStart(2, '0')}`,
          },
        },
      },
      include: { ownerProfile: true },
    });
    createdOwners.push(owner);
  }

  // 4. Properties, Units & Listings
  console.log('4. Seeding Properties, Units & Listings...');
  let propertyCount = 0;
  let listingCount = 0;
  const createdListings = [];

  for (const owner of createdOwners) {
    if (!owner.ownerProfile) continue;

    // 3 properties per owner = 60 properties total
    for (let p = 1; p <= 3; p++) {
      propertyCount++;
      const selectedArea = createdAreas[propertyCount % createdAreas.length];

      const property = await prisma.property.create({
        data: {
          ownerProfileId: owner.ownerProfile.id,
          title: `سكن طلابي متميز - عمارة رقم ${propertyCount}`,
          description: `عمارة مجهزة بالكامل للطلاب في ${selectedArea.name}، شاملة الكهرباء والماء والإنترنت عالي السرعة. قريبة جداً من المواصلات.`,
          address: `شارع ${p * 5}، بالقرب من المركز الرئيسي`,
          latitude: 30.0444 + (Math.random() - 0.5) * 0.1,
          longitude: 31.2357 + (Math.random() - 0.5) * 0.1,
          propertyType: p % 2 === 0 ? PropertyType.VILLA : PropertyType.APARTMENT_BUILDING,
          governorateId: selectedArea.govId,
          cityId: selectedArea.cityId,
          areaId: selectedArea.id,
          images: {
            create: [
              { url: `https://loremflickr.com/800/600/apartment?lock=${propertyCount}1`, isPrimary: true, displayOrder: 0 },
              { url: `https://loremflickr.com/800/600/building?lock=${propertyCount}2`, isPrimary: false, displayOrder: 1 },
            ],
          },
        },
      });

      // 2 units per property = 120 units total
      for (let u = 1; u <= 2; u++) {
        listingCount++;
        const isApartment = u === 1;

        const unit = await prisma.unit.create({
          data: {
            propertyId: property.id,
            unitNumber: `شقة-${u}0${p}`,
            title: isApartment ? `شقة سكنية بالكامل ${p}0${u}` : `غرفة سريرين للطلاب`,
            description: isApartment ? 'شقة تشطيب جديد تحتوي على 3 غرف وصالة وحمامين ومطبخ مجهز.' : 'غرفة مكيفة ومجهزة بأسرة ومكاتب للمذاكرة.',
            monthlyRent: 1500 + Math.floor(Math.random() * 4500),
            securityDeposit: 2000,
            capacity: isApartment ? 4 : 2,
            availableBeds: isApartment ? 4 : 2,
            availableFrom: new Date(),
            unitType: isApartment ? UnitType.APARTMENT : UnitType.ROOM,
            genderRestriction: u % 2 === 0 ? 'FEMALE' : 'MALE',
            availabilityStatus: 'AVAILABLE',
            images: {
              create: [
                { url: `https://loremflickr.com/800/600/room?lock=${listingCount}1`, isPrimary: true, displayOrder: 0 },
                { url: `https://loremflickr.com/800/600/bedroom?lock=${listingCount}2`, isPrimary: false, displayOrder: 1 },
              ],
            },
          },
        });

        const listing = await prisma.listing.create({
          data: {
            unitId: unit.id,
            status: ListingStatus.PUBLISHED,
            publishedAt: new Date(),
          },
        });
        createdListings.push(listing);
      }
    }
  }

  // 5. Seed Interactions (Favorites, Stay Requests, Notifications)
  console.log('5. Seeding Student Favorites & Stay Requests...');

  for (let i = 0; i < createdStudents.length; i++) {
    const student = createdStudents[i];
    if (!student.studentProfile) continue;

    // Add 2 favorites per student
    const favListing1 = createdListings[i % createdListings.length];
    const favListing2 = createdListings[(i + 5) % createdListings.length];

    await prisma.favorite.createMany({
      data: [
        { studentProfileId: student.studentProfile.id, listingId: favListing1.id },
        { studentProfileId: student.studentProfile.id, listingId: favListing2.id },
      ],
      skipDuplicates: true,
    });

    // Add Stay Request for some students
    if (i % 2 === 0) {
      await prisma.stayRequest.create({
        data: {
          studentProfileId: student.studentProfile.id,
          listingId: favListing1.id,
          moveInDate: new Date(Date.now() + 86400000 * 7), // 7 days later
          durationMonths: 6,
          status: i % 4 === 0 ? StayRequestStatus.ACCEPTED : StayRequestStatus.PENDING,
          message: 'مرحباً، أود حجز السكن لبداية الفصل الدراسي القادم.',
        },
      });

      // Add Notification
      await prisma.notification.create({
        data: {
          userId: student.id,
          type: NotificationType.STAY_REQUEST_RECEIVED,
          title: 'طلب حجز جديد',
          body: 'تم إرسال طلب الحجز الخاص بك بنجاح وهو قيد المراجعة.',
        },
      });
    }
  }

  console.log('\n✅ MASSIVE DATABASE SEEDING COMPLETED SUCCESSFULLY!');
  console.log('===================================================');
  console.log('📋 SUMMARY:');
  console.log(`- Admin Account: admin@sakank.com (Password: password123)`);
  console.log(`- Students: 20 accounts (student1@sakank.com to student20@sakank.com)`);
  console.log(`- Owners: 20 accounts (owner1@sakank.com to owner20@sakank.com)`);
  console.log(`- Properties Created: ${propertyCount}`);
  console.log(`- Units & Listings Created: ${createdListings.length}`);
  console.log(`- Universal Password: password123`);
  console.log('===================================================\n');
}

main()
  .catch((e) => {
    console.error('❌ Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
