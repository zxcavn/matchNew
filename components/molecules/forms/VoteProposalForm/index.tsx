import { Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { VoteOption } from 'cosmjs-types/cosmos/gov/v1beta1/gov';
import { FormattedMessage } from 'react-intl';

import { Button, Input } from '@/lib/xfi.lib/components/atoms';
import { FormBlock, FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { type Coin, CosmosCurrency } from '@/shared/types';



import { RADIO_GROUP_OPTIONS } from './constants';
import { StyledButtonsContainer, StyledInputRow } from './styles';

const INITIAL_FORM_VALUES: VoteProposalFormValues = {
  gasCurrency: CosmosCurrency.MPX,
  option: String(VoteOption.VOTE_OPTION_YES),
};

export type VoteProposalFormValues = {
  gasCurrency: CosmosCurrency;
  option: string;
};

type Props = {
  fee?: Coin | null;
  feeError?: string;
  isLoading: boolean;
  isDisabled: boolean;
  onChange: (values: VoteProposalFormValues) => void;
  onSubmit: (values: VoteProposalFormValues) => void;
  onCancel: () => void;
};

const VoteProposalForm = ({ fee, feeError, isLoading, isDisabled, onChange, onSubmit, onCancel }: Props) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <FormBlock<VoteProposalFormValues>
      id="vote-proposal-form"
      onSubmit={onSubmit}
      observerHandler={onChange}
      initialValues={INITIAL_FORM_VALUES}
      inputsData={[
        {
          type: FormBlockInputTypesEnum.jsx,
          inputProps: {
            component: (
              <Typography variant="body1" color="neutrals.secondaryText">
                <FormattedMessage id={'PROPOSALS.YOUR_VOTE_IS_IMPORTANT'} />
              </Typography>
            ),
          },
        },
        {
          inputName: 'option',
          type: FormBlockInputTypesEnum.radioGroup,
          inputProps: {
            options: RADIO_GROUP_OPTIONS,
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
                </StyledInputRow>
              );
            },
          },
        },
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

export default VoteProposalForm;
