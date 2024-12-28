import { fireEvent, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../helpers/test';
import Link, { ICON_TEST_ID, LINK_CONTAINER_TEST_ID, NEXT_LINK_TEST_ID } from './Link';

const CONTENT_TEXT = 'Link Text';
const HREF = '/href';

describe('Link component', () => {
  test('# renders a link when href is provided', () => {
    renderWithProviders(<Link href={HREF}>{CONTENT_TEXT}</Link>);

    const linkElement = screen.getByTestId(NEXT_LINK_TEST_ID);

    expect(linkElement.tagName.toLowerCase()).toBe('a');
    expect(linkElement.getAttribute('href')).toBe(HREF);

    expect(screen.getByText(CONTENT_TEXT)).toBeInTheDocument();
  });

  test('# check click action when href and onClick are not provided', () => {
    const onClick = jest.fn();

    renderWithProviders(<Link>{CONTENT_TEXT}</Link>);

    const container = screen.getByTestId(LINK_CONTAINER_TEST_ID);

    expect(container).toBeInTheDocument();
    expect(container).not.toHaveAttribute('href');

    fireEvent.click(container);

    expect(onClick).not.toHaveBeenCalled();
  });

  test('# triggers onClick callback when provided and href is not provided', () => {
    const onClick = jest.fn();

    renderWithProviders(<Link onClick={onClick}>{CONTENT_TEXT}</Link>);

    const linkElement = screen.getByTestId(LINK_CONTAINER_TEST_ID);

    fireEvent.click(linkElement);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('# renders an icon when isShowIcon is true', () => {
    renderWithProviders(
      <Link href={HREF} isShowIcon>
        {CONTENT_TEXT}
      </Link>
    );

    expect(screen.getByTestId(ICON_TEST_ID)).toBeInTheDocument();
  });

  test('# does not render an icon when isShowIcon is false', () => {
    renderWithProviders(
      <Link href={HREF} isShowIcon={false}>
        {CONTENT_TEXT}
      </Link>
    );

    expect(screen.queryByTestId(ICON_TEST_ID)).not.toBeInTheDocument();
  });
});
