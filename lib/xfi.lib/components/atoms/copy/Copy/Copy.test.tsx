import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import Copy, { type Props } from './Copy';

const COPY_TEXT = 'copy me';

describe('Copy component', () => {
  test('# renders button', () => {
    const MOCK_PROPS: Props = {
      copyText: COPY_TEXT,
      variant: 'button',
    };

    const { getByRole } = renderWithProviders(<Copy {...MOCK_PROPS} />);
    const button = getByRole('button');

    expect(button).toBeInTheDocument();
  });

  test('# renders tooltip', () => {
    const CONTENT_TEXT = 'tooltip content';

    const MOCK_PROPS: Props = {
      copyText: COPY_TEXT,
      variant: 'tooltip',
      children: <div>{CONTENT_TEXT}</div>,
    };

    const { getByText } = renderWithProviders(
      <Copy {...MOCK_PROPS}>
        <div>{MOCK_PROPS.children}</div>
      </Copy>
    );
    const tooltipContent = getByText(CONTENT_TEXT);

    expect(tooltipContent).toBeInTheDocument();
  });
});
