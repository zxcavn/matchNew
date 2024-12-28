import { cleanup } from '@testing-library/react';
import { formatAddressToDisplay } from '@xfi/formatters';

import '@testing-library/jest-dom';
import { mockUseMediaQuery, renderWithProviders } from '../../../../helpers/test';
import { BUTTON_TEST_ID as COPY_BUTTON_TEST_ID } from '../../../atoms/copy/CopyButton/CopyButton';
import { TEST_ID as XDS_ADDRESS_TOOLTIP_TEST_ID } from '../../../atoms/XdsAddressTooltip/XdsAddressTooltip';
import AddressLink from './AddressLink';
import { TEST_ID as BASE_TABLE_LINK_TEST_ID } from './base/BaseTableLink';

describe('AddressLink component', () => {
  const ADDRESS = '0xC316c18A7B02c3216eF3ad6Cf9Cfe0cF5250096b';
  const HREF = 'href';
  const NAME = 'name.xfi';
  const displayAddress = formatAddressToDisplay(ADDRESS);

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('# should be rendered on the screen without tooltip', () => {
    const { getByTestId } = renderWithProviders(<AddressLink address={ADDRESS} href={HREF} />);
    const element = getByTestId(BASE_TABLE_LINK_TEST_ID);

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(displayAddress);
  });

  test('# should be rendered on the screen with tooltip', () => {
    const { getByTestId } = renderWithProviders(<AddressLink address={ADDRESS} href={HREF} xdsName={NAME} />);
    const element = getByTestId(XDS_ADDRESS_TOOLTIP_TEST_ID);

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(NAME);
    expect(getByTestId(BASE_TABLE_LINK_TEST_ID)).toHaveTextContent(NAME);
  });

  test('# should be rendered on the mobile screen with tooltip', () => {
    mockUseMediaQuery(true);
    const { getByTestId } = renderWithProviders(<AddressLink address={ADDRESS} href={HREF} xdsName={NAME} />);

    expect(getByTestId(COPY_BUTTON_TEST_ID)).toBeInTheDocument();
    expect(getByTestId(XDS_ADDRESS_TOOLTIP_TEST_ID)).toBeInTheDocument();
    expect(getByTestId(BASE_TABLE_LINK_TEST_ID)).toHaveTextContent(NAME);
  });
});
