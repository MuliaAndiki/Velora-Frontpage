'use client';
import { useState } from 'react';

import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import CategoryHeroSection from '@/core/section/private/category/hero-section';
import useServices from '@/hooks/mutation/props.service';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { FormCreateCategory } from '@/types/form/category.form';
import { PopupInterface } from '@/types/ui';
import { fileToBase64 } from '@/utils/base64';

const CategoryContainer = () => {
  const [popUpModal, setPopUpModal] = useState<PopupInterface>(null);
  const [loadId, setLoadId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [formCreateCategory, setFromCreateCategory] = useState<FormCreateCategory>({
    name: '',
    cate_avaUrl: '',
  });
  const namespace = useAppNameSpase();
  const cateQuer = useServices().Category.query();
  const deleteById = useServices().Category.mutation.useDeleteCategory();
  const cateCreate = useServices().Category.mutation.useCreateCategory();
  const cateDeleteAll = useServices().Category.mutation.useDeleteAll();

  const handleChangePict = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setFromCreateCategory((prev) => ({
        ...prev,
        cate_avaUrl: base64,
      }));
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  };

  const handleCreateCategory = () => {
    if (!formCreateCategory.name) {
      namespace.alert.toast({
        title: 'Warning',
        message: 'name tidak boleh kosong',
        icon: 'warning',
      });
    } else {
      cateCreate.mutate(formCreateCategory, {
        onSuccess: () => {
          setPopUpModal(null);
        },
      });
    }
  };

  const handlerDeleteById = () => {
    if (!loadId) {
      namespace.alert.toast({
        title: 'Warning',
        message: 'Mising id',
        icon: 'warning',
      });
    } else {
      deleteById.mutate({ id: loadId });
    }
  };

  const handleDelete = () => {
    return cateDeleteAll.mutate({});
  };

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col ">
        <CategoryHeroSection
          data={cateQuer.categoryQuery ?? []}
          loadId={loadId}
          setLoadId={setLoadId}
          onDelete={handlerDeleteById}
          popUpModal={popUpModal}
          setPopUpModal={setPopUpModal}
          formCreateCategory={formCreateCategory}
          isPending={cateCreate.isPending}
          setFromCreateCategory={setFromCreateCategory}
          onAddCategory={() => handleCreateCategory()}
          preview={preview}
          setPreview={setPreview}
          onChangePict={handleChangePict}
          onDeleteALl={() => handleDelete()}
        />
      </Container>
    </SidebarLayout>
  );
};

export default CategoryContainer;
