import { appConfig } from '@/configs/app.config';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function AppFooter() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-200 py-10 mt-16">
      <div className="container mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <Image src={appConfig.logo} alt="Velora Logo" width={48} height={48} />
          <div>
            <span className="text-2xl font-bold text-orange-500">Velora</span>
            <p className="text-slate-400 text-sm mt-1">Beautifully Manage Your Money</p>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="font-semibold text-lg mb-1">Follow us</p>
          <div className="flex items-center gap-3">
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
          </div>
        </div>
      </div>
      <div className="text-center text-slate-500 text-xs mt-8">
        &copy; {new Date().getFullYear()} Velora. All rights reserved.
      </div>
    </footer>
  );
}
