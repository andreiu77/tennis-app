//npx ts-node prisma/huge-seed.cjs to run this script
import { PrismaClient } from '../src/generated/prisma';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Deleting existing data...');
  await prisma.player.deleteMany();
  await prisma.racket.deleteMany();

  const racketBrands = [];

  for (let i = 0; i < 100_000; i++) {
    racketBrands.push({
      brand_name: `Brand_${i}_${faker.company.name()}`,
    });
  }

  const batchSize = 1000;
  for (let i = 0; i < racketBrands.length; i += batchSize) {
    const batch = racketBrands.slice(i, i + batchSize);
    await prisma.racket.createMany({ data: batch, skipDuplicates: true });
    console.log(`Inserted racket batch ${i / batchSize + 1}`);
  }

  const allRackets = await prisma.racket.findMany({ select: { brand_name: true } });
  const brandNames = allRackets.map((r) => r.brand_name);

  console.log('Creating 100,000 players...');
  for (let i = 0; i < 100; i++) {
    const players = Array.from({ length: 1000 }).map(() => {
      const brand = faker.helpers.arrayElement(brandNames);
      return {
        name: faker.person.fullName(),
        country: faker.location.country(),
        date_of_birth: faker.date.birthdate({ min: 18, max: 40, mode: 'age' }),
        ranking: faker.number.int({ min: 1, max: 2000 }),
        number_of_titles: faker.number.int({ min: 0, max: 30 }),
        handedness: faker.helpers.arrayElement(['left_handed', 'right_handed']),
        imageUrl: faker.image.avatar(),
        racket_brand: brand,
      };
    });

    await prisma.player.createMany({ data: players });
    console.log(`Inserted player batch ${i + 1}`);
  }

  console.log('✅ Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
