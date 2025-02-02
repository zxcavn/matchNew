import { DiscordIcon, FacebookIcon, GithubIcon, LinkedInIcon, MediumIcon, TelegramIcon, XIcon } from '@/public/icons';
import type { LinkContent } from './IconLinks';

export const FOOTER_SOCIAL_LINKS: Array<LinkContent> = [
  {
    href: 'https://t.me/crossfichain',
    Icon: TelegramIcon,
  },
  {
    href: 'https://medium.com/@crossfichain',
    Icon: MediumIcon,
  },
  {
    href: 'https://x.com/crossfichain',
    Icon: XIcon,
  },
  {
    href: 'https://facebook.com/crossfiofficial',
    Icon: FacebookIcon,
  },
  {
    href: 'https://discord.gg/crossfi',
    Icon: DiscordIcon,
  },
  {
    href: 'https://www.linkedin.com/company/crossfichain/about/',
    Icon: LinkedInIcon,
  },
  {
    href: 'https://github.com/crossfichain',
    Icon: GithubIcon,
  },
];

export const LEGAL_INFORMATION = {
  license: `Ref. No.: OOZU/10147/2023/Vrt/6\nFile No.: OOZU/10147/2023/Vrt\nThe competent authority in accordance with § 71 Subsection 2 of the Trade Licensing Act: Municipality of Prague 3\nGiven in Prague on the 1st day of November 2023`,
  legalAddress: 'Vlkova 532/8, Žižkov, 130 00 Prague 3',
  companyName: 'CROSSFI',
} as const;
