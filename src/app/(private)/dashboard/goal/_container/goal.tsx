'use client';
import Container from '@/components/ui/container';
import { GoalCardData } from '@/configs/components.config';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import GoalHeroSection from '@/core/section/private/goal/hero-section';
import useServices from '@/hooks/mutation/props.service';
import { PopupInterface } from '@/types/ui';
import { useState } from 'react';

const GoalContainer = () => {
  const [popUp, setPopUp] = useState<PopupInterface>(null);
  const goalCreate = useServices().Goal.mutation.useCreate();
  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <GoalHeroSection
          goalData={GoalCardData}
          isPending={goalCreate.isPending}
          popUp={popUp}
          setPopUp={setPopUp}
        />
      </Container>
    </SidebarLayout>
  );
};

export default GoalContainer;
