import { Stack, Typography } from '@mui/material';
import type { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { useIntlHelpers } from '@/lib/xfi.lib/i18n';
import { NONE_VALUE } from '@/shared/constants';
import { Coin } from '@/shared/types';

import FormButtons, { FormButtonsProps } from '../forms/FormButtons';

type Props = FormButtonsProps &
  PropsWithChildren<{
    /** @type {FormattedMessageId | ReactElement} */
    title: string | ReactElement;
  }>;

const ConfirmOperation = ({ children, title, ...formButtonsProps }: Props) => {
  const { isFormattedMessageId } = useIntlHelpers();

  return (
    <Stack gap="2rem">
      <Typography color="background.light" variant="subtitle2">
        {isFormattedMessageId(title) ? <FormattedMessage id={title} /> : title}
      </Typography>
      <Stack gap="1.5rem">{children}</Stack>
      <FormButtons sx={{ flexDirection: 'row-reverse' }} {...formButtonsProps} />
    </Stack>
  );
};

type TextBlockProps = {
  /** @type {FormattedMessageId} */
  caption: string;
  text: ReactNode;
};

export const TextBlock = ({ caption, text }: TextBlockProps) => {
  return (
    <Stack gap="0.5rem">
      <Typography color="neutrals.secondaryText" variant="body2">
        <FormattedMessage id={caption} />
      </Typography>
      <Typography sx={{ wordBreak: 'break-all' }} color="background.light" variant="body1">
        {text}
      </Typography>
    </Stack>
  );
};

type AmountProps = {
  value?: Coin | null;
};

export const Amount = ({ value }: AmountProps) => {
  return value ? (
    <Stack direction="row" alignItems="center" gap="0.5rem">
      <span>{value.amount}</span>
      {value.denom.toUpperCase()}
    </Stack>
  ) : (
    NONE_VALUE
  );
};

export default ConfirmOperation;
