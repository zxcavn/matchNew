import { Box, Stack, SxProps } from '@mui/material';
import { ReactNode } from 'react';

import { StyledParallelepiped } from './styles';

type Props = {
  children: ReactNode;
  sx?: SxProps;
};

const Parallelepiped = ({ children, sx }: Props) => {
  return (
    <StyledParallelepiped sx={sx}>
      <Box className={'parallelogram1'} />
      <Box className={'parallelogram2'} />
      <Stack direction={'row'} gap={'1.5rem'}>
        {children}
      </Stack>
    </StyledParallelepiped>
  );
};

export default Parallelepiped;
