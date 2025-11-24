'use client';

import { AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import View from '@/components/ui/view';

interface DeleteBudgetConfirmProps {
  isPending: boolean;
  budgetName: string;
  onSubmit: () => void;
  onClose: () => void;
}

const DeleteBudgetConfirm: React.FC<DeleteBudgetConfirmProps> = ({
  isPending,
  budgetName,
  onSubmit,
  onClose,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <View className="w-full h-full">
      <div className="w-full flex justify-center items-center flex-col gap-4 py-4">
        <div className="flex flex-col items-center gap-3">
          <AlertCircle className="w-12 h-12 text-red-600" />
          <h2 className="text-xl font-semibold">Delete Budget?</h2>
          <p className="text-sm text-gray-600 text-center">
            Are you sure you want to delete <span className="font-semibold">{budgetName}</span>?
            This action cannot be undone.
          </p>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex gap-2 mt-6 pt-4 border-t">
            <Button variant={'outline'} type="button" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              variant={'default'}
              type="submit"
              disabled={isPending}
              className="flex-1 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            >
              {isPending ? 'Deleting...' : 'Delete Budget'}
            </Button>
          </div>
        </form>
      </div>
    </View>
  );
};

export default DeleteBudgetConfirm;
