import { Typography } from '@mui/material';
import { trimStringAndInsertDots } from '@xfi/helpers';
import { FormattedMessage } from 'react-intl';

import { Input } from '@/lib/xfi.lib/components/atoms';
import { FormBlock } from '@/lib/xfi.lib/components/molecules';
import { FormBlockInputsData, FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules/FormBlock/types';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { Coin, CosmosCurrency } from '@/shared/types';

import TransactionCommission from '../../TransactionCommission';
import { GAS_CURRENCY_INPUT } from '../constants';
import FormButtons from '../FormButtons';
import { RewardFormContainer } from './styles';

export type RewardFormValues = {
  gasCurrency?: CosmosCurrency;
};

export type Props = {
  onSubmit: () => void;
  onCancel: () => void;
  onChange: (values: RewardFormValues) => void;
  walletAddress: string;
  commission?: Coin | null;
  isDisabled?: boolean;
  isLoading?: boolean;
  /** @type {FormattedMessageId} */
  error?: string;
};

const RewardForm = ({
  walletAddress,
  commission,
  isDisabled,
  isLoading,
  error,
  onSubmit,
  onCancel,
  onChange,
}: Props) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const formattedAddress = trimStringAndInsertDots({ value: walletAddress, charsBeforeDots: 28, charsAfterDots: 3 });

  return (
    <RewardFormContainer>
      <Typography color="neutrals.secondaryText" variant="h4">
        <FormattedMessage id="WALLET.REWARD_SEND_TO_ADDRESS" />:
      </Typography>
      <FormBlock<RewardFormValues>
        id="reward-form"
        observerHandler={onChange}
        initialValues={{
          gasCurrency: CosmosCurrency.XFI,
        }}
        inputsData={
          [
            {
              type: FormBlockInputTypesEnum.jsx,
              inputProps: {
                component: (
                  <Input
                    value={isMobile ? formattedAddress : walletAddress}
                    isDisabled
                    label={{ type: 'intl', id: 'SUMMARY.WALLET' }}
                  />
                ),
              },
            },
            GAS_CURRENCY_INPUT,
            {
              type: FormBlockInputTypesEnum.jsx,
              inputProps: {
                component: (
                  <TransactionCommission
                    errorMessage={error}
                    commission={commission}
                    formattedTitle={{
                      values: { operation: <FormattedMessage id="LIB.OPERATIONS.CLAIM" /> },
                      id: 'WALLET.OPERATION_DETAILS',
                    }}
                  />
                ),
              },
            },
            {
              type: FormBlockInputTypesEnum.jsx,
              inputProps: {
                component: (
                  <FormButtons isDisabled={isDisabled} isLoading={isLoading} onSubmit={onSubmit} onCancel={onCancel} />
                ),
              },
            },
          ].filter(Boolean) as FormBlockInputsData<RewardFormValues>
        }
      />
    </RewardFormContainer>
  );
};

export default RewardForm;
