import { Typography } from '@mui/material';

import { hashCode } from '@/helpers';

import { StyledTokenAvatar } from './styles';

export const TEST_ID = 'token-avatar-test-id';

export type Props = {
  symbol: string;
  contractAddress: string;
};

const TokenAvatar = ({ symbol, contractAddress }: Props) => {
  const backgroundColor = getTokenColor(contractAddress);

  return (
    <StyledTokenAvatar $backgroundColor={backgroundColor} data-testid={TEST_ID}>
      <Typography className="letter" variant="body2" color="neutrals.buttonText">
        {symbol[0] || ''}
      </Typography>
    </StyledTokenAvatar>
  );
};

const COLORS = [
  '#466E64',
  '#506E46',
  '#6D6E46',
  '#6E5946',
  '#6E5946',
  '#465F6E',
  '#46466E',
  '#5C466E',
  '#6E4648',
  '#46516E',
];

export const getTokenColor = (contractAddress: string): string => {
  const index = hashCode(contractAddress) % COLORS.length;

  return COLORS[index];
};

export default TokenAvatar;
