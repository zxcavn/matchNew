import { Box, styled, SxProps } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Button } from '@/lib/xfi.lib/components/atoms';
import { useMediaQuery } from '@/lib/xfi.lib/theme';

export type FormButtonsProps = Partial<{
  isDisabled: boolean;
  isDisabledCancel: boolean;
  isLoading: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  /** @type {FormattedMessageId} */
  submitButtonText: string;
  /** @type {FormattedMessageId} */
  cancelButtonText: string;
  sx: SxProps;
}>;

const FormButtons = ({
  isDisabled,
  isDisabledCancel,
  isLoading,
  onCancel,
  onSubmit,
  submitButtonText = 'SUMMARY.CONFIRM',
  cancelButtonText = 'SUMMARY.CANCEL',
  sx = {},
}: FormButtonsProps) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  return (
    <StyledButtonsContainer sx={sx}>
      <Button
        type="submit"
        isFullWidth={isMobile}
        isDisabled={isDisabled}
        isLoading={isLoading}
        onClick={onSubmit}
        size={'large'}
      >
        <FormattedMessage id={submitButtonText} />
      </Button>
      <Button
        isDisabled={isDisabledCancel}
        isFullWidth={isMobile}
        variant="secondary"
        onClick={onCancel}
        size={'large'}
      >
        <FormattedMessage id={cancelButtonText} />
      </Button>
    </StyledButtonsContainer>
  );
};

const StyledButtonsContainer = styled(Box, { name: 'StyledButtonsContainer' })(({ theme }) => ({
  display: 'flex',
  justifyContent: 'end',
  gap: '1rem',
  width: '100%',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

export default FormButtons;
