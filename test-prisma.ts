// test-prisma.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const players = await prisma.player.findMany();
  console.log(players);
}

main().catch(console.error);
