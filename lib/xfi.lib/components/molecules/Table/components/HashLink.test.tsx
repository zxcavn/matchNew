import { formatAddressToDisplay } from '@xfi/formatters';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import { TEST_ID as BASE_TABLE_COPY_LINK_TEST_ID } from './base/BaseTableCopyLink';
import HashLink from './HashLink';

describe('HashLink component', () => {
  test('# should be rendered on the screen', () => {
    const HASH = '00861972d94c57e71b0da164022f8fcc53eddb418f817141689b1e144f1e695e';
    const HREF = 'href';
    const expectedHash = formatAddressToDisplay(HASH);

    const { getByTestId } = renderWithProviders(<HashLink hash={HASH} href={HREF} />);
    const element = getByTestId(BASE_TABLE_COPY_LINK_TEST_ID);

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(expectedHash);
  });
});
