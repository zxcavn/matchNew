import { Box, styled, Typography } from '@mui/material';
import { ElementType } from 'react';

export const StyledLink = styled(Typography, {
  name: 'StyledLink',
})<{ component?: ElementType }>(({ theme }) => ({
  position: 'relative',
  width: 'fit-content',
  color: theme.palette.secondary.main,
  cursor: 'pointer',
  whiteSpace: 'nowrap',

  '&:after': {
    content: "''",
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '1px',
    backgroundColor: theme.palette.neutrals.link,
    opacity: 0.4,
    transition: 'opacity 0.3s',
  },

  '&:hover:after': {
    opacity: 0.7,
  },
}));

export const StyledLinkContainer = styled(Box, { name: 'StyledLinkContainer' })(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.375rem',
  width: 'fit-content',
  cursor: 'pointer',

  '& > .linkIcon *': {
    stroke: theme.palette.secondary.main,
  },
}));
