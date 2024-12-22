import axios from 'axios';
import urlJoin from 'url-join';

import { COSMOS_REST_URL } from '@/shared/constants/variables';

export const cosmosAxiosInstance = axios.create({
  baseURL: urlJoin(COSMOS_REST_URL, 'cosmos'),
});
