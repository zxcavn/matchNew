import { Stack, styled, Typography } from '@mui/material';
import { ElementType } from 'react';

import { ValidatorIcon } from '@/lib/xfi.lib/components/atoms';
import { ThemeIcon } from '@/lib/xfi.lib/icons/types';

export const TEST_ID = 'validator-name-test-id';

export type Props = {
  name: string;
  picture?: string;
  iconSrc?: ElementType | ThemeIcon;
  viewBox?: string;
  className?: string;
};

const ValidatorName = ({ name, picture, iconSrc, viewBox, className }: Props) => {
  return (
    <StyledValidatorName className={className} data-testid={TEST_ID}>
      <ValidatorIcon iconSrc={iconSrc} imageSrc={picture} viewBox={viewBox} />
      <Typography variant="body1" color="background.light">
        {name}
      </Typography>
    </StyledValidatorName>
  );
};

export default ValidatorName;

const StyledValidatorName = styled(Stack, { name: 'StyledValidatorName' })(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.625rem',
  whiteSpace: 'nowrap',
}));
