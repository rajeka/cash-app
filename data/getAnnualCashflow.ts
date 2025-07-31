import { db } from '@/db';
import { categoriesTable, transactionsTable } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { and, eq, sql, sum } from 'drizzle-orm';
import 'server-only';

export async function getAnnualCashflow(year: number) {
  const { userId } = await auth();
  if (!userId) {
    return [];
  }
  const month = sql`EXTRACT(MONTH FROM TO_DATE(${transactionsTable.transactionDate},'yyyy-MM-dd'))`;

  const cashflow = await db
    .select({
      month,
      totalIncome: sum(
        sql`CASE WHEN ${categoriesTable.type} = 'income' THEN ${transactionsTable.amount} ELSE 0 END`
      ),
      totalExpenses: sum(
        sql`CASE WHEN ${categoriesTable.type} = 'expense' THEN ${transactionsTable.amount} ELSE 0 END`
      ),
    })
    .from(transactionsTable)
    .leftJoin(
      categoriesTable,
      eq(transactionsTable.categoryId, categoriesTable.id)
    )
    .where(
      and(
        eq(transactionsTable.userId, userId),
        sql`EXTRACT(YEAR FROM TO_DATE(${transactionsTable.transactionDate},'yyyy-MM-dd'))=${year}`
      )
    )
    .groupBy(month);

  const annualCashFlow: {
    month: number;
    income: number;
    expenses: number;
  }[] = [];
  for (let i = 1; i <= 12; i++) {
    const monthlyCashflow = cashflow.find((cf) => Number(cf.month) === i);
    annualCashFlow.push({
      month: i,
      income: Number(monthlyCashflow?.totalIncome ?? 0),
      expenses: Number(monthlyCashflow?.totalExpenses ?? 0),
    });
  }
  // console.log({ annualCashFlow });
  return annualCashFlow;
}
