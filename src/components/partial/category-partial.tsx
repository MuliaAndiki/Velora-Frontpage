import { Edit2, Trash2 } from 'lucide-react';
import Image from 'next/image';

import { CategoryType } from '@/types/components';
import { CategoryProps } from '@/types/props';
import { PopupInterface } from '@/types/ui';
import { getDate } from '@/utils/string.format';

import { Button } from '../ui/button';

interface CategoryPartialProps {
  loadId: string | null;
  setLoadId: React.Dispatch<React.SetStateAction<string | null>>;
  onDelete?: (id: any) => void;
  setPopUpModal?: React.Dispatch<React.SetStateAction<PopupInterface>>;
  onEdit?: (data: CategoryType) => void;
}

const CategoryPartial: React.FC<CategoryProps & CategoryPartialProps> = ({
  data,
  loadId,
  setLoadId,
  onDelete,
  setPopUpModal,
  onEdit,
}) => {
  const isSelected = loadId === data.id;

  return (
    <div
      className={`group relative flex flex-col bg-linear-to-br from-slate-800 to-slate-900 border rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-orange-500/20 ${
        isSelected ? 'border-orange-500 shadow-lg shadow-orange-500/30' : 'border-slate-700'
      }`}
      onClick={() => setLoadId(data.id)}
    >
      <div className="relative w-full aspect-square overflow-hidden bg-slate-700">
        <Image alt={data?.name} src={data?.avaUrl} fill className="object-cover aspect-square" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-orange-600"
            onClick={(e) => {
              e.stopPropagation();
              setLoadId(data.id);
              onEdit?.(data);
              setPopUpModal?.('category');
            }}
          >
            <Edit2 size={18} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-red-600"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(data.id);
            }}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div>
          <h3 className="text-lg font-bold text-white truncate">{data?.name}</h3>
          <p
            className={`text-sm font-semibold ${
              data?.type === 'INCOME' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {data?.type === 'INCOME' ? '💰 Income' : '💸 Expense'}
          </p>
        </div>
        <p className="text-xs text-slate-400">{getDate(data.createdAt)}</p>
      </div>

      {isSelected && (
        <div className="absolute top-2 right-2 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div>
      )}
    </div>
  );
};

export default CategoryPartial;
