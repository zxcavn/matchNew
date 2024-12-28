import { formatBlockHeightToDisplay } from '@xfi/formatters';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import { TEST_ID as BASE_TABLE_COPY_LINK_TEST_ID } from './base/BaseTableCopyLink';
import BlockLink from './BlockLink';

describe('BlockLink component', () => {
  test('# should be rendered on the screen', () => {
    const HEIGHT = '12345';
    const HREF = 'href';
    const displayHeight = formatBlockHeightToDisplay(HEIGHT);

    const { getByTestId } = renderWithProviders(<BlockLink height={HEIGHT} href={HREF} />);
    const element = getByTestId(BASE_TABLE_COPY_LINK_TEST_ID);

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(displayHeight);
  });
});
