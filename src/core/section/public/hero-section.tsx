import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

import View from '@/components/ui/view';
import { useTranslate } from '@/hooks/useTranslate';

const LandingHeroSection = () => {
  const { t } = useTranslate();
  return (
    <View className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 rounded-full mb-8">
            <Sparkles className="text-orange-400" size={16} />
            <span className="text-slate-300 text-sm">POPL B </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">{t('public.title')}</span>
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-red-500 to-pink-500">
              {t('public.subtitle')}
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">{t('public.deskripsi')}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/login">
              <button className="group px-8 py-4 bg-linear-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all flex items-center gap-2">
                <span>{t('public.start')}</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </Link>

            <button className="px-8 py-4 bg-slate-800 border border-slate-700 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all">
              {t('public.watch')}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-white mb-2">100K+</div>
              <div className="text-slate-400 text-sm">{t('public.active users')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">$10M+</div>
              <div className="text-slate-400 text-sm">{t('public.money managed')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">4.9/5</div>
              <div className="text-slate-400 text-sm">{t('public.user rating')}</div>
            </div>
          </div>
        </div>
      </div>
    </View>
  );
};

export default LandingHeroSection;
