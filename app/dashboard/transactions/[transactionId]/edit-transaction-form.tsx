'use client';
import TransactionForm, {
  transactionFormSchema,
} from '@/components/transaction-form';
import { Category } from '@/types/Category';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import z from 'zod';
import { updateTransaction } from './actions';
import { format } from 'date-fns';
import { ErrorMessage, SuccessMessage } from '../transactionMessages';

export default function EditTransactionForm({
  categories,
  transaction,
}: {
  categories: Category[];
  transaction: {
    id: number;
    categoryId: number;
    amount: number;
    description: string;
    transactionDate: string;
  };
}) {
  const router = useRouter();
  // const { toast } = useToast();
  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = await updateTransaction({
      id: transaction.id,
      amount: data.amount.toString(),
      description: data.description,
      categoryId: data.categoryId,
      transactionDate: format(data.transactionDate, 'yyyy-MM-dd'),
    });
    //  await createTransaction({
    //   amount: data.amount, // keep as number
    //   transactionDate: format(data.transactionDate, 'yyyy-MM-dd'),
    //   categoryId: data.categoryId,
    //   description: data.description,
    // });
    if (result?.error) {
      // Handle error
      toast('Error updating transaction', {
        style: {
          background: 'red',
          color: 'white',
        },
        // className: 'bg-red-500 text-white',
        description: (
          <span className="text-gray-200">
            error occured updating transaction!
          </span>
        ),
      });
      // ErrorMessage(
      //   'Error updating transaction',
      //   'error occured updating transaction!'
      // );
    }
    // toast('Transaction updated successfully', {
    //   style: {
    //     background: 'green',
    //     color: 'white',
    //   },
    //   description: (
    //     <span className="text-gray-200">
    //       Transaction created; {/*with ID: {result?.id} */}
    //     </span>
    //   ),
    // });
    if (!result?.error) {
      SuccessMessage();
      router.push(
        `/dashboard/transactions?month=${
          data.transactionDate.getMonth() + 1
        }&year=${data.transactionDate.getFullYear()}`
      );
    }
  };
  return (
    <TransactionForm
      defaultValues={{
        amount: transaction.amount, //Number(transaction.amount),
        categoryId: transaction.categoryId,
        description: transaction.description,
        transactionDate: new Date(transaction.transactionDate),
        transactionType:
          categories.find((category) => category.id === transaction.categoryId)
            ?.type ?? 'income',
      }}
      onSubmit={handleSubmit}
      categories={categories}
    />
  );
}
