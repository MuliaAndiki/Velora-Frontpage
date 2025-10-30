import View from '@/components/ui/view';
import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';

interface SettingProps {
  logout: () => void;
}

const SettingsSection: React.FC<SettingProps> = ({ logout }) => {
  return (
    <View>
      <Box className="flex justify-center items-center min-h-screen w-full overflow-hidden">
        <Button className="w-full" onClick={() => logout()}>
          Keluar
        </Button>
      </Box>
    </View>
  );
};
export default SettingsSection;
