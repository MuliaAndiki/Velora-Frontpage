import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

import Box from '@/components/ui/box';
import View from '@/components/ui/view';
const LandingHeroSection = () => {
  return (
    <View className="relative pt-32 pb-20 px-6 overflow-hidden">
      <Box className="max-w-7xl mx-auto relative z-10">
        <Box className="text-center max-w-4xl mx-auto">
          <Box className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-slate-700 rounded-full mb-8">
            <Sparkles className="text-orange-400" size={16} />
            <span className="text-slate-300 text-sm">Trusted by 100,000+ users worldwide</span>
          </Box>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Your Money,</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
              Beautifully Managed
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Take control of your finances with Velora. Smart budgeting, powerful analytics, and
            personalized insights all in one beautiful app.
          </p>

          <Box className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/login">
              <button className="group px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all flex items-center gap-2">
                <span>Start Free Trial</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </Link>

            <button className="px-8 py-4 bg-slate-800 border border-slate-700 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all">
              Watch Demo
            </button>
          </Box>

          {/* Stats */}
          <Box className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
            <Box>
              <Box className="text-4xl font-bold text-white mb-2">100K+</Box>
              <Box className="text-slate-400 text-sm">Active Users</Box>
            </Box>
            <Box>
              <Box className="text-4xl font-bold text-white mb-2">$10M+</Box>
              <Box className="text-slate-400 text-sm">Money Managed</Box>
            </Box>
            <Box>
              <Box className="text-4xl font-bold text-white mb-2">4.9/5</Box>
              <Box className="text-slate-400 text-sm">User Rating</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </View>
  );
};

export default LandingHeroSection;
