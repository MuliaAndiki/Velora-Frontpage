import { Button } from '@/components/ui/button';
import { Field, FieldTitle } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import View from '@/components/ui/view';
import { FormCreateWallet } from '@/types/form/wallet.form';

interface CreateWalletFormProps {
  onWallet: () => void;
  formCreateWallet: FormCreateWallet;
  setFormCreateWallet: React.Dispatch<React.SetStateAction<FormCreateWallet>>;
  isPending: boolean;
}
const CreateWalletForm: React.FC<CreateWalletFormProps> = ({
  formCreateWallet,
  isPending,
  onWallet,
  setFormCreateWallet,
}) => {
  return (
    <View className="w-full h-full">
      <div className="w-full flex justify-center items-center flex-col">
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            onWallet();
          }}
        >
          <Field>
            <FieldTitle>Wallet Name</FieldTitle>
            <Input
              placeholder="e.g., Main Wallet, Savings, etc."
              value={formCreateWallet.name}
              onChange={(e) =>
                setFormCreateWallet((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
            <Button variant={'outline'} type="submit" disabled={isPending} className="mt-4 w-full">
              {isPending ? 'Creating...' : 'Create Wallet'}
            </Button>
          </Field>
        </form>
      </div>
    </View>
  );
};

export default CreateWalletForm;
