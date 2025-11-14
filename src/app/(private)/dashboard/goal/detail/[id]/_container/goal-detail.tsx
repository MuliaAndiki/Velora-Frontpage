'use client';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import GoalDetailHeroSection from '@/core/section/private/goal/detail-section';
import useServices from '@/hooks/mutation/props.service';

const GoalDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const goalID = useServices().Goal.query(id);

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <GoalDetailHeroSection data={goalID.goalQueryByID ?? []} />
      </Container>
    </SidebarLayout>
  );
};

export default GoalDetailContainer;
