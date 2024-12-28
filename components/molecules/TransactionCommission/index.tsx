import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Divider, Icon } from '@/lib/xfi.lib/components/atoms';
import { NotificationsWarningIcon } from '@/lib/xfi.lib/icons';

import { ErrorMessage, TransactionCommissionContainer } from './styles';

type Props = {
  formattedTitle: Parameters<typeof FormattedMessage>[0];
  commission?: {
    amount: string;
    denom: string;
  } | null;
  /** @type {FormattedMessageId | string} */
  errorMessage?: string;
};

const TransactionCommission = ({ formattedTitle, commission, errorMessage }: Props) => {
  return (
    <TransactionCommissionContainer>
      <Typography variant="h4" className={'commissionTitle'}>
        <FormattedMessage {...formattedTitle} />
      </Typography>
      <Stack direction="row" alignItems="center" gap="0.625rem">
        <Typography color="background.light" variant="body1">
          <FormattedMessage id="WALLET.COMMISSION_FOR_TRANSACTION" />
        </Typography>
        <Typography color="background.light" variant="body1">
          {commission ? (
            <>
              ≈ {commission.amount}&nbsp;{commission.denom.toUpperCase()}
            </>
          ) : (
            '--'
          )}
        </Typography>
      </Stack>
      {errorMessage && (
        <>
          <Divider />
          <ErrorMessage>
            <Icon src={NotificationsWarningIcon} sx={{ fontSize: '1.5rem', flexShrink: 0 }} />
            <Typography component="span" variant="body2" color="background.light">
              <FormattedMessage id={errorMessage} />
            </Typography>
          </ErrorMessage>
        </>
      )}
    </TransactionCommissionContainer>
  );
};

export default TransactionCommission;
