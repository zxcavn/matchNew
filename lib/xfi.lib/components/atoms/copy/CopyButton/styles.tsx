import { ButtonBase, styled } from '@mui/material';

import { shouldForwardProp } from '../../../../helpers';

export const StyledButton = styled(ButtonBase, { name: 'StyledButton', shouldForwardProp })<{ $isFilled?: boolean }>(
  ({ theme, $isFilled }) => ({
    padding: 0,
    margin: 0,

    '& .MuiSvgIcon-root > path:first-of-type': {
      fillRule: 'unset',
      fill: $isFilled && theme.palette.neutrals.secondaryText,
    },
  })
);
