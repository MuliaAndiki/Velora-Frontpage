import { Label } from '@radix-ui/react-label';
import { CircleDot, ImagePlus } from 'lucide-react';
import Image from 'next/image';

import CategoryPartial from '@/components/partial/category-partial';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Field, FieldTitle } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import PopUp from '@/components/ui/pop-up';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import View from '@/components/ui/view';
import { CategoryType } from '@/types/components';
import { FormCreateCategory } from '@/types/form/category.form';
import { PopupInterface } from '@/types/ui';
import UploadsTrigger from '@/utils/uploadtrigger';

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
}) => {
  return (
    <View>
      <div className="w-full min-h-screen flex items-start flex-col overflow-x-hidden">
        <div className="w-full flex justify-center items-start p-4 flex-col">
          <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600 mb-3">
            Category
          </h1>
          <p className="text-slate-400 text-lg mb-6">Organize your spending with categories</p>

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
        <View className="w-full h-full">
          <div className="w-full flex justify-center items-center flex-col">
            <form
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
                if (isEdit) {
                  onUpdateCategory?.();
                } else {
                  onAddCategory();
                }
              }}
            >
              <Field>
                <FieldTitle>{isEdit ? 'Edit Category' : 'Create Category'}</FieldTitle>
                <FieldTitle>Name Category :</FieldTitle>
                <Input
                  value={formCreateCategory.name}
                  onChange={(e) =>
                    setFromCreateCategory((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
                <FieldTitle>Type :</FieldTitle>
                <Select
                  value={formCreateCategory.type}
                  onValueChange={(e) =>
                    setFromCreateCategory((prev) => ({
                      ...prev,
                      type: e,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="INCOME">income</SelectItem>
                      <SelectItem value="EXPENSE">exprense</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {!isEdit && (
                  <>
                    <div className="border w-full border-dashed rounded-lg h-full">
                      <UploadsTrigger
                        accept="image/*"
                        multiple={false}
                        onChange={(e) => onChangePict(e)}
                      >
                        <Button
                          type="button"
                          variant={'ghost'}
                          className="w-full h-full flex flex-col"
                        >
                          <ImagePlus />
                          <Label className="text-lg font-semibold">Upload Foto Category</Label>
                        </Button>
                      </UploadsTrigger>
                    </div>
                    {preview && (
                      <div className="w-full h-full mt-3  rounded-lg p-2 flex justify-center flex-col items-center space-y-2 ">
                        <Image
                          alt="preview"
                          src={preview}
                          width={150}
                          height={150}
                          className="aspect-square rounded-lg object-cover"
                        />
                        <Button
                          variant={'destructive'}
                          onClick={() => onRemovePreview()}
                          type="button"
                        >
                          Hapus Photo
                        </Button>
                      </div>
                    )}
                  </>
                )}
                <Button variant={'outline'} type="submit" disabled={isPending}>
                  {isPending ? 'Wait' : isEdit ? 'Update' : 'Add'}
                </Button>
              </Field>
            </form>
          </div>
        </View>
      </PopUp>
    </View>
  );
};

export default CategoryHeroSection;
