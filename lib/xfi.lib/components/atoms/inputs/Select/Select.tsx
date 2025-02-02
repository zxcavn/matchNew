import { Box, SelectProps as MUISelectProps, MenuItem, SelectChangeEvent, Typography } from '@mui/material';
import clsx from 'clsx';
import { ReactElement, ReactNode, useCallback, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import { Icon } from '../../../../../../components/atoms/Icon';
import { ArrowUpIcon } from '../../../../icons';
import { getInputPlaceholder, renderInputText } from '../helpers';
import { StyledSelectContainer } from '../styles';
import type { CommonInputProps, InputPlaceholder, InputText } from '../types';
import { Select as MuiSelect } from './styles';

export const TEST_ID = 'select-test-id';
export const INPUT_TEST_ID = 'input-test-id';
export const OPTION_TEST_ID = 'option-test-id';

export type OptionType<T> = {
  value: T;
  label?: InputText;
};

export type Props = CommonInputProps &
  Pick<MUISelectProps, 'renderValue'> & {
    options: OptionType<string | string[]>[];
    value: string | string[];
    isFullWidth?: boolean;
    variant?: 'primary' | 'transparent';
    label?: InputText;
    placeholder?: InputPlaceholder;
    caption?: InputText;
    input?: ReactElement;
    isChevronHidden?: boolean;
    onChange?: MUISelectProps<string | string[]>['onChange'];
  };

/**
 * A select input element for choosing options from a dropdown menu.
 *
 * The `Select` component allows users to choose from a list of options in a dropdown menu. It can be customized with various props to control its behavior and appearance.
 *
 * @component
 *
 * @param {Props} props - The props for configuring the `Select` component.
 * @param {OptionType<string | string[]>[]} props.options - An array of options for the dropdown.
 * @param {InputText} [props.label] - The label to display above the select input.
 * @param {string | string[]} props.value - The currently selected value(s).
 * @param {boolean} [props.isFullWidth] - A boolean to make the select full width.
 * @param {MUISelectProps<string | string[]>['onChange']} [props.onChange] - A callback function to handle changes in the selected value(s).
 * @param {'primary' | 'transparent'} [props.variant="primary"] - The style variant of the select input.
 * @param {string} [props.className] - Additional CSS classes to apply to the `Select` component.
 * @param {boolean} [props.isError] - Specifies whether the select input has an error.
 * @param {boolean} [props.isDisabled] - Specifies whether the select input is disabled.
 * @param {InputPlaceholder} [props.placeholder] - The placeholder text to display when no option is selected.
 * @param {InputText} [props.caption] - Additional text to display below the select input.
 * @param {ReactElement} [props.input] - A custom input element to use.
 * @param {boolean} [props.isChevronHidden] - Specifies whether the chevron icon is hidden.
 *
 * @returns {JSX.Element} The `Select` component, a select input element.
 */
const Select = (props: Props) => {
  const {
    options,
    label,
    value,
    isFullWidth = false,
    onChange,
    variant = 'primary',
    className,
    isError,
    isDisabled,
    isChevronHidden,
    placeholder,
    caption,
    ...rest
  } = props;

  const ref = useRef<HTMLInputElement>(null);

  const { formatMessage } = useIntl();

  const [isOpen, setIsOpen] = useState(false);

  const onSelectChange = useCallback(
    (event: SelectChangeEvent<string | string[]>, child: ReactNode) => {
      onChange?.(event, child);
    },
    [onChange]
  );

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const placeholderText = getInputPlaceholder(formatMessage)(placeholder);

  return (
    <StyledSelectContainer data-testid={TEST_ID} $isFullWidth={isFullWidth}>
      {label && (
        <Box className="title">
          <Typography variant="body2" color="neutrals.secondaryText">
            {renderInputText(label)}
          </Typography>
        </Box>
      )}
      <MuiSelect
        {...rest}
        inputProps={{ 'data-testid': INPUT_TEST_ID }}
        placeholder={placeholderText}
        disabled={isDisabled}
        open={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onClick={isDisabled ? undefined : () => setIsOpen(!isOpen)}
        value={value}
        onChange={(event, child) => onSelectChange(event as SelectChangeEvent<string | string[]>, child)}
        disableInjectingGlobalStyles
        variant="standard"
        inputRef={ref}
        IconComponent={() => {
          if (isChevronHidden) return null;

          return (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: isOpen ? 'none' : 'rotate(180deg)',
              }}
            >
              <Icon src={ArrowUpIcon} sx={{ fontSize: '1.25rem' }} viewBox="0 0 20 20" />
            </Box>
          );
        }}
        className={clsx(className, {
          [variant]: variant,
          isError,
          isDisabled,
        })}
      >
        {options.map(({ value, label }, index) => {
          return (
            <MenuItem data-testid={OPTION_TEST_ID} key={index} value={value} disableGutters>
              {renderInputText(label)}
            </MenuItem>
          );
        })}
      </MuiSelect>
      {caption && (
        <Typography variant="body2" className={clsx('captionWrapper', { isError })}>
          {renderInputText(caption)}
        </Typography>
      )}
    </StyledSelectContainer>
  );
};

export default Select;
