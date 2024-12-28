import { InputProps, Typography } from '@mui/material';
import clsx from 'clsx';
import { memo } from 'react';

import { LanguageIcon } from '../../../icons';
import { Icon } from '../Icon';
import { type OptionType, type SelectProps, Select } from '../inputs/Select';
import { LanguageSelectorWrapper, SelectInput as StyledSelectInput } from './styles';

export const TEST_ID = 'language-dropdown-test-id';
export const SELECT_TEST_ID = 'language-dropdown-select-test-id';
export const SELECTED_TEST_ID = 'language-dropdown-selected-test-id';
export const DISABLED_SELECTOR_CLASS_NAME = 'disabledSelector';

export type Props = {
  languages: OptionType<string>[];
  locale: string;
  onLanguageChange: SelectProps['onChange'];
  className?: string;
};

const LanguageDropdown = memo(({ languages, locale, onLanguageChange, className }: Props) => {
  const isSingleLanguage = languages.length <= 1;

  return (
    <LanguageSelectorWrapper
      className={clsx(className, { [DISABLED_SELECTOR_CLASS_NAME]: isSingleLanguage })}
      data-testid={TEST_ID}
    >
      <Select
        options={languages}
        value={locale}
        input={<SelectInput isPrevented={isSingleLanguage} />}
        onChange={onLanguageChange}
        isChevronHidden
      />
    </LanguageSelectorWrapper>
  );
});

const SelectInput = ({ isPrevented = false, ...props }: InputProps & { isPrevented?: boolean }) => {
  return (
    <StyledSelectInput
      {...props}
      type={'hidden'}
      startAdornment={
        <div className={clsx('localeButton', props.inputProps?.open && 'open')}>
          <Icon src={LanguageIcon} sx={{ fontSize: '1.25rem' }} viewBox="0 0 20 20" />
          <Typography
            fontSize="1.125rem"
            color="background.light"
            textTransform="capitalize"
            data-testid={SELECTED_TEST_ID}
          >
            {String(props.value)}
          </Typography>
        </div>
      }
      endAdornment={null}
      data-testid={SELECT_TEST_ID}
      {...(isPrevented && {
        onClick: e => {
          isPrevented && e.preventDefault();
        },
      })}
    />
  );
};

export default LanguageDropdown;
