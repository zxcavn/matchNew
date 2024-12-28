import { FormHelperText, FormLabel, RadioGroup as RadioGroupMUI } from '@mui/material';
import clsx from 'clsx';
import { ChangeEventHandler, memo } from 'react';

import { renderInputText } from '../helpers';
import type { RadioProps } from '../Radio';
import Radio from '../Radio/Radio';
import type { CommonInputProps, InputText } from '../types';
import { StyledRadioGroupContainer } from './styles';

export const TEST_ID = 'radio-group-test-id';

export type Props = CommonInputProps &
  Partial<{
    radioProps: RadioProps;
    options: RadioProps[];
    isRow: boolean;
    value: string;
    defaultValue: string;
    label: InputText;
    onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    caption: InputText;
    color: 'primary' | 'secondary';
  }>;

/**
 * A group of radio buttons used for selecting a single option from multiple choices.
 *
 * The `RadioGroup` component allows users to select a single option from a group of radio buttons. It's a controlled component that provides options for customization through props. It inherits common input properties from the `CommonInputProps` type.
 *
 * @component
 *
 * @param {Props} props - The props for configuring the `RadioGroup` component.
 * @param {string} props.value - The value associated with the selected radio button in the group.
 * @param {InputText} [props.label] - The label to display alongside the radio group.
 * @param {RadioProps[]} [props.options] - An array of `RadioProps` for rendering individual radio buttons in the group.
 * @param {string} [props.name] - The name for the radio group.
 * @param {boolean} [props.isError=false] - Specifies whether the radio group has an error.
 * @param {InputText} [props.caption] - The caption to display beneath the radio group.
 * @param {boolean} [props.isRequired=false] - Specifies whether the radio group is required.
 * @param {RadioProps} [props.radioProps] - Common properties to apply to all radio buttons in the group.
 * @param {boolean} [props.isDisabled] - Specifies whether the radio group is disabled.
 * @param {boolean} [props.isRow=false] - Specifies whether to display the radio buttons in a row layout.
 * @param {string} [props.className] - Additional CSS classes to apply to the `RadioGroup` component.
 *
 * @returns {FC} The `RadioGroup` component, a group of radio buttons for selecting a single option.
 */
const RadioGroup = (props: Props) => {
  const {
    value,
    label,
    onChange,
    options = [],
    name,
    isError = false,
    caption,
    isRequired = false,
    radioProps,
    isDisabled,
    isRow = false,
    className,
  } = props;

  return (
    <StyledRadioGroupContainer
      data-testid={TEST_ID}
      disabled={isDisabled}
      required={isRequired}
      error={isError}
      className={clsx(className, {
        isRow,
        isDisabled,
      })}
    >
      {label && <FormLabel className="label">{renderInputText(label)}</FormLabel>}
      <RadioGroupMUI name={name} value={value} onChange={onChange} row={isRow}>
        {options.map(item => (
          <Radio {...radioProps} {...item} key={item?.value} isChecked={value === item?.value} />
        ))}
      </RadioGroupMUI>
      {caption && <FormHelperText>{renderInputText(caption)}</FormHelperText>}
    </StyledRadioGroupContainer>
  );
};

export default memo(RadioGroup);
