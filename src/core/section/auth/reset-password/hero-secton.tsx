import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import View from '@/components/ui/view';
import { FormResetPassword } from '@/types/form/auth.form';

interface ResetPasswordProps {
  onReset: () => void;
  t: any;
  formResetPassword: FormResetPassword;
  setFormResetPassword: React.Dispatch<React.SetStateAction<FormResetPassword>>;
  isPending: boolean;
  confirmPassword: string | null;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string | null>>;
}

const ResetPasswordSection: React.FC<ResetPasswordProps> = ({
  formResetPassword,
  isPending,
  onReset,
  setFormResetPassword,
  t,
  confirmPassword,
  setConfirmPassword,
}) => {
  return (
    <View className="flex flex-col gap-6">
      <Card
        className="group relative bg-white/5 backdrop-blur-xl rounded-xl shadow-md
        hover:shadow-xl  transition-all duration-300
        border border-gray-400 overflow-hidden cursor-pointer
        flex flex-col h-full "
      >
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('auth.reset-password.title')}</CardTitle>
          <CardDescription>{t('auth.reset-password.deskripsi')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onReset();
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Password:</FieldLabel>
                <Input
                  type="password"
                  required
                  value={formResetPassword.password}
                  onChange={(e) =>
                    setFormResetPassword((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Confirm Password:</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  value={confirmPassword!}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isPending}>
                  {t('auth.reset-password.reset')}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        {t('auth.login.fotterDeskripsi')}
        <Link href="#">{t('auth.login.terms')}</Link>
        {t('auth.login.and')} <Link href="#">{t('auth.login.privacy')}</Link>.
      </FieldDescription>
    </View>
  );
};

export default ResetPasswordSection;
