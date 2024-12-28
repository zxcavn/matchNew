import { useDeepMemo } from '@xfi/hooks';

import { type InputProps, type InputText, Input } from '@/lib/xfi.lib/components/atoms';
import {
  type FormBlockInput,
  type FormBlockValues,
  FormBlockInputTypesEnum,
} from '@/lib/xfi.lib/components/molecules/FormBlock/types';
import { IS_PRODUCTION } from '@/shared/constants/variables';

import XdsAddressInput from './XdsAddressInput';

type UseGenerateFormBlockInputData<FormValues extends FormBlockValues> = {
  inputName: keyof FormValues extends string ? keyof FormValues : never;
} & Pick<InputProps, 'placeholder' | 'caption' | 'label' | 'isError'>;

const DEFAULT_PLACEHOLDER: InputText = { type: 'text', text: '0x...' };
const DEFAULT_LABEL: InputText = { type: 'intl', id: 'WALLET.ADDRESS' };

const useGenerateFormBlockInputData = <FormValues extends FormBlockValues>({
  inputName,
  placeholder = DEFAULT_PLACEHOLDER,
  label = DEFAULT_LABEL,
  caption: captionParam,
  isError,
}: UseGenerateFormBlockInputData<FormValues>): FormBlockInput<FormValues> => {
  return useDeepMemo(
    () => ({
      inputName,
      type: FormBlockInputTypesEnum.component,
      inputProps: {
        render: ({ getField, handleBlur, handleChange }) => {
          const { value, error } = getField(inputName);
          const caption: InputText | undefined = error ? { type: 'intl', id: error } : captionParam;

          return IS_PRODUCTION ? (
            <Input
              label={label}
              placeholder={placeholder}
              caption={caption}
              isError={Boolean(error) || isError}
              id={inputName}
              name={inputName}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ) : (
            <XdsAddressInput
              label={label}
              placeholder={placeholder}
              caption={caption}
              isError={Boolean(error) || isError}
              id={inputName}
              name={inputName}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          );
        },
      },
    }),
    [inputName, placeholder, captionParam, label]
  );
};

export default useGenerateFormBlockInputData;
