'use client';
import { toast } from 'sonner';

export function ErrorMessage(title: string, descMsg: string) {
  //title ='Error updating transaction'
  toast(title, {
    style: {
      background: 'red',
      color: 'white',
    },
    // className: 'bg-red-500 text-white',
    //descMsg=error occured updating transaction!
    description: <span className="text-gray-200">{descMsg}</span>,
  });
}

export function SuccessMessage() {
  toast('Transaction updated successfully', {
    style: {
      background: 'green',
      color: 'white',
    },
    description: (
      <span className="text-gray-200">
        Transaction created; {/*with ID: {result?.id} */}
      </span>
    ),
  });
}
