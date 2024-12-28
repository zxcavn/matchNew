import { Stack, Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { useDebouncedCallback } from '@xfi/hooks';
import { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAppDispatch, useAppSelector, useDepositProposal, useProposalDeposits, useWallet } from '@/hooks';
import { Icon, Modal } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { ArrowRightIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { getProposalDetailsAsync, govSelector, Proposal } from '@/store/gov';

import { InfoText } from '@/components/atoms';
import { type DepositProposalFormValues, DepositProposalForm } from '@/components/molecules';

import Content from './Content';
import { StyledProposalDepositWidget } from './styles';

type Props = {
  proposal?: Proposal;
};

const ProposalDepositWidget = ({ proposal }: Props) => {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const {
    govParams: { data: govParams },
  } = useAppSelector(govSelector);

  const { depositsList, isLoadingDeposits, getDeposits, getNext } = useProposalDeposits(proposal?.proposalId);

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

  const [isOpenDepositForm, setIsOpenDepositForm] = useState(false);
  const [isOpenDepositModal, setIsOpenDepositModal] = useState(false);

  const { calculateFee, send, fee, setFeeData, isLoadingFee, isPendingTx, feeError, isLoadingTransaction } =
    useDepositProposal();

  const debouncedCalculateFee = useDebouncedCallback(calculateFee);

  const isLoadingDeposit = isLoadingFee || isLoadingTransaction || isPendingTx;
  const isDisabledDeposit = isLoadingDeposit;

  const onChangeDepositForm = (values: DepositProposalFormValues) => {
    if (proposal?.proposalId && values.initialDeposit) {
      debouncedCalculateFee({ proposalId: proposal.proposalId, ...values });
    }
  };

  const onCancelDepositForm = () => {
    setIsOpenDepositForm(false);
    setFeeData({
      fee: null,
      isLoading: false,
    });
  };

  const onDeposit = (values: DepositProposalFormValues) => {
    if (proposal?.proposalId) {
      send({ proposalId: proposal.proposalId, ...values }, () => {
        setIsOpenDepositForm(false);
        dispatch(getProposalDetailsAsync({ proposalId: proposal.proposalId, withLoader: false }));
        getDeposits();
      });
    }
  };

  const onHeaderClick = () => {
    if (isMobile) {
      setIsOpenDepositModal(true);
    }
  };

  const onEndReached = () => {
    getNext();
  };

  const onOpenDepositForm = () => {
    setIsOpenDepositModal(false);
    setIsOpenDepositForm(true);
  };

  return (
    <>
      <StyledProposalDepositWidget variant="transparent">
        <Stack gap={'1.5rem'}>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            gap={'1.25rem'}
            sx={{
              cursor: isMobile ? 'pointer' : 'default',
            }}
            onClick={onHeaderClick}
          >
            <Typography variant="h4">
              <FormattedMessage id={'PROPOSALS.DEPOSIT_COLLECTION'} />
            </Typography>
            {isMobile && <Icon src={ArrowRightIcon} sx={{ fontSize: '1.25rem' }} viewBox="0 0 20 20" />}
          </Stack>
          <Content
            proposal={proposal}
            govParams={govParams}
            deposits={depositsList}
            showData={!isMobile}
            isLoadingContent={isLoadingDeposits}
            isLoadingDepositBtn={isLoadingTransaction || isPendingTx}
            onEndReached={onEndReached}
            onOpenDepositForm={onOpenDepositForm}
          />
        </Stack>
      </StyledProposalDepositWidget>
      <Modal isOpen={isOpenDepositForm} setIsOpen={setIsOpenDepositForm} title={{ id: 'PROPOSALS.DEPOSIT' }}>
        <DepositProposalForm
          availableBalance={availableBalance}
          fee={fee}
          feeError={feeError || undefined}
          isLoading={isLoadingDeposit}
          isDisabled={isDisabledDeposit}
          onChange={onChangeDepositForm}
          onSubmit={onDeposit}
          onCancel={onCancelDepositForm}
          extraSlot={
            <Stack pl={'1rem'}>
              <InfoText formattedText={{ id: 'PROPOSALS.BALANCE_WILL_BE_FROZEN' }} />
            </Stack>
          }
        />
      </Modal>
      <Modal
        isOpen={isOpenDepositModal}
        setIsOpen={setIsOpenDepositModal}
        title={{ id: 'PROPOSALS.DEPOSIT_COLLECTION' }}
      >
        <Content
          proposal={proposal}
          govParams={govParams}
          deposits={depositsList}
          isLoadingContent={isLoadingDeposits}
          isLoadingDepositBtn={isLoadingTransaction || isPendingTx}
          onEndReached={onEndReached}
          onOpenDepositForm={onOpenDepositForm}
        />
      </Modal>
    </>
  );
};

export default ProposalDepositWidget;
