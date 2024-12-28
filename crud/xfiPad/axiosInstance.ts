import axios from 'axios';
import urlJoin from 'url-join';

import { API_PAD_XFI_FOUNDATION_URL } from '@/shared/constants/variables';

export const padXfiFoundationAxiosInstance = axios.create({
  baseURL: urlJoin(API_PAD_XFI_FOUNDATION_URL, 'api', 'v1'),
});
