import { ChevronRight, Info } from 'lucide-react';
import { Settings } from 'lucide-react';
import Link from 'next/link';

import View from '../ui/view';
const SettingsRoutes = () => {
  return (
    <View className="w-full h-full flex gap-2 my-2 flex-col ">
      <h1 className="text-xl font-semibold">Lainnya:</h1>
      <div className="w-full flex justify-between items-center border p-4 rounded-lg bg-muted">
        <div className="w-full flex items-center gap-2 ">
          <Info />
          <h1 className="text-lg font-semibold text-slate-400">Help Center</h1>
        </div>
        <ChevronRight />
      </div>

      <div className="w-full flex justify-center items-center border p-4 rounded-lg bg-muted">
        <Link
          href="/dashboard/setting/about"
          className="w-full flex items-center justify-between gap-2 "
        >
          <div className="flex items-center gap-2">
            <Settings />
            <h1 className="text-lg font-semibold text-slate-400">About </h1>
          </div>
          <ChevronRight className="cursor-pointer" />
        </Link>
      </div>
    </View>
  );
};

export default SettingsRoutes;
