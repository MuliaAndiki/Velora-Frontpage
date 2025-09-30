'use client';

import { useLogin } from '@/hooks/mutation/auth/useLogin';
import { FormLoginType } from '@/types/form/auth.form';
import { useAlert } from '@/hooks/useAlert';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoginCard } from '@/core/section/auth/login/hero-section';
import { useIsMobile } from '@/hooks/use-mobile';

const LoginContainer = () => {
  const mobile = useIsMobile();
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
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>
      <div className="w-full max-w-sm">
        <LoginCard
          formLogin={formLogin}
          setFormLogin={setFormLogin}
          onLogin={handleLogin}
          isPending={login.isPending}
        />
      </div>
    </div>
  );
};

export default LoginContainer;
