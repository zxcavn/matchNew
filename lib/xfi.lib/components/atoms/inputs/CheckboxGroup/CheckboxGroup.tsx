import { FormGroup, FormHelperText, FormLabel } from '@mui/material';

import { type CheckboxProps, Checkbox } from '../Checkbox';
import { renderInputText } from '../helpers';
import type { CommonInputProps, InputText } from '../types';
import { StyledCheckboxGroupContainer } from './styles';

export const TEST_ID = 'checkbox-group-test-id';

export type Props = CommonInputProps & {
  value: string[];
  defaultValue?: string[];
  options: { label: InputText; name: string }[];
  id?: string;
  label?: InputText;
  caption?: InputText;
  checkboxProps?: CheckboxProps;
  onChange?: (name: string) => void;
};

/**
 * A group of customizable checkboxes.
 *
 * The `CheckboxGroup` component allows you to create a group of checkboxes with optional labels, captions, and customizable behavior. It's often used in forms to enable users to make multiple binary choices from a list of options.
 *
 * @component
 *
 * @param {Props} props - The props for configuring the `CheckboxGroup` component.
 * @param {string[]} [props.value=[]] - The current selected values from the list of checkboxes.
 * @param {string[]} [props.defaultValue] - The default selected values for the checkboxes.
 * @param {object[]} [props.options=[]] - An array of objects, where each object contains a label and a name for a checkbox option.
 * @param {string} [props.id] - The HTML `id` attribute for the checkbox group.
 * @param {InputText} [props.label] - The label text or JSX content for the checkbox group.
 * @param {InputText} [props.caption] - A caption or helper text to provide additional information about the checkbox group.
 * @param {CheckboxProps} [props.checkboxProps] - Additional props to customize the behavior of individual checkboxes.
 * @param {function} [props.onChange] - A callback function to handle changes to the selected values of the checkboxes.
 * @param {boolean} [props.isRequired=false] - Indicates whether the checkbox group is required.
 * @param {boolean} [props.isError] - Indicates whether there is an error with the checkbox group.
 * @param {string} [props.className] - Additional CSS classes to apply to the component.
 *
 * @returns {FC} The `CheckboxGroup` component for creating customizable groups of checkboxes.
 */
const CheckboxGroup = (props: Props) => {
  const {
    onChange,
    value = [],
    options = [],
    isError,
    caption,
    isRequired = false,
    label,
    id,
    checkboxProps,
    className,
  } = props;

  return (
    <StyledCheckboxGroupContainer data-testid={TEST_ID} required={isRequired} error={isError} className={className}>
      {label && (
        <FormLabel component="legend" className="legendTitle">
          {renderInputText(label)}
        </FormLabel>
      )}

      <FormGroup>
        {options.map((item, i) => {
          const { label, name } = item;

          return (
            <Checkbox
              {...checkboxProps}
              key={`checkbox_${id}_${name}_${i}`}
              onChange={() => onChange?.(name)}
              name={name}
              label={label}
              value={value.includes(name)}
            />
          );
        })}
      </FormGroup>
      {isError && <FormHelperText>{renderInputText(caption)}</FormHelperText>}
    </StyledCheckboxGroupContainer>
  );
};

export default CheckboxGroup;
