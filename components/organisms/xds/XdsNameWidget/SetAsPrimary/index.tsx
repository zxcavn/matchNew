import { MxNumberFormatter } from '@xfi/formatters';
import { useCallback, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { calculateUsdtPrice, getSetAsPrimaryStepList, pushNotification } from '@/helpers';
import { useWalletConnection } from '@/hocs';
import { useAppSelector, useStep, useWalletPrimaryName } from '@/hooks';
import { useReverseRegistryName, useSetPrimaryName, useUpdateXdsRecord } from '@/hooks/xds';
import { SetAsPrimaryNameStep } from '@/shared/constants/xds';
import { CosmosCurrency } from '@/shared/types';
import { currencyBySymbolSelector } from '@/store/currencies';

import {
  UpdateXdsRecordModal,
  XdsPricingBlock,
  XdsPricingBlockProps,
  XdsSuccessOperationModal,
} from '@/components/molecules';

import MismatchAddressModal from './MismatchAddressModal';
import SetAsPrimaryNameModal from './SetAsPrimaryNameModal';
import { StyledButton } from './styles';

type FeeData = Partial<{
  updateXdsRecord: string;
  setPrimaryName: string;
}>;

type Props = {
  isDisabled?: boolean;
  name: string;
  ownerAddress: string;
  xdsRecordAddress: string;
  updateName: () => void;
};

const SetAsPrimary = ({ name, ownerAddress, xdsRecordAddress, isDisabled, updateName }: Props) => {
  const currency = useAppSelector(currencyBySymbolSelector(CosmosCurrency.XFI));
  const [feeData, setFeeData] = useState<FeeData>({});

  const { name: reverseRegistryName, isLoading: isLoadingReverseRegistryName } = useReverseRegistryName({
    address: ownerAddress,
  });
  const stepList = useMemo(
    () => getSetAsPrimaryStepList({ address: ownerAddress, xdsRecordAddress, reverseRegistryName, name }),
    [ownerAddress, xdsRecordAddress, reverseRegistryName, name]
  );
  const { step, setStep, setNextStep, setPreviousStep, resetStep } = useStep(stepList);
  const [stepCount, setStepCount] = useState(1);

  const { updateXdsRecord, ...updateXdsRecordData } = useUpdateXdsRecord({
    nameOrLabel: name,
    newAddress: ownerAddress,
    isEnabledFeeCalculation: step === SetAsPrimaryNameStep.UPDATE_ADDRESS_TX,
  });
  const { setPrimaryName, ...setPrimaryNameData } = useSetPrimaryName({
    name: name,
    isEnabledFeeCalculation: step === SetAsPrimaryNameStep.SET_AS_PRIMARY_TX,
  });
  const { updatePrimaryName } = useWalletPrimaryName({ isEnabled: false });
  const { connectionType } = useWalletConnection();

  const openModal = useCallback(() => {
    if (updateXdsRecordData.isLoadingTx) {
      return setStep(SetAsPrimaryNameStep.UPDATE_ADDRESS_TX);
    }

    if (setPrimaryNameData.isLoadingTx) {
      return setStep(SetAsPrimaryNameStep.SET_AS_PRIMARY_TX);
    }

    setStepCount(getStepCount(stepList));
    setNextStep();
  }, [setStep, setNextStep, updateXdsRecordData.isLoadingTx, setPrimaryNameData.isLoadingTx, stepList]);

  const onSubmitUpdateRecord = useCallback(() => {
    updateXdsRecord({
      onSuccess: ({ fee }) => {
        setNextStep(SetAsPrimaryNameStep.UPDATE_ADDRESS_TX);
        setFeeData(prev => ({ ...prev, updateXdsRecord: fee }));
        pushNotification({
          type: 'success',
          message: { id: 'NOTIFICATIONS.TRANSACTION_SUCCESSFUL' },
          additional: { id: 'NOTIFICATIONS.SUCCESS_UPDATE_XDS_ADDRESS' },
        });
      },
    });
  }, [updateXdsRecord, setNextStep]);

  const onSubmitSetPrimaryName = useCallback(() => {
    setPrimaryName({
      onSuccess: ({ fee }) => {
        setNextStep(SetAsPrimaryNameStep.SET_AS_PRIMARY_TX);
        setFeeData(prev => ({ ...prev, setPrimaryName: fee }));
      },
    });
  }, [setPrimaryName, setNextStep]);

  const closeModalAndUpdateData = useCallback(() => {
    resetStep();
    updateName();
  }, [resetStep, updateName]);

  const onCloseSuccessModal = useCallback(() => {
    setFeeData({});
    resetStep();
    updateName();
    updatePrimaryName(name);
  }, [resetStep, updateName, updatePrimaryName, name]);

  const pricingBlockProps: XdsPricingBlockProps = useMemo(() => {
    const data: XdsPricingBlockProps['data'] = [];
    const setPrimaryNameFee = MxNumberFormatter.toBigInt(feeData.setPrimaryName || '0');
    const updateXdsRecordFee = MxNumberFormatter.toBigInt(feeData.updateXdsRecord || '0');
    const totalFee = setPrimaryNameFee + updateXdsRecordFee;
    const usdtPrice = currency?.rate ? calculateUsdtPrice(totalFee, currency.rate) : '0';

    if (updateXdsRecordFee) {
      data.push({
        text: { id: 'XDS.UPDATE_XDS_ADDRESS_FEE' },
        amount: updateXdsRecordFee,
      });
    }

    if (setPrimaryNameFee) {
      data.push({
        text: { id: 'XDS.SET_AS_PRIMARY_NAME_FEE' },
        amount: setPrimaryNameFee,
      });
    }

    data.push({
      text: { id: 'XDS.ESTIMATED_TOTAL_FEE' },
      amount: totalFee,
      isPrimaryText: true,
    });

    return { data, usdtPrice } as XdsPricingBlockProps;
  }, [feeData, currency?.rate]);

  return (
    <>
      <StyledButton onClick={openModal} disabled={isDisabled || isLoadingReverseRegistryName}>
        <FormattedMessage id="XDS_NAME.SET_AS_PRIMARY" />
      </StyledButton>

      <MismatchAddressModal
        isOpen={step === SetAsPrimaryNameStep.MISMATCH_ADDRESS}
        setIsOpen={resetStep}
        onCancel={setPreviousStep}
        onNext={() => setNextStep()}
      />
      <UpdateXdsRecordModal
        connectionType={connectionType}
        name={name}
        recipientName={name}
        recipientAddress={ownerAddress}
        setIsOpen={closeModalAndUpdateData}
        onSubmit={onSubmitUpdateRecord}
        {...updateXdsRecordData}
        isOpen={step === SetAsPrimaryNameStep.UPDATE_ADDRESS_TX}
        steps={stepCount > 1 ? { count: stepCount, current: 1 } : undefined}
      />
      <SetAsPrimaryNameModal
        name={name}
        address={ownerAddress}
        setIsOpen={closeModalAndUpdateData}
        onCancel={setPreviousStep}
        onSubmit={onSubmitSetPrimaryName}
        isOpen={step === SetAsPrimaryNameStep.SET_AS_PRIMARY_TX}
        {...setPrimaryNameData}
        steps={stepCount > 1 ? { count: stepCount, current: 2 } : undefined}
      />
      <XdsSuccessOperationModal
        isOpen={step === SetAsPrimaryNameStep.COMPLETE}
        setIsOpen={onCloseSuccessModal}
        name={name}
        operationTitle="XDS.YOU_SET_AS_PRIMARY"
        detailsSlot={<XdsPricingBlock {...pricingBlockProps} />}
        button={{
          text: 'XDS.VIEW_NAME',
          onClick: onCloseSuccessModal,
        }}
      />
    </>
  );
};

const getStepCount = (stepList: SetAsPrimaryNameStep[]): number => {
  return stepList.filter(
    step => step !== SetAsPrimaryNameStep.COMPLETE && step !== SetAsPrimaryNameStep.MISMATCH_ADDRESS
  ).length;
};

export default SetAsPrimary;
