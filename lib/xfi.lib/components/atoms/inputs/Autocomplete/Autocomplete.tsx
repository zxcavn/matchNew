import {
    AutocompleteProps,
    Box,
    ClickAwayListener,
    Autocomplete as MUIAutocomplete,
    MenuItem,
    SelectChangeEvent,
    Typography,
    createFilterOptions,
} from '@mui/material';
import clsx from 'clsx';
import { ReactElement, useCallback, useEffect, useId, useState } from 'react';
import { useIntl } from 'react-intl';

import { Icon } from '../../../../../../components/atoms/Icon';
import { ArrowDownIcon } from '../../../../icons';
import { Input } from '../Input';
import { renderAutocompleteText, renderInputText } from '../helpers';
import { StyledSelectContainer } from '../styles';
import type { AutocompleteText, CommonInputProps, InputPlaceholder, InputText } from '../types';

export const TEST_ID = 'autocomplete-test-id';
export const AUTOCOMPLETE_NONE_VALUE = '-';

export type AutocompleteOptionType<T = string | string[]> = {
  value: T;
  label?: AutocompleteText;
};

export type Props = Pick<AutocompleteProps<string, boolean, true, false>, 'onBlur' | 'onFocus'> &
  CommonInputProps & {
    options: AutocompleteOptionType[];
    value: string | string[];
    isAutoWidth?: boolean;
    label?: InputText;
    placeholder?: InputPlaceholder;
    caption?: InputText;
    input?: ReactElement;
    isChevronHidden?: boolean;
    onChange?: (event: SelectChangeEvent, option: AutocompleteOptionType) => void;
  };

const Autocomplete = (props: Omit<Props, 'type'>) => {
  const {
    options,
    label,
    value = null,
    onChange,
    className,
    isError,
    isDisabled,
    placeholder,
    caption,
    ...rest
  } = props;
  const currentValue =
    options.find((option: { value: string | string[] | null }) => option.value === value) || options[0];

  const { formatMessage, locale } = useIntl();

  const [option, setOption] = useState<AutocompleteOptionType>(currentValue);
  const [isOpen, setIsOpen] = useState(false);
  const handleClickAway = () => {
    setIsOpen(false);
  };

  const onOptionChange = useCallback(
    (event: SelectChangeEvent, option: AutocompleteOptionType) => {
      setOption(option);

      onChange?.(event, option);
    },
    [onChange]
  );

  useEffect(() => {
    setOption(currentValue);
  }, [locale]);

  const noResultsText = (
    <Typography variant={'body1'} color={'neutrals.secondaryText'}>
      {formatMessage({ id: 'LIB.SUMMARY.NOT_FOUND' })}
    </Typography>
  );

  const id = useId();

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <StyledSelectContainer data-testid={TEST_ID}>
          {label && (
            <Box className="title">
              <Typography variant="body2" color="neutrals.secondaryText">
                {renderInputText(label)}
              </Typography>
            </Box>
          )}
          <MUIAutocomplete
            {...rest}
            id={id}
            options={options}
            multiple={false}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            noOptionsText={noResultsText}
            filterOptions={createFilterOptions({ trim: true })}
            disabled={isDisabled}
            disableClearable
            value={option}
            onChange={(event, child) => onOptionChange(event as SelectChangeEvent, child)}
            open={isOpen}
            renderInput={params => (
              <Input autoComplete={'new-password'} placeholder={placeholder} isError={isError} {...params} id={id} />
            )}
            getOptionLabel={option => String(renderAutocompleteText(option.label)) || ''}
            renderOption={(props, option: AutocompleteOptionType) => (
              <MenuItem disableGutters {...props}>
                {renderInputText(option.label)}
              </MenuItem>
            )}
            popupIcon={<PopupIcon />}
            className={clsx(className, {
              isError,
              isDisabled,
            })}
          />
          {caption && (
            <Typography variant="body2" className={clsx('captionWrapper', { isError })}>
              {renderInputText(caption)}
            </Typography>
          )}
        </StyledSelectContainer>
      </div>
    </ClickAwayListener>
  );
};

const PopupIcon = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Icon src={ArrowDownIcon} sx={{ fontSize: '1.25rem' }} viewBox="0 0 20 20" />
  </Box>
);

export default Autocomplete;
