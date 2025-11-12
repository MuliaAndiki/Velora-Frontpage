import { SidebarIconKey } from '@/configs/icons.config';

export interface SidebarContentType {
  title: string;
  url: string;
  icon: SidebarIconKey;
}

export interface MutationOpsiType {
  onAfterSucces?: () => void;
}
