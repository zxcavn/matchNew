import {
    FormControlLabel,
    FormHelperText,
    Checkbox as MUICheckbox,
    CheckboxProps as MUICheckboxProps,
} from '@mui/material';
import clsx from 'clsx';
import { ElementType } from 'react';

import { Icon } from '../../../../../../components/atoms/Icon';
import { renderInputText } from '../helpers';
import type { CommonInputProps, InputText, LabelPlacement } from '../types';
import { StyledSwitchContainer } from './styles';

export const TEST_ID = 'switch-test-id';

export type Icon = {
  src: ElementType;
  viewBox: string;
};

export type Icons = {
  default: Icon;
  checked: Icon;
};

export type Props = CommonInputProps &
  Partial<{
    id: string;
    value: boolean;
    defaultChecked: boolean;
    labelPlacement: LabelPlacement;
    caption: InputText;
    label: InputText;
    icons?: Icons;
    onChange: MUICheckboxProps['onChange'];
  }>;

/**
 * A checkbox input element for selecting options.
 *
 * The `Checkbox` component allows users to select options by toggling a checkbox. It can be customized with various props to control its behavior and appearance.
 *
 * @component
 *
 * @param {Props} props - The props for configuring the `Checkbox` component.
 * @param {string} [props.id] - The unique identifier for the checkbox.
 * @param {boolean} [props.value=false] - The current state of the checkbox.
 * @param {boolean} [props.defaultChecked=false] - The initial state of the checkbox.
 * @param {string} [props.name] - The name of the checkbox.
 * @param {InputText} [props.label] - The label to display next to the checkbox.
 * @param {LabelPlacement} [props.labelPlacement] - The placement of the label in relation to the checkbox.
 * @param {InputText} [props.caption] - Additional text to display below the checkbox.
 * @param {MUICheckboxProps['onChange']} [props.onChange] - A callback function to handle changes in the checkbox state.
 * @param {string} [props.className] - Additional CSS classes to apply to the `Checkbox` component.
 * @param {boolean} [props.isError] - Specifies whether the checkbox has an error.
 * @param {boolean} [props.isRequired] - Specifies whether the checkbox is required.
 * @param {boolean} [props.isDisabled] - Specifies whether the checkbox is disabled.
 * @param {Icons} [props.icons] - The default and checked icons for checkbox.
 *
 * @returns {FC} The `Checkbox` component, a checkbox input element.
 */
const Switch = (props: Props) => {
  const {
    onChange,
    id,
    value = false,
    name,
    isError,
    caption,
    isRequired,
    isDisabled,
    labelPlacement,
    className,
    label,
    icons = null,
  } = props;

  return (
    <StyledSwitchContainer
      className={className}
      required={isRequired}
      error={isError}
      data-testid={TEST_ID}
      $hasIcons={Boolean(icons)}
    >
      <FormControlLabel
        id={id}
        labelPlacement={labelPlacement}
        label={renderInputText(label)}
        disabled={isDisabled}
        className="formControlLabel"
        control={
          <MUICheckbox
            checkedIcon={
              icons ? (
                <div className={clsx('icon', 'checkedIcon')}>
                  <div className="imageWrapper">
                    <Icon className="image" src={icons.checked.src} viewBox={icons.checked.viewBox} />
                  </div>
                </div>
              ) : (
                <span className={clsx('icon', 'checkedIcon')} />
              )
            }
            icon={
              icons ? (
                <div className={'icon'}>
                  <div className="imageWrapper">
                    <Icon className="image" src={icons.default.src} viewBox={icons.default.viewBox} />
                  </div>
                </div>
              ) : (
                <span className="icon" />
              )
            }
            name={name}
            checked={Boolean(value)}
            value={value}
            onChange={onChange}
            disableRipple
          />
        }
      />
      {isError && <FormHelperText>{renderInputText(caption)}</FormHelperText>}
    </StyledSwitchContainer>
  );
};

export default Switch;
