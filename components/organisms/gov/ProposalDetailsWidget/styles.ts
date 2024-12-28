import { Stack, styled } from '@mui/material';

import { shouldForwardProp } from '@/lib/xfi.lib/helpers';

export const StyledProposalDetails = styled(Stack, { name: 'StyledProposalDetails', shouldForwardProp })<{
  $isShowMore: boolean;
}>(({ $isShowMore }) => ({
  gap: '1.5rem',

  '& .description': {
    width: '100%',
    maxHeight: $isShowMore ? '625rem' : '16.8125rem',
    overflowWrap: 'anywhere',
    overflow: 'hidden',
    transition: 'max-height 0.5s ease-in-out',
  },

  '& .showButton': {
    marginTop: '1.5rem',
    padding: 0,
  },
}));
