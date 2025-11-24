'use client';
import { useState } from 'react';
import { useRef } from 'react';

import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import CategoryHeroSection from '@/core/section/private/category/hero-section';
import useServices from '@/hooks/mutation/props.service';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { FormCreateCategory } from '@/types/form/category.form';
import { PopupInterface } from '@/types/ui';
import { fileToBase64 } from '@/utils/base64';
import { UploadTriggerRef } from '@/utils/uploadtrigger';

const CategoryContainer = () => {
  const [popUpModal, setPopUpModal] = useState<PopupInterface>(null);
  const [loadId, setLoadId] = useState<string | null>(null);
  const uploadRef = useRef<UploadTriggerRef>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [formCreateCategory, setFromCreateCategory] = useState<FormCreateCategory>({
    name: '',
    cate_avaUrl: '',
    type: '',
  });
  const namespace = useAppNameSpase();
  const service = useServices();
  const cateQuer = service.Category.query();
  const deleteById = service.Category.mutation.useDeleteCategory();
  const cateCreate = service.Category.mutation.useCreateCategory();
  const cateDeleteAll = service.Category.mutation.useDeleteAll();
  const cateUpdate = service.Category.mutation.useUpdateCategory();
  const [isEdit, setIsEdit] = useState<boolean>(false);

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
    if (!formCreateCategory.name || !formCreateCategory.type) {
      namespace.alert.toast({
        title: 'Warning',
        message: 'name tidak boleh kosong',
        icon: 'warning',
      });
    } else {
      cateCreate.mutate(formCreateCategory, {
        onSuccess: () => {
          setPopUpModal(null);
          setFromCreateCategory({ name: '', cate_avaUrl: '', type: '' });
          setPreview(undefined);
          setIsEdit(false);
        },
      });
    }
  };

  const handleUpdateCategory = () => {
    if (!formCreateCategory.name || !formCreateCategory.type) {
      namespace.alert.toast({
        title: 'Warning',
        message: 'name dan type tidak boleh kosong',
        icon: 'warning',
      });
    } else if (!loadId) {
      namespace.alert.toast({
        title: 'Warning',
        message: 'Missing category id',
        icon: 'warning',
      });
    } else {
      cateUpdate.mutate(
        {
          id: loadId,
          payload: formCreateCategory,
        },
        {
          onSuccess: () => {
            setPopUpModal(null);
            setFromCreateCategory({ name: '', cate_avaUrl: '', type: '' });
            setPreview(undefined);
            setLoadId(null);
            setIsEdit(false);
          },
        }
      );
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
  const handleRemovePreview = () => {
    setPreview(undefined);
    uploadRef.current?.resetInput();
  };

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col overflow-x-hidden">
        <CategoryHeroSection
          data={cateQuer.categoryQuery ?? []}
          loadId={loadId}
          setLoadId={setLoadId}
          onDelete={handlerDeleteById}
          popUpModal={popUpModal}
          setPopUpModal={setPopUpModal}
          formCreateCategory={formCreateCategory}
          isPending={cateCreate.isPending || cateUpdate.isPending}
          setFromCreateCategory={setFromCreateCategory}
          onAddCategory={() => handleCreateCategory()}
          onUpdateCategory={() => handleUpdateCategory()}
          preview={preview}
          onChangePict={handleChangePict}
          onDeleteALl={() => handleDelete()}
          onRemovePreview={() => handleRemovePreview()}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      </Container>
    </SidebarLayout>
  );
};

export default CategoryContainer;
