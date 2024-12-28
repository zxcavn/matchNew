import { Stack, styled, Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { trimStringAndInsertDots } from '@xfi/helpers';
import { FormattedMessage } from 'react-intl';

import { formatName } from '@/helpers';
import { GradientBadge, GradientBadgeColor, Icon } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { EvmIcon } from '@/lib/xfi.lib/icons';
import { NONE_VALUE } from '@/shared/constants';

type Props = {
  /** @type {FormattedMessageId} */
  label: string;
} & (
  | {
      variant: 'name';
      name: string;
    }
  | {
      variant: 'badge';
      /** @type {FormattedMessageId} */
      text: string;
      color?: GradientBadgeColor;
    }
  | {
      variant: 'address';
      address: string;
      name?: string;
    }
  | {
      variant: 'text';
      /** @type {FormattedMessageId} */
      text: string;
    }
  | {
      variant: 'commission';
      amount?: bigint | null;
    }
);

const Details = (props: Props) => {
  return (
    <StyledDetailsContainer>
      <Typography variant="body2" color="neutrals.secondaryText" whiteSpace={'nowrap'}>
        <FormattedMessage id={props.label} />
      </Typography>

      {props.variant === 'name' && (
        <Stack direction="row" alignItems="center" gap="0.5rem">
          <Typography textAlign="end" sx={{ wordBreak: 'break-all' }} variant="subtitle1" color="background.light">
            {props.name}
          </Typography>
          <Icon src={EvmIcon} viewBox="0 0 32 32" sx={{ fontSize: '2rem' }} />
        </Stack>
      )}

      {props.variant === 'badge' && (
        <GradientBadge color={props.color || 'lightBlue'}>
          <FormattedMessage id={props.text} />
        </GradientBadge>
      )}

      {props.variant === 'text' && (
        <Typography textAlign="end" sx={{ wordBreak: 'break-word' }} variant="subtitle1" color="background.light">
          <FormattedMessage id={props.text} />
        </Typography>
      )}

      {props.variant === 'commission' && (
        <Typography variant="subtitle1" color="background.light">
          {props.amount ? (
            <>
              {MxNumberFormatter.formatUnitsToDisplay(props.amount, {
                maxFractionalLength: CURRENCIES.xfi.formatDecimals,
              })}{' '}
              {CURRENCIES.xfi.text}
            </>
          ) : (
            NONE_VALUE
          )}
        </Typography>
      )}

      {props.variant === 'address' && (
        <Stack direction="row" alignItems="center" gap="0.5rem">
          <Stack gap="0.125rem" alignItems="flex-end">
            {props.name ? (
              <>
                <Typography variant="subtitle1" color="background.light">
                  {formatName(props.name)}
                </Typography>
                <Typography variant="body2" color="neutrals.secondaryText">
                  {trimStringAndInsertDots({ value: props.address, charsBeforeDots: 5, charsAfterDots: 5 })}
                </Typography>
              </>
            ) : (
              <Typography>
                <Typography variant="subtitle1" color="background.light">
                  {trimStringAndInsertDots({ value: props.address, charsBeforeDots: 5, charsAfterDots: 5 })}
                </Typography>
              </Typography>
            )}
          </Stack>
          <Icon src={EvmIcon} viewBox="0 0 32 32" sx={{ fontSize: '2rem' }} />
        </Stack>
      )}
    </StyledDetailsContainer>
  );
};

const StyledDetailsContainer = styled(Stack, { name: 'StyledDetailsContainer' })(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: '4rem',
  borderRadius: '1rem',
  border: `1px solid ${theme.palette.neutrals.border}`,
  padding: '0.625rem 1rem',
  gap: '1rem',
}));

export default Details;
