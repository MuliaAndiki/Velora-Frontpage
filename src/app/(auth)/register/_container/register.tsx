'use client';

import useRegisters from '@/hooks/mutation/auth/useRegister';
import { FormRegisterType } from '@/types/form/auth.form';
import { useAlert } from '@/hooks/useAlert';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import RegisterForm from '@/core/section/auth/register/hero-section';
import Box from '@/components/ui/box';
import Container from '@/components/ui/container';

const RegisterContainer = () => {
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
    <Container className="flex min-h-svh items-center justify-center p-6 md:p-10">
      <Box className="w-full max-w-sm">
        <RegisterForm
          formRegister={formRegister}
          setFormRegister={setFormRegister}
          onRegister={handleRegister}
          isPending={register.isPending}
        />
      </Box>
    </Container>
  );
};

export default RegisterContainer;
