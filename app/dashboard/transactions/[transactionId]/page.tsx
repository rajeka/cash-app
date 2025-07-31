import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCategories } from '@/data/getCategories';
import Link from 'next/link';
import NewTransactionForm from '../new/new-transaction-form';
import EditTransactionForm from './edit-transaction-form';
import { getTransaction } from '@/data/getTransaction';
import { notFound } from 'next/navigation';
import DeleteTransactionDialog from './delete-transaction-dialog';

export default async function EditTransactionPage({
  params,
}: {
  params: Promise<{ transactionId: string }>;
}) {
  //const paramValues = await params;
  const { transactionId } = await params;

  const tranId = Number(transactionId); // if not a number returns NaN
  if (isNaN(tranId)) {
    return notFound();
  }
  const categories = await getCategories();
  const transaction = await getTransaction(tranId);
  if (!transaction) {
    notFound();
  }
  return (
    <Card className="mt-4 max-w-screen-md">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Edit Transaction</span>
          <DeleteTransactionDialog
            transactionId={transaction.id}
            transactionDate={transaction.transactionDate}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EditTransactionForm
          categories={categories}
          transaction={{
            ...transaction,
            amount: Number(transaction.amount),
          }}
        />
        {/* <NewTransactionForm categories={categories} /> */}
      </CardContent>
    </Card>
  );
}
