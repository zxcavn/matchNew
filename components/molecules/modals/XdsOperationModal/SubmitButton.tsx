import { Stack } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Button, ButtonProps, Icon } from '@/lib/xfi.lib/components/atoms';
import { KeplrIcon } from '@/lib/xfi.lib/icons';

type Props = Omit<ButtonProps, 'children' | 'isFullWidth' | 'size' | 'isLoading'> & {
  isConnectedByExtension?: boolean;
  isLoadingTx?: boolean;
  isLoadingFee?: boolean;
  /** @type {FormattedMessageId} */
  buttonText?: string;
};

const SubmitButton = ({ isConnectedByExtension, isLoadingTx, isLoadingFee, buttonText, ...buttonProps }: Props) => {
  const props: ButtonProps = {
    ...buttonProps,
    isFullWidth: true,
    isDisabled: isLoadingTx || isLoadingFee || buttonProps.isDisabled,
    size: 'large',
  };

  return isConnectedByExtension ? (
    <Button {...props} isLoading={isLoadingFee}>
      <Stack direction="row" alignItems="flex-end" gap="0.4063rem">
        {!isLoadingTx && <ExtensionIcon />}
        <FormattedMessage id={isLoadingTx ? 'SUMMARY.WAITING_FOR_WALLET' : 'SUMMARY.OPEN_WALLET'} />
      </Stack>
    </Button>
  ) : (
    <Button {...props} isLoading={isLoadingFee || isLoadingTx}>
      <FormattedMessage id={buttonText || 'SUMMARY.CONTINUE'} />
    </Button>
  );
};

const ExtensionIcon = () => {
  return (
    <Icon
      src={KeplrIcon}
      viewBox="0 0 24 24"
      style={{ marginBottom: '0.25rem', width: '0.9375rem', height: '0.9375rem' }}
    />
  );
};

export default SubmitButton;
