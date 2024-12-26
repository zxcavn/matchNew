import { Stack } from '@mui/material';

import { Link } from '@/lib/xfi.lib/components/atoms';



export const TEST_ID = 'token-test-id';

export type Props = {
  symbol: string;
  name: string;
  contractAddress: string;
  explorerUrl: string;
};

const Token = ({ symbol, name, contractAddress, explorerUrl }: Props) => {
  return (
    <Stack direction="row" alignItems="center" gap="0.625rem" data-testid={TEST_ID}>
      <Link target="_blank" isShowIcon href={explorerUrl}>
        {name}
      </Link>
    </Stack>
  );
};

export default Token;
