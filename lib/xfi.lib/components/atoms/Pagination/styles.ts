import { Box, Stack, styled } from '@mui/material';

import { shouldForwardProp } from '../../../helpers';

type FigureContainerProps = {
  selected?: boolean;
  disabled?: boolean;
};

const flexCenterStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
} as const;

export const StyledNavigationButton = styled(Box, {
  shouldForwardProp,
  name: 'StyledFigureContainer',
})<FigureContainerProps>(({ selected, disabled, theme }) => {
  const color = {
    bg: {
      default: 'transparent',
      hover: 'transparent',
      active: theme.palette.neutrals.dark,
    },
    font: {
      default: theme.palette.neutrals.secondaryText,
      hover: theme.palette.background.light,
      active: theme.palette.background.light,
    },
  };

  return {
    ...flexCenterStyles,
    cursor: disabled ? 'initial' : 'pointer',
    position: 'relative',
    paddingInline: '0.25rem',
    minWidth: '2rem',
    height: '2rem',
    backgroundColor: selected ? color.bg.active : color.bg.default,
    color: selected ? color.font.active : color.font.default,
    borderRadius: '6.25rem',

    '& svg *': {
      stroke: selected ? color.font.active : color.font.default,
      transition: 'color 0.2s',
    },

    '&:hover': !disabled && {
      '@media(hover: hover) and (pointer: fine)': {
        color: !selected && color.font.hover,

        '& svg *': {
          stroke: !selected && color.font.hover,
          transition: 'color 0.2s',
        },
      },
    },
  };
});

export const StyledPaginationContainer = styled(Stack, { name: 'StyledPaginationContainer' })(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',

  '.paginationControls': {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',

    '& .MuiPagination-ul': {
      flexWrap: 'nowrap',

      '& > li:not(:first-of-type) + li': {
        marginLeft: '0.5rem',

        [theme.breakpoints.down('sm')]: {
          marginLeft: '0.25rem',
        },
      },
    },
  },
}));

export const StyledArrowContainer = styled(Box, { name: 'StyledArrowContainer', shouldForwardProp })<{
  $rotate?: boolean;
}>(({ $rotate }) => ({
  transform: $rotate ? 'rotate(180deg)' : 'initial',
  ...flexCenterStyles,
}));
