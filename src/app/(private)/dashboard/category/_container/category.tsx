'use client';
import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import CategoryHeroSection from '@/core/section/private/category/hero-section';
import useServices from '@/hooks/mutation/props.service';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { PopupInterface } from '@/types/ui';
import { useEffect, useState } from 'react';

const CategoryContainer = () => {
  const [popUpModal, setPopUpModal] = useState<PopupInterface>(null);
  const [loadId, setLoadId] = useState<string | null>(null);
  const namespace = useAppNameSpase();
  const cate = useServices().Category.query();
  const deleteById = useServices().Category.mutation.useDeleteCategory();

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

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <CategoryHeroSection
          data={cate.categoryQuery ?? []}
          loadId={loadId}
          setLoadId={setLoadId}
          onDelete={handlerDeleteById}
          popUpModal={popUpModal}
          setPopUpModal={setPopUpModal}
        />
      </Container>
    </SidebarLayout>
  );
};

export default CategoryContainer;
