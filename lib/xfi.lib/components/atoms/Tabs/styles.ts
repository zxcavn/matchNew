import { styled, Tab as MUITab, Tabs as MUITabs } from '@mui/material';

import { shouldForwardProp } from '../../../helpers';
import type { TabSize } from './Tabs';

export const StyledTab = styled(MUITab, { name: 'StyledTab', shouldForwardProp })<{ $size?: TabSize }>(
  ({ theme, $size }) => ({
    padding: $size === 'small' ? '0.375rem 1.5rem 0.5rem' : '0.625rem 1.5rem 0.875rem',
    minHeight: '2.25rem',
    maxWidth: '100%',
    borderRadius: '1.5rem',
    color: theme.palette.neutrals.secondaryText,
    textTransform: 'initial',
    zIndex: 2,
    flexGrow: 1,
    ...theme.typography[$size === 'small' ? 'body1' : 'buttonText1'],

    [theme.breakpoints.down('md')]: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
      ...theme.typography.body1,
    },

    '&.Mui-selected': {
      color: theme.palette.neutrals.buttonText,
    },
  })
);

export const StyledTabs = styled(MUITabs, { name: 'StyledTabs', shouldForwardProp })<{ $size?: TabSize }>(
  ({ theme, $size }) => ({
    padding: '0.25rem',
    width: 'fit-content',
    borderRadius: '1.625rem',
    backgroundColor: theme.palette.neutrals.dark,
    minHeight: $size === 'small' ? '2.75rem' : '3.5rem',

    [theme.breakpoints.down('md')]: {
      width: '100%',
      borderRadius: '1.5rem',
    },

    '& .MuiTabs-flexContainer': {
      height: '100%',
      gap: '0.25rem',
    },

    '& .MuiTabs-indicator': {
      height: '100%',
      borderRadius: '1.5rem',
      backgroundColor: theme.palette.neutrals.main,
      zIndex: 1,
    },
  })
);
