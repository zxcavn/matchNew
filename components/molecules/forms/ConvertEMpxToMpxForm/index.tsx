import { Stack, Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';

import { useAppValidationRules } from '@/hooks';
import { Button, Divider, Icon, Input } from '@/lib/xfi.lib/components/atoms';
import { FormBlock } from '@/lib/xfi.lib/components/molecules';
import { FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules/FormBlock/types';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { EMpxIcon, MpxIcon, NotificationsWarningIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { Coin, TOKENS } from '@/shared/types';

import { StyledButtonsContainer, StyledFormContainer } from './styles';

export type ConvertEMpxToMpxFormValues = {
  sendAmount: string;
  getAmount: string;
};

type Props = {
  isLoading?: boolean;
  errorMessage?: string;
  onSubmit: (values: ConvertEMpxToMpxFormValues) => void;
  onCancel: () => void;
  availableBalance: string;
  fee?: Coin | null;
  isLoadingFee: boolean;
  values: ConvertEMpxToMpxFormValues;
  onChange: (values: ConvertEMpxToMpxFormValues) => void;
  error?: string;
  feeError?: string;
  initialValues: ConvertEMpxToMpxFormValues;
};

const ConvertEMpxToMpxForm = ({
  onSubmit,
  onCancel,
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
      <FormBlock<ConvertEMpxToMpxFormValues>
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
                values: { currency: TOKENS.eMpx.text },
              },
              suffix: (
                <Icon src={EMpxIcon} sx={{ fontSize: '2rem', margin: '-0.5rem', cursor: 'text' }} viewBox="0 0 32 32" />
              ),
              caption: {
                type: 'text',
                text: `${formatMessage({ id: 'SUMMARY.BALANCE' })} ${availableBalance} ${TOKENS.eMpx.text}`,
              },
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
                      src={MpxIcon}
                      sx={{ fontSize: '2rem', marginRight: '-0.5rem', cursor: 'text' }}
                      viewBox="0 0 32 32"
                    />
                  }
                  label={{
                    type: 'intl',
                    id: 'WALLET.YOU_GET_CURRENCY',
                    values: { currency: CURRENCIES.mpx.text },
                  }}
                  caption={{
                    type: 'text',
                    text: `1 ${TOKENS.eMpx.text} = 1 ${CURRENCIES.mpx.text}`,
                  }}
                  isEditable={false}
                />
              ),
            },
          },
          {
            type: FormBlockInputTypesEnum.jsx,
            inputProps: {
              component: (
                <Input
                  isError={Boolean(feeError)}
                  caption={feeError ? { type: 'intl', id: feeError } : undefined}
                  value={fee?.amount ? `${fee?.amount} ${fee?.denom.toUpperCase()}` : ''}
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
              ),
            },
          },
          {
            type: FormBlockInputTypesEnum.jsx,
            inputProps: {
              component: (
                <Stack gap={'1rem'}>
                  <Divider />
                  <Stack direction={'row'} gap={'0.75rem'}>
                    <Icon
                      src={NotificationsWarningIcon}
                      sx={{ fontSize: '1.25rem', flexShrink: 0 }}
                      viewBox="0 0 20 20"
                    />
                    <Typography variant="body2" color="neutrals.secondaryText">
                      <FormattedMessage id={'WALLET.MPX_CHEQUE_WILL_BE_CREDITED'} />
                    </Typography>
                  </Stack>
                </Stack>
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
                    isDisabled={isLoadingFee || !availableBalance || !fee?.amount}
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

export default ConvertEMpxToMpxForm;
