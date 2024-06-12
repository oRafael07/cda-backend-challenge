import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import csvtojson from 'csvtojson'
async function main() {
  const badgesCsv = await csvtojson().fromFile(
    process.cwd() + '/prisma/badges.csv'
  )

  const badges = await prisma.badge.createMany({
    data: badgesCsv.map((badge) => ({
      name: badge.Name,
      slug: badge.Slug,
      urlImage: badge.Image,
    })),
  })

  console.log({ badges })
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
