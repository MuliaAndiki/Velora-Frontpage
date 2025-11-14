import { Label } from '@radix-ui/react-label';
import { ChevronRight, ImagePlus, Info, Languages, Moon, Settings, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import UserPartial from '@/components/partial/user-partial';
import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldTitle } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import PopUp from '@/components/ui/pop-up';
import Spreed from '@/components/ui/spread';
import View from '@/components/ui/view';
import LanguageDropdown from '@/core/components/language.dropdown';
import ThemeToggle from '@/core/components/theme-toggle';
import { FormUpdateProfile } from '@/types/form/auth.form';
import { IAuth } from '@/types/schema';
import { PopupInterface } from '@/types/ui';
import { camelCaseToWords } from '@/utils/string.format';
import UploadsTrigger from '@/utils/uploadtrigger';

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
}) => {
  return (
    <View>
      <div className="flex justify-center items-start min-h-screen w-full overflow-hidden">
        <div className="w-full flex flex-col p-2  gap-2">
          <UserPartial data={userData ?? ''} handleOpenPopUp={handleOpenPopUp} />
          <Spreed orientation="horizontal" />
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
          <Button className="w-full" disabled={isPending} onClick={() => logout()}>
            {isPending ? 'wait' : 'quit'}
          </Button>
        </div>
      </div>
      <PopUp isOpen={popUpModal === 'profile'} onClose={() => setPopUpModal(null)}>
        <View className="w-full h-full">
          <div className="flex justify-center items-center flex-col ">
            <div className="flex w-full justify-end items-center ">
              <X onClick={() => setPopUpModal(null)} className="cursor-pointer" />
            </div>
          </div>
          <Field>
            <form
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
                onUpdate();
              }}
            >
              <FieldContent>
                <FieldTitle className="text-lg ">{camelCaseToWords('email')} :</FieldTitle>
                <Input
                  defaultValue={formUpdateProfile.email}
                  onChange={(e) =>
                    setFormUpdateProfile((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </FieldContent>
              <FieldContent>
                <FieldTitle className="text-lg ">{camelCaseToWords('fullname')} :</FieldTitle>
                <Input
                  defaultValue={formUpdateProfile.fullName}
                  onChange={(e) =>
                    setFormUpdateProfile((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                />
              </FieldContent>
              <FieldContent>
                <FieldTitle className="text-lg">{camelCaseToWords('avatar')} :</FieldTitle>
                {!preview ? (
                  <UploadsTrigger
                    accept="image/*"
                    multiple={false}
                    onChange={(e) => onChangeAva(e)}
                  >
                    <Button type="button" variant={'ghost'} className="w-full h-full flex flex-col">
                      <ImagePlus size={200} />
                      <Label className="text-lg font-semibold">Upload Foto Category</Label>
                    </Button>
                  </UploadsTrigger>
                ) : (
                  <div className="w-full flex justify-center">
                    {preview && (
                      <UploadsTrigger
                        accept="image/*"
                        multiple={false}
                        onChange={(e) => onChangeAva(e)}
                      >
                        <Image
                          alt="preview"
                          src={formUpdateProfile.photoUrl}
                          width={150}
                          height={150}
                          className="aspect-square object-cover rounded-full "
                        />
                      </UploadsTrigger>
                    )}
                  </div>
                )}
              </FieldContent>
              <Button type="submit" className="w-full my-2" disabled={isPending}>
                {isPending ? 'wait' : 'update'}
              </Button>
            </form>
          </Field>
        </View>
      </PopUp>
    </View>
  );
};
export default SettingsSection;
