import { drizzle } from 'drizzle-orm/neon-http';

const db = drizzle(process.env.DATABASE_URL!); // Ensure the environment variable is set

export { db };
