import axios from 'axios';
import urlJoin from 'url-join';

import { DOMAIN_FAUCET_TESTNET } from '@/shared/constants/variables';

export const faucetAxiosInstance = axios.create({
  baseURL: urlJoin(DOMAIN_FAUCET_TESTNET, 'api'),
});
