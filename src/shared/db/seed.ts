import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})
const prisma = new PrismaClient({
  adapter,
})

const weatherCreate = async () => {
  await prisma.weather.create({
    data: {
      temperature: 27,
      humidity: 27,
      illumination: 27,
    },
  })
}

weatherCreate()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
