import { Stack, styled, Typography } from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from '@/lib/xfi.lib/components/atoms';

export type ChainRewardCardData = {
  /** @type {FormattedMessageId} */
  title: string;
  /** @type {FormattedMessageId} */
  description: string;
  amount: string;
  currency: string;
};

type Props = ChainRewardCardData & {
  onClick: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  footerSlot?: ReactElement | ReactNode;
};

const ChainRewardCard = ({
  title,
  description,
  amount,
  currency,
  onClick,
  isLoading,
  isDisabled,
  footerSlot,
}: Props) => {
  return (
    <StyledCardContainer>
      <Typography mb="0.5rem" variant="subtitle2" color="background.light">
        <FormattedMessage id={title} />
      </Typography>
      <Typography mb="1.5rem" variant="body2" color="neutrals.secondaryText">
        <FormattedMessage id={description} />
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap="1rem">
        <Typography variant="h3" component="span" color="background.light">
          {amount} {currency}
        </Typography>
        <Button onClick={onClick} isLoading={isLoading} isDisabled={isDisabled} size="medium">
          <FormattedMessage id="SUMMARY.CLAIM" />
        </Button>
      </Stack>
      {footerSlot}
    </StyledCardContainer>
  );
};

const StyledCardContainer = styled('div', { name: 'StyledCardContainer' })(({ theme }) => ({
  padding: '1.25rem',
  borderRadius: '1rem',
  backgroundColor: theme.palette.neutrals.toast,
}));

export default ChainRewardCard;
