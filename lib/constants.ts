import { z } from 'zod';
import { transactionFormSchema } from './validators';

export const defaultValues: z.input<typeof transactionFormSchema> = {
  amount: 0,
  categoryId: 0,
  description: '',
  transactionDate: new Date(),
  transactionType: 'income',
};
