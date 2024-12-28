import type { ReactNode } from 'react';

export type SidebarState = {
  isOpen: boolean;
  accordionState: Record<string, boolean>;
};

export type SidebarItem = {
  title: string;
  tooltipTitle?: string;
  href: string;
  icon: ReactNode;
  selectedIcon: ReactNode;
  extra?: ReactNode;
};

export type SidebarCategory = {
  category?: string;
  categoryTitle?: string;
  items: SidebarItem[];
  isBottomItems?: boolean;
};

export type NavItem = SidebarItem | ReactNode;

export type RenderNavItem = (sidebarItems: NavItem) => ReactNode;

export const isSidebarItem = (item: unknown): item is SidebarItem => {
  return (
    typeof item === 'object' &&
    item !== null &&
    'title' in item &&
    'href' in item &&
    'icon' in item &&
    'selectedIcon' in item
  );
};

export type Props = {
  logoSlot: ReactNode;
  config: Array<SidebarCategory>;
  bottomConfig?: Array<Omit<SidebarCategory, 'categoryTitle'>>;
  isSelected?: (item: SidebarItem) => boolean;
  className?: string;
  extraSlot?: ReactNode;
  isShowThemeToggle?: boolean;
};

export type InternalProps = Omit<Props, 'isSelected'> & {
  isSelected: (item: SidebarItem) => boolean;
};
