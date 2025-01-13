import { type TypographyProps, Typography } from '@mui/material';
import { type FormatterConfig, MathNumberFormatter } from '@xfi/formatters';
import { type ElementType, useMemo } from 'react';

type Props = TypographyProps &
  (
    | {
        units: true;
        value: string | bigint;
      }
    | {
        units: false;
        value: string | number;
      }
  ) & {
    multiply?: boolean;
    withPercent?: boolean;
    decimals?: number;
    config?: FormatterConfig;
    component?: ElementType;
  };

const PercentFormat = ({ value, units, multiply, withPercent, decimals = 18, config, ...props }: Props) => {
  const formattedValue = useMemo(() => {
    if (units) {
      return MathNumberFormatter.formatUnitsToPercentDisplay(value as string | bigint, {
        decimals,
        multiply,
        withPercent,
        config,
      });
    }

    return MathNumberFormatter.formatToPercentDisplay(value as string | number, { multiply, withPercent, config });
  }, [value, units, multiply, withPercent, decimals, config]);

  return (
    <Typography component="span" {...props}>
      {formattedValue}
    </Typography>
  );
};

export default PercentFormat;
