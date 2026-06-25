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
      measuredAt: '2026-06-25T22:04:28+03:00',
    },
  })
}

const plantCreate = async () => {
  const plant = await prisma.plant.create({
    data: {
      title: 'Сифа',
    },
  })

  await Promise.all([
    prisma.plantProfile.create({
      data: {
        plantId: plant.id,
        name: 'Замиокулькас',
        latinName: 'Zamioculcas zamiifolia',
        img: '/zamioculcas.png',
        description:
          'Zamioculcas — суккулентное растение с плотными листьями. Неприхотлив, хорошо переносит засуху и низкий свет.',
        lightRequirements: 'Яркий рассеянный свет, переносит тень.',
        temperatureRequirements: '16–24°C, не ниже 12°C.',
        wateringRequirements:
          'Поливать умеренно, давая почве высыхать между поливами. Зимой — редко.',
        wateringIntervalDays: 7,
      },
    }),
    prisma.soilMoisture.create({
      data: {
        plantId: plant.id,
        value: 47,
        measuredAt: '2026-06-25T22:04:28+03:00',
      },
    }),
  ])

  await prisma.waterLog.create({
    data: {
      plantId: plant.id,
      waterAt: '2026-06-25T22:04:28+03:00',
    },
  })
}

const seed = async () => {
  await Promise.all([weatherCreate(), plantCreate()])
}

seed()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
