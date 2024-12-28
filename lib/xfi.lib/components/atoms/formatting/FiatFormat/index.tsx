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
    prefix?: string;
    suffix?: string;
    decimals?: number;
    config?: FormatterConfig;
    component?: ElementType;
  };

const FiatFormat = ({ value, units, prefix, suffix, decimals = 18, config, ...props }: Props) => {
  const formattedValue = useMemo(() => {
    if (units) {
      return MathNumberFormatter.formatUnitsWithRound(value as string | bigint, { decimals, prefix, suffix, config });
    }

    return MathNumberFormatter.formatWithRound(value as string | number, { prefix, suffix, config });
  }, [value, units, prefix, suffix, decimals, config]);

  return (
    <Typography component="span" {...props}>
      {formattedValue}
    </Typography>
  );
};

export default FiatFormat;
