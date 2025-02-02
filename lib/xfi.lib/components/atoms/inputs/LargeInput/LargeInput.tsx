import { Box, listClasses, MenuItem, Stack } from '@mui/material';
import { isConsistsOnlyNumbers } from '@xfi/helpers';
import { ChangeEvent, FocusEvent, FocusEventHandler, useCallback, useMemo, useState, type ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { Icon } from '../../../../../../components/atoms/Icon';
import { ArrowDownIcon, ArrowUpIcon } from '../../../../icons';
import { ThemeSxProps } from '../../../../theme';
import { CleanButton } from '../../CleanButton';
import { Dropdown } from '../../Dropdown';
import { getInputPlaceholder, renderInputText } from '../helpers';
import type { CommonInputProps, InputPlaceholder, InputText } from '../types';
import { StyledCaptionContainer, StyledFormControl, StyledHelperText, StyledInput, StyledInputLabel } from './styles';

export const TEST_ID = 'largeInput-test-id';
export const TRIGGER_TEST_ID = 'trigger-test-id';
export const OPTION_TEST_ID = 'option-test-id';

export type DropdownItem = {
  label: ReactNode;
  value: string;
};

export type Props = CommonInputProps &
  Partial<{
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    onBlur: FocusEventHandler;
    defaultValue: string;
    maxLength: number;
    placeholder: InputPlaceholder;
    label: InputText;
    caption: InputText;
    action: ReactNode;
    isEditable: boolean;
    inputSxProps: ThemeSxProps;
    hasCaptionPadding?: boolean;
    inputType?: 'number' | 'text';
  }> &
  (
    | {
        type: 'default';
      }
    | {
        type: 'dropdown';
        dropdownValue?: DropdownItem['value'];
        dropdownConfig: DropdownItem[];
        onDropdownChange?: (value: string) => void;
        dropdownSxProps?: ThemeSxProps;
      }
  );

const LargeInput = (props: Props) => {
  const {
    type,
    placeholder,
    label,
    caption,
    isRequired,
    isDisabled,
    isError,
    onChange,
    onFocus,
    onBlur,
    className,
    isEditable = true,
    value,
    inputSxProps,
    action,
    maxLength,
    inputType,
    hasCaptionPadding: hasCaptionPaddingProp,
    ...other
  } = props;
  const { formatMessage } = useIntl();
  const [hasFocus, setHasFocus] = useState(false);

  const handleFocus = useCallback(() => {
    if (isEditable) {
      setHasFocus(true);
      onFocus?.();
    }
  }, [isEditable, onFocus]);

  const handleBlur = useCallback(
    (event: FocusEvent) => {
      setHasFocus(false);
      onBlur?.(event);
    },
    [onBlur]
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (inputType === 'number') {
        const isValidValue = isConsistsOnlyNumbers(event?.target?.value || '', true);

        if (isValidValue) {
          onChange?.(event);
        }
      } else {
        onChange?.(event);
      }
    },
    [inputType, onChange]
  );

  const placeholderText = getInputPlaceholder(formatMessage)(placeholder);
  const labelText = renderInputText(label);
  const hasCaptionPadding = !!caption || type === 'dropdown' || hasCaptionPaddingProp;

  return (
    <StyledFormControl className={className} error={isError}>
      <StyledInputLabel shrink>{labelText}</StyledInputLabel>
      <StyledInput
        $type={type}
        $hasAction={!!action}
        $hasCaption={hasCaptionPadding}
        $hasFocus={hasFocus}
        $hasLabel={!!label}
        data-testid={TEST_ID}
        sx={inputSxProps}
        placeholder={placeholderText}
        required={isRequired}
        disabled={isDisabled}
        autoComplete="off"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        readOnly={!isEditable}
        inputProps={{ maxLength }}
        endAdornment={
          type === 'default' ? (
            <DefaultAdornment
              {...other}
              value={value}
              onChangeInput={e => {
                onChange?.(e);
                setHasFocus(false);
              }}
            />
          ) : (
            <DropdownAdornment
              dropdownConfig={props.dropdownConfig}
              dropdownValue={props.dropdownValue}
              onDropdownChange={props.onDropdownChange}
              sx={props.dropdownSxProps}
            />
          )
        }
        {...other}
      />
      {(!!action || !!caption) && (
        <StyledHelperText $hasAction={!!action} $hasCaption={!!caption}>
          <StyledCaptionContainer $isError={isError} as="div" variant="body2">
            {renderInputText(caption)}
          </StyledCaptionContainer>
          {!isError && action && <div>{action}</div>}
        </StyledHelperText>
      )}
    </StyledFormControl>
  );
};

