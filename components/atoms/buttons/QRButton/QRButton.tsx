import type { MouseEvent } from 'react';
import { useRef, useState } from 'react';
import QRCode from 'react-qr-code';

import { Button, Icon, Tooltip } from '@/lib/xfi.lib/components/atoms';
import { QRCodeIcon } from '@/lib/xfi.lib/icons';
import { theme } from '@/lib/xfi.lib/theme';

import { StyledIconContainer, StyledPopover, StyledQRCode } from './styles';

export const TEST_ID = 'qr-button-test-id';

export type Props = {
  value: string;
};

const QRButton = ({ value }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'qr-popover-id' : undefined;

  return (
    <>
      <StyledPopover
        disableAutoFocus
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        id={id}
        open={open}
        onClose={handleClose}
      >
        <StyledQRCode data-testid={TEST_ID}>
          <QRCode fgColor={theme.palette.common.black} style={{ width: '7rem', height: '7rem' }} value={value} />
        </StyledQRCode>
      </StyledPopover>
      <Tooltip title="SUMMARY.QR_CODE">
        <Button ref={buttonRef} size="largeIcon" variant="secondary" aria-describedby={id} onClick={handleClick}>
          <StyledIconContainer>
            <Icon src={QRCodeIcon} viewBox={'0 0 20 20'} />
          </StyledIconContainer>
        </Button>
      </Tooltip>
    </>
  );
};

export default QRButton;
