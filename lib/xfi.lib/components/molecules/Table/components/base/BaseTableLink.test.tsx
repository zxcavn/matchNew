import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../../helpers/test';
import BaseTableLink, { TEST_ID } from './BaseTableLink';

const LINK_CONTENT = 'LINK_CONTENT';
const HREF = 'href';
const TARGET = '_blank';

describe('BaseTableLink component', () => {
  test('# should be rendered with anchor element if href attribute is passed', () => {
    const { getByTestId } = renderWithProviders(
      <BaseTableLink href={HREF} target={TARGET}>
        {LINK_CONTENT}
      </BaseTableLink>
    );
    const baseLinkElement = getByTestId(TEST_ID);

    expect(baseLinkElement).toBeInTheDocument();
    expect(baseLinkElement).toHaveTextContent(LINK_CONTENT);
    expect(baseLinkElement).toHaveRole('link');
    expect(baseLinkElement).toHaveAttribute('href', HREF);
    expect(baseLinkElement).toHaveAttribute('target', TARGET);
  });

  test('# should be rendered with paragraph element if href attribute is not passed', () => {
    const { getByTestId } = renderWithProviders(<BaseTableLink>{LINK_CONTENT}</BaseTableLink>);
    const baseLinkElement = getByTestId(TEST_ID);

    expect(baseLinkElement).toBeInTheDocument();
    expect(baseLinkElement).toHaveTextContent(LINK_CONTENT);
    expect(baseLinkElement).toHaveRole('generic');
    expect(baseLinkElement).not.toHaveAttribute('href');
    expect(baseLinkElement).not.toHaveAttribute('target');
  });
});
