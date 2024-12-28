import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/lib/xfi.lib/helpers/test';
import { CloseIcon } from '@/lib/xfi.lib/icons';

import '@testing-library/jest-dom';
import ValidatorName, { Props, TEST_ID } from './ValidatorName';

const MOCKS: Props = {
  name: 'Validator Name',
  picture: 'https://example.com/image.jpg',
  iconSrc: CloseIcon,
  viewBox: '0 0 24 24',
  className: 'custom-class',
};

describe('ValidatorName component', () => {
  test('# component should render with correct name', () => {
    renderWithProviders(<ValidatorName name={MOCKS.name} />);
    const validatorNameElement = screen.getByTestId(TEST_ID);

    expect(validatorNameElement).toBeInTheDocument();

    const nameElement = screen.getByText(MOCKS.name);

    expect(nameElement).toBeInTheDocument();
  });

  test('# component should render with picture', () => {
    renderWithProviders(<ValidatorName name={MOCKS.name} picture={MOCKS.picture} />);
    const validatorNameElement = screen.getByTestId(TEST_ID);
    const pictureElement = validatorNameElement.querySelector('img');

    expect(validatorNameElement).toBeInTheDocument();
    expect(pictureElement).toBeInTheDocument();
  });

  test('# component should render with icon', () => {
    renderWithProviders(<ValidatorName name={MOCKS.name} iconSrc={MOCKS.iconSrc} viewBox={MOCKS.viewBox} />);
    const validatorNameElement = screen.getByTestId(TEST_ID);
    const iconElement = validatorNameElement.querySelector('svg');

    expect(validatorNameElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });

  test('# component should render with custom className', () => {
    renderWithProviders(<ValidatorName name={MOCKS.name} className={MOCKS.className} />);
    const validatorNameElement = screen.getByTestId(TEST_ID);

    expect(validatorNameElement).toHaveClass(MOCKS.className!);
  });
});
