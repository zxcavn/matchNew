import { Box, styled } from '@mui/material';
import Image from 'next/image';
import { type ElementType } from 'react';

import { Icon } from '../../../../../components/atoms/Icon';
import { shouldForwardProp } from '../../../helpers';
import { XfiIcon } from '../../../icons';
import type { ThemeIcon } from '../../../icons/types';

export const TEST_ID = 'validator-icon-test-id';

export type Props = Partial<{
  size: `${number}rem`;
  borderRadius: `${number}rem` | `${number}%`;
  iconSrc: ElementType | ThemeIcon;
  viewBox: string;
  imageSrc: string;
  className?: string;
}>;

const ValidatorIcon = ({ size = '1.5rem', imageSrc, iconSrc, viewBox, borderRadius = '50%', className }: Props) => {
  return (
    <Box height={size} data-testid={TEST_ID} className={className}>
      {imageSrc ? (
        <StyledImageContainer borderRadius={borderRadius} $size={size}>
          <Image src={imageSrc} alt="icon" fill sizes="50vh" />
        </StyledImageContainer>
      ) : (
        <Icon src={iconSrc || XfiIcon} viewBox={viewBox || '0 0 32 32'} sx={{ fontSize: size }} />
      )}
    </Box>
  );
};

const StyledImageContainer = styled(Box, { name: 'StyledImageContainer', shouldForwardProp })<{
  $size?: Props['size'];
}>(({ theme, $size }) => ({
  width: $size,
  height: $size,
  backgroundColor: theme.palette.neutrals.dark,
  position: 'relative',
  overflow: 'hidden',

  '& image': {
    objectFit: 'cover',
  },
}));

export default ValidatorIcon;
