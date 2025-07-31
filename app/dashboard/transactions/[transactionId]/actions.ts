'use server';
import { auth } from '@clerk/nextjs/server';
import { transactionSchema } from '@/validation/transactionSchema';
import z from 'zod';
import { transactionsTable } from '@/db/schema';
import { db } from '@/db';
import { and, eq } from 'drizzle-orm';
const updateTransactionSchema = transactionSchema.and(
  z.object({ id: z.number() })
);
export async function updateTransaction(data: {
  id: number;
  transactionDate: string;
  description: string;
  amount: string;
  categoryId: number;
}) {
  let { userId } = await auth();
  //userId = null;
  if (!userId) {
    return {
      error: true,
      message: 'Unauthorized',
    };
  }
  const validation = updateTransactionSchema.safeParse(data);
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message,
    };
  }

  await db
    .update(transactionsTable)
    .set({
      description: data.description,
      amount: data.amount,
      transactionDate: data.transactionDate,
      categoryId: data.categoryId,
    })
    .where(
      and(
        eq(transactionsTable.id, data.id),
        eq(transactionsTable.userId, userId)
      )
    );
}

export async function deleteTransaction(transactionId: number) {
  const { userId } = await auth();
  if (!userId) {
    return {
      error: true,
      message: 'Unauthorized!',
    };
  }

  await db
    .delete(transactionsTable)
    .where(
      and(
        eq(transactionsTable.id, transactionId),
        eq(transactionsTable.userId, userId)
      )
    );
}
