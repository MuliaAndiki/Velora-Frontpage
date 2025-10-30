import { BudgetCardDataProps } from '@/types/props';
import { formatCurrency } from '@/utils/format';

import Box from '../ui/box';
import { CardDescription, CardTitle } from '../ui/card';

const BudgetPartial: React.FC<BudgetCardDataProps> = ({ data }) => {
  return (
    <Box className="space-y-2">
      <Box className="w-full flex justify-between items-center">
        <CardTitle>{data.category}</CardTitle>
        <CardDescription>{formatCurrency(data.price)}</CardDescription>
      </Box>
      <Box className="w-full h-5 rounded-lg bg-white" />
      <CardDescription>{data.used}% Used</CardDescription>
    </Box>
  );
};

export default BudgetPartial;
