import { Backdrop, MenuItem, Stack, Typography } from '@mui/material';
import { trimStringAndInsertDots } from '@xfi/helpers';
import { useTruncatedElement } from '@xfi/hooks';
import { ChangeEvent, FocusEvent, useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { formatName } from '@/helpers';
import { useXdsAddressInput } from '@/hooks';
import { type InputProps, Input } from '@/lib/xfi.lib/components/atoms';

import { StyledCollapse, StyledContainer, StyledDropdown, StyledDropdownLoader, StyledLoaderContainer } from './styles';

type Props = InputProps;

export type SearchItem = {
  text: string;
  isValid?: boolean;
};

const XdsAddressInput = ({ onChange: onChangeProp, onFocus: onFocusProp, value = '', ...props }: Props) => {
  const [hasFocus, setHasFocus] = useState(false);
  const resolutionData = useXdsAddressInput({ inputValue: value, isEnabled: hasFocus });

  const onFocus = (event: FocusEvent<HTMLInputElement>) => {
    onFocusProp?.(event);
    setHasFocus(true);
  };

  const closeDropdown = () => {
    setHasFocus(false);
  };

  const onSelectAddress = (address: string) => {
    const fakeEvent = {
      target: {
        id: props.id,
        name: props.name,
        value: address,
      },
    } as ChangeEvent<HTMLInputElement>;

    onChangeProp?.(fakeEvent);
    setHasFocus(false);
  };

  const isShowDropdown = hasFocus && Boolean(value);

  return (
    <>
      <StyledContainer>
        <Input {...props} onFocus={onFocus} onChange={onChangeProp} value={value} />
        <StyledCollapse in={isShowDropdown}>
          <StyledDropdown>
            <DropdownContent onSelectAddress={onSelectAddress} resolutionData={resolutionData} />
            {resolutionData.isLoading && (
              <StyledLoaderContainer>
                <StyledDropdownLoader />
              </StyledLoaderContainer>
            )}
          </StyledDropdown>
        </StyledCollapse>
      </StyledContainer>
      <Backdrop invisible sx={{ zIndex: 1 }} open={isShowDropdown} onClick={closeDropdown} />
    </>
  );
};

type DropdownContentProps = {
  resolutionData: ReturnType<typeof useXdsAddressInput>;
  onSelectAddress: (address: string) => void;
};

const DropdownContent = ({ resolutionData, onSelectAddress }: DropdownContentProps) => {
  const { name, address, error } = resolutionData;

  const onClick = () => {
    if (address) {
      onSelectAddress(address);
    }
  };

  if (error) {
    return (
      <Typography padding="0.5rem 0.75rem" variant="body1" color="neutrals.secondaryText">
        <FormattedMessage id={error} />
      </Typography>
    );
  }

  if (!address) return null;

  return (
    <MenuItem sx={{ padding: '0.5rem 0.75rem' }} onClick={onClick}>
      <Stack gap="0.25rem" width="100%">
        {name ? <XdsName name={name} /> : <TruncatedAddress address={address} />}
        {name && (
          <Typography variant="caption" color="neutrals.secondaryText">
            {trimStringAndInsertDots({
              value: address,
              charsAfterDots: 6,
              charsBeforeDots: 6,
            })}
          </Typography>
        )}
      </Stack>
    </MenuItem>
  );
};

const XdsName = ({ name }: { name: string }) => {
  const formattedName = useMemo(() => formatName(name, { maxLength: 25 }), [name]);

  return (
    <Typography variant="body1" color="background.light">
      {formattedName}
    </Typography>
  );
};

const TruncatedAddress = ({ address }: { address: string }) => {
  const elementRef = useRef<HTMLParagraphElement>(null);
  const { truncatedValue } = useTruncatedElement({ elementRef, elementValue: address });

  return (
    <Typography ref={elementRef} variant="body1" color="background.light">
      {truncatedValue}
    </Typography>
  );
};

export default XdsAddressInput;
