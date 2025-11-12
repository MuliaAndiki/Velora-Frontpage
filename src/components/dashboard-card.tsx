import { CardDashboardCardProps } from '@/types/props';
import { formatCurrency } from '@/utils/number.format';

import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

const DashboardCard: React.FC<CardDashboardCardProps> = ({ data }) => {
  return (
    <Card className="w-full flex h-full flex-col border p-4 items-center  justify-center rounded-lg ">
      <CardHeader className="justify-between w-full items-center flex space-y-2 ">
        <div className="w-15 h-15 bg-white rounded-lg" />
        <CardTitle className="text-lg font-semibold">{data.label}</CardTitle>
      </CardHeader>
      <div className="w-full flex justify-center items-start flex-col">
        <CardDescription className="text-lg font-semibold">Total Balance :</CardDescription>
        <CardDescription className="text-3xl text-bold">
          {formatCurrency(data.price)}
        </CardDescription>
      </div>
    </Card>
  );
};

export default DashboardCard;
