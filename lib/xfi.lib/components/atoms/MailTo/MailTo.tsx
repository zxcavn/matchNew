import { ReactNode } from 'react';

export const TEST_ID = 'mail-to-test-id';

export type Props = {
  email: string;
  subject?: string;
  body?: string;
  children: ReactNode | ReactNode[];
};

/**
 * When clicked, open email application
 * @component
 * @param props - props object
 * @param props.email  - email
 * @param [props.subject] - email subject
 * @param [props.body] - email body
 * @param props.children - children
 */
const MailTo = ({ email, subject = '', body = '', children }: Props) => {
  let params = subject || body ? '?' : '';

  if (subject) params += `subject=${encodeURIComponent(subject)}`;

  if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;

  return (
    <a href={`mailto:${email}${params}`} data-testid={TEST_ID}>
      {children}
    </a>
  );
};

export default MailTo;
