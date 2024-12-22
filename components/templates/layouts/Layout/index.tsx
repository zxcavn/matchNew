import { Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { HTMLAttributes, PropsWithChildren, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAppSelector } from '@/hooks';
import { Icon } from '@/lib/xfi.lib/components/atoms';
import { Sidebar } from '@/lib/xfi.lib/components/organisms';
import { useIntlHelpers } from '@/lib/xfi.lib/i18n';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { LogoIcon } from '@/public/icons';
import { WalletType } from '@/shared/types';
import { walletTypeSelector } from '@/store/wallet';

import { AppFooter, Header } from '@/components/organisms';

import { SIDEBAR_BOTTOM_CONFIG, SIDEBAR_CONFIG_NEW_BALANCE, SIDEBAR_CONFIG_OLD_BALANCE } from './sidebarConfig';
import { StyledLayoutWrapper } from './styles';

type Props = PropsWithChildren<{
  /** @type {FormattedMessageId | string} */
  title?: string;
}> &
  HTMLAttributes<HTMLDivElement>;

const Layout = ({ title, children, className }: Props) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme => theme.breakpoints.down('lg'));
  const { isFormattedMessageId } = useIntlHelpers();
  const walletType = useAppSelector(walletTypeSelector);

  const isNewWallet = walletType === WalletType.NEW;

  const { sidebarConfig, bottomConfig } = useMemo(
    () => ({
      sidebarConfig: isNewWallet ? SIDEBAR_CONFIG_NEW_BALANCE(isTablet) : SIDEBAR_CONFIG_OLD_BALANCE(isTablet),
      bottomConfig: SIDEBAR_BOTTOM_CONFIG(isTablet),
    }),
    [isTablet, isNewWallet]
  );

  const sidebarFirstItemHref = sidebarConfig[0]?.items[0]?.href || '';

  return (
    <StyledLayoutWrapper className={className}>
      <Sidebar
        className="layoutSidebar"
        logoSlot={
          <Link href={sidebarFirstItemHref}>
            <Icon viewBox="0 0 157 44" src={LogoIcon} sx={{ height: 'auto', width: '7rem' }} />
          </Link>
        }
        config={sidebarConfig}
        bottomConfig={bottomConfig}
        isShowThemeToggle
      />
      <Stack className="contentContainer">
        <Stack className="mainBlock">
          <Stack minHeight="100vh" gap={{ xs: '1.5rem', md: '2rem' }}>
            <Header title={title} />
            {isMobile && (
              <Typography className="title" variant="body1" color="neutrals.secondaryText">
                {isFormattedMessageId(title) ? <FormattedMessage id={title} /> : title}
              </Typography>
            )}
            <div className="children">{children}</div>
          </Stack>
          <AppFooter className="layoutFooter" />
        </Stack>
      </Stack>
    </StyledLayoutWrapper>
  );
};

export default Layout;
