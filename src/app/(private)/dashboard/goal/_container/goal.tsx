'use client';
import { useState } from 'react';

import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import GoalHeroSection from '@/core/section/private/goal/hero-section';
import useServices from '@/hooks/mutation/props.service';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { FormCreateGoal } from '@/types/form/goal.form';
import { PopupInterface } from '@/types/ui';

const GoalContainer = () => {
  const namespace = useAppNameSpase();
  const [popUp, setPopUp] = useState<PopupInterface>(null);
  const [id, setId] = useState<any>(null);
  const [formEditGoal, setFormEditGoal] = useState<FormCreateGoal>({
    name: '',
    endAt: '',
    startAt: '',
    savedAmount: undefined,
    targetAmount: undefined,
  });
  const [formCreateGoal, setFormCreateGoal] = useState<FormCreateGoal>({
    name: '',
    endAt: '',
    startAt: '',
    savedAmount: undefined,
    targetAmount: undefined,
  });

  const goalAll = useServices().Goal.query();
  const goalCreate = useServices().Goal.mutation.useCreate();
  const goalDelete = useServices().Goal.mutation.useDeleteALl();
  const goalDeleteByID = useServices().Goal.mutation.useDeleteByID();
  const goalEdit = useServices().Goal.mutation.useUpdate();

  const handleOpenPopUp = (data: any) => {
    setFormEditGoal(data);
    setPopUp('edit-goal');
  };

  const handleCreate = () => {
    if (
      !formCreateGoal.endAt ||
      !formCreateGoal.startAt ||
      !formCreateGoal.name ||
      !formCreateGoal.savedAmount ||
      !formCreateGoal.targetAmount
    ) {
      namespace.alert.toast({
        title: 'Warning',
        message: 'mohon isi semua form',
        icon: 'warning',
      });
    } else {
      goalCreate.mutate(formCreateGoal, {
        onSuccess: () => {
          setPopUp(null);
          setFormCreateGoal({
            name: '',
            endAt: '',
            startAt: '',
            savedAmount: undefined,
            targetAmount: undefined,
          });
        },
      });
    }
  };

  const handleGoalUpdate = (params: string) => {
    if (!params) {
      namespace.alert.toast({
        title: 'warning',
        message: 'Server Internal',
        icon: 'warning',
      });
    } else {
      goalEdit.mutate(
        { params: id!, payload: formEditGoal },
        {
          onSuccess: () => {
            setPopUp(null);
          },
        }
      );
    }
  };

  const handleDeleteAll = () => {
    return goalDelete.mutate({});
  };

  const handleDeleteByID = (id: string) => {
    if (!id) {
      namespace.alert.toast({
        title: 'Warning',
        message: 'server internal error',
        icon: 'error',
      });
    } else {
      goalDeleteByID.mutate(id);
    }
  };

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <GoalHeroSection
          goalData={goalAll.goalQuery ?? []}
          isPending={goalCreate.isPending || goalEdit.isPending}
          popUp={popUp}
          setPopUp={setPopUp}
          formCreateGoal={formCreateGoal}
          onCreate={handleCreate}
          setFormCreateGoal={setFormCreateGoal}
          onDeleteAll={() => handleDeleteAll()}
          alert={namespace.alert}
          onDeleteByID={handleDeleteByID}
          formEditGoal={formEditGoal}
          setFormEditGoal={setFormEditGoal}
          handleOpenPopUp={handleOpenPopUp}
          onEdit={() => handleGoalUpdate(id!)}
          setId={setId}
        />
      </Container>
    </SidebarLayout>
  );
};

export default GoalContainer;
