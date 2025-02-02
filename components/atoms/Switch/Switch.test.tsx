import { cleanup, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import { ThemeToggleIcon } from './../../../../icons';
import Switch, { type Icons, TEST_ID } from './Switch';

describe('CopyInput component', () => {
  const LABEL_TEXT = 'label-text';
  const CAPTION_TEXT = 'caption-text';

  beforeEach(cleanup);

  test('# component should be rendered on the screen', () => {
    const { getByTestId } = renderWithProviders(<Switch />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });

  test('# renders switch with label if provided', () => {
    const { getByText } = renderWithProviders(<Switch label={{ type: 'text', text: LABEL_TEXT }} />);
    const label = getByText(LABEL_TEXT);

    expect(label).toBeInTheDocument();
  });

  test('# renders switch with icons if provided', async () => {
    const mockIcons: Icons = {
      default: {
        src: ThemeToggleIcon.dark,
        viewBox: '0 0 32 32',
      },
      checked: {
        src: ThemeToggleIcon.light,
        viewBox: '0 0 32 32',
      },
    };

    const { getByTestId } = renderWithProviders(<Switch icons={mockIcons} />);

    const switchElement = getByTestId(TEST_ID);
    const switchSvg = switchElement?.querySelector('svg');

    expect(switchSvg).toBeInTheDocument();
  });

  test('# calls onChange callback when checkbox is toggled', () => {
    const handleChange = jest.fn();
    const { getByRole } = renderWithProviders(<Switch onChange={handleChange} />);

    fireEvent.click(getByRole('checkbox'));

    expect(handleChange).toHaveBeenCalled();
  });

  test('# renders disabled checkbox if isDisabled prop is true', () => {
    const { getByRole } = renderWithProviders(<Switch isDisabled />);

    expect(getByRole('checkbox')).toBeDisabled();
  });

  test('# renders caption if isError provided', () => {
    const { getByText } = renderWithProviders(<Switch isError caption={{ type: 'text', text: CAPTION_TEXT }} />);
    const caption = getByText(CAPTION_TEXT);

    expect(caption).toBeInTheDocument();
  });
});
