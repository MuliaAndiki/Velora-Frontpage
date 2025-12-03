import {
  CircleDot,
  ClipboardMinus,
  CreditCard,
  DollarSign,
  Goal,
  Home,
  Lightbulb,
  Rocket,
  Settings,
  StickyNote,
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

export const HelpCenterIcons = {
  Rocket,
  Lightbulb,
  StickyNote,
} as const;
export type HelpIconsKey = keyof typeof HelpCenterIcons;
