import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { type ReactElement, memo } from 'react';
import { FormattedMessage } from 'react-intl';

import { ArrowLeftIcon } from '../../../icons';
import { Icon } from '../Icon';
import BtnBackWrapper from './styles';

export const TEST_ID = 'back-button-test-id';

export type Props = Partial<{
  href: string;
  /** @type {FormattedMessageId} */
  backText: string;
  children: ReactElement;
  className: string;
}>;

/**
 * Component that renders a back button with optional text and custom behavior.
 *
 * The `BackButton` component renders a back button with an optional text label.
 * It allows navigation back to the previous page or to a specified URL.
 *
 * @component
 *
 * @param {object} props - The props for the BackButton component.
 * @param {string} [props.href] - The URL to navigate to when the button is clicked.
 * @param {string} [props.backText] - The text label for the back button.
 * @param {ReactElement} props.children - The children elements to be rendered alongside the button.
 * @param {string} [props.className] - The additional class name for styling.
 *
 * @returns {JSX.Element} The rendered JSX element.
 */
const BackButton = ({ href, backText, children, className }: Props) => {
  const router = useRouter();

  const redirectBack = () => {
    href ? router.push(href) : router.back();
  };

  return (
    <BtnBackWrapper
      className={className}
      direction="row"
      alignItems="center"
      onClick={redirectBack}
      onKeyDown={redirectBack}
      tabIndex={0}
      role="button"
      data-testid={TEST_ID}
    >
      <Icon src={ArrowLeftIcon} viewBox="0 0 20 20" />
      <Typography className="backText" variant="body1">
        <FormattedMessage id={backText || 'BACK'} />
      </Typography>
      {children}
    </BtnBackWrapper>
  );
};

export default memo(BackButton);
