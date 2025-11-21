import { useMutation } from '@tanstack/react-query';

import { useAppNameSpase } from '@/hooks/useNameSpace';
import { TResponse } from '@/pkg/react-query/mutation-wrapper.type';
import Api from '@/services/props.service';
import { FormCreateWallet } from '@/types/form/wallet.form';

const WalletMutation = {
  useCreate() {
    const namespace = useAppNameSpase();
    return useMutation<TResponse<any>, Error, FormCreateWallet>({
      mutationFn: (payload) => Api.Wallet.create(payload),
      onSuccess: () => {
        namespace.alert.toast({
          title: 'succes',
          message: 'succes bikin wallet',
          icon: 'success',
        });
      },
      onError: (err) => {
        console.error(err);
        namespace.alert.toast({
          title: 'failed',
          message: 'failed bikin wallet',
          icon: 'error',
        });
      },
    });
  },
};

export default WalletMutation;
