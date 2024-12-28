import { Stack, styled } from '@mui/material';

import { shouldForwardProp } from '@/lib/xfi.lib/helpers';

type Props = {
  count: number;
  step: number;
  className?: string;
};

const StepIndicator = ({ count, step, className }: Props) => {
  return (
    <Stack width="100%" direction="row" justifyContent="center" className={className}>
      <Stack direction="row" justifyContent="center" gap="0.25rem">
        {Array.from({ length: count }).map((_, index) => (
          <StyledItem key={`item-${index}`} $isActive={index + 1 === step} />
        ))}
      </Stack>
    </Stack>
  );
};

const StyledItem = styled('span', { name: 'StyledItem', shouldForwardProp })<{ $isActive?: boolean }>(
  ({ theme, $isActive }) => ({
    borderRadius: '0.25rem',
    backgroundColor: $isActive ? theme.palette.primary.light : theme.palette.primary.dark,
    height: '0.313rem',
    width: $isActive ? '1.125rem' : '0.5rem',
    transition: '0.3s width ease',
  })
);

export default StepIndicator;
