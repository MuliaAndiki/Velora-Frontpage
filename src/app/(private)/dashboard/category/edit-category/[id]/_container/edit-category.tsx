'use client';

import { useParams } from 'next/navigation';

import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import EditCategoryHeroSection from '@/core/section/private/edit-category/hero-section';

const EditCategoryContainer = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <EditCategoryHeroSection />
      </Container>
    </SidebarLayout>
  );
};

export default EditCategoryContainer;
