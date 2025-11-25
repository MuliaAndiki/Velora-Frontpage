import { Label } from '@radix-ui/react-label';
import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';

import UserPartial from '@/components/partial/user-partial';
import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldTitle } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import View from '@/components/ui/view';
import { FormUpdateProfile } from '@/types/form/auth.form';
import { PopupInterface } from '@/types/ui';
import { camelCaseToWords } from '@/utils/string.format';
import UploadsTrigger from '@/utils/uploadtrigger';

interface UpdateProfileProps {
  setPopUpModal: React.Dispatch<React.SetStateAction<PopupInterface>>;
  onUpdate: () => void;
  formUpdateProfile: FormUpdateProfile;
  setFormUpdateProfile: React.Dispatch<React.SetStateAction<FormUpdateProfile>>;
  onChangeAva: (e: any) => void;
  preview: string | null;
  isPending: boolean;
}
const UpdateProfile: React.FC<UpdateProfileProps> = ({
  setPopUpModal,
  onUpdate,
  formUpdateProfile,
  setFormUpdateProfile,
  onChangeAva,
  preview,
  isPending,
}) => {
  return (
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
              <UploadsTrigger accept="image/*" multiple={false} onChange={(e) => onChangeAva(e)}>
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
  );
};

export default UpdateProfile;
