import { RootState } from 'store/index';

export const addressSelector = (state: RootState) => state.address;

export const addressDataSelector = (address?: string) => (state: RootState) => state.address.data[address ?? ''];
