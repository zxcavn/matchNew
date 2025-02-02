import { Box, styled } from '@mui/material';

import { Icon, ThemeToggle } from '@/lib/xfi.lib/components/atoms';
import { XfiIcon } from '@/public/icons';

import { LanguageSelector } from '@/components/molecules';

const StyledHeader = styled('header', { name: 'StyledHeader' })(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

type Props = { className?: string };

const AuthHeader = ({ className }: Props) => {
  return (
    <StyledHeader className={className}>
      <Icon
        src={XfiIcon}
        viewBox="0 0 157 44"
        sx={{
          width: { md: '10rem', xs: '8rem' },
          height: 'auto',
        }}
      />
      <Box display={'flex'} alignItems={'center'} gap={{ xs: '1rem', sm: '1.5rem' }}>
        <ThemeToggle />
        <LanguageSelector />
      </Box>
    </StyledHeader>
  );
};

export default AuthHeader;
