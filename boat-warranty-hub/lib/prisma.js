import {PrismaClient} from "./generated/prisma/index";  // import from the generated Prisma client package
import {PrismaPg} from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = global;

const pool = globalForPrisma.pgPool || new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prismaAdapter = new PrismaPg(pool);

const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter: prismaAdapter,
  log: ["query", "warn", "error"],
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.pgPool = pool;
  globalForPrisma.prisma = prisma;
}

export { prisma };
export default prisma;
