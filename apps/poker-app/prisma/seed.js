const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const deck = await prisma.deck.upsert({
    where: { slug: 'standard' },
    update: {},
    create: {
      name: 'Standard',
      slug: 'standard',
      cards: {
        create: [
          {
            name: '☕',
            value: null,
            order: 0,
          },
          {
            name: '0',
            value: 0,
            order: 1,
          },
          {
            name: '0.5',
            value: 0.5,
            order: 2,
          },
          {
            name: '1',
            value: 1,
            order: 3,
          },
          {
            name: '2',
            value: 2,
            order: 4,
          },
          {
            name: '3',
            value: 3,
            order: 5,
          },
          {
            name: '5',
            value: 5,
            order: 6,
          },
          {
            name: '8',
            value: 8,
            order: 7,
          },
          {
            name: '13',
            value: 13,
            order: 8,
          },
          {
            name: '20',
            value: 20,
            order: 9,
          },
          {
            name: '40',
            value: 40,
            order: 10,
          },
          {
            name: '100',
            value: 100,
            order: 11,
          },
          {
            name: '?',
            value: null,
            order: 12,
          },
        ],
      },
    },
  })
  console.log({ deck })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
