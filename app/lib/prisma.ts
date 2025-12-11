import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prismaClientSingleton = () => {
  const url = process.env.DATABASE_URL || '';
  // Check if using Supabase transaction pooler (port 6543) without pgbouncer flag
  const isSupabasePooler = url.includes('pooler.supabase.com') && url.includes(':6543');
  const needsPgbouncer = isSupabasePooler && !url.includes('pgbouncer=true');
  
  const connectionUrl = needsPgbouncer 
    ? `${url}${url.includes('?') ? '&' : '?'}pgbouncer=true`
    : url;

  if (needsPgbouncer) {
    console.log('Appended pgbouncer=true to database connection string');
  }

  return new PrismaClient({
    log: ['query', 'error', 'warn'],
    datasources: {
      db: {
        url: connectionUrl,
      },
    },
  });
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
