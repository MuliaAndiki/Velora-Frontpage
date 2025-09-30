import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormLoginType } from '@/types/form/auth.form';
import React from 'react';
import Link from 'next/link';

interface LoginCardProps {
  formLogin: FormLoginType;
  setFormLogin: React.Dispatch<React.SetStateAction<FormLoginType>>;
  onLogin: () => void;
  isPending: boolean;
}

export function LoginCard({ formLogin, setFormLogin, onLogin, isPending }: LoginCardProps) {
  return (
    <section className="relative pt-32 pb-20 px-6 min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 rounded-full">
            <Sparkles className="text-orange-400" size={16} />
            <span className="text-slate-300 text-sm">Welcome back to Velora</span>
          </div>
        </div>
        <form
          className="bg-slate-900 bg-opacity-80 rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-slate-800"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            onLogin();
          }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">Sign in to your account</h2>
          <p className="text-slate-400 mb-4">Enter your credentials to continue</p>
          <Input
            type="email"
            placeholder="Email"
            value={formLogin.email}
            onChange={(e) =>
              setFormLogin((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            className="bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500"
            autoComplete="email"
          />
          <Input
            type="password"
            placeholder="Password"
            value={formLogin.password}
            onChange={(e) =>
              setFormLogin((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            className="bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500"
            autoComplete="current-password"
          />
          <Link href="/dashboard" className="w-full">
            <Button
              type="submit"
              disabled={isPending}
              className="group px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all flex items-center gap-2 justify-center w-full"
            >
              <span>{isPending ? 'Logging in...' : 'Login'}</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </Link>
        </form>
        <div className="text-center mt-6">
          <span className="text-slate-400">Belum punya akun? </span>
          <Link href="/register" className="text-orange-500 hover:underline font-semibold">
            Daftar
          </Link>
        </div>
      </div>
    </section>
  );
}
