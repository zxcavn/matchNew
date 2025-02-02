import { styled } from '@mui/material';

import { Tooltip } from '../../../../../../components/atoms/Tooltip';

export const StyledPasswordInput = styled(Tooltip, { name: 'StyledPasswordInput' })(({ theme }) => ({
  '& .MuiTooltip-tooltip': {
    width: 'max-content',
    height: 'max-content',
    background: theme.palette.neutrals.main,
    maxWidth: 'none',
  },

  '& .MuiTooltip-popper': {
    width: 'max-content',
    height: 'max-content',
  },

  '.tooltipTitle': {
    fontSize: '1rem',
    fontWeight: 600,
  },

  '.passRules': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
  },

  '.listMarker': {
    width: '0.25rem',
    height: '0.25rem',
    borderRadius: '50%',
    background: theme.palette.neutrals.buttonText,
  },
}));
