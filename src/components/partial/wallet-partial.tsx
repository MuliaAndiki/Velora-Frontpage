import { CreditCard, Wallet as WalletIcon } from 'lucide-react';

import { IWallet } from '@/types/schema';
import { formatCurrency } from '@/utils/number.format';

interface WalletCardProps {
  wallet: IWallet;
  isSelected?: boolean;
  onClick?: (walletId: string) => void;
}

const WalletCard: React.FC<WalletCardProps> = ({ wallet, isSelected = false, onClick }) => {
  if (!wallet || !wallet.name || wallet.balance === undefined) {
    return null;
  }

  const handleClick = () => {
    onClick?.(wallet.id);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative bg-linear-to-br from-slate-800 to-slate-900 backdrop-blur-sm 
        border-2 rounded-2xl p-6 cursor-pointer
        transition-all duration-300 group
        ${
          isSelected
            ? 'border-blue-500 shadow-lg shadow-blue-500/30 -translate-y-1'
            : 'border-slate-700 hover:border-slate-600 hover:shadow-xl hover:-translate-y-1'
        }
      `}
    >
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 bg-opacity-20 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <CreditCard className="text-blue-400" size={24} />
          </div>
          <div>
            <h3 className="text-white text-lg font-bold">{wallet.name}</h3>
            <p className="text-slate-400 text-sm">Wallet Balance</p>
          </div>
        </div>
        <WalletIcon
          className="text-slate-400 group-hover:text-blue-400 transition-colors"
          size={20}
        />
      </div>

      <div className="relative z-10 mb-4">
        <p className="text-slate-400 text-sm mb-1">Current Balance</p>
        <p className="text-white text-3xl font-bold">{formatCurrency(wallet.balance)}</p>
      </div>

      <div className="relative z-10 pt-4 border-t border-slate-700">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-xs">Active Wallet</span>
          {isSelected && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-semibold">Selected</span>
            </div>
          )}
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transform -skew-x-12 group-hover:translate-x-full transition-all duration-500 pointer-events-none" />
    </div>
  );
};

export default WalletCard;
