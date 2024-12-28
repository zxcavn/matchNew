import { Box, Stack } from '@mui/material';

import { WALLETS_CARDS } from '@/shared/constants';

import { EcosystemCard, ResourcesTitle } from '@/components/molecules';

const WalletsCards = () => {
  return (
    <Stack component={'section'} gap={'2.75rem'}>
      <ResourcesTitle position={'.03'} title={'SUMMARY.WALLETS'} />
      <Box className="walletsBlock">
        {WALLETS_CARDS.map(card => (
          <EcosystemCard card={card} key={card.href} isBox />
        ))}
      </Box>
    </Stack>
  );
};

export default WalletsCards;
