import { IWallet } from '@/types/schema';

import View from '../ui/view';
import WalletCard from './wallet-partial';

interface SettingWalletProps {
  walletData: IWallet;
}
const SettingPayment: React.FC<SettingWalletProps> = ({ walletData }) => {
  return (
    <View className="w-full h-full flex gap-2 my-2 flex-col">
      <h1 className="text-lg font-bold">Payment :</h1>
      <WalletCard wallet={walletData} />
    </View>
  );
};

export default SettingPayment;
