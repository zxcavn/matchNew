import { Box } from '@mui/material';
import clsx from 'clsx';

import { theme } from '@/lib/xfi.lib/theme';

import { getPercent } from '../helpers';
import { StyledProgressLine } from './styles';

export const TEST_ID = 'progress-line-test-id';
export const LINE_TEST_ID = 'line-test-id';

export const ProgressLineClasses = {
  progress: 'progress',
};

type ProgressLineVariant = 'border' | 'solid';
type ProgressLineSize = 'small' | 'medium';

type Props = {
  currentValue: number;
  totalValue: number;
  color?: string;
  className?: string;
  variant?: ProgressLineVariant;
  size?: ProgressLineSize;
  background?: string;
};

const ProgressLine = ({
  className,
  currentValue,
  totalValue,
  variant = 'solid',
  size = 'small',
  color = theme.palette.alerts.success,
  background,
}: Props) => {
  const isBorderVariant = variant === 'border';
  const percent = getPercent({ currentValue, totalValue });
  const gap = isBorderVariant ? (size === 'small' ? '3px' : '4px') : '0px';
  const width = Number(percent) >= 100 ? `calc(100% - ${gap})` : `calc(${percent}% - ${gap})`;

  return (
    <StyledProgressLine
      className={clsx(className, {
        [size]: size,
      })}
      $isBorderVariant={isBorderVariant}
      $background={background}
      data-testid={TEST_ID}
    >
      {Number(percent) > 0 && (
        <Box
          className={clsx(ProgressLineClasses.progress, {
            [size]: size,
          })}
          sx={{
            background: color,
            width,
            height: `calc(100% - ${gap})`,
          }}
          data-testid={LINE_TEST_ID}
        />
      )}
    </StyledProgressLine>
  );
};

export default ProgressLine;
