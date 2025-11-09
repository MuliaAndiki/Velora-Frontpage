import { Button } from '@/components/ui/button';
import View from '@/components/ui/view';
import LanguageDropdown from '@/core/components/language.dropdown';

interface SettingProps {
  logout: () => void;
  isPending: boolean;
}

const SettingsSection: React.FC<SettingProps> = ({ logout, isPending }) => {
  return (
    <View>
      <div className="flex justify-center items-start min-h-screen w-full overflow-hidden">
        <div className="w-full flex flex-col p-2">
          <Button className="w-full" disabled={isPending} onClick={() => logout()}>
            {isPending ? 'wait' : 'Quit'}
          </Button>
          <LanguageDropdown />
        </div>
      </div>
    </View>
  );
};
export default SettingsSection;
