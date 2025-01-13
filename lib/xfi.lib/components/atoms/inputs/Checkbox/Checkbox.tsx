import {
  Checkbox as MUICheckbox,
  CheckboxProps as MUICheckboxProps,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import clsx from 'clsx';

import { renderInputText } from '../helpers';
import type { CommonInputProps, InputText, LabelPlacement } from '../types';
import { StyledCheckboxContainer } from './styles';

export const TEST_ID = 'checkbox-test-id';
export const ACTION_TEST_ID = 'action-test-id';

export type Props = CommonInputProps &
  Partial<{
    value: boolean;
    id: string;
    labelPlacement: LabelPlacement;
    label: InputText;
    caption: InputText;
    defaultChecked: boolean;
    onChange: MUICheckboxProps['onChange'];
    checkedIconType?: 'check' | 'minus';
  }>;

/**
 * A customizable checkbox input component.
 *
 * The `Checkbox` component allows you to create a checkbox input element with optional labels, captions, and customizable behavior. It's often used in forms to enable users to make binary choices, such as agreeing to terms and conditions.
 *
 * @component
 *
 * @param {Props} props - The props for configuring the `Checkbox` component.
 * @param {boolean} [props.value=false] - The current value (checked/unchecked state) of the checkbox.
 * @param {string} [props.id="checkbox"] - The HTML `id` attribute for the checkbox input.
 * @param {InputText} [props.label] - The label text or JSX content for the checkbox.
 * @param {InputText} [props.caption] - A caption or helper text to provide additional information about the checkbox.
 * @param {boolean} [props.defaultChecked] - The default checked state of the checkbox.
 * @param {function} [props.onChange] - A callback function to handle changes to the checkbox state.
 * @param {LabelPlacement} [props.labelPlacement] - The placement of the label relative to the checkbox (e.g., 'end', 'start', 'top', 'bottom').
 * @param {boolean} [props.isDisabled=false] - Determines whether the checkbox is disabled.
 * @param {string} [props.className] - Additional CSS classes to apply to the component.
 * @param {boolean} [props.isRequired] - Indicates whether the checkbox is required.
 * @param {boolean} [props.isError] - Indicates whether there is an error with the checkbox input.
 *
 * @returns {FC} The `Checkbox` component for creating customizable checkbox inputs.
 */
const Checkbox = (props: Props) => {
  const {
    onChange,
    value = false,
    name,
    isError,
    caption,
    isRequired,
    label,
    id = 'checkbox',
    isDisabled = false,
    labelPlacement,
    className,
    checkedIconType = 'check',
  } = props;

  return (
    <StyledCheckboxContainer data-testid={TEST_ID} className={className} required={isRequired} error={isError}>
      <FormControlLabel
        id={id}
        labelPlacement={labelPlacement}
        label={renderInputText(label)}
        disabled={isDisabled}
        control={
          <MUICheckbox
            data-testid={ACTION_TEST_ID}
            checkedIcon={<span className={clsx('icon', checkedIconType)} />}
            icon={<span className="icon" />}
            name={name}
            checked={value}
            value={value}
            onChange={onChange}
            disableRipple
          />
        }
      />
      {isError && <FormHelperText className="formHelperText">{renderInputText(caption)}</FormHelperText>}
    </StyledCheckboxContainer>
  );
};

export default Checkbox;
