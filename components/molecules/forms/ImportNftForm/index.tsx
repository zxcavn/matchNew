import { Stack } from '@mui/material';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import { useAppValidationRules } from '@/hooks';
import { FormBlock } from '@/lib/xfi.lib/components/molecules';
import { FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules/FormBlock/types';
import { EthersService } from '@/services/evm';

import FormButtons from '../FormButtons';

type FormValues = {
  contractAddress: string;
  tokenId: string;
};

type Props = {
  /** @type {FormattedMessageId} */
  addressError?: string;
  /** @type {FormattedMessageId} */
  tokenError?: string;
  isDisabledNextButton: boolean;
  isLoadingNextButton?: boolean;
  onFillTokenData: (address: string, tokenId: string) => void;
  onNext: () => void;
  onCancel: () => void;
};

const ImportNftForm = ({
  addressError = '',
  tokenError = '',
  isDisabledNextButton,
  isLoadingNextButton,
  onFillTokenData,
  onNext,
  onCancel,
}: Props) => {
  const { formatMessage } = useIntl();
  const [isValidAddress, setIsValidAddress] = useState(false);
  const { evmAddress, required } = useAppValidationRules();

  const onChange = ({ contractAddress, tokenId }: FormValues) => {
    const trimmedContractAddress = contractAddress.trim();
    const trimmedTokenId = tokenId.trim();

    const isValid = EthersService.isAddress(trimmedContractAddress);

    setIsValidAddress(isValid);

    if (isValid) {
      onFillTokenData(trimmedContractAddress, trimmedTokenId);
    }
  };

  return (
    <Stack gap="2rem">
      <FormBlock<FormValues>
        id="importTokenForm"
        errors={{
          contractAddress: addressError && formatMessage({ id: addressError }),
          tokenId: tokenError && formatMessage({ id: tokenError }),
        }}
        initialValues={{
          contractAddress: '',
          tokenId: '',
        }}
        validationRules={{
          contractAddress: evmAddress,
          tokenId: required.test('isPositiveInteger', formatMessage({ id: 'ERRORS.INCORRECT_TOKEN_ID' }), value => {
            if (isNaN(Number(value))) return false;
            const num = Number(value);

            return num >= 0;
          }),
        }}
        observerHandler={onChange}
        onSubmit={onNext}
        inputsData={[
          {
            inputName: 'contractAddress',
            type: FormBlockInputTypesEnum.text,
            inputProps: {
              placeholder: { type: 'text', text: '0x...' },
              label: { type: 'intl', id: 'SUMMARY.NFT_ADDRESS' },
            },
          },
          {
            inputName: 'tokenId',
            type: FormBlockInputTypesEnum.number,
            inputProps: {
              label: { type: 'intl', id: 'TOKENS.TOKEN_ID' },
              isDisabled: !isValidAddress,
            },
          },
          {
            type: FormBlockInputTypesEnum.jsx,
            inputProps: {
              component: (
                <FormButtons
                  onCancel={onCancel}
                  submitButtonText="SUMMARY.NEXT"
                  isDisabled={isDisabledNextButton}
                  isLoading={isLoadingNextButton}
                  sx={{ flexDirection: 'row-reverse' }}
                />
              ),
            },
          },
        ]}
      />
    </Stack>
  );
};

export default ImportNftForm;
