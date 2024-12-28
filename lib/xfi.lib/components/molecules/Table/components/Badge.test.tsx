import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import Badge, { type Props as ValidatorProps, TEST_ID } from './Badge';

const OPERATION_PROPS: ValidatorProps = {
  badgeVariant: 'operationType',
  type: 'send',
  name: 'Transfer',
};

describe('Badge component', () => {
  test('# should render OperationBadge with provided props', () => {
    const { getByTestId, getByText } = renderWithProviders(<Badge {...OPERATION_PROPS} />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(getByText(OPERATION_PROPS.name as string)).toBeInTheDocument();
  });

  test('# should render OperationBadge with failed type when failed prop is true', () => {
    const { getByTestId, getByText } = renderWithProviders(<Badge {...OPERATION_PROPS} type={'send'} failed />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(getByText(OPERATION_PROPS.name as string)).toBeInTheDocument();
    expect(getByText('fail')).toBeInTheDocument();
  });

  test('# should not render failed OperationBadge when failed prop is false', () => {
    const { getByTestId, queryByText } = renderWithProviders(<Badge {...OPERATION_PROPS} />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(queryByText('fail')).not.toBeInTheDocument();
  });
});
