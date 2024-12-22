import { Typography } from '@mui/material';
import { redirect } from '@xfi/helpers';
import Link from 'next/link';
import { memo, ReactNode, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { ConnectionType, useWalletConnection } from '@/hocs';
import { useAppSelector } from '@/hooks';
import { Icon, ThemeToggle } from '@/lib/xfi.lib/components/atoms';
import { useIntlHelpers } from '@/lib/xfi.lib/i18n';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { LogoMiniIcon } from '@/public/icons';
import { IS_PRODUCTION, PAGES } from '@/shared/constants';
import { WalletType } from '@/shared/types';
import { walletTypeSelector } from '@/store/wallet';

import { LogoutButton } from '@/components/atoms';

import WalletAddress from '../../WalletAddress';
import { StyledActionsBlock, StyledHeader } from './styles';

type Props = {
  /** @type {FormattedMessageId | ReactNode} */
  title?: string | ReactNode;
};

const Header = ({ title = <></> }: Props) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('lg'));
  const { isFormattedMessageId } = useIntlHelpers();
  const walletType = useAppSelector(walletTypeSelector);
  const [isBlur, setIsBlur] = useState(true);

  const { disconnect, connectionType } = useWalletConnection();
  const isExtensionConnection = connectionType === ConnectionType.EXTENSION;

  const handleLogoutClick = () => {
    redirect(PAGES.home).then(() => disconnect());
  };

  const isShowThemeToggle = isMobile;

  const walletAddressProps = {
    onModalStateChange: (isOpen: boolean) => setIsBlur(!isOpen),
    withXdsName: !IS_PRODUCTION,
    isHiddenLabel: true,
    isCompactView: isMobile,
    className: 'walletAddress',
  };

  return (
    <StyledHeader $isBlur={isBlur}>
      {isMobile ? (
        <>
          <div>
            <Link href={walletType === WalletType.NEW ? PAGES.cosmosWallet : PAGES.oldBalance}>
              <Icon src={LogoMiniIcon} viewBox={'0 0 48 48'} className="logoContainer" />
            </Link>
          </div>

          {walletType === WalletType.NEW && <WalletAddress {...walletAddressProps} />}
        </>
      ) : (
        <Typography className="title" variant="body1" color="neutrals.secondaryText">
          {isFormattedMessageId(title) ? <FormattedMessage id={title} /> : title}
        </Typography>
      )}

      <StyledActionsBlock>
        {isShowThemeToggle && <ThemeToggle className={'toggle'} />}
        {walletType === WalletType.NEW && !isMobile && <WalletAddress {...walletAddressProps} />}
        <LogoutButton isExtensionConnection={isExtensionConnection} handleLogoutClick={handleLogoutClick} />
      </StyledActionsBlock>
    </StyledHeader>
  );
};

export default memo(Header);
