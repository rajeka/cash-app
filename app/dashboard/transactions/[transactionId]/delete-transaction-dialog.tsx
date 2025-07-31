'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import { deleteTransaction } from './actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function DeleteTransactionDialog({
  transactionId,
  transactionDate,
}: {
  transactionId: number;
  transactionDate: string;
}) {
  const router = useRouter();
  const handleDeleteConfirm = async () => {
    const result = await deleteTransaction(transactionId);
    if (result?.error) {
      toast('Error deleting transaction', {
        style: {
          background: 'red',
          color: 'white',
        },
        // className: 'bg-red-500 text-white',
        description: (
          <span className="text-gray-200">
            error occured delete transaction!
          </span>
        ),
      });
      return;
    }

    toast('Transaction deleted successfully', {
      style: {
        background: 'green',
        color: 'white',
      },
      description: (
        <span className="text-gray-200">
          Transaction deleted; {/*with ID: {result?.id} */}
        </span>
      ),
    });
    const [year, month] = transactionDate.split('-');
    router.push(`/dashboard/transactions/?month=${month}&year=${year}`);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. <br />
            This will permanently delete your transaction.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleDeleteConfirm} variant="destructive">
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
