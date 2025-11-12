import { CardDescription, CardTitle } from '@/components/ui/card';
import { RecentCardProps } from '@/types/props';
import { formatCurrency } from '@/utils/number.format';

const RecentCardPartial: React.FC<RecentCardProps> = ({ data }) => {
  return (
    <div className="w-full  border rounded-lg flex justify-between items-center p-2">
      <div className="w-full p-2 flex gap-2">
        <div className="w-10 h-10 rounded-full bg-white" />
        <div className="flex justify-center items-start flex-col">
          <CardTitle>Grocery Shopping</CardTitle>
          <CardDescription>{data.category}</CardDescription>
        </div>
      </div>
      <div className="flex justify-end items-end flex-col gap-1 ">
        <CardTitle>{formatCurrency(data.price)}</CardTitle>
        <CardDescription>{data.date}</CardDescription>
      </div>
    </div>
  );
};

export default RecentCardPartial;
