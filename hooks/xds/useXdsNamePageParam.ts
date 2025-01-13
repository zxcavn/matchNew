import { useQueryParam } from '@xfi/hooks';

import { ROOT_XDS_DOMAIN } from '@/services/xds/constants';

export const useXdsNamePageParam = () => {
  const name = useQueryParam('name').toLowerCase();
  const displayName = `${name}.${ROOT_XDS_DOMAIN}`;

  return { name, displayName };
};

export default useXdsNamePageParam;
