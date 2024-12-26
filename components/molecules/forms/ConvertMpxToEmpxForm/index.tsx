import { Stack, Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { FormattedMessage, useIntl } from 'react-intl';

import { useAppValidationRules } from '@/hooks';
import { Block, Button, Divider, Icon, Input } from '@/lib/xfi.lib/components/atoms';
import { FormBlock } from '@/lib/xfi.lib/components/molecules';
import { FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules/FormBlock/types';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { EMpxIcon, MpxIcon, NotificationsWarningIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { OutlinedWalletIcon } from '@/public/icons';
import { Coin, CosmosCurrency, TOKENS } from '@/shared/types';


import { StyledButtonsContainer, StyledFormContainer, StyledInputRow } from './styles';

export type ConvertMpxToEmpxFormValues = {
  gasCurrency: CosmosCurrency;
  sendAmount: string;
  getAmount: string;
};

type Props = {
  isLoading?: boolean;
  errorMessage?: string;
  onSubmit: (values: ConvertMpxToEmpxFormValues) => void;
  onCancel: () => void;
  mpxChequeBalance: string;
  availableBalance: string;
  fee?: Coin | null;
  isLoadingFee: boolean;
  values: ConvertMpxToEmpxFormValues;
  onChange: (values: ConvertMpxToEmpxFormValues) => void;
  error?: string;
  feeError?: string;
  initialValues: ConvertMpxToEmpxFormValues;
};

const ConvertMpxToEmpxForm = ({
  onSubmit,
  onCancel,
  mpxChequeBalance,
  availableBalance,
  fee,
  isLoadingFee,
  values,
  onChange,
  error,
  feeError,
  initialValues,
}: Props) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const { formatMessage } = useIntl();
  const { validNumber } = useAppValidationRules();

  return (
    <StyledFormContainer>
      <FormBlock<ConvertMpxToEmpxFormValues>
        id="convert-form"
        onSubmit={onSubmit}
        observerHandler={onChange}
        errors={{
          sendAmount: error && formatMessage({ id: error }),
        }}
        validationRules={{
          sendAmount: validNumber,
        }}
        initialValues={initialValues}
        inputsData={[
          {
            inputName: 'sendAmount',
            type: FormBlockInputTypesEnum.number,

            inputProps: {
              label: {
                type: 'intl',
                id: 'WALLET.YOU_SEND_CURRENCY',
                values: { currency: CURRENCIES.mpx.text },
              },
              suffix: (
                <Icon src={MpxIcon} sx={{ fontSize: '2rem', margin: '-0.5rem', cursor: 'text' }} viewBox="0 0 32 32" />
              ),
              placeholder: {
                type: 'text',
                text: '0',
              },
              defaultValue: initialValues.sendAmount || '',
            },
          },
          {
            type: FormBlockInputTypesEnum.jsx,
            inputProps: {
              component: (
                <Input
                  value={values?.getAmount}
                  placeholder={{
                    type: 'text',
                    text: '0',
                  }}
                  suffix={
                    <Icon
                      src={EMpxIcon}
                      sx={{ fontSize: '2rem', marginRight: '-0.5rem', cursor: 'text' }}
                      viewBox="0 0 32 32"
                    />
                  }
                  label={{
                    type: 'intl',
                    id: 'WALLET.YOU_GET_CURRENCY',
                    values: { currency: TOKENS.eMpx.text },
                  }}
                  caption={{
                    type: 'text',
                    text: `1 ${CURRENCIES.mpx.text} = 1 ${TOKENS.eMpx.text}`,
                  }}
                  isEditable={false}
                />
              ),
            },
          },
          {
            type: FormBlockInputTypesEnum.component,
            inputProps: {
              render: ({ getField, handleChange }) => {
                const { value: gasCurrency } = getField('gasCurrency');

                return (
                  <StyledInputRow>
                    <Input
                      isError={Boolean(feeError)}
                      caption={feeError ? { type: 'intl', id: feeError } : undefined}
                      value={
                        fee?.amount
                          ? `${MxNumberFormatter.formatUnitsToDisplay(fee?.amount)} ${gasCurrency.toUpperCase()}`
                          : ''
                      }
                      placeholder={{
                        type: 'text',
                        text: '0',
                      }}
                      label={{
                        type: 'intl',
                        id: 'SUMMARY.COMMISSION',
                      }}
                      isEditable={false}
                    />
                  </StyledInputRow>
                );
              },
            },
          },
          {
            type: FormBlockInputTypesEnum.jsx,
            inputProps: {
              component: (
                <Block
                  variant="transparent"
                  sx={{
                    marginTop: '1rem',
                    padding: '1rem',
                  }}
                >
                  <Stack direction={'row'} gap={'0.5rem'}>
                    <Icon src={OutlinedWalletIcon} sx={{ fontSize: '1rem' }} viewBox="0 0 16 16" />
                    <Stack gap={'0.5rem'}>
                      <Typography variant="body2" color="neutrals.secondaryText">
                        <FormattedMessage id={'WALLET.MPX_CHEQUE_BALANCE'} />
                      </Typography>
                      <Typography variant="subtitle1">{mpxChequeBalance}</Typography>
                    </Stack>
                  </Stack>
                  <Divider
                    sx={{
                      margin: '1rem 0',
                    }}
                  />
                  <Stack gap={'1rem'}>
                    <Stack direction={'row'} gap={'0.75rem'}>
                      <Icon
                        src={NotificationsWarningIcon}
                        sx={{ fontSize: '1.25rem', flexShrink: 0 }}
                        viewBox="0 0 20 20"
                      />
                      <Typography variant="body2" color="neutrals.secondaryText">
                        <FormattedMessage id={'WALLET.YOU_CAN_EXCHANGE_MPX'} />
                      </Typography>
                    </Stack>
                    <Stack direction={'row'} gap={'0.75rem'}>
                      <Icon
                        src={NotificationsWarningIcon}
                        sx={{ fontSize: '1.25rem', flexShrink: 0 }}
                        viewBox="0 0 20 20"
                      />
                      <Typography variant="body2" color="neutrals.secondaryText">
                        <FormattedMessage id={'WALLET.TO_RECEIVE_MPX_CHEQUE'} />
                      </Typography>
                    </Stack>
                  </Stack>
                </Block>
              ),
            },
          },
          {
            type: FormBlockInputTypesEnum.jsx,
            inputProps: {
              component: (
                <StyledButtonsContainer>
                  <Button isFullWidth={isMobile} className="button" variant="secondary" size="large" onClick={onCancel}>
                    <FormattedMessage id="SUMMARY.CANCEL" />
                  </Button>
                  <Button
                    isFullWidth={isMobile}
                    isDisabled={isLoadingFee || !availableBalance || !mpxChequeBalance || !fee?.amount}
                    isLoading={isLoadingFee}
                    type="submit"
                    className="button"
                    size="large"
                  >
                    <FormattedMessage id="SUMMARY.NEXT" />
                  </Button>
                </StyledButtonsContainer>
              ),
            },
          },
        ]}
      />
    </StyledFormContainer>
  );
};

export default ConvertMpxToEmpxForm;
