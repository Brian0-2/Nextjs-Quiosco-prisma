import { PrismaClient } from '@prisma/client'
//Este codigo ayuda a no crear muchas instancias de prisma, 
// estoayuda al performance de la aplicacion haciendo solamente 1 consula
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma