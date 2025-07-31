import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div>
      <Skeleton className="w-[760px] h-[200px] rounded-2xl" />
      Loading ...
    </div>
  );
}
