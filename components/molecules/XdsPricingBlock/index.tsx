import { Stack, Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import type { PropsWithChildren } from 'react';
import { FormattedMessage } from 'react-intl';

import { Icon } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { InfoIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';

import { StyledBlock, StyledRow } from './styles';

export type XdsPricingBlockProps = {
  usdtPrice: string;
  data: Array<{
    text: {
      /** @type {FormattedMessageId} */
      id: string;
      values?: Parameters<typeof FormattedMessage>[0]['values'];
    };
    amount: bigint;
    isPrimaryText?: boolean;
  }>;
};

const XdsPricingBlock = ({ data, usdtPrice }: XdsPricingBlockProps) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const amountTextAlign = isMobile ? 'left' : 'right';

  return (
    <Stack width="100%">
      <StyledBlock>
        {data.map(({ text, amount, isPrimaryText }) => (
          <StyledRow key={text.id}>
            <Text isPrimary={isPrimaryText} id={text.id} values={text.values} />
            <Text align={amountTextAlign} isPrimary>
              {formatAmount(amount)} {CURRENCIES.xfi.text}
            </Text>
          </StyledRow>
        ))}
      </StyledBlock>

      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap="1rem"
        padding="1rem 1rem 0 1rem"
      >
        <Stack flexDirection="row" alignItems="center" gap="0.5rem">
          <Icon src={InfoIcon} viewBox="0 0 20 20" sx={{ fontSize: '1.25rem' }} />
          <Typography
            variant="body2"
            color="neutrals.secondaryText"
            sx={{
              '&': {
                fontSize: '0.875rem',
                lineHeight: '1.188rem',
              },
            }}
          >
            <FormattedMessage id="SUMMARY.ASSESSED_IN_CURRENCY" values={{ currency: 'USDT' }} />
          </Typography>
        </Stack>
        <Typography variant="body2" color="neutrals.secondaryText">
          ~{MxNumberFormatter.formatToDisplay(usdtPrice, { maxFractionalLength: 6 })}
        </Typography>
      </Stack>
    </Stack>
  );
};

type TextProps = PropsWithChildren<
  Partial<{
    id: string;
    isPrimary: boolean;
    values: Parameters<typeof FormattedMessage>[0]['values'];
    align: Parameters<typeof Typography>[0]['align'];
  }>
>;

const Text = ({ id, values, isPrimary, align, children }: TextProps) => {
  const variant = isPrimary ? 'subtitle1' : 'body1';
  const color = isPrimary ? 'background.light' : 'neutrals.secondaryText';

  return (
    <Typography align={align} variant={variant} color={color}>
      {children || <FormattedMessage id={id} values={values} />}
    </Typography>
  );
};

const formatAmount = (amount: bigint) =>
  MxNumberFormatter.formatUnitsToDisplay(amount, { maxFractionalLength: CURRENCIES.xfi.formatDecimals });

export default XdsPricingBlock;
