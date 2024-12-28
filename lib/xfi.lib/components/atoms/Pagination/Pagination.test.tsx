import { fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../helpers/test';
import Pagination, { type Props, NEXT_TEST_ID, PREVIOUS_TEST_ID, TEST_ID } from './Pagination';

describe('Default pagination component', () => {
  const MOCK_PROPS_DEFAULT_PAGINATION: Props = {
    page: 1,
    onChange: jest.fn(),
    variant: 'default',
    count: 20,
  };

  test('# hide previous button when current page is 1', () => {
    const { queryByTestId } = renderDefaultPagination(MOCK_PROPS_DEFAULT_PAGINATION);

    expect(queryByTestId(PREVIOUS_TEST_ID)).not.toBeInTheDocument();
  });

  test('# hide next button when current page is the last page', () => {
    const { queryByTestId } = renderDefaultPagination({
      ...MOCK_PROPS_DEFAULT_PAGINATION,
      page: MOCK_PROPS_DEFAULT_PAGINATION.count,
    });

    expect(queryByTestId(NEXT_TEST_ID)).not.toBeInTheDocument();
  });

  test('# calls onChange handler with previous page number when previous arrow is clicked', () => {
    const { getByTestId } = renderDefaultPagination({
      ...MOCK_PROPS_DEFAULT_PAGINATION,
      page: 2,
    });
    const prevArrow = getByTestId(PREVIOUS_TEST_ID);

    fireEvent.click(prevArrow);
    expect(MOCK_PROPS_DEFAULT_PAGINATION.onChange).toHaveBeenCalled();
  });

  test('# calls onChange handler with next page number when next arrow clicked', () => {
    const { getByTestId } = renderDefaultPagination(MOCK_PROPS_DEFAULT_PAGINATION);
    const nextArrow = getByTestId(NEXT_TEST_ID);

    fireEvent.click(nextArrow);
    expect(MOCK_PROPS_DEFAULT_PAGINATION.onChange).toHaveBeenCalledWith(2);
  });

  test('# renders default variant pagination items correctly', () => {
    const { getByText } = renderDefaultPagination(MOCK_PROPS_DEFAULT_PAGINATION);

    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
    expect(getByText('4')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
    expect(getByText('. . .')).toBeInTheDocument();
    expect(getByText('20')).toBeInTheDocument();
  });

  test('# renders selected last page correctly', () => {
    const { getByText } = renderDefaultPagination({
      ...MOCK_PROPS_DEFAULT_PAGINATION,
      page: 20,
    });

    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('. . .')).toBeInTheDocument();
    expect(getByText('16')).toBeInTheDocument();
    expect(getByText('17')).toBeInTheDocument();
    expect(getByText('18')).toBeInTheDocument();
    expect(getByText('19')).toBeInTheDocument();
    expect(getByText('20')).toBeInTheDocument();
  });

  test('# does not render ". . ." when count is less than 5', () => {
    const { queryByText } = renderDefaultPagination({
      ...MOCK_PROPS_DEFAULT_PAGINATION,
      count: 3,
    });

    expect(queryByText('. . .')).not.toBeInTheDocument();
  });

  test('# show previous button when page is greater than 1', () => {
    const { getByTestId } = renderDefaultPagination({
      ...MOCK_PROPS_DEFAULT_PAGINATION,
      page: 2,
    });
    const previousButton = getByTestId(PREVIOUS_TEST_ID);

    expect(previousButton).toBeInTheDocument();
    expect(previousButton).not.toHaveAttribute('disabled');
  });

  test('# show next button when page is less than count', () => {
    const { getByTestId } = renderDefaultPagination({
      ...MOCK_PROPS_DEFAULT_PAGINATION,
      page: 2,
    });
    const nextButton = getByTestId(NEXT_TEST_ID);

    expect(nextButton).toBeInTheDocument();
    expect(nextButton).not.toHaveAttribute('disabled');
  });
});

describe('Short pagination component', () => {
  const MOCK_PROPS_SHORT_PAGINATION: Props = {
    page: 1,
    onChange: jest.fn(),
    variant: 'short',
    hasNext: true,
  };

  test('# component should be rendered on the screen', () => {
    const { getByTestId } = renderShortPagination(MOCK_PROPS_SHORT_PAGINATION);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });

  test('# does not render ". . ." in short variant when hasNext is false', () => {
    const { queryByText } = renderShortPagination({
      ...MOCK_PROPS_SHORT_PAGINATION,
      hasNext: false,
    });

    expect(queryByText('. . .')).not.toBeInTheDocument();
  });

  test('# disables previous button when page is 1', () => {
    const { getByTestId } = renderShortPagination(MOCK_PROPS_SHORT_PAGINATION);
    const previousButton = getByTestId(PREVIOUS_TEST_ID);

    expect(previousButton).toHaveAttribute('disabled');
  });

  test('# disables next button when hasNext is false', () => {
    const { getByTestId } = renderShortPagination({
      ...MOCK_PROPS_SHORT_PAGINATION,
      hasNext: false,
    });
    const nextButton = getByTestId(NEXT_TEST_ID);

    expect(nextButton).toHaveAttribute('disabled');
  });

  test('# does not disable next button when hasNext is true', () => {
    const { getByTestId } = renderShortPagination({
      ...MOCK_PROPS_SHORT_PAGINATION,
      hasNext: true,
    });
    const nextButton = getByTestId(NEXT_TEST_ID);

    expect(nextButton).not.toHaveAttribute('disabled');
  });
});

type DefaultPaginationProps = Omit<Props, 'variant'> & {
  variant?: 'default';
  count: number;
};

type ShortPaginationProps = Omit<Props, 'variant'> & {
  variant: 'short';
  hasNext: boolean;
};

export const renderDefaultPagination = (
  props: Omit<DefaultPaginationProps, 'variant'>
): ReturnType<typeof renderWithProviders> => {
  return renderWithProviders(<Pagination {...props} variant="default" />);
};

export const renderShortPagination = (
  props: Omit<ShortPaginationProps, 'variant'>
): ReturnType<typeof renderWithProviders> => {
  return renderWithProviders(<Pagination {...props} variant="short" />);
};
