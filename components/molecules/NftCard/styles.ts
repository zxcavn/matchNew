import { Stack, styled } from '@mui/material';

import { Button as UIButton } from '@/lib/xfi.lib/components/atoms';
import { shouldForwardProp } from '@/lib/xfi.lib/helpers';

type Props = {
  $isActive: boolean;
};

export const StyledNftCard = styled(Stack, { name: 'StyledNftCard', shouldForwardProp })<Props>(
  ({ theme, $isActive }) => ({
    padding: '1rem',
    gap: '1.25rem',
    borderRadius: '1rem',
    border: '1px solid',
    borderColor: $isActive ? theme.palette.primary.main : theme.palette.neutrals.border,
    cursor: 'pointer',
    overflow: 'hidden',

    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: 'auto',
    },

    '& .imageWrapper': {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '10rem',
      borderRadius: '0.5rem',
      background:
        'linear-gradient(0deg, rgba(1, 5, 22, 0.05), rgba(1, 5, 22, 0.05)),linear-gradient(121.78deg, rgba(255, 255, 255, 0.1) 24.4%, rgba(255, 255, 255, 0) 69.12%)',

      img: {
        borderRadius: '0.5rem',
        objectFit: 'cover',
      },

      [theme.breakpoints.down(1500)]: {
        height: '12.6875rem',
      },

      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: 'auto',
        aspectRatio: '1.3 / 1',
        alignSelf: 'center',
      },
    },

    '& .tokenIdLink': {
      width: '100%',

      p: {
        width: '100%',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        color: theme.palette.secondary.main,
        textDecoration: 'underline',
        textUnderlineOffset: '0.3rem',
      },
    },
  })
);

export const StyledButton = styled(UIButton, { name: 'StyledButton' })(() => ({
  padding: '1rem !important',
  minWidth: '2.75rem',
  width: '2.75rem',
  height: '2.75rem',

  svg: {
    width: '1.25rem',
    height: '1.25rem',
  },

  '& > *:first-of-type': {
    display: 'inherit',
  },
}));
