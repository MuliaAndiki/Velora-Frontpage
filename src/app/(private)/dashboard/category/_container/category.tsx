'use client';
import { useEffect } from 'react';

import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import CategoryHeroSection from '@/core/section/private/category/hero-section';
import { useAppNameSpase } from '@/hooks/useNameSpace';

const CategoryContainer = () => {
  const namespace = useAppNameSpase();
  const query = namespace.serviceApp.Category.query();
  const all = query.useAll();
  useEffect(() => {
    console.log(all);
  }, [all]);

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <CategoryHeroSection />
      </Container>
    </SidebarLayout>
  );
};

export default CategoryContainer;
