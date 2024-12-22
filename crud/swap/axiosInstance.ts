import axios from 'axios';
import urlJoin from 'url-join';

import { SWAP_API_URL } from '@/shared/constants/variables';

export const swapAxiosInstance = axios.create({
  baseURL: urlJoin(SWAP_API_URL, 'api'),
});
