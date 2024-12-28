import { Box, Radio as RadioMUI } from '@mui/material';
import clsx from 'clsx';
import { memo } from 'react';

import { renderInputText } from '../helpers';
import type { CommonInputProps, InputText, LabelPlacement } from '../types';
import { StyledRadioContainer } from './styles';

export const TEST_ID = 'radio-test-id';

export type Props = CommonInputProps &
  Partial<{
    isChecked: boolean;
    value: string;
    onChange: () => void;
    labelPlacement: LabelPlacement;
    label: InputText;
  }>;

/**
 * A radio button component for selecting a single option from a list.
 *
 * The `Radio` component is used for allowing users to select a single option from a list of options. It is a controlled component, and its behavior can be customized using the provided props. It inherits common input properties from the `CommonInputProps` type.
 *
 * @component
 *
 * @param {Props} props - The props for configuring the `Radio` component.
 * @param {string} props.value - The value associated with the radio button.
 * @param {InputText} [props.label] - The label to display alongside the radio button.
 * @param {boolean} [props.isChecked] - Specifies whether the radio button is selected.
 * @param {() => void} [props.onChange] - A callback function to handle changes in the radio button's state.
 * @param {LabelPlacement} [props.labelPlacement="end"] - The placement of the label relative to the radio button. Can be "start" or "end."
 * @param {boolean} [props.isDisabled=false] - Specifies whether the radio button is disabled.
 * @param {string} [props.className] - Additional CSS classes to apply to the `Radio` component.
 *
 * @returns {FC} The `Radio` component, a radio button for selecting a single option.
 */
const Radio = (props: Props) => {
  const { value, label, isChecked, onChange, isDisabled, labelPlacement = 'end', className } = props;

  return (
    <StyledRadioContainer
      data-testid={TEST_ID}
      checked={isChecked}
      className={className}
      value={value}
      disabled={isDisabled}
      onChange={onChange}
      control={
        <RadioMUI
          className="radio"
          icon={<Box className="icon" />}
          checkedIcon={<Box className={clsx('icon', 'checkedIcon')} />}
          disableRipple
        />
      }
      label={renderInputText(label)}
      labelPlacement={labelPlacement}
    />
  );
};

export default memo(Radio);
