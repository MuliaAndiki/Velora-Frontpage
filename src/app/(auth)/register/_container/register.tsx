'use client';

import useRegisters from '@/hooks/mutation/auth/useRegister';
import { FormRegisterType } from '@/types/form/auth.form';
import { useAlert } from '@/hooks/useAlert';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterCard } from '@/core/section/auth/register/hero-section';
import { useIsMobile } from '@/hooks/use-mobile';

const RegisterContainer = () => {
  const mobile = useIsMobile();
  const alert = useAlert();
  const router = useRouter();
  const [formRegister, setFormRegister] = useState<FormRegisterType>({
    email: '',
    password: '',
    fullName: '',
  });

  const register = useRegisters();

  const handleRegister = () => {
    if (!formRegister.email || !formRegister.password || !formRegister.fullName) {
      alert.toast({
        title: 'Warning',
        message: 'Please fill in all fields',
        icon: 'warning',
      });
      return;
    }

    register.mutate(formRegister, {
      onSuccess: () => {
        alert.toast({
          title: 'Success',
          message: 'Registration successful! Please login to continue.',
          icon: 'success',
        });
        router.push('/login');
      },
    });
  };

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>
      <div className="w-full max-w-sm">
        <RegisterCard
          formRegister={formRegister}
          setFormRegister={setFormRegister}
          onRegister={handleRegister}
          isPending={register.isPending}
        />
      </div>
    </div>
  );
};

export default RegisterContainer;
