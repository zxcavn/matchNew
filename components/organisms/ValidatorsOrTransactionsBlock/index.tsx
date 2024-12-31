import { useState } from 'react';

import { useWallet } from '@/hooks';
import { Tabs } from '@/lib/xfi.lib/components/atoms';
import { useMediaQuery } from '@/lib/xfi.lib/theme';

import { ValidatorsOrTransactionsWrapper } from './styles';

export enum TabType {
  VALIDATORS = 'validators',
  TRANSACTIONS = 'transactions',
}

type ValidatorTabs = Array<{
  value: TabType;
  /** @type {FormattedMessageId} */
  label: string;
}>;

export const VALIDATORS_TABS: ValidatorTabs = [
  { value: TabType.VALIDATORS, label: 'SUMMARY.VALIDATORS' },
  { value: TabType.TRANSACTIONS, label: 'SUMMARY.TRANSACTIONS' },
];

const ValidatorsOrTransactionsBlock = () => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const [tab, setTab] = useState<TabType>(VALIDATORS_TABS[0].value);

  const { oldWallet } = useWallet();

  return (
    <ValidatorsOrTransactionsWrapper>
      <Tabs tabs={VALIDATORS_TABS} value={tab} setTab={setTab} size={isMobile ? 'small' : 'large'} />
    </ValidatorsOrTransactionsWrapper>
  );
};

export default ValidatorsOrTransactionsBlock;
