import dynamic from 'next/dynamic';

import { StyledEcosystemPage } from './styles';

const ExplorersCards = dynamic(() => import('./components/ExplorersCards'), { ssr: false });
const ProductsCards = dynamic(() => import('./components/ProductsCards'), { ssr: false });
const WalletsCards = dynamic(() => import('./components/WalletsCards'), { ssr: false });
const ValidatorsCards = dynamic(() => import('./components/ValidatorsCards'), { ssr: false });

const EcosystemWidget = () => {
  return (
    <StyledEcosystemPage gap={{ xs: '2rem', md: '4rem' }}>
      <ProductsCards />
      <ExplorersCards />
      <WalletsCards />
      <ValidatorsCards />
    </StyledEcosystemPage>
  );
};

export default EcosystemWidget;
