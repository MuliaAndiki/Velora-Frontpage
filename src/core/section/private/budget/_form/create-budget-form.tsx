'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldTitle } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import View from '@/components/ui/view';
import { FormCreateBudget } from '@/types/form/budget.form';

interface CreateBudgetFormProps {
  isPending: boolean;
  categories: any[];
  formData: FormCreateBudget;
  setFormData: React.Dispatch<React.SetStateAction<FormCreateBudget>>;
  onSubmit: () => void;
  onClose: () => void;
}

const CreateBudgetForm: React.FC<CreateBudgetFormProps> = ({
  isPending,
  categories,
  formData,
  setFormData,
  onSubmit,
  onClose,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const getDateValue = (date: Date | string | null): string => {
    if (!date) return '';
    if (typeof date === 'string') return date;
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    return '';
  };

  const convertToDate = (dateString: string): Date => {
    return new Date(dateString);
  };

  return (
    <View className="w-full h-full">
      <div className="w-full flex justify-center items-center flex-col">
        <form className="w-full" onSubmit={handleSubmit}>
          <Field>
            <FieldTitle>Budget Name :</FieldTitle>
            <Input
              placeholder="e.g., Monthly Food Budget"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              required
            />

            <FieldTitle className="mt-4">Category :</FieldTitle>
            <Select
              value={formData.categoryID}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  categoryID: value,
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <FieldTitle className="mt-4">Budget Limit :</FieldTitle>
            <Input
              type="number"
              placeholder="e.g., 1000000"
              value={formData.limit}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  limit: parseInt(e.target.value) || 0,
                }))
              }
              required
            />

            <FieldTitle className="mt-4">Period :</FieldTitle>
            <Select
              value={formData.period || 'MONTHLY'}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  period: value as 'WEEKLY' | 'MONTHLY' | 'YEARLY',
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="WEEKLY">Weekly</SelectItem>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                  <SelectItem value="YEARLY">Yearly</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <FieldTitle className="mt-4">Start Date :</FieldTitle>
            <Input
              type="date"
              value={getDateValue(formData.startDate)}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  startDate: convertToDate(e.target.value),
                }))
              }
              required
            />

            <FieldTitle className="mt-4">End Date (Optional) :</FieldTitle>
            <Input
              type="date"
              value={getDateValue(formData.endDate)}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  endDate: e.target.value ? convertToDate(e.target.value) : null,
                }))
              }
            />

            <div className="flex gap-2 mt-6 pt-4 border-t">
              <Button variant={'outline'} type="button" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button
                variant={'default'}
                type="submit"
                disabled={isPending}
                className="flex-1 bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              >
                {isPending ? 'Creating...' : 'Create Budget'}
              </Button>
            </div>
          </Field>
        </form>
      </div>
    </View>
  );
};

export default CreateBudgetForm;
