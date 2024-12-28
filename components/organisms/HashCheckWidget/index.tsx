import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { Icon } from '@/lib/xfi.lib/components/atoms';
import { AppThemeVariant, useMediaQuery } from '@/lib/xfi.lib/theme';
import { BlueShadowIcon } from '@/public/icons';
import { HASH_CHECK_CUSTOM_BREAKPOINTS } from '@/shared/constants';
import {
  checkExchangeBuyXfiAsync,
  checkSwapMissionAsync,
  missionsSelector,
  setIsCheckBuyXfiSuccess,
  setIsSwapMissionSuccess,
} from '@/store/mission';

import { CheckBuyXfiModal, CheckSwapMpxModal, HashCheckStep } from '@/components/molecules';

import { STEPS_CONFIG } from './constants';
import { StyledHashCheckWidget } from './styles';

const THEME_EXCLUDED_COLOR = '#00BFFF';

const HashCheckWidget = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery(theme => theme.breakpoints.down(HASH_CHECK_CUSTOM_BREAKPOINTS.sm));

  const { isLoading, isSwapMissionSuccess, isCheckBuyXfiSuccess } = useAppSelector(missionsSelector);

  const [isCheckBuyXfiModalOpen, setIsCheckBuyXfiModalOpen] = useState(false);
  const [isCheckSwapMpxModalOpen, setIsCheckSwapMpxModalOpen] = useState(false);

  const isDarkMode = theme.palette.mode === AppThemeVariant.dark;

  useEffect(() => {
    if (isSwapMissionSuccess) {
      setIsCheckSwapMpxModalOpen(false);
      dispatch(setIsSwapMissionSuccess(false));
    }
  }, [dispatch, isSwapMissionSuccess]);

  useEffect(() => {
    if (isCheckBuyXfiSuccess) {
      setIsCheckBuyXfiModalOpen(false);
      dispatch(setIsCheckBuyXfiSuccess(false));
    }
  }, [dispatch, isCheckBuyXfiSuccess]);

  const onCheckSwapMission = (hash: string) => {
    dispatch(checkSwapMissionAsync({ hash }));
  };
  const onCheckExchange = (values: { hash: string }) => {
    dispatch(checkExchangeBuyXfiAsync({ hash: values.hash }));
  };

  return (
    <>
      <StyledHashCheckWidget>
        {isDarkMode && (
          <>
            <Icon src={BlueShadowIcon} viewBox="0 0 1139 836" className="topShadowAreaIcon" />
            <Icon src={BlueShadowIcon} viewBox="0 0 1139 836" className="bottomShadowAreaIcon" />
          </>
        )}
        <Stack gap={isMobile ? '2rem' : '2.5rem'} alignItems={'center'}>
          <Typography
            fontFamily={'Infynyte'}
            maxWidth={'58rem'}
            color={'background.light'}
            sx={{ fontSize: { xs: '1.625rem', md: '2rem' }, textAlign: { xs: 'start', md: 'center' } }}
          >
            <FormattedMessage
              id="STEPS.TITLE"
              values={{
                value: (
                  <>
                    {isMobile && <br></br>}
                    <Typography
                      fontFamily={'Infynyte'}
                      component={'span'}
                      border={`2px solid ${theme.palette.primary.main}`}
                      sx={{ fontSize: { xs: '1.625rem', md: '2rem' } }}
                    >
                      <FormattedMessage id="STEPS.TO_RECEIVE_ADDITIONAL" />
                    </Typography>
                  </>
                ),
                mpx: (
                  <Typography
                    fontFamily={'Infynyte'}
                    component={'span'}
                    border={`2px solid ${theme.palette.primary.main}`}
                    sx={{ fontSize: { xs: '1.625rem', md: '2rem' } }}
                  >
                    MPX
                  </Typography>
                ),
              }}
            />
          </Typography>
          <Typography variant="h3" color={'background.light'} margin={'0 auto'}>
            <FormattedMessage
              id="STEPS.SUBTITLE"
              values={{
                mpx: (
                  <Typography variant="h3" component={'span'} color={THEME_EXCLUDED_COLOR}>
                    MPX
                  </Typography>
                ),
                xfi: (
                  <Typography variant="h3" component={'span'} color={THEME_EXCLUDED_COLOR}>
                    XFI
                  </Typography>
                ),
              }}
            />
          </Typography>
        </Stack>
        <Box className={'stepsContainer'}>
          {STEPS_CONFIG({
            checkBuyXfiClick: () => setIsCheckBuyXfiModalOpen(true),
            checkSwapMpxClick: () => setIsCheckSwapMpxModalOpen(true),
          }).map((step, index) => {
            return (
              <HashCheckStep
                key={index}
                className={`step-${index + 1}`}
                index={index + 1}
                description={step.description}
                images={step.images}
              />
            );
          })}
        </Box>
      </StyledHashCheckWidget>
      <CheckBuyXfiModal
        isOpen={isCheckBuyXfiModalOpen}
        setIsOpen={setIsCheckBuyXfiModalOpen}
        isLoading={Boolean(isLoading)}
        onSubmit={onCheckExchange}
      />

      <CheckSwapMpxModal
        isOpen={isCheckSwapMpxModalOpen}
        setIsOpen={setIsCheckSwapMpxModalOpen}
        isLoading={Boolean(isLoading)}
        onSubmit={onCheckSwapMission}
      />
    </>
  );
};

export default HashCheckWidget;