type DefaultAdornmentProps = Pick<Props, 'id' | 'name' | 'value'> & {
  onChangeInput: (value: ChangeEvent<HTMLInputElement>) => void;
};

const DefaultAdornment = ({ value, onChangeInput, ...inputProps }: DefaultAdornmentProps) => {
  return (
    Boolean(value) && (
      <Stack height="1.375rem" justifyContent="center">
        <CleanButton
          onClick={() => {
            onChangeInput({ target: { value: '', ...inputProps } } as ChangeEvent<HTMLInputElement>);
          }}
        />
      </Stack>
    )
  );
};

type DropdownAdornmentProps = {
  dropdownValue?: DropdownItem['value'];
  dropdownConfig: DropdownItem[];
  onDropdownChange?: (value: string) => void;
  sx?: ThemeSxProps;
};

const DropdownAdornment = ({ dropdownValue, dropdownConfig, onDropdownChange, sx }: DropdownAdornmentProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onDropdownSelect = (dropdownItem: DropdownItem) => {
    onDropdownChange?.(dropdownItem.value);
    setIsDropdownOpen(false);
  };

  const displayLabel = useMemo(
    () => dropdownConfig.find(({ value }) => value === dropdownValue)?.label || dropdownConfig[0]?.label,
    [dropdownValue, dropdownConfig]
  );

  const isShowCollapseIcon = dropdownConfig.length > 1;

  const triggerContainerRightPadding = isShowCollapseIcon ? '0.5rem' : '0.75rem';

  return (
    <Dropdown
      triggerContainerSx={{
        height: '2rem',
        display: 'flex',
        padding: `0 ${triggerContainerRightPadding} 0 0.25rem`,
        borderRadius: '1.5rem',
        background: theme => theme.palette.neutrals.dark,
        cursor: isShowCollapseIcon ? 'pointer' : 'initial',
        ...sx,
      }}
      sx={{
        [`.${listClasses.root}`]: { gap: '0.5rem' },
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      trigger={
        <Stack
          data-testid={TRIGGER_TEST_ID}
          direction={'row'}
          alignItems={'center'}
          whiteSpace={'nowrap'}
          gap="0.5rem"
          onClick={() => isShowCollapseIcon && setIsDropdownOpen(true)}
        >
          <Box
            sx={{
              WebkitTextFillColor: theme => theme.palette.background.light,
              fontSize: theme => theme.typography.body2.fontSize,
            }}
          >
            {displayLabel}
          </Box>

          {isShowCollapseIcon && (
            <Icon src={isDropdownOpen ? ArrowUpIcon : ArrowDownIcon} viewBox="0 0 20 20" sx={{ fontSize: '1rem' }} />
          )}
        </Stack>
      }
      isOpen={isDropdownOpen}
      onClose={() => setIsDropdownOpen(false)}
    >
      {dropdownConfig.map(dropdownItem => {
        return (
          <MenuItem key={dropdownItem.value} onClick={() => onDropdownSelect(dropdownItem)}>
            <Stack
              data-testid={OPTION_TEST_ID}
              direction={'row'}
              alignItems={'center'}
              sx={{
                fontSize: theme => theme.typography.body2.fontSize,
              }}
            >
              {dropdownItem.label}
            </Stack>
          </MenuItem>
        );
      })}
    </Dropdown>
  );
};

export default LargeInput;
