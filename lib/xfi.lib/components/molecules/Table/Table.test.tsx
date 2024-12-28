import '@testing-library/jest-dom';
import { mockUseMediaQuery, renderWithProviders } from '../../../helpers/test';
import type { PaginationProps } from '../../atoms';
import { COLUMNS, HASH_LINK_TRIMMED_TEXT, MOBILE_CONFIG, ROWS, TEXT_PROPS } from './__mocks__';
import {
  ASSET_TEST_ID,
  BADGE_TEST_ID,
  DATETIME_TEST_ID,
  DESKTOP_TEST_ID,
  MOBILE_TEST_ID,
  PAGINATION_TEST_ID,
  TEXT_TEST_ID,
} from './index';
import Table from './Table';

const TABLE_COMPONENTS = [ASSET_TEST_ID, DATETIME_TEST_ID, TEXT_TEST_ID, BADGE_TEST_ID];

describe('Table Component', () => {
  test('# should render DesktopTable when media query matches desktop view', () => {
    mockUseMediaQuery(false);

    const { getByTestId, queryByTestId } = renderWithProviders(
      <Table columns={COLUMNS} mobileConfig={MOBILE_CONFIG} rows={ROWS} />
    );

    expect(getByTestId(DESKTOP_TEST_ID)).toBeInTheDocument();
    expect(queryByTestId(MOBILE_TEST_ID)).not.toBeInTheDocument();
  });

  test('# should render MobileTable when media query matches mobile view', () => {
    mockUseMediaQuery(true);

    const { getByTestId, queryByTestId } = renderWithProviders(
      <Table columns={COLUMNS} mobileConfig={MOBILE_CONFIG} rows={ROWS} />
    );

    expect(getByTestId(MOBILE_TEST_ID)).toBeInTheDocument();
    expect(queryByTestId(DESKTOP_TEST_ID)).not.toBeInTheDocument();
  });

  test('# should render pagination component if pagination prop is provided', () => {
    const props: { pagination: PaginationProps } = {
      pagination: { variant: 'short', page: 1, hasNext: false, onChange: jest.fn() },
    };

    const { getByTestId } = renderWithProviders(
      <Table columns={COLUMNS} mobileConfig={MOBILE_CONFIG} rows={ROWS} {...props} />
    );

    expect(getByTestId(PAGINATION_TEST_ID)).toBeInTheDocument();
  });

  test('# should not render pagination component if pagination prop not provided', () => {
    const { queryByTestId } = renderWithProviders(<Table columns={COLUMNS} mobileConfig={MOBILE_CONFIG} rows={ROWS} />);

    expect(queryByTestId(PAGINATION_TEST_ID)).not.toBeInTheDocument();
  });

  test('# should render all types cells', () => {
    const { getAllByTestId, getAllByText } = renderWithProviders(
      <Table columns={COLUMNS} rows={ROWS} mobileConfig={MOBILE_CONFIG} />
    );

    TABLE_COMPONENTS.forEach(component => {
      const componentNodes = getAllByTestId(component);

      expect(componentNodes.length).toBeGreaterThanOrEqual(ROWS.length);
    });
    const JSXText = getAllByText(TEXT_PROPS.value as string);

    expect(JSXText.length).toBeGreaterThanOrEqual(ROWS.length);
    const HashLinkText = getAllByText(HASH_LINK_TRIMMED_TEXT);

    expect(HashLinkText.length).toBeGreaterThanOrEqual(ROWS.length);
  });
});
