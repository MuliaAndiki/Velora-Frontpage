import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';

import Box from '@/components/ui/box';
import { appConfig } from '@/configs/app.config';

export interface AppFooterProps {
  t: any;
}
export default function AppFooter({ t }: AppFooterProps) {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-200 py-10 mt-16">
      <Box className="container mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <Box className="flex items-center gap-4">
          <Image src={appConfig.logo} alt="Velora Logo" width={48} height={48} />
          <Box>
            <span className="text-2xl font-bold text-orange-500">Velora</span>
            <p className="text-slate-400 text-sm mt-1">{t('fotter.title')}</p>
          </Box>
        </Box>
        <Box className="flex flex-col items-center md:items-end gap-2">
          <p className="font-semibold text-lg mb-1">{t('fotter.Follow us')}</p>
          <Box className="flex items-center gap-3">
            {Object.entries(appConfig.social_media).map(([key, value]) => (
              <Link href={value.url} key={key} target="_blank" rel="noopener noreferrer">
                <Icon
                  icon={value.icon}
                  width={28}
                  height={28}
                  className="hover:text-orange-500 transition"
                />
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
      <Box className="text-center text-slate-500 text-xs mt-8">
        &copy; {new Date().getFullYear()} {t('fotter.fotterTitle')}.
      </Box>
    </footer>
  );
}
