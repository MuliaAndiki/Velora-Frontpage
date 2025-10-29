'use client';

import { useLogin } from '@/hooks/mutation/auth/useLogin';
import { FormLoginType } from '@/types/form/auth.form';
import { useAlert } from '@/hooks/useAlert';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoginForm from '@/core/section/auth/login/hero-section';

import Container from '@/components/ui/container';
import Box from '@/components/ui/box';

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
        <LoginForm
          formLogin={formLogin}
          setFormLogin={setFormLogin}
          onLogin={handleLogin}
          isPending={login.isPending}
        />
      </Box>
    </Container>
  );
};

export default LoginContainer;
