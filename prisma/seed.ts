import { PrismaClient, Handedness } from '@/src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.player.deleteMany();
  await prisma.racket.deleteMany();
  // Create rackets
  await prisma.racket.createMany({
    data: [
      { brand_name: 'Wilson' },
      { brand_name: 'Babolat' },
      { brand_name: 'Head' },
      { brand_name: 'Yonex' },
      { brand_name: 'Artengo' },
    ],
  });

  // Create players
  await prisma.player.createMany({
    data: [
      {
        name: 'Roger Federer',
        country: 'Switzerland',
        date_of_birth: new Date('1981-08-08'),
        ranking: 1,
        number_of_titles: 103,
        handedness: 'right_handed',
        imageUrl: '/images/federer.jpeg',
        racket_brand: 'Wilson',
      },
      {
        name: 'Rafael Nadal',
        country: 'Spain',
        date_of_birth: new Date('1986-06-03'),
        ranking: 2,
        number_of_titles: 92,
        handedness: 'left_handed',
        imageUrl: 'https://example.com/nadal.jpg',
        racket_brand: 'Babolat',
      },
    ],
  });
}

main()
  .then(() => {
    console.log('Seeding complete');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });
