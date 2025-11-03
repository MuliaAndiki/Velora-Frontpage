import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

import Box from '@/components/ui/box';
import View from '@/components/ui/view';
import { useTranslate } from '@/hooks/useTranslate';

const LandingHeroSection = () => {
  const { t } = useTranslate();
  return (
    <View className="relative pt-32 pb-20 px-6 overflow-hidden">
      <Box className="max-w-7xl mx-auto relative z-10">
        <Box className="text-center max-w-4xl mx-auto">
          <Box className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 rounded-full mb-8">
            <Sparkles className="text-orange-400" size={16} />
            <span className="text-slate-300 text-sm">{t('public.headerTitle')}</span>
          </Box>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">{t('public.title')}</span>
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-red-500 to-pink-500">
              {t('public.subtitle')}
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">{t('public.deskripsi')}</p>

          <Box className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/login">
              <button className="group px-8 py-4 bg-linear-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all flex items-center gap-2">
                <span>{t('public.start')}</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </Link>

            <button className="px-8 py-4 bg-slate-800 border border-slate-700 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all">
              {t('public.watch')}
            </button>
          </Box>

          <Box className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
            <Box>
              <Box className="text-4xl font-bold text-white mb-2">100K+</Box>
              <Box className="text-slate-400 text-sm">{t('public.active users')}</Box>
            </Box>
            <Box>
              <Box className="text-4xl font-bold text-white mb-2">$10M+</Box>
              <Box className="text-slate-400 text-sm">{t('public.money managed')}</Box>
            </Box>
            <Box>
              <Box className="text-4xl font-bold text-white mb-2">4.9/5</Box>
              <Box className="text-slate-400 text-sm">{t('public.user rating')}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </View>
  );
};

export default LandingHeroSection;
