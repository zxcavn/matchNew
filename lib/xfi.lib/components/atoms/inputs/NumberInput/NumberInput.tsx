import { isConsistsOnlyNumbers } from '@xfi/helpers';
import { ChangeEvent } from 'react';

import { type InputProps, Input } from '../Input';

export const TEST_ID = 'number-input-test-id';

export type Props = InputProps;

/**
 * A specialized input component for entering numeric values.
 *
 * The `NumberInput` component is designed for numeric input fields and restricts input to numeric characters only. It inherits the properties of the `Input` component and adds input validation for numeric values.
 *
 * @component
 *
 * @param {Props} props - The props for configuring the `NumberInput` component.
 * @param {string} [props.value=""] - The numeric value of the input field.
 * @param {string} [props.defaultValue] - The default numeric value of the input field.
 * @param {number} [props.maxLength] - The maximum number of digits allowed in the input field.
 * @param {InputPlaceholder} [props.placeholder] - The placeholder text for the input field.
 * @param {InputText} [props.label] - The label displayed above the input field.
 * @param {InputText} [props.caption] - The caption displayed below the input field.
 * @param {ReactNode} [props.prefix] - The content to be displayed as a prefix inside the input field.
 * @param {ReactNode} [props.suffix] - The content to be displayed as a suffix inside the input field.
 * @param {boolean} [props.isEditable=true] - Specifies whether the input field is editable.
 * @param {InputBaseProps['autoComplete']} [props.autoComplete] - Controls browser auto-completion behavior.
 * @param {InputBaseProps['onChange']} [props.onChange] - A callback function to handle input changes.
 * @param {InputBaseProps['onBlur']} [props.onBlur] - A callback function to handle input blur events.
 * @param {InputBaseProps['onKeyDown']} [props.onKeyDown] - A callback function to handle keydown events in the input field.
 * @param {string} [props.className] - Additional CSS classes to apply to the `NumberInput` component.
 * @param {boolean} [props.isDisabled=false] - Specifies whether the input field is disabled.
 * @param {boolean} [props.isError=false] - Specifies whether there is an error with the input field.
 * @param {boolean} [props.isRequired=false] - Specifies whether the input is required.
 *
 * @returns {FC} The `NumberInput` component, a specialized input field for numeric values.
 */
const NumberInput = (props: Props) => {
  const { onChange, value, ...rest } = props;

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const isValidValue = isConsistsOnlyNumbers(event?.target?.value || '', true);

    if (isValidValue) {
      onChange?.(event);
    }
  };

  return (
    <Input
      data-testid={TEST_ID}
      onChange={onChangeInput}
      value={isConsistsOnlyNumbers(String(value), true) ? value : ''}
      {...rest}
    />
  );
};

export default NumberInput;
