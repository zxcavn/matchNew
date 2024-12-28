import { fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../helpers/test';
import Modal, { type Props, CLOSE_BUTTON_TEST_ID, TEST_ID } from './Modal';

describe('Modal component', () => {
  const MOCK_PROPS: Props = {
    isOpen: true,
    setIsOpen: jest.fn(),
    children: <div>Modal content</div>,
    footerComponent: <div>Modal footer</div>,
    title: { id: 'modal.title', defaultMessage: 'Modal Title' },
    showCloseButton: true,
    keepMounted: false,
    hideFooter: false,
  };

  test('# component should be rendered with modal content correctly', () => {
    const { getByText, getByTestId } = renderWithProviders(<Modal {...MOCK_PROPS} />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();

    expect(getByText('Modal content')).toBeInTheDocument();
  });

  test('# renders modal footer correctly', () => {
    const { getByText } = renderWithProviders(<Modal {...MOCK_PROPS} />);

    expect(getByText('Modal footer')).toBeInTheDocument();
  });

  test('# renders modal title correctly', () => {
    const { getByText } = renderWithProviders(<Modal {...MOCK_PROPS} />);

    expect(getByText('Modal Title')).toBeInTheDocument();
  });

  test('# renders close button when showCloseButton is true', () => {
    const { getByTestId } = renderWithProviders(<Modal {...MOCK_PROPS} />);

    expect(getByTestId(CLOSE_BUTTON_TEST_ID)).toBeInTheDocument();
  });

  test('# calls setIsOpen with false when close button is clicked', () => {
    const { getByTestId } = renderWithProviders(<Modal {...MOCK_PROPS} />);
    const closeButton = getByTestId(CLOSE_BUTTON_TEST_ID);

    fireEvent.click(closeButton);
    expect(MOCK_PROPS.setIsOpen).toHaveBeenCalledWith(false);
  });

  test('# does not render close button when showCloseButton is false', () => {
    const { queryByTestId } = renderWithProviders(<Modal {...MOCK_PROPS} showCloseButton={false} />);

    expect(queryByTestId(CLOSE_BUTTON_TEST_ID)).not.toBeInTheDocument();
  });

  test('# does not render footer when hideFooter is true', () => {
    const { queryByText } = renderWithProviders(<Modal {...MOCK_PROPS} hideFooter={true} />);

    expect(queryByText('Modal footer')).not.toBeInTheDocument();
  });

  test('# does not render component on the screen if keepMounted is false and modal is closed', () => {
    const propsWithKeepMountedFalse = { ...MOCK_PROPS, keepMounted: false, isOpen: false };
    const { queryByTestId } = renderWithProviders(<Modal {...propsWithKeepMountedFalse} />);
    const modal = queryByTestId(TEST_ID);

    expect(modal).not.toBeInTheDocument();
  });

  test('# should keep component mounted in the DOM even when closed if keepMounted is true', () => {
    const { getByTestId } = renderWithProviders(<Modal {...MOCK_PROPS} keepMounted={true} />);
    const modal = getByTestId(TEST_ID);

    fireEvent.click(modal);
    fireEvent.click(getByTestId(CLOSE_BUTTON_TEST_ID));
    expect(modal).toBeInTheDocument();
  });

  test('# should keep children mounted when keepMounted is true and modal is closed', () => {
    const { queryByText } = renderWithProviders(
      <Modal isOpen={false} setIsOpen={MOCK_PROPS.setIsOpen} keepMounted={true}>
        {MOCK_PROPS.children}
      </Modal>
    );

    expect(queryByText('Modal content')).toBeInTheDocument();
  });
});
