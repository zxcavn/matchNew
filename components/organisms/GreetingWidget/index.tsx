import { Typography } from '@mui/material';
import { redirect } from '@xfi/helpers';
import { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import { pushNotification } from '@/helpers';
import { useAuth } from '@/hooks';
import { Button, Icon } from '@/lib/xfi.lib/components/atoms';
import { KeplrIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { PAGES } from '@/shared/constants';

import { CreateWalletLink } from '@/components/molecules';

import { StyledButtonsContainer, StyledContainer } from './styles';

const GreetingWidget = () => {
  const { authorizeByExtension, isLoading } = useAuth();
  const isTablet = useMediaQuery(theme => theme.breakpoints.down('lg'));

  const onClickConnect = useCallback(async () => {
    authorizeByExtension({
      onSuccess: () => redirect(PAGES.cosmosWallet),
      onError: error => pushNotification(error),
    });
  }, [authorizeByExtension]);

  return (
    <StyledContainer>
      <Typography color="background.light" className="heading" variant="h1">
        <FormattedMessage id="GREETING.HEADING" />
      </Typography>
      <Typography className="slogan" variant="buttonText1" color={'neutrals.secondaryText'}>
        <FormattedMessage id="GREETING.SLOGAN" />
      </Typography>
      <StyledButtonsContainer>
        <Button
          isDisabled={isLoading.extension}
          onClick={() => redirect(PAGES.signIn.pathname)}
          className="button"
          isFullWidth={isTablet}
          size="large"
        >
          <FormattedMessage id="WALLET.SIGN_IN_BY_SEED" />
        </Button>
        <Button
          className="keplrButton"
          onClick={onClickConnect}
          isLoading={isLoading.extension}
          isFullWidth={isTablet}
          size="large"
          variant="secondary"
        >
          <FormattedMessage id="WALLET.CONNECT_WITH_KEPLR" />
          <Icon src={KeplrIcon} viewBox="0 0 24 24" />
        </Button>
      </StyledButtonsContainer>
      <CreateWalletLink mt="3rem" />
    </StyledContainer>
  );
};

export default GreetingWidget;
