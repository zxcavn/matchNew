import { fireEvent, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders, waitFor } from '../../../helpers/test';
import ImageModal, { CLOSE_BUTTON_TEST_ID, TEST_ID } from './ImageModal';

const CONTENT_TEXT = 'Modal Content';
const CONTENT = <div>{CONTENT_TEXT}</div>;

const setIsOpen = jest.fn();

describe('ImageModal component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('# renders the modal correctly when isOpen is true', () => {
    renderWithProviders(
      <ImageModal isOpen={true} setIsOpen={setIsOpen}>
        {CONTENT}
      </ImageModal>
    );

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    expect(screen.getByText(CONTENT_TEXT)).toBeInTheDocument();

    const closeButton = screen.getByTestId(CLOSE_BUTTON_TEST_ID);

    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(setIsOpen).toHaveBeenCalledWith(false);
  });

  test('# renders the modal correctly when isOpen is false', () => {
    renderWithProviders(
      <ImageModal isOpen={false} setIsOpen={() => {}}>
        {CONTENT}
      </ImageModal>
    );

    expect(screen.queryByTestId(TEST_ID)).toBeNull();
    expect(screen.queryByText(CONTENT_TEXT)).toBeNull();
  });

  test('# closes the modal when Escape key is pressed', async () => {
    renderWithProviders(
      <ImageModal isOpen={true} setIsOpen={setIsOpen}>
        {CONTENT}
      </ImageModal>
    );

    const event = new KeyboardEvent('keydown', { key: 'Escape' });

    document.dispatchEvent(event);

    await waitFor(() => {
      expect(setIsOpen).toHaveBeenCalledTimes(1);
      expect(setIsOpen).toHaveBeenCalledWith(false);
    });
  });
});
