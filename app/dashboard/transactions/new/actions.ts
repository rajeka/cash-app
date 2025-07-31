'use server';

import { auth } from '@clerk/nextjs/server';
import { addDays, subYears } from 'date-fns';
import z from 'zod';
import { db } from '@/db';
import { transactionsTable } from '@/db/schema';
import { transactionSchema } from '@/validation/transactionSchema';

export const createTransaction = async (data: {
  amount: string;
  transactionDate: string;
  description: string;
  categoryId: number;
}) => {
  //   make sure the user is authenticated
  const { userId } = await auth();
  if (!userId) {
    return { error: true, message: 'User not authenticated' };
  }
  const validation = transactionSchema.safeParse(data);
  if (!validation.success) {
    return {
      error: true,
      message: validation,
      issues: validation.error.issues[0].message,
    };
  }
  const [transaction] = await db
    .insert(transactionsTable)
    .values({
      userId,
      amount: data.amount,
      description: data.description,
      categoryId: data.categoryId,
      transactionDate: data.transactionDate,
    })
    .returning();

  return { id: transaction.id };
};
