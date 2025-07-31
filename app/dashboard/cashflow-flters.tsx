'use client';

import {
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  year: number;
  yearsRange: number[];
};
export default function CashflowFilters({ year, yearsRange }: Props) {
  const router = useRouter();
  console.log('YearsRange: ' + yearsRange.length);
  //   const [selectOption, setSelectOption] = React.useState();
  return (
    <div>
      <Select
        value={year.toString()}
        onValueChange={(value) => {
          router.push(`/dashboard?cfyear=${value}`);
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {yearsRange.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
