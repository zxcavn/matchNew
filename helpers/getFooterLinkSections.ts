import {
  CROSS_FI_FOUNDATION_URL,
  CROSS_FINANCE_URL,
  GET_MPX_URL,
  XFI_BRIDGE_URL,
  XFI_SCAN_URL,
} from '@/shared/constants/variables';
import { LinkSection } from '../components/organisms';

import addLocale from './addLocale';

export const getFooterLinkSections = (locale: string): LinkSection[] => [
  {
    title: 'SUMMARY.ECOSYSTEM',
    links: [
      {
        title: 'SUMMARY.CROSS_FINANCE',
        href: addLocale(CROSS_FINANCE_URL, locale),
        target: '_blank',
      },

      {
        title: 'SUMMARY.CROSS_FI_FOUNDATION',
        href: addLocale(CROSS_FI_FOUNDATION_URL, locale),
        target: '_blank',
      },
      {
        title: 'SUMMARY.XFI_SCAN',
        href: addLocale(XFI_SCAN_URL, locale),
        target: '_blank',
      },
      {
        title: 'SUMMARY.XFI_BRIDGE',
        href: addLocale(XFI_BRIDGE_URL, locale),
        target: '_blank',
      },
      {
        title: 'RESOURCES.GET_MPX.TITLE',
        href: addLocale(GET_MPX_URL, locale),
        target: '_blank',
      },
    ],
  },
];
