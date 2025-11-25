import { Languages, Moon } from 'lucide-react';

import LanguageDropdown from '@/core/components/language.dropdown';
import ThemeToggle from '@/core/components/theme-toggle';

import View from '../ui/view';
const SettingsConfig: React.FC = () => {
  return (
    <View className="w-full h-full flex gap-2 my-2 flex-col">
      <h1 className="text-xl font-semibold">Theme :</h1>
      <div className="w-full flex justify-between items-center border p-4 rounded-lg bg-muted">
        <div className="w-full flex items-center gap-2 ">
          <Languages />
          <h1 className="text-lg font-semibold text-slate-400">lauguage</h1>
        </div>
        <LanguageDropdown />
      </div>

      <div className="w-full flex justify-between items-center border p-4 rounded-lg bg-muted">
        <div className="w-full flex items-center gap-2 ">
          <Moon />
          <h1 className="text-lg font-semibold text-slate-400">Theme</h1>
        </div>
        <ThemeToggle />
      </div>
    </View>
  );
};

export default SettingsConfig;
