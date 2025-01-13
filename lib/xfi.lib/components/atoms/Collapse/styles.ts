import {
  Accordion as MUIAccordion,
  accordionClasses,
  AccordionDetails,
  AccordionSummary,
  accordionSummaryClasses,
  styled,
} from '@mui/material';

import { AppThemeVariant } from '@/lib/xfi.lib/theme';

export const StyledCollapse = styled(MUIAccordion, { name: 'StyledCollapse' })(({ theme }) => ({
  margin: 0,
  minHeight: 'initial',
  background: 'none',
  boxShadow: 'none',
  overflow: 'hidden',
  border: `1px solid ${theme.palette.neutrals.border}`,

  [`&.${accordionClasses.root}`]: {
    borderRadius: '1.5rem',
  },
}));

export const StyledCollapseSummary = styled(AccordionSummary, { name: 'StyledCollapseSummary' })(({ theme }) => ({
  padding: '1.5rem',
  backgroundColor: theme.palette.neutrals.tableLine,

  [`& .${accordionSummaryClasses.content}`]: {
    margin: 0,
  },

  ...(theme.palette.mode === AppThemeVariant.light && {
    [`& .${accordionSummaryClasses.expandIconWrapper}`]: {
      path: {
        stroke: theme.palette.background.light,
      },
    },
  }),

  [theme.breakpoints.down('md')]: {
    padding: '1rem',
  },
}));

export const StyledCollapseDetails = styled(AccordionDetails, { name: 'StyledCollapseDetails' })(({ theme }) => ({
  padding: '1.5rem',
  position: 'relative',
  overflow: 'hidden',

  [theme.breakpoints.down('md')]: {
    padding: '1rem',
  },
}));
