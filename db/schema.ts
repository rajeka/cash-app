import { float } from 'drizzle-orm/mysql-core';
import { pgTable, integer, text, numeric } from 'drizzle-orm/pg-core';

export const categoriesTable = pgTable('categories', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  type: text({
    enum: ['income', 'expense'],
  }).notNull(), // 'income' or 'expense'
});

export const transactionsTable = pgTable('transactions', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: text('user_id').notNull(), // Assuming userId is a string, adjust as necessary
  description: text().notNull(),
  amount: numeric().notNull(),
  transactionDate: text('transaction_date').notNull(), // Store as ISO string
  categoryId: integer('category_id')
    .notNull()
    .references(() => categoriesTable.id)
    .notNull(),

  //   transactionType: text({
  //     enum: ['income', 'expense'],
  //   }).notNull(), // 'income' or 'expense'
});
