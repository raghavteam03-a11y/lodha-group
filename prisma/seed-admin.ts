import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import 'dotenv/config'

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    const adminMobile = 'admin@gmail.com'
    const adminPassword = 'admin-master'

    const admin = await prisma.user.upsert({
        where: { mobile: adminMobile },
        update: {
            password: adminPassword,
            role: 'admin',
            fullName: 'System Administrator'
        },
        create: {
            mobile: adminMobile,
            password: adminPassword,
            role: 'admin',
            fullName: 'System Administrator'
        }
    })

    console.log('Admin user seeded:', admin.mobile)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
        await pool.end()
    })
