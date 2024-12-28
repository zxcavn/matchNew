import { Box, styled } from '@mui/material';

import { Block } from '@/lib/xfi.lib/components/atoms';

export const StyledBlock = styled(Block, { name: 'StyledBlock' })(({ theme }) => ({
  backdropFilter: 'blur(1rem)',

  [theme.breakpoints.down('md')]: {
    padding: '1rem',
  },
}));

export const StyledSeedPhraseContainer = styled(Box, { name: 'StyledSeedPhraseContainer' })(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '2rem',
  width: '100%',
}));

export const SeedPhraseTable = styled(Box, { name: 'SeedPhraseTable' })(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(5, 1fr)',
  gridAutoFlow: 'column',
  columnGap: '3.5rem',
  rowGap: '1.94rem',

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(8, 1fr)',
    flexGrow: 1,
  },
}));

export const PhrasePartContainer = styled(Box, { name: 'PhrasePartContainer' })(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
}));
