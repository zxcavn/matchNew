import { Stack, Typography, TypographyProps } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { FormattedMessage } from 'react-intl';

import { ColumnTypesEnum, DateTime, TableColumns } from '@/lib/xfi.lib/components/molecules';
import { DesktopTable } from '@/lib/xfi.lib/components/molecules/Table/DesktopTable';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { useMediaQuery } from '@/lib/xfi.lib/theme';

import { FrozenBalanceContainer, StyledListItem } from './styles';

type Props = {
  balanceList: {
    balance: string;
    completionTime: string;
  }[];
  className?: string;
};

type TableFrozenBalance = Props['balanceList'][0];

const FrozenBalance = ({ balanceList, className }: Props) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  return (
    <FrozenBalanceContainer className={className}>
      <Typography pl={{ md: '1.5rem', xs: '1rem' }} variant="subtitle1">
        <FormattedMessage id="WALLET.FROZEN_BALANCE" values={{ currency: null }} />
      </Typography>
      {isMobile ? (
        <MobileFrozenList balanceList={balanceList} />
      ) : (
        <DesktopTable<TableFrozenBalance> columns={TABLE_COLUMNS} rows={balanceList} />
      )}
    </FrozenBalanceContainer>
  );
};

const TABLE_COLUMNS: TableColumns<TableFrozenBalance> = [
  {
    id: 'balance',
    type: ColumnTypesEnum.jsx,
    label: {
      text: 'SUMMARY.AMOUNT',
    },
    render: ({ balance }) => <FormattedBalance balance={balance} />,
  },
  {
    id: 'completionTime',
    type: ColumnTypesEnum.date,
    label: {
      text: 'SUMMARY.FROZEN_BEFORE',
    },
    extra: ({ completionTime }) => ({ className: 'completionTime', date: completionTime }),
  },
];

const FormattedBalance = ({
  balance,
  typographyProps = {},
}: {
  balance: string;
  typographyProps?: TypographyProps;
}) => {
  const formattedBalance = MxNumberFormatter.formatUnitsToDisplay(balance, {
    withTrailingDots: true,
    maxFractionalLength: CURRENCIES.mpx.formatDecimals,
  });

  return (
    <Typography variant="body1" color="background.light" {...typographyProps}>
      {formattedBalance} {CURRENCIES.mpx.text}
    </Typography>
  );
};

const MobileFrozenList = ({ balanceList }: { balanceList: TableFrozenBalance[] }) => {
  return (
    <Stack mt="1.5rem" gap="1rem">
      {balanceList.map((balance, index) => (
        <StyledListItem key={index} $isFill={Boolean(index % 2)}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" gap="0.5rem">
            <Typography variant="body2" color="neutrals.secondaryText">
              <FormattedMessage id="SUMMARY.AMOUNT" />
            </Typography>
            <FormattedBalance typographyProps={{ textAlign: 'end' }} balance={balance.balance} />
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" gap="0.5rem">
            <Typography variant="body2" color="neutrals.secondaryText">
              <FormattedMessage id="SUMMARY.FROZEN_BEFORE" />
            </Typography>
            <DateTime className="completionTime" dateFormat="PPP" date={balance.completionTime} />
          </Stack>
        </StyledListItem>
      ))}
    </Stack>
  );
};

export default FrozenBalance;
