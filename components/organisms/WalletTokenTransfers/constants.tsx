import { Typography } from '@mui/material';
import { NumberFormatter } from '@xfi/formatters';
import urlJoin from 'url-join';

import { TokenType } from '@/crud';
import { getAddressLink } from '@/helpers';
import { OptionType } from '@/lib/xfi.lib/components/atoms';
import {
  AddressLink,
  Asset,
  ColumnTypesEnum,
  HashLink,
  MobileTableConfig,
  TableColumns,
} from '@/lib/xfi.lib/components/molecules';
import { ALL_VALUE, NONE_VALUE, XFI_SCAN_URL } from '@/shared/constants';
import { TokenTransfer } from '@/store/txs';

export const MOBILE_CONFIG: MobileTableConfig<TokenTransfer> = {
  headerId: 'txHash',
  renderTitle: ({ txHash }) => <HashLink hash={txHash} href={urlJoin(XFI_SCAN_URL, 'tx', txHash)} target="_blank" />,
  unexpandedIds: ['timestamp', 'tokenName', 'quant'],
};

export const TABLE_COLUMNS: TableColumns<TokenTransfer> = [
  {
    type: ColumnTypesEnum.hashLink,
    id: 'txHash',
    label: { text: 'SUMMARY.HASH' },
    extra: ({ txHash }) => ({
      hash: txHash,
      href: urlJoin(XFI_SCAN_URL, 'tx', txHash),
      target: '_blank',
    }),
  },
  {
    type: ColumnTypesEnum.date,
    id: 'timestamp',
    label: { text: 'SUMMARY.DATE' },
    extra: ({ timestamp }) => ({ date: timestamp }),
  },
  {
    type: ColumnTypesEnum.blockLink,
    id: 'blockNumber',
    label: { text: 'SUMMARY.BLOCK' },
    extra: ({ blockNumber }) => ({
      height: blockNumber,
      href: urlJoin(XFI_SCAN_URL, 'block', blockNumber),
      target: '_blank',
    }),
  },
  {
    type: ColumnTypesEnum.jsx,
    id: 'addressFrom',
    label: { text: 'SUMMARY.SENDER' },
    render: ({ addressFrom, xdsNames }) => {
      return addressFrom ? (
        <AddressLink
          xdsName={xdsNames.addressFrom}
          address={addressFrom}
          target="_blank"
          href={getAddressLink(addressFrom)}
        />
      ) : (
        <Typography color="background.light">{NONE_VALUE}</Typography>
      );
    },
  },

  {
    type: ColumnTypesEnum.jsx,
    id: 'addressTo',
    label: { text: 'SUMMARY.RECIPIENT' },
    render: ({ addressTo, xdsNames }) => {
      return addressTo ? (
        <AddressLink
          xdsName={xdsNames.addressTo}
          address={addressTo}
          target="_blank"
          href={getAddressLink(addressTo)}
        />
      ) : (
        <Typography color="background.light">{NONE_VALUE}</Typography>
      );
    },
  },
  {
    id: 'quant',
    label: { text: 'SUMMARY.VALUE', align: 'right' },
    type: ColumnTypesEnum.jsx,
    render: ({ quant, tokenSymbol, decimals, tokenType, contractAddress, tokenId }) => {
      if (tokenType === TokenType.CFC_721) {
        return (
          <AddressLink
            address={contractAddress}
            displayValue={tokenId}
            href={urlJoin(XFI_SCAN_URL, 'token', contractAddress, tokenId)}
            target={'_blank'}
          />
        );
      }

      return quant ? (
        <Asset value={NumberFormatter.formatUnitsToDisplay(quant, { decimals })} text={tokenSymbol?.toUpperCase()} />
      ) : (
        <Typography color="background.light">{NONE_VALUE}</Typography>
      );
    },
  },
];

export const TOKEN_TYPE_OPTIONS: OptionType<string>[] = [
  { value: ALL_VALUE, label: { type: 'intl', id: 'SUMMARY.ALL' } },
  { value: TokenType.CFC_20, label: { type: 'text', text: TokenType.CFC_20 } },
  { value: TokenType.CFC_721, label: { type: 'text', text: TokenType.CFC_721 } },
];
