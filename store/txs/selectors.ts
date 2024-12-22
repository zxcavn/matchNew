import { RootState } from 'store/index';

export const transactionsSelector = (isEvm: boolean) => (state: RootState) => isEvm ? state.txs.evm : state.txs.cosmos;

export const tokenTransfersSelector = (state: RootState) => state.txs.tokenTransfers;
