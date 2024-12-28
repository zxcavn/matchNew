import { styled } from '@mui/material';

export const NoticeWidgetWrapper = styled('div')(
  ({ theme }) => ({
    maxWidth: '35rem',

    '& .MuiTypography-root': {
      wordBreak: 'break-word',
      flexGrow: 1,
    },

    '& .textWrapper': {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },

    '& .messageText, .additionalText': {
      color: theme.palette.background.light,
    },
  }),
  { name: 'NoticeWidget' }
);
