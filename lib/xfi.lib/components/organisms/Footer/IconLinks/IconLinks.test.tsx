import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { MOCK, TEST_ICON_ID } from './__mocks__';
import IconLinks, { LINK_TEST_ID, TEST_ID } from './IconLinks';

describe('IconLinks component', () => {
  test('# component should be rendered with list of links and icons inside on the screen', () => {
    const { getByTestId } = render(<IconLinks links={MOCK.links} />);

    MOCK.links.forEach((link, index) => {
      const icon = getByTestId(TEST_ICON_ID + index);
      const linkTag = getByTestId(LINK_TEST_ID + index);

      expect(icon).toBeInTheDocument();
      expect(linkTag).toBeInTheDocument();

      expect(linkTag).toHaveAttribute('href', link.href);
      expect(linkTag).toHaveAttribute('target', link.target || '_blank');
    });
  });

  test('# component should not be rendered without Icon', () => {
    render(<IconLinks links={MOCK.withoutIcon} />);

    expect(screen.queryByTestId(TEST_ID)).not.toBeInTheDocument();
  });

  test('# component should be rendered without href', () => {
    const { getByTestId } = render(<IconLinks links={MOCK.withoutHref} />);

    MOCK.withoutHref.forEach((link, index) => {
      const linkTag = getByTestId(LINK_TEST_ID + index);

      expect(linkTag).toBeInTheDocument();

      expect(linkTag).not.toHaveAttribute('href');
    });
  });
});
