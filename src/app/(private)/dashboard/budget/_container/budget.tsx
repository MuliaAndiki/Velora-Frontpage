'use client';

import { useState } from 'react';

import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import BudgetHeroSection from '@/core/section/private/budget/hero-section';
import useServices from '@/hooks/mutation/props.service';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { FormCreateBudget } from '@/types/form/budget.form';
import { IBudget } from '@/types/schema';
import { PopupInterface } from '@/types/ui';

const defaultBudgetForm: FormCreateBudget = {
  name: '',
  categoryID: '',
  limit: 0,
  period: 'MONTHLY',
  startDate: new Date(),
  endDate: null,
};

export default function BudgetContainer() {
  const [popUpModal, setPopUpModal] = useState<PopupInterface>(null);
  const [formData, setFormData] = useState<FormCreateBudget>(defaultBudgetForm);
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null);

  const namespace = useAppNameSpase();
  const service = useServices();
  const budgetQuery = service.Budget.query();
  const categoryQuery = service.Category.query();
  const budgetDelete = service.Budget.mutation.useDeleteBudget();
  const budgetCreate = service.Budget.mutation.useCreateBudget();
  const budgetUpdate = service.Budget.mutation.useUpdateBudget();

  const handleDelete = (id: string): void => {
    const budget = budgetQuery.getBudgets?.find((b: IBudget) => b.id === id);
    if (budget) {
      setSelectedBudgetId(id);
      setPopUpModal('delete-budget' as PopupInterface);
    }
  };

  const handleEdit = (id: string): void => {
    const budget = budgetQuery.getBudgets?.find((b: IBudget) => b.id === id);
    if (budget) {
      setFormData({
        name: budget.name,
        categoryID: budget.categoryID,
        limit: budget.limit,
        period: budget.period,
        startDate: budget.startDate,
        endDate: budget.endDate,
      });
      setSelectedBudgetId(id);
      setPopUpModal('edit-budget' as PopupInterface);
    }
  };

  const handleCreate = (): void => {
    budgetCreate.mutate(formData, {
      onSuccess: () => {
        setFormData(defaultBudgetForm);
        setPopUpModal(null);
      },
    });
  };

  const handleUpdate = (): void => {
    if (selectedBudgetId) {
      budgetUpdate.mutate(
        { payload: formData, id: selectedBudgetId },
        {
          onSuccess: () => {
            setFormData(defaultBudgetForm);
            setSelectedBudgetId(null);
            setPopUpModal(null);
          },
        }
      );
    }
  };

  const handleDeleteConfirm = (): void => {
    if (selectedBudgetId) {
      budgetDelete.mutate(selectedBudgetId, {
        onSuccess: () => {
          setSelectedBudgetId(null);
          setPopUpModal(null);
        },
      });
    }
  };

  const closePopUp = (): void => {
    setFormData(defaultBudgetForm);
    setSelectedBudgetId(null);
    setPopUpModal(null);
  };

  const selectedBudget = budgetQuery.getBudgets?.find((b: IBudget) => b.id === selectedBudgetId);

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <BudgetHeroSection
          budgets={budgetQuery.getBudgets ?? []}
          isLoading={budgetQuery.isLoading}
          onDelete={handleDelete}
          onEdit={handleEdit}
          isPending={budgetCreate.isPending || budgetDelete.isPending || budgetUpdate.isPending}
          popUpModal={popUpModal}
          setPopUpModal={setPopUpModal}
          onCreate={() => setPopUpModal('create-budget' as PopupInterface)}
          formData={formData}
          setFormData={setFormData}
          categories={categoryQuery.categoryQuery ?? []}
          onCreateBudget={handleCreate}
          onUpdateBudget={handleUpdate}
          onDeleteConfirm={handleDeleteConfirm}
          selectedBudget={selectedBudget}
          closePopUp={closePopUp}
        />
      </Container>
    </SidebarLayout>
  );
}
