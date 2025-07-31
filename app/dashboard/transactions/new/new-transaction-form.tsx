'use client';
import TransactionForm, {
  transactionFormSchema,
} from '@/components/transaction-form';
import { type Category } from '@/types/Category';
import z from 'zod';
import { createTransaction } from './actions';
import { format } from 'date-fns';
//import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function NewTransactionPage({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  // const { toast } = useToast();
  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = await createTransaction({
      amount: data.amount.toString(), // keep as number
      transactionDate: format(data.transactionDate, 'yyyy-MM-dd'),
      categoryId: data.categoryId,
      description: data.description,
    });
    if (result.error) {
      // Handle error

      toast('Error creating transaction', {
        style: {
          background: 'red',
          color: 'white',
        },
        // className: 'bg-red-500 text-white',
        description: <span className="text-gray-200">{result.issues}</span>,
      });
    }
    toast('Transaction created successfully', {
      style: {
        background: 'green',
        color: 'white',
      },
      description: (
        <span className="text-gray-200">
          Transaction with ID: {result.id} created.
        </span>
      ),
    });
    router.push(
      `/dashboard/transactions?month=${
        data.transactionDate.getMonth() + 1
      }&year=${data.transactionDate.getFullYear()}`
    );
  };
  return <TransactionForm onSubmit={handleSubmit} categories={categories} />;
}
// function useToast(): { toast: any } {
//   throw new Error('Function not implemented.');
// }
