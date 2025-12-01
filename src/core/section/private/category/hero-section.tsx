import { CircleDot } from 'lucide-react';

import CategoryPartial from '@/components/partial/category-partial';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import PopUp from '@/components/ui/pop-up';
import View from '@/components/ui/view';
import { CategoryType } from '@/types/components';
import { FormCreateCategory } from '@/types/form/category.form';
import { PopupInterface } from '@/types/ui';

import EditCategoryForm from './_form/edit-cateogory-form';

interface CategoryProps {
  data: CategoryType[];
  loadId: string | null;
  setLoadId: React.Dispatch<React.SetStateAction<string | null>>;
  onDelete: (id: any) => void;
  popUpModal: PopupInterface;
  setPopUpModal: React.Dispatch<React.SetStateAction<PopupInterface>>;
  isPending: boolean;
  onAddCategory: () => void;
  onUpdateCategory?: () => void;
  formCreateCategory: FormCreateCategory;
  setFromCreateCategory: React.Dispatch<React.SetStateAction<FormCreateCategory>>;
  onChangePict: (e: any) => void;
  preview: string | undefined;
  onDeleteALl: () => void;
  onRemovePreview: () => void;
  isEdit?: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  t: any;
  isLoading: boolean;
}

const CategoryHeroSection: React.FC<CategoryProps> = ({
  data,
  loadId,
  setLoadId,
  onDelete,
  setPopUpModal,
  popUpModal,
  isPending,
  onAddCategory,
  onUpdateCategory,
  formCreateCategory,
  setFromCreateCategory,
  onChangePict,
  preview,
  onDeleteALl,
  onRemovePreview,
  isEdit,
  setIsEdit,
  t,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  return (
    <View>
      <div className="w-full min-h-screen flex items-start flex-col overflow-x-hidden">
        <div className="w-full flex justify-center items-start p-4 flex-col">
          <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600 mb-3">
            {t('category.title')}
          </h1>
          <p className="text-slate-400 text-lg mb-6">{t('category.desc')}</p>

          <div className="w-full my-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-slate-700 bg-linear-to-br from-slate-800 to-slate-900">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-2">
                    <p className="text-slate-400 text-sm font-medium">Total Categories</p>
                    <p className="text-3xl font-bold text-white">{data.length}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-700 bg-linear-to-br from-green-900/20 to-slate-900">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-2">
                    <p className="text-green-400 text-sm font-medium">💰 Income Categories</p>
                    <p className="text-3xl font-bold text-green-400">
                      {data.filter((c) => c.type === 'INCOME').length}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-700 bg-linear-to-br from-red-900/20 to-slate-900">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-2">
                    <p className="text-red-400 text-sm font-medium">💸 Expense Categories</p>
                    <p className="text-3xl font-bold text-red-400">
                      {data.filter((c) => c.type === 'EXPENSE').length}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-start flex-col">
          {data.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
              {data.map((items) => (
                <CategoryPartial
                  data={items}
                  loadId={loadId}
                  key={items.id}
                  setLoadId={setLoadId}
                  onDelete={onDelete}
                  setPopUpModal={setPopUpModal}
                  onEdit={(data) => {
                    setIsEdit?.(true);
                    setFromCreateCategory((prev) => ({
                      ...prev,
                      name: data.name,
                      type: data.type,
                    }));
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="w-full flex items-center justify-center py-16">
              <p className="text-slate-400 text-lg">
                No categories yet. Create one to get started!
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50   px-6 py-4 rounded-full shadow-2xl  ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <CircleDot size={200} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="end">
            <DropdownMenuLabel className="text-lg font-bold">Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="text-md text-accent-foreground font-semibold"
                onClick={() => setPopUpModal!('category')}
              >
                Create
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-md text-destructive font-semibold"
                onClick={() => onDeleteALl()}
              >
                Delete All
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <PopUp
        isOpen={popUpModal === 'category'}
        onClose={() => {
          setPopUpModal!(null);
          setIsEdit?.(false);
          setFromCreateCategory((prev) => ({
            ...prev,
            name: '',
            type: '',
          }));
        }}
      >
        <EditCategoryForm
          formCreateCategory={formCreateCategory}
          isEdit={isEdit!}
          isPending={isPending}
          onAddCategory={onAddCategory}
          onChangePict={onChangePict}
          onRemovePreview={onRemovePreview}
          onUpdateCategory={onUpdateCategory!}
          preview={preview!}
          setFromCreateCategory={setFromCreateCategory}
        />
      </PopUp>
    </View>
  );
};

export default CategoryHeroSection;
