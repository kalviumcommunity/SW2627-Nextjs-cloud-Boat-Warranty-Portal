import {PrismaClient} from "./generated/prisma/index.js";  // import from the generated Prisma client package
import {PrismaPg} from "@prisma/adapter-pg";

const globalForPrisma = global;

const prismaAdapter = new PrismaPg(process.env.DATABASE_URL);

export const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter: prismaAdapter,
  log: ["query", "warn", "error"],
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

