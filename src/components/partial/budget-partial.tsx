import { BudgetCardDataProps } from '@/types/props';
import { formatCurrency } from '@/utils/format';

import { CardDescription, CardTitle } from '../ui/card';

const BudgetPartial: React.FC<BudgetCardDataProps> = ({ data }) => {
  return (
    <div className="space-y-2">
      <div className="w-full flex justify-between items-center">
        <CardTitle>{data.category}</CardTitle>
        <CardDescription>{formatCurrency(data.price)}</CardDescription>
      </div>
      <div className="w-full h-5 rounded-lg bg-white" />
      <CardDescription>{data.used}% Used</CardDescription>
    </div>
  );
};

export default BudgetPartial;
