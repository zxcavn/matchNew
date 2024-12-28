import axios from 'axios';
import urlJoin from 'url-join';

import { XFI_SCAN_URL } from '@/shared/constants/variables';

export const xfiScanAxiosInstance = axios.create({
  baseURL: urlJoin(XFI_SCAN_URL, 'api', '1.0'),
});
