import { Box, Stack } from '@mui/material';

import { EXPLORERS_CARDS } from '@/shared/constants';

import { EcosystemCard, ResourcesTitle } from '@/components/molecules';

const ExplorersCards = () => {
  return (
    <Stack component={'section'} gap={'2.75rem'}>
      <ResourcesTitle position={'.02'} title={'SUMMARY.EXPLORERS'} />
      <Box className="explorersBlock">
        {EXPLORERS_CARDS.map(card => (
          <EcosystemCard card={card} key={card.href} />
        ))}
      </Box>
    </Stack>
  );
};

export default ExplorersCards;
