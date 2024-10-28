import { PrismaClient } from '@prisma/client';
import { CitySeed, UserSeed } from './seeds';

const prisma = new PrismaClient();

async function main() {
  console.log('Start remove data');

  console.log('Remove data successfully');

  const seeds = [UserSeed, CitySeed];

  const seeded: string[] = (
    await prisma.seed.findMany({
      where: { key: { in: seeds.map((seed) => seed.key) } },
    })
  ).map((seed) => seed.key);

  for (const seed of seeds) {
    if (!seeded.includes(seed.key)) {
      const instance = new seed(prisma);
      await instance.run();
      await prisma.seed.create({ data: { key: seed.key } });
      console.log(`Execute ${seed.key} successfully.`);
    }
  }

  process.exit(0);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
