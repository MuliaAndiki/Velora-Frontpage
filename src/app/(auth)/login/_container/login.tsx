'use client';
import { GalleryVerticalEnd } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Box from '@/components/ui/box';
import Container from '@/components/ui/container';
import LoginForm from '@/core/section/auth/login/hero-section';
import { useLogin } from '@/hooks/mutation/auth/mutation';
import { useAlert } from '@/hooks/useAlert';
import { FormLoginType } from '@/types/form/auth.form';

const LoginContainer = () => {
  const alert = useAlert();
  const router = useRouter();
  const [formLogin, setFormLogin] = useState<FormLoginType>({
    email: '',
    password: '',
  });

  const login = useLogin();

  const handleLogin = () => {
    if (!formLogin.email || !formLogin.password) {
      alert.toast({
        title: 'Warning',
        message: 'Please fill in all fields',
        icon: 'warning',
      });
      return;
    }

    login.mutate(formLogin, {
      onSuccess: () => {
        router.push('/dashboard');
      },
    });
  };

  return (
    <Container className="flex min-h-svh items-center justify-center p-6 md:p-10">
      <Box className="w-full max-w-sm">
        <Box className="flex w-full max-w-sm flex-col gap-6">
          <Link href="#" className="flex items-center gap-2 self-center font-medium">
            <Box className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </Box>
            Velora Inc.
          </Link>
          <LoginForm
            formLogin={formLogin}
            setFormLogin={setFormLogin}
            onLogin={handleLogin}
            isPending={login.isPending}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default LoginContainer;
