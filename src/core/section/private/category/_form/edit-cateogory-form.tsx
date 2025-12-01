import { Label } from '@radix-ui/react-label';
import { CircleDot, ImagePlus } from 'lucide-react';
import Image from 'next/image';

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

interface EditCategoryProps {
  isEdit: boolean;
  onUpdateCategory: () => void;
  onAddCategory: () => void;
  formCreateCategory: FormCreateCategory;
  setFromCreateCategory: React.Dispatch<React.SetStateAction<FormCreateCategory>>;
  onChangePict: (e: any) => void;
  preview: string | null;
  onRemovePreview: () => void;
  isPending: boolean;
}

const EditCategoryForm: React.FC<EditCategoryProps> = ({
  isEdit,
  onUpdateCategory,
  onAddCategory,
  formCreateCategory,
  setFromCreateCategory,
  onChangePict,
  preview,
  onRemovePreview,
  isPending,
}) => {
  return (
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
                    <Button variant={'destructive'} onClick={() => onRemovePreview()} type="button">
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
  );
};

export default EditCategoryForm;
