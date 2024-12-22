import { Stack, Typography } from '@mui/material';
import { declensionOfNumber } from '@xfi/helpers';
import { FormattedMessage } from 'react-intl';
import urlJoin from 'url-join';

import { getAddressLink } from '@/helpers';
import {
  AddressLink,
  Asset,
  ColumnTypesEnum,
  HashLink,
  MobileTableConfig,
  TableColumns,
  Text,
} from '@/lib/xfi.lib/components/molecules/Table';
import { type FormattedTx } from '@/lib/xfi.lib/helpers';
import { NONE_VALUE, PAGES, XFI_SCAN_URL } from '@/shared/constants';

export const MOBILE_CONFIG: MobileTableConfig<FormattedTx> = {
  headerId: 'txHash',
  unexpandedIds: ['timestamp', 'type', 'coins'],
  renderTitle: ({ txHash }) => <HashLink hash={txHash} target="_blank" href={urlJoin(XFI_SCAN_URL, 'tx', txHash)} />,
};

export const TABLE_COLUMNS = (locale: string): TableColumns<FormattedTx> => [
  {
    id: 'txHash',
    label: {
      text: 'SUMMARY.HASH',
    },
    type: ColumnTypesEnum.hashLink,
    extra: ({ txHash }) => ({
      hash: txHash,
      href: urlJoin(XFI_SCAN_URL, 'tx', txHash),
      target: '_blank',
    }),
  },
  {
    type: ColumnTypesEnum.date,
    id: 'timestamp',
    label: {
      text: 'SUMMARY.DATE',
    },
    extra: ({ timestamp }) => ({ date: timestamp }),
  },
  {
    type: ColumnTypesEnum.blockLink,
    id: 'height',
    label: { text: 'SUMMARY.BLOCK' },
    extra: ({ height }) => ({
      height,
      href: urlJoin(XFI_SCAN_URL, 'block', height),
      target: '_blank',
    }),
  },
  {
    type: ColumnTypesEnum.jsx,
    id: 'fromAddress',
    label: { text: 'SUMMARY.SENDER' },
    render: ({ fromAddress, xdsNames }) => {
      if (!fromAddress) return <Typography color="background.light">{NONE_VALUE}</Typography>;

      return (
        <AddressLink
          xdsName={xdsNames.fromAddress}
          address={fromAddress}
          href={getAddressLink(fromAddress)}
          target="_blank"
        />
      );
    },
  },
  {
    type: ColumnTypesEnum.jsx,
    id: 'toAddress',
    label: {
      text: 'SUMMARY.RECIPIENT',
    },
    render: ({ toAddress, xdsNames, proposalId }) => {
      if (Array.isArray(toAddress)) {
        return (
          <Asset
            value={toAddress.length}
            text={
              <FormattedMessage
                id={declensionOfNumber(
                  toAddress.length,
                  ['SUMMARY.ADDRESS', 'SUMMARY.ADDRESSES_1', 'SUMMARY.ADDRESSES_2'],
                  locale
                )}
              />
            }
          />
        );
      }

      if (toAddress) {
        return (
          <AddressLink
            xdsName={xdsNames.toAddress}
            address={toAddress}
            href={getAddressLink(toAddress)}
            target="_blank"
          />
        );
      }

      if (proposalId) {
        return (
          <AddressLink
            displayValue={`#${proposalId}`}
            address={proposalId}
            href={urlJoin(PAGES.proposals.pathname, proposalId)}
          />
        );
      }

      return <Typography color="background.light">{NONE_VALUE}</Typography>;
    },
  },
  {
    type: ColumnTypesEnum.badge,
    id: 'type',
    label: {
      text: 'SUMMARY.TYPE_OF_TRANSACTION',
    },
    extra: ({ type, input, code }) => ({ badgeVariant: 'operationType', type, name: input?.methodName, code }),
  },
  {
    id: 'coins',
    type: ColumnTypesEnum.jsx,
    label: {
      text: 'SUMMARY.ASSET',
    },
    render: ({ coins, type }) => {
      if (!coins || !coins.length) {
        return <Text value={NONE_VALUE} />;
      }

      if (type === 'multisend') {
        const id = declensionOfNumber(coins.length, ['SUMMARY.ASSET', 'SUMMARY.ASSETS_1', 'SUMMARY.ASSETS_2'], locale);
        const amount = coins.length;

        return <Asset value={amount} text={<FormattedMessage id={id} />} />;
      }

      return (
        <Stack gap="0.25rem">
          {coins.map((coin, index) => {
            return <Asset value={coin.amount} text={coin.denom.toUpperCase()} key={index} />;
          })}
        </Stack>
      );
    },
  },
  {
    type: ColumnTypesEnum.jsx,
    label: {
      text: 'SUMMARY.COMMISSION',
      align: 'right',
    },
    id: 'commission',
    render: ({ commission }) => (
      <Stack direction="row" alignItems="center" gap="0.25rem">
        <Typography color="neutrals.secondaryText" component="span">
          {commission.amount}
        </Typography>
        <Typography color="neutrals.secondaryText" component="span" textTransform="uppercase">
          {commission.denom}
        </Typography>
      </Stack>
    ),
  },
];
