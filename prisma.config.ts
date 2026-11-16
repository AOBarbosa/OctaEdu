import { defineConfig } from 'prisma/config';

try {
  process.loadEnvFile();
} catch {
  // Sem .env: as variáveis vêm do ambiente (Docker/VM).
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
});
