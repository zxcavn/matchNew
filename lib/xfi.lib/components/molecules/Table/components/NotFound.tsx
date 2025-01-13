import { Stack, styled, Typography, TypographyProps } from '@mui/material';
import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import { useIntlHelpers } from '@/lib/xfi.lib/i18n';

export const TEST_ID = 'not-found-test-id';

export type NotFoundConfig = {
  text: string;
  extraSlot?: ReactElement;
};

export type Props = {
  /** @type {FormattedMessageId} */
  className?: string;
  config?: NotFoundConfig;
} & TypographyProps;

/**
 * Component that represents a "Not Found" message.
 *
 * The `NotFound` component displays a message indicating that the requested content is not found.
 * It uses the `FormattedMessage` component from `react-intl` to localize the message.
 *
 * @component
 *
 * @param {object} props - The props for the NotFound component.
 * @param {string} [props.notFoundText] - The message to display for "Not Found". If not provided, a default message will be used.
 * @param {TypographyProps} rest - Additional props for the Typography component from Material-UI.
 *
 * @returns {JSX.Element} The rendered JSX element.
 */
const NotFound = ({ className, config = { text: 'LIB.SUMMARY.NOT_FOUND' }, ...rest }: Props) => {
  const { isFormattedMessageId } = useIntlHelpers();

  return (
    <StyledNotFound className={className}>
      <Typography className="text" variant="body1" color="neutrals.secondaryText" {...rest} data-testid={TEST_ID}>
        {isFormattedMessageId(config.text) ? <FormattedMessage id={config.text} /> : config.text}
      </Typography>
      {config?.extraSlot}
    </StyledNotFound>
  );
};

export const StyledNotFound = styled(Stack, { name: 'StyledNotFound' })(({ theme }) => ({
  margin: 'auto',
  padding: '0 1.5rem 1.5rem',
  gap: '1.5rem',
  alignItems: 'center',
  justifyContent: 'center',

  [theme.breakpoints.down('md')]: {
    padding: '0 1rem 1.5rem',
  },

  '& .text': {
    margin: 0,
    textAlign: 'center',
  },
}));

export default NotFound;
