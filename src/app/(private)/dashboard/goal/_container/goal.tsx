'use client';
import { useEffect, useState } from 'react';

import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import InsertGoalForm from '@/core/section/private/goal/_form/insert-goal-form';
import GoalHeroSection from '@/core/section/private/goal/hero-section';
import useServices from '@/hooks/mutation/props.service';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { FormCreateGoal, FormInsertGoal } from '@/types/form/goal.form';
import { PopupInterface } from '@/types/ui';

const GoalContainer = () => {
  const namespace = useAppNameSpase();
  const service = useServices();
  const [popUp, setPopUp] = useState<PopupInterface>(null);
  const [id, setId] = useState<any>(null);
  const [selectWalletId, setSelectWalletId] = useState<string>('');

  const [formInserGoal, setFormInsertGoal] = useState<FormInsertGoal>({
    savedAmount: undefined,
    walletID: selectWalletId,
    id: id,
  });
  const [formEditGoal, setFormEditGoal] = useState<FormCreateGoal>({
    name: '',
    endAt: '',
    startAt: '',
    savedAmount: undefined,
    targetAmount: undefined,
    walletID: selectWalletId,
  });
  const [formCreateGoal, setFormCreateGoal] = useState<FormCreateGoal>({
    name: '',
    endAt: '',
    startAt: '',
    savedAmount: undefined,
    targetAmount: undefined,
    walletID: selectWalletId,
  });

  const goalAll = service.Goal.query();
  const goalCreate = service.Goal.mutation.useCreate();
  const goalDelete = service.Goal.mutation.useDeleteALl();
  const goalDeleteByID = service.Goal.mutation.useDeleteByID();
  const goalInsertGoal = service.Goal.mutation.useInsertGoal();
  const goalEdit = service.Goal.mutation.useUpdate();
  const walletQuery = service.Wallet.query();

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
            walletID: selectWalletId,
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

  const handleInsert = () => {
    if (!formInserGoal.savedAmount || !formInserGoal.walletID) {
      namespace.alert.toast({
        title: 'warning',
        message: 'server internal error',
        icon: 'warning',
      });
    } else {
      goalInsertGoal.mutate(formInserGoal, {
        onSuccess: () => {
          setPopUp(null);
        },
      });
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

  const trashole = (percent: number) => {
    if (percent > 85) {
      return <h1 className="font-semibold">high</h1>;
    } else if (percent > 50) {
      return <h1 className="font-semibold">medium</h1>;
    } else if (percent > 35) {
      return <h1 className="font-semibold">low</h1>;
    } else {
      return <span className="font-semibold">very low</span>;
    }
  };

  useEffect(() => {
    if (!id) return;
    setFormInsertGoal((prev) => ({
      ...prev,
      id: id,
    }));
  }, [id]);

  useEffect(() => {
    if (!selectWalletId) return;
    setFormCreateGoal((prev) => ({
      ...prev,
      walletID: selectWalletId,
    }));
    setFormEditGoal((prev) => ({
      ...prev,
      walletID: selectWalletId,
    }));
    setFormInsertGoal((prev) => ({
      ...prev,
      walletID: selectWalletId,
    }));
  }, [selectWalletId]);

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col">
        <GoalHeroSection
          goalData={goalAll.goalQuery ?? []}
          trashhole={trashole}
          goalOverlayData={goalAll.goalProgress ?? ''}
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
          selectWalletId={selectWalletId}
          onSelectWalletId={setSelectWalletId}
          walletData={walletQuery.walletQuery ?? ''}
          formInsertGoal={formInserGoal}
          setFormInsertGoal={setFormInsertGoal}
          onInsert={() => handleInsert()}
        />
      </Container>
    </SidebarLayout>
  );
};

export default GoalContainer;
