import { Stack, styled, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { AppThemeVariant, useMediaQuery } from '@/lib/xfi.lib/theme';
import { darkPalette } from '@/lib/xfi.lib/theme/palette';

const ResourcesTitle = ({ position, title }: { position: string; title: string }) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  return (
    <StyledResourcesTitle>
      <Typography color={darkPalette.neutrals.light} variant={'buttonText1'}>
        {position}
      </Typography>
      <Typography color={'background.light'} variant={isMobile ? 'h2' : 'h3'}>
        <FormattedMessage id={title} />
      </Typography>
    </StyledResourcesTitle>
  );
};

export default ResourcesTitle;

const StyledResourcesTitle = styled(Stack, { name: 'StyledResourcesTitle' })(({ theme }) => ({
  padding: '1.875rem 0 2.125rem',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1rem',
  borderBottom: '1px solid',
  borderColor: theme.palette.mode === AppThemeVariant.dark ? 'initial' : theme.palette.neutrals.border,
  borderImage:
    theme.palette.mode === AppThemeVariant.dark
      ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 50%) 30'
      : 'initial',

  [theme.breakpoints.down('md')]: {
    padding: '1.5rem 0',
  },
}));
