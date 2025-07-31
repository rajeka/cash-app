import Cashflow from './cashflow';
import RecentTransactions from './recent-transactions';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ cfyear: string }>;
}) {
  const searchParamsValues = await searchParams;
  const today = new Date();
  let cfyear = Number(searchParamsValues.cfyear ?? today.getFullYear());
  console.log('cfyear: ' + cfyear);
  if (isNaN(cfyear)) {
    cfyear = today.getFullYear();
  }
  return (
    //max-w-screen-xl mx-10 py-10"
    <div className="max-w-screen-xl mx-10 py-10">
      <h1 className="text-4xl font-semibold pb-5">Dashboard</h1>
      <Cashflow year={cfyear} />
      <RecentTransactions />
    </div>
  );
}
