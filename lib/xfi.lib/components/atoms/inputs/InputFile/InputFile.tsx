import { Stack, Typography } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import { useCallback, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { AttachmentIcon, CloseIcon } from '../../../../icons';
import { theme } from '../../../../theme';
import { Icon } from '../../Icon';
import { renderInputText } from '../helpers';
import type { CommonInputProps, InputText } from '../types';
import {
  StyledDeleteButton,
  StyledFileItem,
  StyledFilesButton,
  StyledInputFile,
  StyledInputFileWrapper,
} from './styles';

export const TEST_ID = 'input-file-test-id';
export const INPUT_TEST_ID = 'input-test-id';
export const DELETE_BUTTON_TEST_ID = 'delete-button-test-id';

export type Props = CommonInputProps & {
  name: string;
  value: File[];
  onChange?: (e: { target: { value: File[]; name: string } }) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
  onCustomClick?: () => void;
  acceptFormats?: string[];
  max?: number;
  caption?: InputText;
  /** @type {FormattedMessageId} */
  buttonText?: string;
  label?: InputText;
  inputClassName?: string;
};

const InputFile = ({
  value = [],
  onChange: onChangeProp,
  onCustomClick,
  buttonText,
  acceptFormats = ['.png'],
  max,
  isError,
  caption,
  name,
  className,
  isDisabled,
  label,
  isRequired,
  inputClassName,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChanges = useCallback(
    (value: File[]) => {
      const event = {
        target: { value, name },
      };

      onChangeProp && onChangeProp(event);
    },
    [name, onChangeProp]
  );

  const onChange = () => {
    if (inputRef.current?.files && inputRef.current.files.length) {
      addFiles(Array.from(inputRef.current.files));

      inputRef.current.value = '';
    }
  };

  const addFiles = (files: File[]) => {
    const updateValue = max ? [...files, ...value]?.slice(0, max) : [...files, ...value];

    handleChanges(updateValue);
  };

  const onDelete = (index: number) => {
    const updateValue = [...value];

    updateValue.splice(index, 1);

    handleChanges(updateValue);
  };

  const onClick = () => {
    if (onCustomClick) {
      onCustomClick();
    } else {
      inputRef.current && inputRef.current.click();
    }
  };

  return (
    <StyledInputFileWrapper className={className} data-testid={TEST_ID}>
      {label && (
        <Typography variant="body2" className="labelWrapper" color="neutrals.secondaryText">
          {renderInputText(label)}
          {isRequired && <div className="isRequired">*</div>}
        </Typography>
      )}
      <StyledInputFile
        variant={'transparent'}
        className={inputClassName}
        sx={{ borderColor: isError ? theme.palette.alerts.error : theme.palette.neutrals.border }}
      >
        {!isEmpty(value) && (
          <Stack gap={'0.5rem'}>
            {value.map((value: File, index: number) => {
              return (
                <StyledFileItem key={index}>
                  <Typography color="background.light" key={value.name} sx={{ wordBreak: 'break-all' }}>
                    {value.name}
                  </Typography>
                  <StyledDeleteButton
                    data-testid={DELETE_BUTTON_TEST_ID}
                    src={CloseIcon}
                    viewBox="0 0 20 20"
                    onClick={() => onDelete(index)}
                  />
                </StyledFileItem>
              );
            })}
          </Stack>
        )}
        <StyledFilesButton onClick={onClick} $disabled={isDisabled}>
          <Icon src={AttachmentIcon} viewBox="0 0 20 20" />
          <Typography variant="buttonText2" color={'primary.main'}>
            <FormattedMessage id={buttonText || 'LIB.SUMMARY.CHOOSE_FILES'} />
          </Typography>
        </StyledFilesButton>
        {isError && (
          <Typography variant="body2" color="alerts.error">
            {renderInputText(caption)}
          </Typography>
        )}

        <input
          data-testid={INPUT_TEST_ID}
          hidden
          disabled={isDisabled}
          multiple
          ref={inputRef}
          type="file"
          accept={acceptFormats.join()}
          onChange={onChange}
        />
      </StyledInputFile>
    </StyledInputFileWrapper>
  );
};

export default InputFile;
