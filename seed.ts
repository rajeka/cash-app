import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { categoriesTable } from './db/schema';
//import { defineConfig } from 'drizzle-kit';

dotenv.config({
  path: '.env.local',
});
//connecting our database
const db = drizzle(process.env.DATABASE_URL!);
const categoriesSeedData: (typeof categoriesTable.$inferInsert)[] = [
  {
    name: 'Salary',
    type: 'income',
  },
  {
    name: 'Rental Income',
    type: 'income',
  },
  {
    name: 'Business Income',
    type: 'income',
  },
  {
    name: 'Investments',
    type: 'income',
  },
  {
    name: 'Other',
    type: 'income',
  },
  {
    name: 'Housing',
    type: 'expense',
  },
  {
    name: 'Transport',
    type: 'expense',
  },
  {
    name: 'Food & Groceries',
    type: 'expense',
  },
  {
    name: 'Health',
    type: 'expense',
  },
  {
    name: 'Entertainment & Leisure',
    type: 'expense',
  },
  {
    name: 'Other',
    type: 'expense',
  },
];

async function main() {
  // Example query to test the connection
  await db.insert(categoriesTable).values(categoriesSeedData);
}

main();
