import { Stack, Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { useDebouncedCallback, useDebouncedState } from '@xfi/hooks';
import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { UnbondStatusDto } from '@/crud';
import { pushErrorTxNotification, pushInitTxNotification, pushSuccessTxNotification } from '@/helpers';
import { useAppSelector, useBondedAndOthersValidators, useWallet, useWalletTransaction } from '@/hooks';
import useDelegations, { Delegation } from '@/hooks/useDelegations';
import { Button, ButtonProps, Modal, Tabs, Tooltip } from '@/lib/xfi.lib/components/atoms';
import { Coin, CosmosCurrency, CosmosMessageType, SendTransactionOptions, WalletType } from '@/shared/types';
import { ValidatorsList, validatorsSelector } from '@/store/validators';

import { RedelegateForm, RedelegateFormValues } from '@/components/molecules';

type Props = {
  buttonProps?: ButtonProps;
  validator: Delegation['validator'];
  delegationAmount: Coin;
  unbondStatus: UnbondStatusDto;
  walletType?: WalletType;
};

enum TabType {
  active = 'active',
  inactive = 'inactive',
}
const VALIDATORS_TABS = [
  { value: TabType.active, label: 'VALIDATORS.ACTIVE_VALIDATORS' },
  { value: TabType.inactive, label: 'VALIDATORS.INACTIVE_VALIDATORS' },
];

const INITIAL_TABS_STATE = VALIDATORS_TABS[0].value;

const RedelegateWidget = ({
  buttonProps,
  validator,
  delegationAmount,
  unbondStatus,
  walletType = WalletType.NEW,
}: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formValues, setFormValues, isFormValuesChanging] = useDebouncedState<Partial<RedelegateFormValues>>({});

  const { newWallet, oldWallet, currentWallet } = useWallet({ walletType });
  const walletAddress = currentWallet.address;

  const { fetch: fetchDelegations } = useDelegations(walletAddress);
  const { data: delegationList } = useAppSelector(validatorsSelector);
  const {
    formattedFee,
    fee,
    error,
    isLoadingFee,
    isLoadingTransaction,
    resetTransactionData,
    calculateFee,
    sendTransaction,
    isPendingTx,
  } = useWalletTransaction();

  const validatorList: ValidatorsList = useMemo(() => {
    return delegationList.filter(({ validator: v }) => v.operatorAddress !== validator.address);
  }, [delegationList, validator]);

  const [tab, setTab] = useState<TabType>(INITIAL_TABS_STATE);

  const { bondedValidators, othersValidators } = useBondedAndOthersValidators(validatorList);

  const debouncedCalculateFee = useDebouncedCallback(calculateFee);

  const getTxOptions = ({ dstValidator, amount, gasCurrency }: RedelegateFormValues): SendTransactionOptions => ({
    type: CosmosMessageType.REDELEGATE,
    options: {
      validatorDstAddress: dstValidator,
      validatorSrcAddress: validator.address,
      coin: {
        amount: MxNumberFormatter.parseUnits(amount).toString(),
        denom: CosmosCurrency.MPX,
      },
      gasCurrency,
      walletType,
    },
  });

  const setIsOpen = (isOpen: boolean) => {
    setIsOpenModal(isOpen);

    if (!isOpen) {
      resetTransactionData();
      setTab(INITIAL_TABS_STATE);
    }
  };

  const onSubmit = (values: RedelegateFormValues) => {
    const { dstValidator } = formValues;

    if (!dstValidator) return;

    sendTransaction(getTxOptions(values), {
      onInitTx: () => {
        setIsOpenModal(false);
        pushInitTxNotification();
      },
      onSuccess: () => {
        fetchDelegations({ withTimeout: true });
        pushSuccessTxNotification(CosmosMessageType.REDELEGATE);
      },
      onInitError: error => pushErrorTxNotification(error),
    });
  };

  const onChange = (values: RedelegateFormValues) => {
    setFormValues(values);

    if (Number(values.amount)) {
      debouncedCalculateFee(getTxOptions(values));
    }
  };

  const isLoading = isLoadingFee || isLoadingTransaction;
  const isDisabled = isLoading || !formValues.dstValidator || !fee || isFormValuesChanging;

  const isException =
    unbondStatus.exceptionAddresses.includes(newWallet.address) ||
    unbondStatus.exceptionAddresses.includes(oldWallet.address);
  const isDisabledRebond = isException
    ? false
    : unbondStatus.validators.includes(validator.address) && !unbondStatus.isDatePast;

  const RebondButton = (
    <Button {...buttonProps} isDisabled={isPendingTx} onClick={() => !isDisabledRebond && setIsOpenModal(true)}>
      <Typography variant="buttonText2" textTransform="capitalize">
        <FormattedMessage id="LIB.OPERATIONS.REBOND" />
      </Typography>
    </Button>
  );

  return (
    <>
      {isDisabledRebond ? (
        <Tooltip
          title={
            <Typography variant="body2">
              <FormattedMessage
                id="UNBOUND_STATUS.TEXT"
                values={{ value: format(new Date(unbondStatus.date), 'dd-MM-yyyy') }}
              />
            </Typography>
          }
        >
          {RebondButton}
        </Tooltip>
      ) : (
        RebondButton
      )}
      <Modal
        title={{ id: 'WALLET.VALIDATOR_REBOND', values: { validator: validator.moniker } }}
        isOpen={isOpenModal}
        setIsOpen={setIsOpen}
      >
        <Stack gap={'2rem'}>
          <Tabs tabs={VALIDATORS_TABS} value={tab} setTab={setTab} size={'small'} sx={{ width: '100%' }} />
          <RedelegateForm
            key={tab}
            delegationAmount={delegationAmount}
            isLoading={isLoading}
            isDisabled={isDisabled}
            error={error}
            commission={formattedFee}
            validatorList={tab === TabType.active ? bondedValidators : othersValidators}
            srcValidator={validator}
            onCancel={() => setIsOpen(false)}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </Stack>
      </Modal>
    </>
  );
};

export default RedelegateWidget;
