import { ClickAwayListener, Collapse, Typography } from '@mui/material';
import { redirect } from '@xfi/helpers';
import { ChangeEvent, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { pushNotification } from '@/helpers';
import { useXdsNameAvailability } from '@/hooks/xds';
import { LargeInput } from '@/lib/xfi.lib/components/atoms';
import { PAGES } from '@/shared/constants';

import { SearchResultItem } from './components';
import { StyledDropdown, StyledSearchInputContainer } from './styles';

type Props = {
  initialValue?: string;
  className?: string;
};

const SearchXdsName = ({ initialValue = '', className }: Props) => {
  const [searchName, setSearchName] = useState(initialValue);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const { isLoading, status, error } = useXdsNameAvailability(searchName);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value.toLowerCase());
  };

  const closeDropdown = () => {
    setIsOpenDropdown(false);
  };

  const openDropdown = () => {
    setIsOpenDropdown(true);
  };

  const redirectToRegistration = (name: string) => {
    redirect(PAGES.xds.registration.name(name.toLowerCase()), undefined, {
      scroll: false,
    });
    closeDropdown();
  };

  useEffect(() => {
    if (!error) return;

    pushNotification({
      type: 'error',
      message: { id: 'XDS.SEARCH_XDS_NAME' },
      additional: { id: 'ERRORS.UNEXPECTED_ERROR' },
    });
  }, [error]);

  return (
    <>
      <ClickAwayListener onClickAway={closeDropdown}>
        <StyledSearchInputContainer className={className}>
          <LargeInput
            type={'default'}
            value={searchName}
            onFocus={openDropdown}
            onChange={onChange}
            placeholder={{ type: 'intl', id: 'SUMMARY.SEARCH_FOR_A_NAME' }}
          />
          <Collapse className="collapse" in={isOpenDropdown}>
            <StyledDropdown>
              {!searchName ? (
                <Typography variant="body2" color="background.light">
                  <FormattedMessage id="XDS.TYPE_NAME_TO_SEARCH" />
                  ...
                </Typography>
              ) : (
                <SearchResultItem
                  onClick={redirectToRegistration}
                  isLoading={isLoading}
                  name={searchName}
                  status={status}
                  hasError={Boolean(error)}
                />
              )}
            </StyledDropdown>
          </Collapse>
        </StyledSearchInputContainer>
      </ClickAwayListener>
    </>
  );
};

export default SearchXdsName;
