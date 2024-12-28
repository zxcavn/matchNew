import { Box, Stack, styled, SxProps, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { shouldForwardProp } from '@/lib/xfi.lib/helpers';

const NOT_THEME_LINE_GRADIENT = 'linear-gradient(270deg, rgba(13, 184, 242, 0.08) 0%, rgba(13, 184, 242, 0.35) 100%)';

type Props = {
  /** @type {FormattedMessageId} */
  text: string;
  sx?: SxProps;
};

const BlockTitle = ({ text, sx }: Props) => {
  return (
    <Stack gap={'1rem'} direction={'row'} alignItems={'center'} width={'100%'} sx={sx}>
      <StyledText flexShrink={{ md: 0 }}>
        <FormattedMessage
          id={text}
          values={{
            b: value => (
              <StyledText $isPrimaryColor as={'span'}>
                {value}
              </StyledText>
            ),
          }}
        />
      </StyledText>
      <Box
        display={{ md: 'initial', xs: 'none' }}
        width={'100%'}
        height={'1px'}
        flexGrow={1}
        sx={{
          background: NOT_THEME_LINE_GRADIENT,
        }}
      />
    </Stack>
  );
};

const StyledText = styled(Typography, { name: 'StyledText', shouldForwardProp })<{ $isPrimaryColor?: boolean }>(
  ({ theme, $isPrimaryColor }) => ({
    '&': {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: '3rem',
      letterSpacing: '-2%',
      color: $isPrimaryColor ? theme.palette.primary.main : theme.palette.background.light,
      wordWrap: 'break-word',

      [theme.breakpoints.down('lg')]: {
        fontSize: '2rem',
        lineHeight: '2.5rem',
      },
    },
  })
);

export default BlockTitle;
