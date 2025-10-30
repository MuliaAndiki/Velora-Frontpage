'use client';

import { useRegister } from '@/hooks/mutation/auth/mutation';
import { FormRegisterType } from '@/types/form/auth.form';
import { useAlert } from '@/hooks/useAlert';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import RegisterForm from '@/core/section/auth/register/hero-section';
import Box from '@/components/ui/box';
import Container from '@/components/ui/container';
import Link from 'next/link';
import { GalleryVerticalEnd } from 'lucide-react';

const RegisterContainer = () => {
  const alert = useAlert();
  const router = useRouter();
  const [formRegister, setFormRegister] = useState<FormRegisterType>({
    email: '',
    password: '',
    fullName: '',
  });

  const register = useRegister();

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
      <Box className="flex w-full max-w-sm flex-col gap-6">
        <Link href="#" className="flex items-center gap-2 self-center font-medium">
          <Box className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </Box>
          Velora Inc.
        </Link>
        <Box className="w-full max-w-sm">
          <RegisterForm
            formRegister={formRegister}
            setFormRegister={setFormRegister}
            onRegister={handleRegister}
            isPending={register.isPending}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterContainer;
