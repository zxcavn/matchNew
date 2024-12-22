import { Box, Stack } from '@mui/material';

import { PRODUCTS_CARDS } from '@/shared/constants';

import { ProductCard, ResourcesTitle } from '@/components/molecules';

const ProductsCards = () => {
  return (
    <Stack component={'section'} gap={'2.75rem'}>
      <ResourcesTitle position={'.01'} title={'SUMMARY.PRODUCTS'} />
      <Box className="productsBlock">
        {PRODUCTS_CARDS.map(card => (
          <ProductCard card={card} key={card.description} />
        ))}
      </Box>
    </Stack>
  );
};

export default ProductsCards;
