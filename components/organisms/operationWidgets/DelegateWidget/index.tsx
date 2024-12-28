import { Stack, Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { useDebouncedCallback, useDebouncedState } from '@xfi/hooks';
import { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAppSelector, useBondedAndOthersValidators, useDelegate } from '@/hooks';
import { AUTOCOMPLETE_NONE_VALUE, Button, Modal, Tabs } from '@/lib/xfi.lib/components/atoms';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { CosmosCurrency, WalletType } from '@/shared/types';
import { validatorsSelector } from '@/store/validators';

import { DelegateForm, DelegateFormValues } from '@/components/molecules';

enum TabType {
  active = 'active',
  inactive = 'inactive',
}
const VALIDATORS_TABS = [
  { value: TabType.active, label: 'VALIDATORS.ACTIVE_VALIDATORS' },
  { value: TabType.inactive, label: 'VALIDATORS.INACTIVE_VALIDATORS' },
];

const INITIAL_TABS_STATE = VALIDATORS_TABS[0].value;

type Props = {
  walletType?: WalletType;
};

const DelegateWidget = ({ walletType }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formValues, setFormValue, isFormValuesChanging] = useDebouncedState<DelegateFormValues>({
    validatorAddress: '',
    amount: '0',
    gasCurrency: CosmosCurrency.XFI,
  });
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const {
    calculateFee,
    resetTransactionData,
    delegate,
    isLoadingFee,
    isLoadingTransaction,
    availableMpxBalance,
    error,
    formattedFee,
    isPendingTx,
  } = useDelegate({ walletType });

  const { data: validators } = useAppSelector(validatorsSelector);

  const [tab, setTab] = useState<TabType>(INITIAL_TABS_STATE);

  const { bondedValidators, othersValidators } = useBondedAndOthersValidators(validators);

  const isLoading = isLoadingFee || isLoadingTransaction;
  const isDisabledModalButton = MxNumberFormatter.toBigInt(availableMpxBalance) <= 0n;
  const isDisabledSubmitButton =
    !formattedFee || !Number(formValues.amount) || Boolean(error) || isLoading || isFormValuesChanging;

  const debouncedCalculateFee = useDebouncedCallback(calculateFee);

  const formatValues = ({ amount, ...rest }: DelegateFormValues) => ({
    ...rest,
    amount: amount.trim(),
  });

  const onChange = useCallback((values: DelegateFormValues) => {
    const formattedValues = formatValues(values);

    setFormValue(formattedValues);

    if (
      MxNumberFormatter.parseUnits(formattedValues.amount) &&
      formattedValues.validatorAddress !== AUTOCOMPLETE_NONE_VALUE
    ) {
      debouncedCalculateFee(formattedValues);
    }
  }, []);

  const onSubmit = () => {
    delegate(formValues, { onInitTx: () => setIsOpenModal(false) });
  };

  const onCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onClickOpen = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const setIsModalOpen = useCallback((isOpen: boolean) => {
    if (!isOpen) {
      resetTransactionData();
      setTab(INITIAL_TABS_STATE);
    }

    setIsOpenModal(isOpen);
  }, []);

  return (
    <>
      <Button
        onClick={onClickOpen}
        isDisabled={isDisabledModalButton || isPendingTx}
        isFullWidth={isMobile}
        size={'large'}
      >
        <Typography variant="buttonText1" textTransform="capitalize">
          <FormattedMessage id="LIB.OPERATIONS.BOND" />
        </Typography>
      </Button>

      <Modal title={{ id: 'LIB.OPERATIONS.BOND' }} isOpen={isOpenModal} setIsOpen={setIsModalOpen}>
        <Stack gap={'2rem'}>
          <Tabs tabs={VALIDATORS_TABS} value={tab} setTab={setTab} size={'small'} sx={{ width: '100%' }} />

          <DelegateForm
            key={tab}
            onSubmit={onSubmit}
            onCancel={onCancel}
            onChange={onChange}
            isDisabled={isDisabledSubmitButton}
            validators={tab === TabType.active ? bondedValidators : othersValidators}
            isLoading={isLoading}
            commission={formattedFee}
            errorMessage={error}
          />
        </Stack>
      </Modal>
    </>
  );
};

export default DelegateWidget;
