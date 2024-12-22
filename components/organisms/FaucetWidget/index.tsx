import { Stack, Typography } from '@mui/material';
import { openNewSource } from '@xfi/helpers';
import { FormattedMessage } from 'react-intl';
import urlJoin from 'url-join';

import { Button, Icon, Link } from '@/lib/xfi.lib/components/atoms';
import { DiscordIcon } from '@/lib/xfi.lib/icons';
import { CROSSFI_FAUCET_ME_LINK, DOCS_CROSSFI_XFI_PAD_LINK } from '@/shared/constants';

import GetClaimWidget from '../GetClaimWidget';
import { getIconColor } from './heplers';
import { StyledFaucetWidget, StyledTextContent } from './styles';

const TELEGRAM_FAUCET_ANCHOR = '#telegram-faucet';

const FaucetWidget = () => {
  return (
    <>
      <StyledFaucetWidget
        title={
          <Typography variant={'h4'}>
            <FormattedMessage id={'SUMMARY.FAUCET'} />
          </Typography>
        }
        height={'100%'}
      >
        <Stack gap={'1.5rem'} direction={{ xs: 'column-reverse', md: 'row' }} height={'100%'}>
          <StyledTextContent>
            <Stack gap="0.5rem">
              <Typography mt={{ sm: '0', xs: '1rem' }} color={'background.light'} variant={'h3'}>
                <FormattedMessage id="SUMMARY.FAUCET.TITLE" />
              </Typography>
              <Stack direction={{ sm: 'row' }} flexWrap={'wrap'} alignItems={{ sm: 'center' }} gap="0.5rem">
                <Typography variant="body2" color="neutrals.secondaryText">
                  <FormattedMessage id="SUMMARY.FAUCET.DESCRIPTION" />
                </Typography>
                <Link onClick={() => openNewSource(urlJoin(DOCS_CROSSFI_XFI_PAD_LINK, TELEGRAM_FAUCET_ANCHOR))}>
                  <FormattedMessage id="SUMMARY.LEARN_MORE" />
                </Link>
              </Stack>
            </Stack>
            <Stack width="100%" direction={{ sm: 'row' }} alignItems="center" gap="1rem">
              <Button
                onClick={() => openNewSource(CROSSFI_FAUCET_ME_LINK)}
                variant={'secondary'}
                isFullWidth
                size="large"
              >
                <FormattedMessage id="SUMMARY.DISCORD" />
                <Icon
                  src={DiscordIcon}
                  viewBox="0 0 20 20"
                  sx={{
                    fontSize: '1.25rem',
                    path: {
                      fill: theme => getIconColor(theme),
                    },
                    m: '0.25rem 0 0 0.5rem',
                  }}
                />
              </Button>
              <GetClaimWidget />
            </Stack>
          </StyledTextContent>
          <div className={'backgroundSpacer'} />
        </Stack>
      </StyledFaucetWidget>
    </>
  );
};

export default FaucetWidget;
