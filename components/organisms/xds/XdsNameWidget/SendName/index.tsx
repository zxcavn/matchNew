import { Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { redirect } from '@xfi/helpers';
import { isAddress } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { calculateUsdtPrice, getSendNameChanges, getSendNameStepList, pushNotification } from '@/helpers';
import { useWalletConnection } from '@/hocs';
import { useAppDispatch, useAppSelector, useStep, useWalletPrimaryName } from '@/hooks';
import { usePrimaryName, useTransferOwnership, useUpdateXdsRecord } from '@/hooks/xds';
import { Button, ButtonProps } from '@/lib/xfi.lib/components/atoms';
import { PAGES, SendNameStep } from '@/shared/constants';
import { CosmosCurrency } from '@/shared/types';
import { currencyBySymbolSelector, getSwapCurrenciesAsync } from '@/store/currencies';

import { UpdateXdsRecordModal, XdsPricingBlockProps } from '@/components/molecules';

import ChooseRecipientModal from './ChooseRecipientModal';
import NoticeModal from './NoticeModal';
import SendOwnerModal from './SendOwnerModal';
import SuccessModal from './SuccessModal';

type FeeData = Partial<{
  updateXdsRecord: string;
  transferOwnership: string;
}>;
type Props = {
  name: string;
  ownerAddress: string;
  xdsRecordAddress: string;
  updateName: () => void;
  isPrimary?: boolean;
} & Omit<ButtonProps, 'children'>;

const SendName = ({ name, ownerAddress, xdsRecordAddress, updateName, isPrimary, ...buttonProps }: Props) => {
  const dispatch = useAppDispatch();
  const currency = useAppSelector(currencyBySymbolSelector(CosmosCurrency.XFI));

  const [recipientAddress, setRecipientAddress] = useState('');
  const [feeData, setFeeData] = useState<FeeData>({});

  const isValidRecipientAddress = useMemo(() => isAddress(recipientAddress), [recipientAddress]);
  const { stepList, changesList } = useMemo(
    () => ({
      stepList: isValidRecipientAddress ? getSendNameStepList({ recipientAddress, xdsRecordAddress }) : [],
      changesList: isValidRecipientAddress ? getSendNameChanges({ recipientAddress, xdsRecordAddress }) : [],
    }),
    [recipientAddress, xdsRecordAddress, isValidRecipientAddress]
  );
  const { step: currentStep, setNextStep, setPreviousStep, setStep, resetStep } = useStep(stepList);
  const [initialStepListLength, setInitialStepListLength] = useState(1);

  const { updatePrimaryName } = useWalletPrimaryName();
  const { updateXdsRecord, ...updateXdsRecordData } = useUpdateXdsRecord({
    nameOrLabel: name,
    newAddress: recipientAddress,
    isEnabledFeeCalculation: currentStep === SendNameStep.UPDATE_ADDRESS_TX,
  });
  const { transferOwnership, ...transferOwnershipData } = useTransferOwnership({
    nameOrLabel: name,
    recipient: recipientAddress,
    isEnabledFeeCalculation: currentStep === SendNameStep.TRANSFER_OWNERSHIP_TX,
  });
  const { name: recipientPrimaryName } = usePrimaryName({
    address: recipientAddress,
    isEnabled: isValidRecipientAddress,
  });
  const { connectionType } = useWalletConnection();

  const pricingBlockProps: XdsPricingBlockProps = useMemo(() => {
    const data: XdsPricingBlockProps['data'] = [];
    const totalFee =
      MxNumberFormatter.toBigInt(feeData.transferOwnership || '0') +
      MxNumberFormatter.toBigInt(feeData.updateXdsRecord || '0');

    if (feeData.updateXdsRecord) {
      data.push({
        text: { id: 'XDS.UPDATE_XDS_ADDRESS_FEE' },
        amount: MxNumberFormatter.toBigInt(feeData.updateXdsRecord || '0'),
      });
    }

    if (feeData.transferOwnership) {
      data.push({
        text: { id: 'XDS.TRANSFER_NAME_FEE' },
        amount: MxNumberFormatter.toBigInt(feeData.transferOwnership || '0'),
      });
    }

    data.push({
      text: { id: 'XDS.ESTIMATED_TOTAL_FEE' },
      amount: totalFee,
      isPrimaryText: true,
    });

    return {
      data,
      usdtPrice: currency?.rate ? calculateUsdtPrice(totalFee, currency.rate) : '0',
    } as XdsPricingBlockProps;
  }, [feeData, currency?.rate]);

  const closeModalAndResetData = useCallback(() => {
    resetStep();

    if (!updateXdsRecordData.isLoadingTx && !transferOwnershipData.isLoadingTx) {
      setRecipientAddress('');
      setInitialStepListLength(1);
    }
  }, [resetStep, updateXdsRecordData.isLoadingTx, transferOwnershipData.isLoadingTx]);

  const openModal = useCallback(() => {
    if (updateXdsRecordData.isLoadingTx) return setStep(SendNameStep.UPDATE_ADDRESS_TX);

    if (transferOwnershipData.isLoadingTx) return setStep(SendNameStep.TRANSFER_OWNERSHIP_TX);

    return setStep(SendNameStep.CHOOSE_RECIPIENT);
  }, [setStep, updateXdsRecordData.isLoadingTx, transferOwnershipData.isLoadingTx]);

  const onClickUpdate = useCallback(() => {
    updateXdsRecord({
      onSuccess: ({ fee }) => {
        setFeeData(prev => ({ ...prev, updateXdsRecord: fee }));
        setNextStep(SendNameStep.UPDATE_ADDRESS_TX);
        pushNotification({
          type: 'success',
          message: { id: 'NOTIFICATIONS.TRANSACTION_SUCCESSFUL' },
          additional: { id: 'NOTIFICATIONS.SUCCESS_UPDATE_XDS_ADDRESS' },
        });

        if (isPrimary) {
          updatePrimaryName(null);
        }

        updateName();
      },
    });
  }, [setNextStep, updateXdsRecord, updateName, updatePrimaryName, isPrimary]);

  const onClickSend = useCallback(() => {
    transferOwnership({
      onSuccess: ({ fee }) => {
        setFeeData(prev => ({ ...prev, transferOwnership: fee }));
        setNextStep(SendNameStep.TRANSFER_OWNERSHIP_TX);

        if (isPrimary) {
          updatePrimaryName(null);
        }
      },
    });
  }, [setNextStep, transferOwnership, updatePrimaryName, isPrimary]);

  const onCancelSendOwner = useCallback(() => {
    setStep(SendNameStep.CHOOSE_RECIPIENT);
  }, [setStep]);

  const onCloseSuccessModal = useCallback(() => {
    resetStep();
    setRecipientAddress('');
    setFeeData({});
    redirect(PAGES.xds.pathname);
  }, [resetStep]);

  useEffect(() => {
    if (!currency) {
      dispatch(getSwapCurrenciesAsync());
    }
  }, []);

  return (
    <>
      <Button onClick={openModal} variant="secondary" size="large" {...buttonProps}>
        <Typography variant={'buttonText1'} whiteSpace={'nowrap'}>
          <FormattedMessage id="SUMMARY.SEND" />
        </Typography>
      </Button>
      <ChooseRecipientModal
        isDisabled={!stepList.length || !isValidRecipientAddress}
        changesList={changesList}
        recipientAddress={recipientAddress}
        onRecipientChange={setRecipientAddress}
        isOpen={currentStep === SendNameStep.CHOOSE_RECIPIENT}
        name={name}
        ownerAddress={ownerAddress}
        setIsOpen={closeModalAndResetData}
        onNext={() => {
          setNextStep();
          setInitialStepListLength(changesList.length);
        }}
      />
      <NoticeModal
        isOpen={currentStep === SendNameStep.NOTICE}
        setIsOpen={closeModalAndResetData}
        onCancel={setPreviousStep}
        onNext={() => setNextStep()}
      />
      <UpdateXdsRecordModal
        {...updateXdsRecordData}
        onSubmit={onClickUpdate}
        setIsOpen={closeModalAndResetData}
        connectionType={connectionType}
        name={name}
        recipientAddress={recipientAddress}
        recipientName={recipientPrimaryName}
        isOpen={currentStep === SendNameStep.UPDATE_ADDRESS_TX}
        steps={initialStepListLength > 1 ? { count: initialStepListLength, current: 1 } : undefined}
      />
      <SendOwnerModal
        {...transferOwnershipData}
        onSubmit={onClickSend}
        onCancel={onCancelSendOwner}
        setIsOpen={closeModalAndResetData}
        name={name}
        recipientAddress={recipientAddress}
        recipientName={recipientPrimaryName}
        isOpen={currentStep === SendNameStep.TRANSFER_OWNERSHIP_TX}
        steps={initialStepListLength > 1 ? { count: initialStepListLength, current: 2 } : undefined}
      />
      <SuccessModal
        pricingBlockProps={pricingBlockProps}
        name={name}
        address={recipientAddress}
        isOpen={currentStep === SendNameStep.COMPLETE}
        setIsOpen={onCloseSuccessModal}
      />
    </>
  );
};

export default SendName;
