import { Calendar, Edit2, Tag, Trash2 } from 'lucide-react';

import { TransactionProps } from '@/types/props';
import { formatCurrency } from '@/utils/number.format';
import { getTime } from '@/utils/string.format';

import { Card, CardContent } from '../ui/card';

interface TransactionPartialProps extends TransactionProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const TransactionPartial: React.FC<TransactionPartialProps> = ({ data, onEdit, onDelete }) => {
  const isIncome = data.type === 'INCOME';

  return (
    <Card
      className={`my-4 w-full border-l-4 ${isIncome ? 'border-l-green-500' : 'border-l-red-500'} group hover:shadow-lg transition-all duration-300`}
    >
      <CardContent className="flex w-full justify-between items-center p-4">
        <div className="w-full flex gap-4 items-center">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white ${isIncome ? 'bg-green-600' : 'bg-red-600'}`}
          >
            {isIncome ? '+' : '-'}
          </div>
          <div className="flex flex-col justify-start items-start flex-1">
            <h1 className="text-lg font-semibold text-white">{data.description}</h1>
            <div className="flex gap-6 justify-start items-center">
              <div className="flex gap-2 items-center">
                <Tag className="w-4 h-4 text-slate-400" />
                <p className="text-sm text-slate-400">{data.category?.name}</p>
              </div>
              <div className="flex gap-2 items-center">
                <Calendar className="w-4 h-4 text-slate-400" />
                <p className="text-sm text-slate-400">{getTime(data.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p className={`text-2xl font-bold ${isIncome ? 'text-green-500' : 'text-red-500'}`}>
            {isIncome ? '+' : '-'}
            {formatCurrency(data.amount)}
          </p>

          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-2 bg-blue-600 bg-opacity-20 hover:bg-opacity-40 rounded-lg transition-all duration-200"
                title="Edit transaction"
              >
                <Edit2 className="text-blue-400 w-4 h-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="p-2 bg-red-600 bg-opacity-20 hover:bg-opacity-40 rounded-lg transition-all duration-200"
                title="Delete transaction"
              >
                <Trash2 className="text-red-400 w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionPartial;
