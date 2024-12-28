import { ButtonBase, Stack, styled, tooltipClasses, Typography } from '@mui/material';
import { formatAddressToDisplay } from '@xfi/formatters';
import { MouseEventHandler, useCallback, useMemo } from 'react';

import type { PropsWithTestId } from '../../../helpers/test';
import useCopy from '../../../hooks/useCopy';
import { CheckIcon, CopyIcon } from '../../../icons';
import { Icon } from '../Icon';
import { Tooltip, TooltipProps } from '../Tooltip';

export const TEST_ID = 'xds-address-tooltip-test-id';
export const CHECK_ICON_TEST_ID = 'check-icon-test-id';
export const COPY_BUTTON_TEST_ID = 'copy-button-test-id';

export type Props = PropsWithTestId<{
  address: string;
  name: string;
  withCopyAddress?: boolean;
}> &
  Omit<TooltipProps, 'title' | 'name'>;

const XdsAddressTooltip = ({ children, ...rest }: Props) => {
  return (
    <StyledTooltip
      PopperProps={POPPER_PROPS}
      data-testid={TEST_ID}
      leaveTouchDelay={0}
      title={<TooltipContent {...rest} />}
      {...rest}
    >
      {children}
    </StyledTooltip>
  );
};

type TooltipContentProps = Pick<Props, 'address' | 'name' | 'withCopyAddress'>;

const TooltipContent = ({ address, name, withCopyAddress }: TooltipContentProps) => {
  const { isCopied, onCopy } = useCopy();
  const displayAddress = useMemo(() => formatAddressToDisplay(address), [address]);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(event => onCopy(event, address), [onCopy, address]);

  return (
    <Stack alignItems="flex-start" gap="0.5rem">
      <Typography sx={{ overflowWrap: 'anywhere' }} variant="subtitle1" color="neutrals.buttonText">
        {name}
      </Typography>
      <Stack direction="row" alignItems="center" gap="0.5rem">
        <Typography variant="body2">{displayAddress}</Typography>
        {withCopyAddress && (
          <>
            {isCopied ? (
              <Icon data-testid={CHECK_ICON_TEST_ID} sx={{ fontSize: '1.25rem' }} src={CheckIcon} viewBox="0 0 20 20" />
            ) : (
              <ButtonBase data-testid={COPY_BUTTON_TEST_ID} onClick={onClick}>
                <Icon sx={{ fontSize: '1.25rem' }} src={CopyIcon.dark} viewBox="0 0 20 20" />
              </ButtonBase>
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
};

const POPPER_PROPS = {
  modifiers: [
    {
      name: 'flip',
      options: {
        padding: 95,
      },
    },
  ],
};

const StyledTooltip = styled(Tooltip, { name: 'StyledTooltip' })(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: '0.75rem 1rem',
    height: 'initial',
    maxWidth: '16rem',
  },
}));

export default XdsAddressTooltip;
