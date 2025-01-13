import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import MailTo, { type Props, TEST_ID } from './MailTo';

describe('MailTo component', () => {
  const MOCK_PROPS: Props = {
    email: 'test@example.com',
    subject: 'Test subject',
    body: 'Test body',
    children: 'Click me',
  };

  test('# generates mailto link with correct parameters', () => {
    const { getByTestId, getByText } = render(<MailTo {...MOCK_PROPS}>{MOCK_PROPS.children}</MailTo>);
    const mailToLink = getByTestId(TEST_ID) as HTMLAnchorElement;

    expect(getByTestId(TEST_ID)).toBeInTheDocument();

    expect(getByText(MOCK_PROPS.children as string)).toBeInTheDocument();

    expect(mailToLink.href).toEqual(
      `mailto:${MOCK_PROPS.email}?subject=${encodeURIComponent(MOCK_PROPS.subject as string)}&body=${encodeURIComponent(
        MOCK_PROPS.body as string
      )}`
    );
  });
});
