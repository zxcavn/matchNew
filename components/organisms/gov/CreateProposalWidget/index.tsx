import { Stack, Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { redirectWithCompletion } from '@xfi/helpers';
import { useDebouncedCallback } from '@xfi/hooks';
import { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import urlJoin from 'url-join';

import { pushSuccessTxNotification } from '@/helpers';
import { useSubmitProposal, useWallet } from '@/hooks';
import { BackButton, Block, Modal } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { type TransactionResponse, LogEventType } from '@/lib/xfi.lib/helpers';
import { PAGES } from '@/shared/constants';
import { type ProposalMessageType, CosmosMessageType, ViewOnlyProposalMessageType } from '@/shared/types';

import { InfoText } from '@/components/atoms';
import {
  type CreateProposalFormValues,
  type CreateProposalOutputValues,
  type DepositProposalFormValues,
  CreateProposalForm,
  DepositProposalForm,
} from '@/components/molecules';

import GovParamsWidget from '../GovParamsWidget';
import { isValidValues } from './helpers';
import { StyledCreateProposalWidget, StyledInfoBlock } from './styles';

const CreateProposalWidget = () => {
  const {
    newWallet: { balance },
  } = useWallet();

  const availableBalance = useMemo(
    () =>
      MxNumberFormatter.formatUnitsToDisplay(balance.mpx, {
        maxFractionalLength: CURRENCIES.mpx.formatDecimals,
      }),
    [balance]
  );

  const [isDisabledProposalForm, setIsDisabledProposalForm] = useState(false);
  const [proposalData, setProposalData] = useState<CreateProposalOutputValues>();

  const [isOpen, setIsOpen] = useState(false);

  const { calculateFee, send, fee, setFeeData, isLoadingFee, isPendingTx, feeError, isLoadingTransaction } =
    useSubmitProposal();

  const debouncedCalculateFee = useDebouncedCallback(calculateFee);

  const isLoadingCreateProposal = isLoadingFee || isLoadingTransaction || isPendingTx;
  const isDisabledCreateProposal = isLoadingCreateProposal;

  const onChangeProposalForm = (
    values: CreateProposalFormValues & {
      type: Exclude<ProposalMessageType, ViewOnlyProposalMessageType>;
    }
  ) => {
    const isValid = isValidValues({ formValues: values });

    setIsDisabledProposalForm(!isValid);
  };

  const onSubmitProposalForm = (values: CreateProposalOutputValues) => {
    setProposalData(values);
    setIsOpen(true);
  };

  const onChangeCreateProposalForm = (values: DepositProposalFormValues) => {
    if (proposalData && values.initialDeposit) {
      debouncedCalculateFee({ ...proposalData, ...values });
    }
  };

  const onCancelCreateProposalForm = () => {
    setIsOpen(false);
    setFeeData({
      fee: null,
      isLoading: false,
    });
  };

  const onCreateProposal = (values: DepositProposalFormValues) => {
    if (proposalData) {
      send({ values: { ...proposalData, ...values } }, async (tx: TransactionResponse) => {
        const submitLog = tx.logs[0].events.find(({ type }) => type === LogEventType.SUBMIT_PROPOSAL);

        const proposalId =
          submitLog && submitLog.type === LogEventType.SUBMIT_PROPOSAL
            ? submitLog.attributes.find(({ key }) => key === 'proposal_id')?.value
            : null;

        await redirectWithCompletion(
          proposalId ? urlJoin(PAGES.proposals.pathname, proposalId) : PAGES.proposals.pathname
        );

        pushSuccessTxNotification(CosmosMessageType.SUBMIT_PROPOSAL);
      });
    }
  };

  return (
    <StyledCreateProposalWidget>
      <BackButton backText="PROPOSALS.BACK_TO_ALL_PROPOSALS" href={PAGES.proposals.pathname} />
      <Stack mt={{ xs: '1.5rem', md: '2rem' }} alignItems={{ xs: 'flex-start', md: 'center' }} gap={'2rem'}>
        <Typography variant="h4">
          <FormattedMessage id={'PROPOSALS.PROPOSAL_CREATION'} />
        </Typography>
        <Block className="formWrapper" variant="transparent">
          <CreateProposalForm
            isLoading={isPendingTx}
            isDisabled={isDisabledProposalForm}
            onChange={onChangeProposalForm}
            onSubmit={onSubmitProposalForm}
          />
        </Block>
        <Stack className="govParamsWrapper" alignItems={{ xs: 'flex-start', md: 'center' }}>
          <Typography mb={'1rem'} variant="subtitle1">
            <FormattedMessage id={'PROPOSALS.GOVERNANCE_PARAMETERS'} />
          </Typography>
          <GovParamsWidget />
        </Stack>
      </Stack>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={{ id: 'PROPOSALS.CREATE_PROPOSAL' }}>
        <DepositProposalForm
          availableBalance={availableBalance}
          fee={fee}
          feeError={feeError || undefined}
          isLoading={isLoadingCreateProposal}
          isDisabled={isDisabledCreateProposal}
          onChange={onChangeCreateProposalForm}
          onSubmit={onCreateProposal}
          onCancel={onCancelCreateProposalForm}
          extraSlot={
            <StyledInfoBlock
              style={{
                border: 'none',
                borderRadius: '1rem',
                padding: '1rem',
                background: 'neutrals.toast',
              }}
            >
              <Stack gap="1rem">
                <InfoText formattedText={{ id: 'PROPOSALS.DEPOSIT_REFUND.CONDITION_1' }} />
                <InfoText formattedText={{ id: 'PROPOSALS.DEPOSIT_REFUND.CONDITION_2' }} />
                <InfoText formattedText={{ id: 'PROPOSALS.DEPOSIT_REFUND.CONDITION_3' }} />
                <InfoText formattedText={{ id: 'PROPOSALS.DEPOSIT_REFUND.CONDITION_4' }} />
              </Stack>
            </StyledInfoBlock>
          }
        />
      </Modal>
    </StyledCreateProposalWidget>
  );
};

export default CreateProposalWidget;
