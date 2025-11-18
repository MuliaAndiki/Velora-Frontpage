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
  formCreateCategory: FormCreateCategory;
  setFromCreateCategory: React.Dispatch<React.SetStateAction<FormCreateCategory>>;
  onChangePict: (e: any) => void;
  preview: string | null;
  setPreview: React.Dispatch<React.SetStateAction<string | null>>;
  onDeleteALl: () => void;
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
  formCreateCategory,
  setFromCreateCategory,
  onChangePict,
  preview,
  setPreview,
  onDeleteALl,
}) => {
  return (
    <View>
      <div className="w-full min-h-screen flex items-start flex-col">
        <div className="w-full flex justify-center items-start p-4 flex-col">
          <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600 mb-3">
            Category
          </h1>
          <p className="text-slate-400 text-lg">help manage your financial path</p>
          <div className="w-full my-2">
            <Card>
              <CardContent>
                <div className="grid grid-cols-3 grid-rows-1 gap-4">
                  <div className="flex justify-center items-center border p-4 rounded-lg border-dashed">
                    <CardTitle>Setup</CardTitle>
                  </div>
                  <div className="flex justify-center items-center border rounded-lg p-4 border-dashed">
                    <CardTitle>Setup</CardTitle>
                  </div>
                  <div className="flex justify-center items-center border rounded-lg p-4 border-dashed">
                    <CardTitle>Setup</CardTitle>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="w-full flex justify-start  flex-col  ">
          <div className=" grid grid-cols-4 grid-rows-1 gap-4 p-4">
            {data.map((items, key) => (
              <CategoryPartial
                data={items}
                loadId={loadId}
                key={key}
                setLoadId={setLoadId}
                onDelete={onDelete}
                setPopUpModal={setPopUpModal}
              />
            ))}
          </div>
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

      <PopUp isOpen={popUpModal === 'category'} onClose={() => setPopUpModal!(null)}>
        <View className="w-full h-full">
          <div className="w-full flex justify-center items-center flex-col">
            <form
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
                onAddCategory();
              }}
            >
              <Field>
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
                <div className="border w-full border-dashed rounded-lg h-full">
                  <UploadsTrigger
                    accept="image/*"
                    multiple={false}
                    onChange={(e) => onChangePict(e)}
                  >
                    <Button type="button" variant={'ghost'} className="w-full h-full flex flex-col">
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
                    <Button variant={'destructive'} onClick={() => setPreview(null)}>
                      Hapus Photo
                    </Button>
                  </div>
                )}
                <Button variant={'outline'} type="submit" disabled={isPending}>
                  {isPending ? 'Wait' : 'Add'}
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
