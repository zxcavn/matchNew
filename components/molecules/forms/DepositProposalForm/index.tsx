import { MxNumberFormatter } from '@xfi/formatters';
import { ReactNode } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useAppValidationRules } from '@/hooks';
import { Button, Icon, Input } from '@/lib/xfi.lib/components/atoms';
import { FormBlock, FormBlockInputsData, FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { MpxIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { type Coin, CosmosCurrency } from '@/shared/types';

import { CoinSelect } from '@/components/atoms';

import { StyledButtonsContainer, StyledInputRow } from './styles';

const INITIAL_FORM_VALUES: DepositProposalFormValues = {
  gasCurrency: CosmosCurrency.MPX,
  initialDeposit: '',
};

export type DepositProposalFormValues = {
  gasCurrency: CosmosCurrency;
  initialDeposit: string;
};

type Props = {
  availableBalance: string;
  fee?: Coin | null;
  feeError?: string;
  isLoading: boolean;
  isDisabled: boolean;
  extraSlot?: ReactNode;
  onChange: (values: DepositProposalFormValues) => void;
  onSubmit: (values: DepositProposalFormValues) => void;
  onCancel: () => void;
};

const DepositProposalForm = ({
  availableBalance,
  fee,
  feeError,
  isLoading,
  isDisabled,
  onChange,
  onSubmit,
  onCancel,
  extraSlot,
}: Props) => {
  const { formatMessage } = useIntl();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const validationRules = useAppValidationRules();

  return (
    <FormBlock<DepositProposalFormValues>
      id="deposit-proposal-form"
      onSubmit={onSubmit}
      observerHandler={onChange}
      initialValues={INITIAL_FORM_VALUES}
      validationRules={{
        initialDeposit: validationRules.validNumber,
      }}
      inputsData={[
        {
          inputName: 'initialDeposit',
          type: FormBlockInputTypesEnum.number,

          inputProps: {
            label: {
              type: 'intl',
              id: 'PROPOSALS.DEPOSIT_MPX',
            },
            suffix: (
              <Icon src={MpxIcon} sx={{ fontSize: '2rem', margin: '-0.5rem', cursor: 'text' }} viewBox="0 0 32 32" />
            ),
            placeholder: {
              type: 'text',
              text: '0',
            },
            caption: {
              type: 'text',
              text: `${formatMessage({ id: 'SUMMARY.BALANCE' })} ${availableBalance} ${CURRENCIES.mpx.text}`,
            },
          },
        },
        {
          type: FormBlockInputTypesEnum.component,
          inputProps: {
            render: ({ getField, handleChange }) => {
              const { value } = getField('gasCurrency');

              return (
                <StyledInputRow>
                  <Input
                    isError={Boolean(feeError)}
                    caption={feeError ? { type: 'intl', id: feeError } : undefined}
                    value={
                      fee?.amount ? `${MxNumberFormatter.formatUnitsToDisplay(fee?.amount)} ${value.toUpperCase()}` : ''
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
                  <CoinSelect
                    name="gasCurrency"
                    value={value as CosmosCurrency}
                    onChange={handleChange}
                    options={[CosmosCurrency.XFI, CosmosCurrency.MPX]}
                    label={{ type: 'intl', id: 'SUMMARY.CURRENCY' }}
                  />
                </StyledInputRow>
              );
            },
          },
        },
        ...(extraSlot
          ? ([
              {
                type: FormBlockInputTypesEnum.jsx,
                inputProps: {
                  component: extraSlot,
                },
              },
            ] as FormBlockInputsData<DepositProposalFormValues>)
          : ([] as FormBlockInputsData<DepositProposalFormValues>)),
        {
          type: FormBlockInputTypesEnum.component,
          inputProps: {
            render: ({ isDisabled: isDisabledSubmit }) => (
              <StyledButtonsContainer>
                <Button isFullWidth={isMobile} className="button" variant="secondary" size="large" onClick={onCancel}>
                  <FormattedMessage id="SUMMARY.CANCEL" />
                </Button>
                <Button
                  type="submit"
                  size="large"
                  className="button"
                  isFullWidth={isMobile}
                  isLoading={isLoading}
                  isDisabled={isDisabled || isDisabledSubmit}
                >
                  <FormattedMessage id="SUMMARY.CONFIRM" />
                </Button>
              </StyledButtonsContainer>
            ),
          },
        },
      ]}
    />
  );
};

export default DepositProposalForm;
