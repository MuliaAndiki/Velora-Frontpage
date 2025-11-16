import { Calendar, Tag } from 'lucide-react';

import { TransactionProps } from '@/types/props';
import { formatCurrency } from '@/utils/number.format';
import { getTime } from '@/utils/string.format';

import { Card, CardContent } from '../ui/card';

const TransactionPartial: React.FC<TransactionProps> = ({ data }) => {
  return (
    <Card className="my-4 w-full">
      <CardContent className="flex w-full justify-between items-center ">
        <div className="w-full flex gap-2 items-center ">
          <div className="w-15 h-15 rounded-lg border bg-red-500" />
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-lg">{data.description}</h1>
            <div className="flex gap-4  justify-center items-center">
              <div className="flex w-full h-auto justify-items-center gap-1">
                <Tag className="scale-10" />
                <p className="text-md text-slate-400">{data.category?.name}</p>
              </div>
              <div className="flex w-full h-auto justify-items-center gap-1">
                <Calendar className="scale-5" />
                <p className="text-mf text-slate-400">{getTime(data.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-lg font-bold">{formatCurrency(data.amount)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionPartial;
