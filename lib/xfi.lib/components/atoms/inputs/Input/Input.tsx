import { InputProps, TextField as MuiTextField, TextFieldProps, Typography } from '@mui/material';
import clsx from 'clsx';
import { ChangeEvent, forwardRef, ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { getInputPlaceholder, renderInputText } from '../helpers';
import type { CommonInputProps, InputPlaceholder, InputText } from '../types';
import { StyledInputContainer } from './styles';

export const TEST_ID = 'input-test-id';

export type Props = CommonInputProps &
  Partial<{
    value: string;
    defaultValue: string;
    maxLength: number;
    placeholder: InputPlaceholder;
    label: InputText;
    caption: InputText;
    prefix: ReactNode;
    suffix: ReactNode;
    isEditable: boolean;
    multiline: boolean;
    rows: number;
    minRows: number;
    maxRows: number;
    resizable: boolean;
    type?: 'text' | 'password';
  }> &
  Pick<TextFieldProps, 'autoComplete' | 'onChange' | 'onBlur' | 'onFocus' | 'onKeyDown'>;

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    placeholder,
    label,
    prefix,
    suffix,
    caption,
    isRequired,
    isError,
    onChange,
    isDisabled,
    className,
    isEditable = true,
    maxLength,
    resizable = false,
    type = 'text',
    ...other
  } = props;

  const { formatMessage } = useIntl();

  const onChangeInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(event);
  };

  const placeholderText = getInputPlaceholder(formatMessage)(placeholder);

  const { 'data-testid': _, ...otherWithoutTestId } = other;

  return (
    <StyledInputContainer className={className}>
      {label && (
        <Typography variant="body2" className="labelWrapper" color="neutrals.secondaryText">
          {renderInputText(label)}
          {isRequired && <div className="isRequired">*</div>}
        </Typography>
      )}
      <MuiTextField
        data-testid={TEST_ID}
        ref={ref}
        inputProps={{ maxLength }}
        type={'text'}
        className={clsx({ isError, isEditable })}
        onChange={onChangeInput}
        placeholder={placeholderText}
        InputProps={{
          readOnly: !isEditable,
          startAdornment: prefix && <div className="startAdornment">{prefix}</div>,
          endAdornment: suffix && <div className="endAdorned">{suffix}</div>,
          disableUnderline: true,
          disabled: isDisabled,
          type,
          inputProps: resizable
            ? {
                style: { resize: 'vertical', overflowWrap: 'break-word' },
              }
            : undefined,
          ...(otherWithoutTestId as InputProps),
        }}
        {...other}
      />
      {caption && (
        <Typography variant="body2" className={clsx('captionWrapper', 'captionSpace', { isError })}>
          {renderInputText(caption)}
        </Typography>
      )}
    </StyledInputContainer>
  );
});

export default Input;
