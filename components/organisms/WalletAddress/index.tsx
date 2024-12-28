import { Stack, Typography } from '@mui/material';
import { trimStringAndInsertDots } from '@xfi/helpers';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import QRCode from 'react-qr-code';

import { ConnectionType, useWalletConnection } from '@/hocs';
import { useRouteChainDetails, useWalletPrimaryName } from '@/hooks';
import { AddressType } from '@/hooks/useRouteChainDetails';
import { Copy, Icon, Input, Modal } from '@/lib/xfi.lib/components/atoms';
import { CosmosIcon, EvmIcon, MoreIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';

import { QRButton } from '@/components/atoms';
import { XdsNameDropdown } from '@/components/molecules';

import { TRIM_ADDRESS_MEDIA_QUERY, TRIM_CONFIG } from './constants';
import { StyledBlock, StyledCompactWalletAddress, StyledWalletAddressContainer } from './styles';

type Props = {
  isHiddenLabel?: boolean;
  isCompactView?: boolean;
  className?: string;
  withXdsName?: boolean;
  onModalStateChange?: CompactWalletAddressProps['onModalStateChange'];
};

const WalletAddress = ({
  isHiddenLabel,
  isCompactView = false,
  className,
  withXdsName = true,
  onModalStateChange,
}: Props) => {
  const { address, chainType } = useRouteChainDetails();
  const { name } = useWalletPrimaryName({ isEnabled: withXdsName });

  const CurrentPrefix = chainType === AddressType.EVM ? EvmIcon : CosmosIcon;

  return isCompactView ? (
    <CompactWalletAddress onModalStateChange={onModalStateChange} address={address} name={name} />
  ) : (
    <StyledWalletAddressContainer className={className}>
      <Input
        prefix={<Icon src={CurrentPrefix} sx={{ fontSize: '2rem' }} viewBox="0 0 32 32" />}
        suffix={
          <Stack direction="row" alignItems="center" gap="0.5rem">
            <Copy variant="button" value={address} />
            {name && withXdsName && <XdsNameDropdown sx={{ transform: 'translate(1rem, 1rem)' }} name={name} />}
          </Stack>
        }
        key={address}
        isEditable={false}
        className="copyInput"
        label={isHiddenLabel ? undefined : { type: 'intl', id: 'WALLET.ADDRESS' }}
        value={address}
      />
      <QRButton value={address} />
    </StyledWalletAddressContainer>
  );
};

type CompactWalletAddressProps = {
  address: string;
  name?: string;
  onModalStateChange?: (isOpen: boolean) => void;
};

const CompactWalletAddress = ({ address, name, onModalStateChange }: CompactWalletAddressProps) => {
  const isTrimmedAddress = useMediaQuery(TRIM_ADDRESS_MEDIA_QUERY);
  const { connectionType } = useWalletConnection();
  const [isOpenActionsModal, setIsOpenActionsModal] = useState(false);

  const onHandleOpenModal = (open: boolean) => {
    setIsOpenActionsModal(open);
    onModalStateChange?.(open);
  };

  const displayedAddress = isTrimmedAddress
    ? trimStringAndInsertDots({
        value: address,
        ...TRIM_CONFIG[connectionType || ConnectionType.MNEMONIC],
      })
    : address;

  return (
    <StyledCompactWalletAddress onClick={() => onHandleOpenModal(true)}>
      <Typography variant={'body1'}>{displayedAddress}</Typography>
      <Stack alignContent={'center'} sx={{ width: '1.25rem', height: '1.25rem' }}>
        <Icon src={MoreIcon} viewBox={'0 0 20 20'} sx={{ fontSize: '1.25rem' }} />
      </Stack>
      <Modal title={{ id: 'SUMMARY.ADDRESS' }} isOpen={isOpenActionsModal} setIsOpen={onHandleOpenModal}>
        <Stack height={'100%'}>
          <Stack gap="1.5rem">
            <StyledBlock>
              <Stack padding="2rem">
                <QRCode fgColor={'common.black'} style={{ width: '100%', height: 'auto' }} value={address} />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" gap="1.25rem">
                <Typography variant="body1" color="background.light" sx={{ wordBreak: 'break-all' }}>
                  {address}
                </Typography>
                <Copy variant={'button'} className={'copyButton'} value={address} />
              </Stack>
            </StyledBlock>
            {name && (
              <StyledBlock>
                <Stack direction="row" alignItems="center" justifyContent="space-between" gap="1rem">
                  <Stack gap="0.5rem">
                    <Typography variant="caption" color="neutrals.secondaryText">
                      <FormattedMessage id="SUMMARY.XDS_NAME" />
                    </Typography>
                    <Typography sx={{ wordBreak: 'break-all' }} variant="body1" color="background.light">
                      {name}
                    </Typography>
                  </Stack>
                  <Copy variant={'button'} className={'copyButton'} value={name} />
                </Stack>
              </StyledBlock>
            )}
          </Stack>
        </Stack>
      </Modal>
    </StyledCompactWalletAddress>
  );
};

export default WalletAddress;
