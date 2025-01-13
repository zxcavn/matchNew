import { type TypographyProps, Typography } from '@mui/material';
import { type DisplayVariant, type FormatterConfig, CryptoNumberFormatter } from '@xfi/formatters';
import { type ElementType, useMemo } from 'react';

type Props = TypographyProps &
  (
    | {
        units: true;
        value: string | bigint;
      }
    | {
        units: false;
        value: string;
      }
  ) & {
    displayAs: DisplayVariant;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    config?: FormatterConfig;
    component?: ElementType;
  };

const CryptoFormat = ({ value, units, displayAs, prefix, suffix, decimals = 18, config, ...props }: Props) => {
  const formattedValue = useMemo(() => {
    if (units) {
      return CryptoNumberFormatter.formatUnitsToVariantDisplay(value, displayAs, {
        decimals,
        prefix,
        suffix,
        config,
      });
    }

    return CryptoNumberFormatter.formatToVariantDisplay(value as string, displayAs, {
      prefix,
      suffix,
      config,
    });
  }, [value, units, prefix, suffix, config, decimals, displayAs]);

  return (
    <Typography component="span" {...props}>
      {formattedValue}
    </Typography>
  );
};

export default CryptoFormat;
