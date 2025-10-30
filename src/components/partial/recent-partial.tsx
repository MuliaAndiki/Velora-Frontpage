import { CardDescription, CardTitle } from '@/components/ui/card';
import { RecentCardProps } from '@/types/props';
import { formatCurrency } from '@/utils/format';

import Box from '../ui/box';

const RecentCardPartial: React.FC<RecentCardProps> = ({ data }) => {
  return (
    <Box className="w-full  border rounded-lg flex justify-between items-center p-2">
      <Box className="w-full p-2 flex gap-2">
        <Box className="w-10 h-10 rounded-full bg-white" />
        <Box className="flex justify-center items-start flex-col">
          <CardTitle>Grocery Shopping</CardTitle>
          <CardDescription>{data.category}</CardDescription>
        </Box>
      </Box>
      <Box className="flex justify-end items-end flex-col gap-1 ">
        <CardTitle>{formatCurrency(data.price)}</CardTitle>
        <CardDescription>{data.date}</CardDescription>
      </Box>
    </Box>
  );
};

export default RecentCardPartial;
