import {
  CircleDot,
  ClipboardMinus,
  CreditCard,
  DollarSign,
  Goal,
  Home,
  Settings,
} from 'lucide-react';

export const SidebarIcons = {
  Home,
  CircleDot,
  CreditCard,
  DollarSign,
  Goal,
  ClipboardMinus,
  Settings,
} as const;
export type SidebarIconKey = keyof typeof SidebarIcons;
