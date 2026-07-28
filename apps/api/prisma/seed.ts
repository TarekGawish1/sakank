import { PrismaClient, UserRole, Gender, PropertyType, ListingStatus, UnitType } from '@prisma/client';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting HUGE database seeding...');

  // 1. Create Governorates, Cities, Areas
  console.log('1. Seeding locations...');
  const locations = [
    {
      name: 'القاهرة',
      cities: [
        { name: 'مدينة نصر', areas: [{ name: 'مكرم عبيد' }, { name: 'عباس العقاد' }] },
        { name: 'المعادي', areas: [{ name: 'دجلة' }, { name: 'المعادي الجديدة' }] },
      ],
    },
    {
      name: 'الجيزة',
      cities: [
        { name: 'الدقي', areas: [{ name: 'مصدق' }, { name: 'محي الدين أبو العز' }] },
        { name: 'المهندسين', areas: [{ name: 'جامعة الدول' }, { name: 'البطل أحمد عبدالعزيز' }] },
      ],
    },
    {
      name: 'الإسكندرية',
      cities: [
        { name: 'سموحة', areas: [{ name: 'ميدان فيكتور عمانويل' }] },
        { name: 'الشاطبي', areas: [{ name: 'مجمع الكليات' }] },
      ],
    },
  ];

  for (const loc of locations) {
    const gov = await prisma.governorate.upsert({
      where: { name: loc.name },
      update: {},
      create: { name: loc.name },
    });

    for (const c of loc.cities) {
      let city = await prisma.city.findFirst({ where: { name: c.name, governorateId: gov.id } });
      if (!city) {
        city = await prisma.city.create({ data: { name: c.name, governorateId: gov.id } });
      }

      for (const a of c.areas) {
        let area = await prisma.area.findFirst({ where: { name: a.name, cityId: city.id } });
        if (!area) {
          area = await prisma.area.create({ data: { name: a.name, cityId: city.id } });
        }
      }
    }
  }

  // 2. Create Universities
  console.log('2. Seeding universities...');
  const govCairo = await prisma.governorate.findUnique({ where: { name: 'القاهرة' } });
  const govGiza = await prisma.governorate.findUnique({ where: { name: 'الجيزة' } });
  const govAlex = await prisma.governorate.findUnique({ where: { name: 'الإسكندرية' } });

  const unis = [
    { name: 'جامعة القاهرة', govId: govGiza!.id },
    { name: 'جامعة عين شمس', govId: govCairo!.id },
    { name: 'جامعة الإسكندرية', govId: govAlex!.id },
    { name: 'جامعة حلوان', govId: govCairo!.id },
  ];

  for (const u of unis) {
    let uni = await prisma.university.findFirst({ where: { name: u.name } });
    if (!uni) {
      uni = await prisma.university.create({ data: { name: u.name } });
    }
  }

  // 3. Create Users
  console.log('3. Seeding users...');
  const password = await bcrypt.hash('password123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sakank.com' },
    update: {},
    create: {
      email: 'admin@sakank.com',
      password,
      phone: '+201000000001',
      firstName: 'Admin',
      lastName: 'User',
      gender: Gender.MALE,
      role: UserRole.ADMIN,
      emailVerifiedAt: new Date(),
    },
  });

  const allUnis = await prisma.university.findMany();
  
  // 10 Students
  for (let i = 1; i <= 10; i++) {
    await prisma.user.upsert({
      where: { email: `student${i}@sakank.com` },
      update: {},
      create: {
        email: `student${i}@sakank.com`,
        password,
        phone: `+2010111111${i.toString().padStart(2, '0')}`,
        firstName: `Student${i}`,
        lastName: `Demo`,
        gender: i % 2 === 0 ? Gender.FEMALE : Gender.MALE,
        role: UserRole.STUDENT,
        emailVerifiedAt: new Date(),
        studentProfile: {
          create: {
            universityId: allUnis[i % allUnis.length].id,
            faculty: 'هندسة',
          },
        },
      },
    });
  }

  // 10 Owners
  const owners = [];
  for (let i = 1; i <= 10; i++) {
    const owner = await prisma.user.upsert({
      where: { email: `owner${i}@sakank.com` },
      update: {},
      create: {
        email: `owner${i}@sakank.com`,
        password,
        phone: `+2010222222${i.toString().padStart(2, '0')}`,
        firstName: `Owner${i}`,
        lastName: `Demo`,
        gender: Gender.MALE,
        role: UserRole.OWNER,
        emailVerifiedAt: new Date(),
        ownerProfile: {
          create: {
            nationalId: `999956789012${i.toString().padStart(2, '0')}`,
          },
        },
      },
    });
    owners.push(owner);
  }

  // 4. Create Properties & Listings
  console.log('4. Seeding properties and listings...');
  const allCities = await prisma.city.findMany({ include: { areas: true } });
  
  let propertyCount = 0;
  for (const owner of owners) {
    const ownerProfile = await prisma.ownerProfile.findUnique({ where: { userId: owner.id } });
    if (!ownerProfile) continue;

    // Each owner creates 3 properties
    for (let p = 1; p <= 3; p++) {
      propertyCount++;
      const city = allCities[propertyCount % allCities.length];
      const area = city.areas.length > 0 ? city.areas[0] : null;
      if (!area) continue;

      const property = await prisma.property.upsert({
        where: { id: `huge-seed-property-${propertyCount}` },
        update: {},
        create: {
          id: `huge-seed-property-${propertyCount}`,
          ownerProfileId: ownerProfile.id,
          title: `عمارة سكنية في ${city.name} - ${p}`,
          description: `سكن راقي وممتاز للطلاب، قريب جدا من المواصلات والخدمات في منطقة ${area.name}.`,
          address: `شارع ${p} الرئيسي`,
          latitude: 30.0 + Math.random() * 0.1,
          longitude: 31.2 + Math.random() * 0.1,
          propertyType: p % 2 === 0 ? PropertyType.VILLA : PropertyType.APARTMENT_BUILDING,
          governorateId: city.governorateId,
          cityId: city.id,
          areaId: area.id,
          images: {
            create: [
              { url: `https://loremflickr.com/600/400/apartment?lock=${propertyCount}1`, isPrimary: true, displayOrder: 0 },
              { url: `https://loremflickr.com/600/400/apartment?lock=${propertyCount}2`, isPrimary: false, displayOrder: 1 }
            ],
          },
        },
      });

      // Create 2 Units per property
      for (let u = 1; u <= 2; u++) {
        const unitId = `huge-seed-unit-${propertyCount}-${u}`;
        const unitType = u === 1 ? UnitType.APARTMENT : UnitType.ROOM;
        
        const unit = await prisma.unit.upsert({
          where: {
            uq_unit_property_id_unit_number: {
              propertyId: property.id,
              unitNumber: `U-${u}`,
            },
          },
          update: {},
          create: {
            propertyId: property.id,
            unitNumber: `U-${u}`,
            title: unitType === UnitType.APARTMENT ? 'شقة فاخرة للإيجار' : 'غرفة مشتركة للطلاب',
            description: 'تشطيب سوبر لوكس، يوجد جميع الأجهزة الكهربائية.',
            monthlyRent: 2000 + Math.floor(Math.random() * 5000),
            securityDeposit: 3000,
            capacity: u === 1 ? 4 : 2,
            availableBeds: u === 1 ? 4 : 1,
            availableFrom: new Date(),
            unitType: unitType,
            genderRestriction: u % 2 === 0 ? 'FEMALE' : 'MALE',
            availabilityStatus: 'AVAILABLE',
            images: {
              create: [{ url: `https://loremflickr.com/600/400/room?lock=${propertyCount}${u}`, isPrimary: true, displayOrder: 0 }],
            },
          },
        });

        // Create Listing for the Unit
        await prisma.listing.upsert({
          where: { id: `huge-seed-listing-${propertyCount}-${u}` },
          update: {},
          create: {
            id: `huge-seed-listing-${propertyCount}-${u}`,
            unitId: unit.id,
            status: ListingStatus.PUBLISHED,
            publishedAt: new Date(),
          },
        });
      }
    }
  }

  console.log('✅ HUGE Seeding completed successfully!');
  console.log('--- Quick Stats ---');
  console.log('Admins: 1');
  console.log('Students: 10 (student1@sakank.com to student10@sakank.com)');
  console.log('Owners: 10 (owner1@sakank.com to owner10@sakank.com)');
  console.log(`Properties: ${propertyCount}`);
  console.log(`Listings: ${propertyCount * 2}`);
  console.log('Password for ALL users: password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
