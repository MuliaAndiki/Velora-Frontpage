'use client';

import { useEffect, useMemo, useState } from 'react';

import Container from '@/components/ui/container';
import { SidebarLayout } from '@/core/layouts/sidebar.layout';
import TransactionHeroSection from '@/core/section/private/transaction/hero-section';
import useServices from '@/hooks/mutation/props.service';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { TransactionPartialType } from '@/types/components';
import { FormCreateTransaction } from '@/types/form/transaction.form';
import { TransactionType } from '@/types/partial';
import { PopupInterface } from '@/types/ui';

export default function TransactionContainer() {
  const namespace = useAppNameSpase();
  const service = useServices();
  const [popUpModal, setPopUpModal] = useState<PopupInterface>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const transactionQuery = service.Transaction.query();
  const categoryQuery = service.Category.query();
  const walletQuery = service.Wallet.query();
  const [loadId, setLoadId] = useState<string | null>(null);
  const [selectTransaction, setSelectTransaction] = useState<TransactionType>(null);
  const [selectedTransactionForEdit, setSelectedTransactionForEdit] =
    useState<TransactionPartialType | null>(null);
  const [selectedWalletId, setSelectedWalletId] = useState<string>('');

  const transactionMutation = service.Transaction.mutation.useCreate();
  const transactionUpdateMutation = service.Transaction.mutation.useUpdate();
  const transactionDeleteMutation = service.Transaction.mutation.useDeleteById?.();

  const [formCreateTransaction, setFormTransaction] = useState<FormCreateTransaction>({
    amount: undefined,
    description: '',
    receiptUrl: '',
    type: selectTransaction,
    walletID: selectedWalletId,
  });

  const filteredTransactions = useMemo(() => {
    let result = (transactionQuery.transactionQuery ?? []) as TransactionPartialType[];

    if (filterType !== 'ALL') {
      result = result.filter((t: TransactionPartialType) => t.type === filterType);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t: TransactionPartialType) =>
          t.description.toLowerCase().includes(query) ||
          t.category?.name.toLowerCase().includes(query)
      );
    }
    if (sortBy === 'newest') {
      result = result.sort(
        (a: TransactionPartialType, b: TransactionPartialType) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      result = result.sort(
        (a: TransactionPartialType, b: TransactionPartialType) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    return result;
  }, [transactionQuery.transactionQuery, filterType, searchQuery, sortBy]);

  const handleCreateTransaction = () => {
    if (
      !formCreateTransaction.amount ||
      !formCreateTransaction.description ||
      !formCreateTransaction.receiptUrl ||
      !formCreateTransaction.type ||
      !formCreateTransaction.walletID ||
      !loadId
    ) {
      namespace.alert.toast({
        title: 'Perhatian',
        message: 'Semua field harus diisi (Wallet & Category)',
        icon: 'warning',
        onVoid: () => {
          console.log(formCreateTransaction);
        },
      });
    } else {
      transactionMutation.mutate(
        { id: loadId!, payload: formCreateTransaction },
        {
          onSuccess: () => {
            setPopUpModal(null);
            setFormTransaction({
              amount: undefined,
              description: '',
              receiptUrl: '',
              type: 'EXPENSE',
              walletID: selectedWalletId,
            });
            setLoadId(null);
            setSelectTransaction(null);
            setSelectedTransactionForEdit(null);
            setSelectedWalletId('');
          },
        }
      );
    }
  };

  const handleUpdateTransaction = () => {
    if (
      !formCreateTransaction.amount ||
      !formCreateTransaction.description ||
      !formCreateTransaction.receiptUrl ||
      !formCreateTransaction.type ||
      !selectedTransactionForEdit?.id
    ) {
      namespace.alert.toast({
        title: 'Perhatian',
        message: 'Semua field harus diisi',
        icon: 'warning',
      });
    } else {
      transactionUpdateMutation?.mutate(
        {
          id: selectedTransactionForEdit.id,
          payload: formCreateTransaction,
        },
        {
          onSuccess: () => {
            setPopUpModal(null);
            setFormTransaction({
              amount: undefined,
              description: '',
              receiptUrl: '',
              type: 'EXPENSE',
              walletID: selectedWalletId,
            });
            setLoadId(null);
            setSelectTransaction(null);
            setSelectedTransactionForEdit(null);
            setSelectedWalletId('');
          },
        }
      );
    }
  };

  const handleEditTransaction = (transaction: TransactionPartialType) => {
    setSelectedTransactionForEdit(transaction);
    setFormTransaction({
      amount: transaction.amount,
      description: transaction.description,
      receiptUrl: transaction.receiptUrl,
      type: transaction.type as 'INCOME' | 'EXPENSE',
      walletID: transaction.walletID,
    });
    setSelectTransaction(transaction.type as 'INCOME' | 'EXPENSE');
    setPopUpModal('edit-transaction');
  };

  const handleDeleteTransaction = (id: string) => {
    transactionDeleteMutation?.mutate(id, {});
  };

  const handleCloseModal = () => {
    setPopUpModal(null);
    setFormTransaction({
      amount: undefined,
      description: '',
      receiptUrl: '',
      type: 'EXPENSE',
      walletID: selectedWalletId,
    });
    setLoadId(null);
    setSelectTransaction(null);
    setSelectedTransactionForEdit(null);
    setSelectedWalletId('');
  };

  useEffect(() => {
    setFormTransaction((prev) => ({
      ...prev,
      walletID: selectedWalletId,
    }));
  }, [selectedWalletId]);

  return (
    <SidebarLayout>
      <Container className="w-full min-h-screen flex flex-col overflow-x-hidden">
        <TransactionHeroSection
          transactionData={filteredTransactions}
          isLoading={transactionQuery.isLoading}
          popUpModal={popUpModal}
          categoryData={categoryQuery.categoryQuery ?? []}
          walletsData={walletQuery.walletQuery ?? ''}
          selectedWalletId={selectedWalletId}
          onSelectWallet={setSelectedWalletId}
          setLoadId={setLoadId}
          loadId={loadId}
          t={namespace.t}
          setPopUpModal={setPopUpModal}
          isPending={
            transactionMutation.isPending ||
            transactionUpdateMutation?.isPending ||
            transactionDeleteMutation?.isPending
          }
          formCreateTransaction={formCreateTransaction}
          setFormCreateTransaction={setFormTransaction}
          selectType={selectTransaction}
          setSelectType={setSelectTransaction}
          onCreate={() => handleCreateTransaction()}
          onUpdate={() => handleUpdateTransaction()}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterType={filterType}
          setFilterType={setFilterType}
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedTransactionForEdit={selectedTransactionForEdit}
          onCloseModal={handleCloseModal}
        />
      </Container>
    </SidebarLayout>
  );
}
