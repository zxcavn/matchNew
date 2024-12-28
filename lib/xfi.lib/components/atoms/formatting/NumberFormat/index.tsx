import { type TypographyProps, Typography } from '@mui/material';
import { type FormatterConfig, formatNumber, formatUnitNumber } from '@xfi/formatters';
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
    decimals?: number;
    config?: FormatterConfig;
    component?: ElementType;
  };

const NumberFormat = ({ value, units, decimals = 18, config, ...props }: Props) => {
  const formattedValue = useMemo(() => {
    if (units) {
      return formatUnitNumber(value as bigint | string, {
        decimals,
        config,
      });
    }

    return formatNumber(value as string | number, config);
  }, [value, units, decimals, config]);

  return (
    <Typography component="span" {...props}>
      {formattedValue}
    </Typography>
  );
};

export default NumberFormat;
