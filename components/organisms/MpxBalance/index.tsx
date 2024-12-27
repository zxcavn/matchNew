import { Stack, Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { type ReactNode, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAddressInfo, useWallet } from '@/hooks';
import { Icon } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { MpxIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { CosmosCurrency } from '@/shared/types';

import { FrozenBalance } from '@/components/molecules';

import { StyledBlock, StyledMpxBalanceContainer } from './styles';

type Props = {
  actionSlot: ReactNode;
};

const MpxBalance = ({ actionSlot }: Props) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const {
    newWallet: { address, balance },
    updateBalance,
  } = useWallet();

  const formattedAmount = MxNumberFormatter.formatUnitsToDisplay(balance.mpx, {
    maxFractionalLength: CURRENCIES.mpx.formatDecimals,
  });

  const { unbondingDelegations, totalDelegatedBalance } = useAddressInfo(address);

  const hasFrozenBalance = Boolean(unbondingDelegations.length);

  useEffect(() => {
    updateBalance();
  }, []);

  return (
    <StyledBlock
      title={
        <Typography ml={{ md: '1.5rem', xs: '1rem' }} color="background.light" variant="h4">
          <FormattedMessage id="SUMMARY.AVAILABLE_BALANCE" />
        </Typography>
      }
    >
      <StyledMpxBalanceContainer>
        <Stack direction={'row'} alignItems="center" gap={'0.5rem'} width={'fit-content'} className={'balanceWrapper'}>
          <Icon sx={{ fontSize: '1.5rem' }} src={MpxIcon} viewBox="0 0 32 32" />
          <Typography variant={'subtitle2'} color={'background.light'}>
            {formattedAmount} {CosmosCurrency.MPX.toUpperCase()}
          </Typography>
        </Stack>
      </StyledMpxBalanceContainer>
    </StyledBlock>
  );
};

export default MpxBalance;
