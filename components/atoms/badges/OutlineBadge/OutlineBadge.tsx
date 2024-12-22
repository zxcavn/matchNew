import { styled, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { AppThemeVariant } from '@/lib/xfi.lib/theme';

export const TEST_ID = 'outline-badge-test-id';

export type Props = {
  /** @type {FormattedMessageId} */
  text: string;
  icon?: ReactNode;
};

const OutlineBadge = ({ icon, text }: Props) => {
  return (
    <StyledBadgeContainer data-testid={TEST_ID}>
      {icon}
      <Typography variant={'body2'} color={'background.light'} sx={{ '&': { lineHeight: '1.188rem' } }}>
        <FormattedMessage id={text} />
      </Typography>
    </StyledBadgeContainer>
  );
};

const StyledBadgeContainer = styled('span', { name: 'StyledBadgeContainer' })(({ theme }) => ({
  padding: '0 1rem',
  minHeight: '2rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  border: `1px solid ${
    theme.palette.mode === AppThemeVariant.dark ? theme.palette.neutrals.border : theme.palette.background.light
  }`,
  borderRadius: '2rem',
}));

export default OutlineBadge;
