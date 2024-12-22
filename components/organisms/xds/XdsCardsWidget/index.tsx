import { Box, Stack, Typography } from '@mui/material';
import { redirect } from '@xfi/helpers';
import { useEffectOnce } from '@xfi/hooks';
import { useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { Button, Loader, Pagination } from '@/lib/xfi.lib/components/atoms';
import { PAGES } from '@/shared/constants';
import { evmWalletAddressSelector } from '@/store/wallet';
import { getXdsNameListAsync, xdsNameListSelector } from '@/store/xds';

import { XdsCard } from '@/components/molecules';

import { StyledXdsCardsWidget } from './styles';

const XdsCardsWidget = () => {
  const dispatch = useAppDispatch();
  const evmWalletAddress = useAppSelector(evmWalletAddressSelector);
  const { data, page, isLoading, hasNext } = useAppSelector(xdsNameListSelector);
  const owner = useMemo(() => evmWalletAddress.toLowerCase(), [evmWalletAddress]);

  useEffectOnce(() => {
    const redirectToRegistrationPage = () => redirect(PAGES.xds.registration);

    dispatch(getXdsNameListAsync({ owner }))
      .unwrap()
      .then(({ state: { data } }) => !data.length && redirectToRegistrationPage())
      .catch(e => {
        console.error('getXdsNameListAsync error', e);
        redirectToRegistrationPage();
      });
  });

  const onChange = useCallback(
    (page: number) => {
      dispatch(getXdsNameListAsync({ owner, page }));
    },
    [owner]
  );

  return (
    <StyledXdsCardsWidget>
      <Stack mb={{ md: '2rem', xs: '1.5rem' }} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant={'subtitle1'}>
          <FormattedMessage id={'SUMMARY.NAMES'} />
        </Typography>
        <Button onClick={() => redirect(PAGES.xds.registration.pathname)}>
          <FormattedMessage id={'SUMMARY.REGISTER_NAME'} />
        </Button>
      </Stack>
      <Box position="relative" minHeight="23.75rem" className={'gridWrapper'}>
        {(isLoading || !data.length) && <Loader variant="block" />}

        {data.map(nameData => (
          <XdsCard key={nameData.id} {...nameData} onClick={() => redirect(PAGES.xds.nameDetails(nameData.label))} />
        ))}
      </Box>
      {!!data.length && (
        <Pagination className="pagination" variant="short" onChange={onChange} page={page} hasNext={hasNext} />
      )}
    </StyledXdsCardsWidget>
  );
};

export default XdsCardsWidget;
