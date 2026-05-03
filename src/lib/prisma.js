import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

/**
 * Prisma client singleton — reuses the same instance in development
 * to avoid exhausting database connections during hot-reload.
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
