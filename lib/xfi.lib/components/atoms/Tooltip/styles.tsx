import { styled, Tooltip, tooltipClasses } from '@mui/material';

export const StyledTooltip = styled<typeof Tooltip>(
  ({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />,
  { name: 'StyledTooltip' }
)(({ theme }) => ({
  width: 'fit-content',
  [`& .${tooltipClasses.tooltip}`]: {
    margin: '0 1rem',
    zIndex: 1,
  },

  '&&& .MuiTooltip-tooltipPlacementTop, &&& .MuiTooltip-tooltipPlacementBottom': {
    [theme.breakpoints.down('md')]: {
      marginBottom: '0.5rem',
      marginTop: '0.5rem',
    },
  },
}));
