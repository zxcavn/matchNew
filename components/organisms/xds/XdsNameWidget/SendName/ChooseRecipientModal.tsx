import { Stack, styled, Typography } from '@mui/material';
import { ReactNode, useCallback, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { formatName } from '@/helpers/xds';
import { useAppValidationRules } from '@/hooks';
import { Button, Icon, Input, Modal, ModalProps } from '@/lib/xfi.lib/components/atoms';
import { FormBlock, FormBlockInputTypesEnum, FormBlockProps } from '@/lib/xfi.lib/components/molecules';
import { EvmIcon } from '@/lib/xfi.lib/icons';

import { ModalErrorMessage } from '@/components/atoms';

import { useGenerateFormBlockInputData } from '../../XdsAddressInput';

type FormValues = {
  recipient: string;
};

type ChooseRecipientModalProps = {
  name: string;
  ownerAddress: string;
  recipientAddress: string;
  /** @type {FormattedMessageId} */
  error?: string | null;
  changesList: ReactNode[];
  isDisabled?: boolean;
  onNext: () => void;
  onRecipientChange: (address: string) => void;
} & Pick<ModalProps, 'isOpen' | 'setIsOpen'>;

const ChooseRecipientModal = ({
  name,
  ownerAddress,
  recipientAddress,
  onNext,
  onRecipientChange,
  changesList,
  error,
  isDisabled: isDisabledProp,
  ...modalProps
}: ChooseRecipientModalProps) => {
  const initialValuesRef = useRef<FormValues>({ recipient: recipientAddress });
  const validationRules = useAppValidationRules();
  const isRecipientEqualSender = ownerAddress.toLowerCase() === recipientAddress.toLowerCase();
  const recipientInputData = useGenerateFormBlockInputData<FormValues>({
    inputName: 'recipient',
    label: { type: 'intl', id: 'SUMMARY.RECIPIENT' },
    caption: isRecipientEqualSender ? { type: 'intl', id: 'ERRORS.CAN_NOT_SEND_NAME_TO_SELF' } : undefined,
    isError: isRecipientEqualSender,
  });

  const onChange = useCallback(
    ({ recipient }: FormValues) => {
      onRecipientChange(recipient?.trim() || '');
    },
    [onRecipientChange]
  );

  const onClickBack = useCallback(() => {
    modalProps.setIsOpen(false);
  }, [modalProps.setIsOpen]);

  const isDisabledNext = isDisabledProp || isRecipientEqualSender;

  return (
    <Modal {...modalProps} title={{ id: 'XDS.SEND_NAME' }}>
      <Stack height="100%" gap="2rem" justifyContent="space-between">
        <StyledFormBlock
          observerHandler={onChange}
          id="choose-recipient-form"
          validationRules={{
            recipient: validationRules.evmAddress,
          }}
          initialValues={initialValuesRef.current}
          inputsData={[
            {
              type: FormBlockInputTypesEnum.jsx,
              inputProps: {
                component: (
                  <Stack gap="2rem">
                    <Stack width="100%" direction="row" alignItems="flex-end" gap="0.5rem">
                      <Icon src={EvmIcon} viewBox="0 0 32 32" sx={{ fontSize: '1.5rem' }} />
                      <Typography sx={{ overflowWrap: 'break-word' }} color="background.light" variant="h3_infynyte">
                        {formatName(name, { maxLength: 15 })}
                      </Typography>
                    </Stack>
                    {error && <ModalErrorMessage message={error} />}
                  </Stack>
                ),
              },
            },
            {
              type: FormBlockInputTypesEnum.jsx,
              inputProps: {
                component: (
                  <Input
                    label={{ type: 'intl', id: 'SUMMARY.CURRENT_OWNER' }}
                    isEditable={false}
                    value={ownerAddress}
                  />
                ),
              },
            },
            recipientInputData,
            {
              type: FormBlockInputTypesEnum.component,
              inputProps: {
                render: ({ isDisabled: isDisabledForm }) => (
                  <Stack justifyContent="flex-end" flexGrow={1}>
                    <Stack gap="1rem" direction={{ md: 'row', xs: 'column-reverse' }}>
                      <Button onClick={onClickBack} isFullWidth size="large" variant="secondary">
                        <FormattedMessage id="SUMMARY.BACK" />
                      </Button>
                      <Button isFullWidth size="large" onClick={onNext} isDisabled={isDisabledForm || isDisabledNext}>
                        <FormattedMessage id="SUMMARY.SEND" />
                      </Button>
                    </Stack>
                  </Stack>
                ),
              },
            },
          ]}
        />
      </Stack>
    </Modal>
  );
};

const StyledFormBlock = styled((props: FormBlockProps<FormValues>) => <FormBlock {...props} />, {
  name: 'StyledFormBlock',
})(() => ({
  height: '100%',

  '& > *:first-child': {
    height: '100%',
  },
}));

export default ChooseRecipientModal;
