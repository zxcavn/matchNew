import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import { BLOCK_TEST_ID } from '../../../atoms/Block/Block';
import TableBlock, { type Props } from './TableBlock';

const TABLE_BLOCK_PROPS: Props = {
  hasData: false,
  notFound: { text: 'Custom Not Found Message' },
};

describe('TableBlock component', () => {
  test('# should render TableBlock component with custom not found message when there is no data', () => {
    const { getByTestId, getByText } = renderWithProviders(
      <TableBlock {...TABLE_BLOCK_PROPS}>{/* Here you can render your table content */}</TableBlock>
    );

    expect(getByTestId(BLOCK_TEST_ID)).toBeInTheDocument();
    expect(getByText(TABLE_BLOCK_PROPS.notFound?.text as string)).toBeInTheDocument();
  });

  test('# should render NotFound component with default not found message when there is no data and notFound prop is not provided', () => {
    const { getByTestId, getByText } = renderWithProviders(
      <TableBlock hasData={false}>{/* Here you can render your table content */}</TableBlock>
    );

    expect(getByTestId(BLOCK_TEST_ID)).toBeInTheDocument();
    expect(getByText('Not found')).toBeInTheDocument();
  });

  test('# should not render "Not found" text when there is data', () => {
    const { queryByText } = renderWithProviders(
      <TableBlock hasData={true}>{/* Here you can render your table content */}</TableBlock>
    );

    expect(queryByText('Not found')).not.toBeInTheDocument();
  });
});
