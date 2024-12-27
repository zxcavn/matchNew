import { alpha, Box, Stack, Typography } from '@mui/material';
import { redirect, trimStringAndInsertDots } from '@xfi/helpers';
import { useEffectOnce } from '@xfi/hooks';
import { format } from 'date-fns';
import { useCallback, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { formatDate } from '@/helpers';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useXdsNamePageParam } from '@/hooks/xds';
import { AppLocale } from '@/lib/i18n';
import { Block, CopyButton, Divider, Icon, Loader, Tooltip } from '@/lib/xfi.lib/components/atoms';
import { InfoIcon } from '@/lib/xfi.lib/icons';
import { theme, useMediaQuery } from '@/lib/xfi.lib/theme';
import { PAGES } from '@/shared/constants';
import { CosmosCurrency } from '@/shared/types';
import { currencyBySymbolSelector, getSwapCurrenciesAsync } from '@/store/currencies';
import { evmWalletAddressSelector } from '@/store/wallet';
import { getXdsNameAsync, resetXdsName, xdsNameSelector } from '@/store/xds';



import ExtendName from './ExtendName';
import SendName from './SendName';
import SetAsPrimary from './SetAsPrimary';
import SetReminder from './SetReminder';
import { tooltipComponentsProps } from './styles';

const XdsNameWidget = () => {
  const dispatch = useAppDispatch();
  const { locale } = useIntl();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const { name: nameParam } = useXdsNamePageParam();
  const evmWalletAddress = useAppSelector(evmWalletAddressSelector);
  const { data, isLoading } = useAppSelector(xdsNameSelector);
  const currency = useAppSelector(currencyBySymbolSelector(CosmosCurrency.XFI));

  useEffectOnce(() => {
    const redirectToXdsPage = () => redirect(PAGES.xds.pathname);

    dispatch(getXdsNameAsync({ label: nameParam, ownerAddress: evmWalletAddress }))
      .unwrap()
      .then(data => !data.xdsName && redirectToXdsPage())
      .catch(redirectToXdsPage);
  });

  const updateName = useCallback(() => {
    dispatch(getXdsNameAsync({ label: nameParam, ownerAddress: evmWalletAddress }));
  }, [dispatch, nameParam, evmWalletAddress]);

  useEffect(() => {
    if (!currency) {
      dispatch(getSwapCurrenciesAsync());
    }

    return () => {
      dispatch(resetXdsName());
    };
  }, []);

  if (!data) {
    return (
      <Stack minHeight="23.75rem" position="relative">
        <Loader />
      </Stack>
    );
  }

  const { name, label, expires, gracePeriodEnd, owner, isPrimary, isExpired, createDate, address, ownerAddress } = data;

  return (
    <Stack position="relative" gap={{ xs: '1.5rem', md: '2rem' }}>
      {isLoading && <Loader />}
      <Stack direction={'row'} gap={'0.5rem'} alignItems={{ xs: 'flex-end', md: 'baseline' }}>
        <Typography variant={'h3_infynyte'} textTransform={'uppercase'} textOverflow={'ellipsis'} overflow={'hidden'}>
          {name}
        </Typography>
        <CopyButton hasText={false} value={name} />
      </Stack>
      <Block sx={{ padding: { xs: '1.5rem', md: '2rem' } }}>
        <Stack
          direction={{ md: 'row' }}
          gap={{ md: '2rem', xs: '1rem' }}
          justifyContent={'space-between'}
          paddingBottom={{ xs: '1rem', md: '2rem' }}
          divider={
            <Divider
              orientation={isMobile ? 'horizontal' : 'vertical'}
              sx={{
                borderColor: alpha(theme.palette.neutrals.border, 0.4),
              }}
            />
          }
        >
          <Stack gap={'0.5rem'}>
            <Typography variant={'subtitle1'}>
              <FormattedMessage id={'XDS_NAME.NAME_EXPIRES'} />
            </Typography>
            <Stack direction={'row'} gap={'0.5rem'}>
              <Typography>{renderDate(expires, locale)}</Typography>
              <Typography color={'neutrals.secondaryText'}>{format(new Date(expires), 'ppp')}</Typography>
            </Stack>
          </Stack>
          <Stack gap={'0.5rem'}>
            <Stack direction={'row'} gap={'0.5rem'}>
              <Typography variant={'subtitle1'}>
                <FormattedMessage id={'XDS_NAME.GRACE_PERIOD_ENDS'} />
              </Typography>
              <Tooltip title={'XDS_NAME.TOOLTIP'} placement={'bottom'} componentsProps={tooltipComponentsProps}>
                <Box>
                  <Icon src={InfoIcon} sx={{ fontSize: '1.25rem' }} viewBox={'0 0 20 20'} />
                </Box>
              </Tooltip>
            </Stack>
            <Stack direction={'row'} gap={'0.5rem'}>
              <Typography>{renderDate(gracePeriodEnd, locale)}</Typography>
              <Typography color={'neutrals.secondaryText'}>{format(new Date(gracePeriodEnd), 'ppp')}</Typography>
            </Stack>
          </Stack>
          {createDate && (
            <Stack gap={'0.5rem'}>
              <Typography variant={'subtitle1'}>
                <FormattedMessage id={'SUMMARY.REGISTERED'} />
              </Typography>
              <Stack direction={'row'} gap={'0.5rem'}>
                <Typography>{renderDate(createDate, locale)}</Typography>
                <Typography color={'neutrals.secondaryText'}>{format(new Date(createDate), 'ppp')}</Typography>
              </Stack>
            </Stack>
          )}
        </Stack>

        <Divider
          orientation={'horizontal'}
          sx={{
            borderColor: alpha(theme.palette.neutrals.border, 0.4),
          }}
        />

        <Stack direction={{ md: 'row' }} justifyContent={'space-between'} paddingTop={'2rem'} alignItems={'center'}>
          <Stack
            direction={'row'}
            gap={'1rem'}
            alignItems={'center'}
            width={{ xs: '100%', md: 'initial' }}
            justifyContent={'space-between'}
          >
            <Typography variant={'subtitle1'}>
              <FormattedMessage id={'XDS_NAME.MANAGE_YOUR_NAME'} />
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            width={{ xs: '100%', md: 'initial' }}
            alignItems={'center'}
            pt={{ xs: '3rem', md: '0' }}
            gap={'1rem'}
            divider={
              !isMobile && (
                <Divider
                  orientation={'vertical'}
                  flexItem
                  sx={{
                    borderColor: alpha(theme.palette.neutrals.border, 0.4),
                  }}
                />
              )
            }
          >
            <Box width="100%" pr={{ md: '1rem' }}>
              <SetReminder details={data} isDisabled={isExpired} />
            </Box>

            <Stack
              direction={{ xs: 'column-reverse', md: 'row' }}
              gap={'1rem'}
              paddingLeft={{ md: '2rem' }}
              width={{ xs: '100%', md: 'initial' }}
            >
              <SendName
                updateName={updateName}
                name={name}
                xdsRecordAddress={address}
                ownerAddress={ownerAddress}
                isDisabled={isExpired}
                isFullWidth={isMobile}
                isPrimary={isPrimary}
              />
              <ExtendName onSuccess={updateName} name={name} nameLabel={label} isFullWidth={isMobile} />
            </Stack>
          </Stack>
        </Stack>
      </Block>
      <Block sx={{ padding: { xs: '1.5rem', md: '2rem' } }}>
        <Stack gap={'1.5rem'} paddingBottom={'2rem'}>
          <Typography variant={'subtitle1'}>
            <FormattedMessage id={'SUMMARY.ADDRESS'} />
          </Typography>
        </Stack>

        <Stack gap={'1.5rem'}>
          <Typography variant={'subtitle1'}>
            <FormattedMessage id={'XDS_NAME.OWNERSHIP'} />
          </Typography>
          <Stack direction={{ md: 'row' }} gap={'1rem'}>
          </Stack>
        </Stack>
      </Block>
    </Stack>
  );
};

const renderDate = (time: string, locale: string) => {
  return formatDate(new Date(time), 'dd MMMM yyyy', locale as AppLocale);
};

export default XdsNameWidget;
