import { SvgIcon } from '@mui/material';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../helpers/test';
import ValidatorIcon, { TEST_ID } from './ValidatorIcon';

const IMAGE_URL = '/';

const ICON = {
  src: SvgIcon,
  viewBox: '0 0 6 6',
};

describe('ValidatorIcon component', () => {
  test('# component should be rendered with default icon', () => {
    const { getByTestId } = renderWithProviders(<ValidatorIcon />);

    const element = getByTestId(TEST_ID);
    const iconElement = element.querySelector('svg');

    expect(element).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });

  test('# component should be rendered with image', () => {
    const { getByTestId } = renderWithProviders(<ValidatorIcon imageSrc={IMAGE_URL} />);

    const element = getByTestId(TEST_ID);
    const image = element.querySelector('img');

    expect(element).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
  });

  test('# component should be rendered with svg icon', () => {
    const { getByTestId } = renderWithProviders(<ValidatorIcon iconSrc={ICON.src} viewBox={ICON.viewBox} />);

    const element = getByTestId(TEST_ID);
    const iconElement = element.querySelector('svg');

    expect(element).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('viewBox', ICON.viewBox);
  });
});
