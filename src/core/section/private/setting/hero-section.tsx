import SettingsConfig from '@/components/partial/setting-config';
import SettingsRoutes from '@/components/partial/setting-route';
import SettingPayment from '@/components/partial/settingPayment';
import UserPartial from '@/components/partial/user-partial';
import { Button } from '@/components/ui/button';
import PopUp from '@/components/ui/pop-up';
import Spreed from '@/components/ui/spread';
import View from '@/components/ui/view';
import { FormUpdateProfile } from '@/types/form/auth.form';
import { IAuth, IWallet } from '@/types/schema';
import { PopupInterface } from '@/types/ui';

import UpdateProfile from './_profile/update-profile';

interface SettingProps {
  logout: () => void;
  isPending: boolean;
  formUpdateProfile: FormUpdateProfile;
  setFormUpdateProfile: React.Dispatch<React.SetStateAction<FormUpdateProfile>>;
  preview: string | null;
  userData: IAuth;
  setPopUpModal: React.Dispatch<React.SetStateAction<PopupInterface>>;
  popUpModal: PopupInterface;
  handleOpenPopUp: (data: any) => void;
  onChangeAva: (e: any) => void;
  onUpdate: () => void;
  Iwallet: IWallet;
}

const SettingsSection: React.FC<SettingProps> = ({
  logout,
  isPending,
  userData,
  setPopUpModal,
  popUpModal,
  handleOpenPopUp,
  formUpdateProfile,
  setFormUpdateProfile,
  onChangeAva,
  onUpdate,
  preview,
  Iwallet,
}) => {
  return (
    <View>
      <div className="flex justify-center items-start min-h-screen w-full overflow-hidden">
        <div className="w-full flex flex-col p-2  gap-2">
          <UserPartial data={userData ?? ''} handleOpenPopUp={handleOpenPopUp} />
          <Spreed orientation="horizontal" />
          <SettingsConfig />
          <SettingPayment walletData={Iwallet} />
          <SettingsRoutes />
          <Button className="w-full" disabled={isPending} onClick={() => logout()}>
            {isPending ? 'wait' : 'quit'}
          </Button>
        </div>
      </div>
      <PopUp isOpen={popUpModal === 'profile'} onClose={() => setPopUpModal(null)}>
        <UpdateProfile
          formUpdateProfile={formUpdateProfile}
          isPending={isPending}
          onChangeAva={onChangeAva}
          onUpdate={onUpdate}
          preview={preview}
          setFormUpdateProfile={setFormUpdateProfile}
          setPopUpModal={setPopUpModal}
        />
      </PopUp>
    </View>
  );
};
export default SettingsSection;
