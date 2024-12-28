import { cleanup } from '@testing-library/react';

import '@testing-library/jest-dom';
import { mockUseMediaQuery, renderWithProviders } from '../../../../../helpers/test';
import { BUTTON_TEST_ID } from '../../../../atoms/copy/CopyButton/CopyButton';
import BaseTableCopyLink, { TEST_ID } from './BaseTableCopyLink';

const COPY_VALUE = 'COPY_VALUE';

describe('BaseTableCopyLink component', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('# should be rendered on the screen with copy tooltip', () => {
    mockUseMediaQuery(false);
    const { getByTestId } = renderWithProviders(<BaseTableCopyLink copyValue={COPY_VALUE} />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });

  test('# should be rendered on the screen with copy button', () => {
    mockUseMediaQuery(true);
    const { getByTestId } = renderWithProviders(<BaseTableCopyLink copyValue={COPY_VALUE} />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(getByTestId(BUTTON_TEST_ID)).toBeInTheDocument();
  });
});
