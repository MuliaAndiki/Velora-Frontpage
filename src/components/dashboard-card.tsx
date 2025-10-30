import { CardDashboardCardProps } from '@/types/props';
import { formatCurrency } from '@/utils/format';

import Box from './ui/box';
import { Card, CardDescription,CardHeader, CardTitle } from './ui/card';

const DashboardCard: React.FC<CardDashboardCardProps> = ({ data }) => {
  return (
    <Card className="w-full flex h-full flex-col border p-4 rounded-lg ">
      <CardHeader className="justify-between items-center flex space-y-2 ">
        <Box className="w-15 h-15 bg-white rounded-lg" />
        <CardTitle className="text-lg font-semibold">{data.label}</CardTitle>
      </CardHeader>
      <Box className="w-full flex justify-center items-start flex-col">
        <CardDescription className="text-lg font-semibold">Total Balance :</CardDescription>
        <CardDescription className="text-3xl text-bold">
          {formatCurrency(data.price)}
        </CardDescription>
      </Box>
    </Card>
  );
};

export default DashboardCard;
