import { Stack } from '@mui/material';
import { useIntl } from 'react-intl';

import { useAppValidationRules } from '@/hooks';
import { Input } from '@/lib/xfi.lib/components/atoms';
import { FormBlock } from '@/lib/xfi.lib/components/molecules';
import { FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules/FormBlock/types';
import { Erc20, EthersService } from '@/services/evm';

import FormButtons from '../FormButtons';

type FormValues = {
  contractAddress: string;
};

type Props = {
  /** @type {FormattedMessageId} */
  error: string;
  tokenInfo: Erc20.TokenInfo;
  initialContractAddress?: string;
  isDisabledNextButton: boolean;
  onChangeContractAddress: (address: string) => void;
  onNext: () => void;
  onCancel: () => void;
};

const ImportTokenForm = ({
  error,
  tokenInfo,
  isDisabledNextButton,
  initialContractAddress,
  onChangeContractAddress,
  onNext,
  onCancel,
}: Props) => {
  const validationRules = useAppValidationRules();

  const { formatMessage } = useIntl();

  const onChange = ({ contractAddress }: FormValues) => {
    const trimmedContractAddress = contractAddress.trim();

    if (EthersService.isAddress(trimmedContractAddress)) {
      onChangeContractAddress(trimmedContractAddress);
    }
  };

  return (
    <Stack gap="2rem">
      <FormBlock<FormValues>
        id="importTokenForm"
        errors={{
          contractAddress: error && formatMessage({ id: error }),
        }}
        initialValues={{
          contractAddress: initialContractAddress || '',
        }}
        validationRules={{
          contractAddress: validationRules.evmWalletAddress,
        }}
        observerHandler={onChange}
        onSubmit={onNext}
        inputsData={[
          {
            inputName: 'contractAddress',
            type: FormBlockInputTypesEnum.text,
            inputProps: {
              label: { type: 'intl', id: 'TOKENS.TOKEN_CONTRACT_ADDRESS' },
            },
          },
          {
            type: FormBlockInputTypesEnum.jsx,
            inputProps: {
              component: (
                <Stack gap="2rem">
                  <Input
                    isEditable={false}
                    value={tokenInfo.symbol}
                    label={{ type: 'intl', id: 'TOKENS.TOKEN_SYMBOL' }}
                  />
                  <Input
                    isEditable={false}
                    value={tokenInfo.decimals ? String(tokenInfo.decimals) : ''}
                    label={{ type: 'intl', id: 'TOKENS.TOKEN_DECIMAL' }}
                  />
                  <FormButtons
                    onCancel={onCancel}
                    submitButtonText="SUMMARY.NEXT"
                    isDisabled={isDisabledNextButton}
                    sx={{ flexDirection: 'row-reverse' }}
                  />
                </Stack>
              ),
            },
          },
        ]}
      />
    </Stack>
  );
};

export default ImportTokenForm;
