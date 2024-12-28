import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/lib/xfi.lib/helpers/test';

import '@testing-library/jest-dom';
import NftCard, { Props, TEST_ID } from './NftCard';

const MOCK_IMAGE_URL = 'https://via.placeholder.com/150';

const BASE_PROPS: Props = {
  tokenId: 'tokenIdValue',
  contractAddress: 'contractAddressValue',
  onDeleteClick: () => undefined,
  onCardClick: () => undefined,
  isActive: false,
};

describe('NftCard component', () => {
  test('# should render correctly with image', () => {
    const propsWithImage: Props = {
      ...BASE_PROPS,
      imageData: {
        imageSrc: MOCK_IMAGE_URL,
        alt: 'description',
      },
    };

    const { getByTestId } = renderWithProviders(<NftCard {...propsWithImage} />);
    const cardNftElement = getByTestId(TEST_ID);

    expect(cardNftElement).toBeInTheDocument();
    expect(screen.getByAltText(propsWithImage.imageData?.alt as string)).toBeInTheDocument();
  });

  test('# should render correctly without image', () => {
    const propsWithoutImage: Props = { ...BASE_PROPS };

    const { getByTestId, getByText } = renderWithProviders(<NftCard {...propsWithoutImage} />);
    const cardNftElement = getByTestId(TEST_ID);

    expect(cardNftElement).toBeInTheDocument();
    expect(getByText('NFT')).toBeInTheDocument();
  });
});
