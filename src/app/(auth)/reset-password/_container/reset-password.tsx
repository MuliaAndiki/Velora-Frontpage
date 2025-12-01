'use client';
import { GalleryVerticalEnd } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import Container from '@/components/ui/container';
import ResetPasswordSection from '@/core/section/auth/reset-password/hero-secton';
import { useAppSelector } from '@/hooks/dispatch/dispatch';
import useServices from '@/hooks/mutation/props.service';
import { useAppNameSpase } from '@/hooks/useNameSpace';
import { FormResetPassword } from '@/types/form/auth.form';

const ResetPasswordContainer = () => {
  const namespace = useAppNameSpase();
  const service = useServices();
  const resetPassword = service.Auth.mutation.useResetPassword();
  const otp = useAppSelector((state) => state.otp);
  const [formResetPassword, setFormResetPassword] = useState<FormResetPassword>({
    password: '',
    email: otp.email ?? '',
  });
  const t = namespace.t;
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

  const handleResetPassword = () => {
    if (formResetPassword.password !== confirmPassword) {
      console.log(formResetPassword);
      namespace.alert.toast({
        title: 'warning',
        message: 'colum tidak match',
        icon: 'warning',
      });
    } else if (formResetPassword.email === '') {
      namespace.alert.toast({
        title: 'warning',
        message: 'email tidak valid',
        icon: 'warning',
      });
    } else {
      resetPassword.mutate(formResetPassword, {
        onSuccess: () => {
          namespace.router.push('/login');
        },
      });
    }
  };

  return (
    <Container className="flex min-h-svh items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link href="#" className="flex items-center gap-2 self-center font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Velora Inc.
          </Link>
          <ResetPasswordSection
            formResetPassword={formResetPassword}
            setFormResetPassword={setFormResetPassword}
            onReset={handleResetPassword}
            isPending={resetPassword.isPending}
            t={t}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
        </div>
      </div>
    </Container>
  );
};

export default ResetPasswordContainer;
