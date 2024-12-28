import { Box, styled, Typography } from '@mui/material';
import { MouseEventHandler, PropsWithChildren } from 'react';
import { FormattedMessage } from 'react-intl';

import { CopyButton, Icon } from '@/lib/xfi.lib/components/atoms';
import { shouldForwardProp } from '@/lib/xfi.lib/helpers';
import { EthereumIcon } from '@/lib/xfi.lib/icons';

type BadgeVariant = 'fill' | 'outline';

type Props = PropsWithChildren<
  | {
      contentVariant: 'text';
      /** @type {FormattedMessageId} */
      label: string;
    }
  | {
      contentVariant: 'address';
      address: string;
    }
> & {
  variant?: BadgeVariant;
};

const XdsCardBadge = ({ variant = 'fill', ...props }: Props) => {
  const isOutlineStyle = variant === 'outline';

  if (props.contentVariant === 'text') {
    const { label, children } = props;

    return (
      <StyledBadgeContainer $variant={variant}>
        <Typography
          textTransform={isOutlineStyle ? 'capitalize' : 'initial'}
          color="neutrals.secondaryText"
          variant="body2"
          whiteSpace="nowrap"
        >
          <FormattedMessage id={label} />
          {isOutlineStyle && ':'}
        </Typography>
        <Typography color="background.light" variant="subtitle2">
          {children}
        </Typography>
      </StyledBadgeContainer>
    );
  }

  return (
    <StyledBadgeContainer
      $variant={variant}
      sx={isOutlineStyle ? { padding: '0.625rem 0.75rem 0.625rem 0.5rem' } : null}
      onClick={stopPropagation}
    >
      <Icon
        src={EthereumIcon}
        viewBox="0 0 20 20"
        sx={{ fontSize: isOutlineStyle ? '1.5rem' : '1.25rem', marginRight: '0.25rem' }}
      />
      <Typography
        color={isOutlineStyle ? 'background.light' : 'neutrals.secondaryText'}
        paddingRight="1rem"
        variant="body2"
      >
        {props.children}
      </Typography>
      <CopyButton hasText={false} value={props.address} />
    </StyledBadgeContainer>
  );
};

export default XdsCardBadge;

const stopPropagation: MouseEventHandler<HTMLElement> = event => {
  event.stopPropagation();
};

const StyledBadgeContainer = styled(Box, { name: 'StyledBadgeContainer', shouldForwardProp })<{
  $variant: BadgeVariant;
}>(({ theme, $variant }) => ({
  width: 'fit-content',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.25rem',

  ...($variant === 'fill' && {
    borderRadius: '1rem',
    padding: '0.5rem',
    background: theme.palette.neutrals.bg,
  }),

  ...($variant === 'outline' && {
    borderRadius: '2rem',
    padding: '0.75rem',
    border: '1px solid',
    borderColor: theme.palette.neutrals.border,
  }),
}));
