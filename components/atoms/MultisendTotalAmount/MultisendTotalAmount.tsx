import { Box, Stack, Typography, useTheme } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { FormattedMessage } from 'react-intl';

import { Icon, Tooltip } from '@/lib/xfi.lib/components/atoms';
import { CircleInfoIcon } from '@/lib/xfi.lib/icons';
import { Coin } from '@/shared/types';

export const TEST_ID = 'multisend-total-amount-test-id';
export const COIN_ITEM_TEST_ID = '"coin-item-test-id';
export const COIN_DENOMINATION_TEST_ID = 'coin-denomination-test-id';

export type Props = {
  coins: Coin[];
};

const MultisendTotalAmount = ({ coins }: Props) => {
  const theme = useTheme();

  return (
    <Stack
      gap={{ xs: '1rem', md: '1.5rem' }}
      direction={{ md: 'row' }}
      justifyContent={{ md: 'flex-end' }}
      data-testid={TEST_ID}
      paddingLeft={{ xs: '1rem', md: 0 }}
      marginTop={'1.5rem'}
    >
      <Stack direction={'row'} gap={'0.25rem'}>
        <Typography whiteSpace="nowrap" variant="h4" color="neutrals.secondaryText">
          <FormattedMessage id="SUMMARY.TOTAL_AMOUNT" />
        </Typography>
        <Tooltip title={'SUMMARY.DOESNT_INCLUDE_COMMISSION'} placement={'bottom'}>
          <Box height={'fit-content'}>
            <Icon
              src={CircleInfoIcon}
              sx={{
                fontSize: '1.25rem',
                position: 'relative',
                top: '3px',
                '& path': {
                  fill: theme.palette.neutrals.secondaryText,
                },
                '& circle': {
                  stroke: theme.palette.neutrals.secondaryText,
                },
              }}
              viewBox={'0 0 20 20'}
            />
          </Box>
        </Tooltip>
      </Stack>
      <Stack gap={'0.5rem'} alignItems={{ md: 'flex-end', xs: 'flex-start' }}>
        {coins.map(({ amount, denom }) => (
          <Stack key={denom} direction={'row'} gap={'0.5rem'} data-testid={COIN_ITEM_TEST_ID}>
            <Typography textAlign={'end'} variant={'h4'} color={'background.light'} whiteSpace={{ md: 'nowrap' }}>
              {MxNumberFormatter.formatUnitsToDisplay(amount)}
            </Typography>
            <Typography
              minWidth={'2.5rem'}
              textTransform={'uppercase'}
              variant={'h4'}
              color={'neutrals.secondaryText'}
              data-testid={COIN_DENOMINATION_TEST_ID}
            >
              {denom}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default MultisendTotalAmount;
