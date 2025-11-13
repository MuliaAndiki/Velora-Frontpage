import { Label } from '@radix-ui/react-label';
import { Ellipsis } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CategoryProps } from '@/types/props';
import { PopupInterface } from '@/types/ui';
import { getDate } from '@/utils/string.format';

import { Button } from '../ui/button';

interface CategoryPartialProps {
  loadId: string | null;
  setLoadId: React.Dispatch<React.SetStateAction<string | null>>;
  onDelete: (id: any) => void;
  setPopUpModal: React.Dispatch<React.SetStateAction<PopupInterface>>;
}

const CategoryPartial: React.FC<CategoryProps & CategoryPartialProps> = ({
  data,
  loadId,
  setLoadId,
  onDelete,
  setPopUpModal,
}) => {
  return (
    <div
      className={`flex bg-card  relative items-center flex-col border p-2 rounded-lg border-dashed  transition-all duration-300 ease-in-out hover:bg-card/50 `}
      onClick={() => {
        setLoadId(data.id);
      }}
    >
      <Image
        alt="image"
        src={data?.avaUrl}
        width={150}
        height={150}
        className="aspect-square rounded-lg"
      />
      {loadId === data.id ? (
        <div className="absolute right-0 -translate-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuLabel className="text-lg font-bold">Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="text-destructive text-md"
                  onClick={() => onDelete(data.id)}
                >
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem className="text-md " onClick={() => setPopUpModal('edit-goal')}>
                  Edit
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : null}

      <Label className="text-lg font-semibold">{data?.name}</Label>
      <div className="flex  items-center gap-4">
        <Label>{getDate(data.createdAt)}</Label>
      </div>
    </div>
  );
};

export default CategoryPartial;
