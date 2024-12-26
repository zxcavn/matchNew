import { Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { redirect } from '@xfi/helpers';
import { useEffect, useMemo, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { calculateUsdtPrice, formatDurationCount } from '@/helpers';
import { useAppDispatch, useAppSelector, useWalletPrimaryName } from '@/hooks';
import { useCurrentRegistrationItem, useRegistrationData, useXdsNamePageParam } from '@/hooks/xds';
import { AppLocale } from '@/lib/i18n';
import { Button } from '@/lib/xfi.lib/components/atoms';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { PAGES, REGISTRATION_INTERVAL } from '@/shared/constants';
import { CosmosCurrency } from '@/shared/types';
import { currencyBySymbolSelector, getSwapCurrenciesAsync } from '@/store/currencies';


import { XdsPricingBlock } from '@/components/molecules';
import { XdsPricingBlockProps } from '@/components/molecules/XdsPricingBlock';

import { StyledBlock, StyledContainer } from './styles';

type Props = {
  className?: string;
};

const CompleteRegistrationWidget = ({ className }: Props) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const { locale } = useIntl();
  const dispatch = useAppDispatch();
  const { displayName, name } = useXdsNamePageParam();
  const { updateCurrentData, updateData } = useRegistrationData();
  const data = useCurrentRegistrationItem();
  const currency = useAppSelector(currencyBySymbolSelector(CosmosCurrency.XFI));
  const registrationDataRef = useRef(data);

  const { getPrimaryName } = useWalletPrimaryName({ isEnabled: false });

  const pricingBlockProps = useMemo(() => {
    const namePrice = MxNumberFormatter.toBigInt(data?.registerData?.rentPrice || '0');
    const networkFee =
      MxNumberFormatter.toBigInt(data?.commitmentData?.fee || '0') +
      MxNumberFormatter.toBigInt(data?.registerData?.fee || '0');
    const totalPrice = namePrice + networkFee;
    const usdtPrice = calculateUsdtPrice(totalPrice, currency?.rate || 0);
    const duration = formatDurationCount(data?.durationCount || 0, REGISTRATION_INTERVAL, locale as AppLocale);

    return {
      usdtPrice,
      data: [
        { text: { id: 'SUMMARY.REGISTRATION_TIME_BY_DURATION', values: { duration } }, amount: namePrice },
        { text: { id: 'SUMMARY.ESTIMATED_NETWORK_FEE' }, amount: networkFee },
        { text: { id: 'SUMMARY.ESTIMATED_TOTAL' }, amount: totalPrice, isPrimaryText: true },
      ],
    } as XdsPricingBlockProps;
  }, [data, locale, currency?.rate]);

  useEffect(() => {
    dispatch(getSwapCurrenciesAsync());
    getPrimaryName();

    if (registrationDataRef.current) {
      const data = registrationDataRef.current;

      updateCurrentData({
        isCompleted: true,
      });
      updateData({
        name: data.payload.name,
        data: {
          ...data,
          isCompleted: true,
        },
      });
    }
  }, []);

  if (!data) {
    return null;
  }

  return (
    <StyledContainer className={className}>
      <StyledBlock>
        <div className="blockContent">
          <Typography className="title" variant="h2" color="background.light">
            <FormattedMessage id="SUMMARY.CONGRATULATIONS" />
          </Typography>
          <Typography className="subtitle" variant="h4_infynyte" color="background.light">
            <FormattedMessage
              id="XDS.YOU_ARE_NOW_THE_OWNER_OF_NAME"
              values={{
                name: displayName,
                span: value => (
                  <Typography textTransform="lowercase" component="span" variant="h4_infynyte" color="primary.light">
                    {value}
                  </Typography>
                ),
              }}
            ></FormattedMessage>
          </Typography>
          <Typography className="description" variant="body1" color="neutrals.secondaryText">
            <FormattedMessage id="XDS.YOUR_NAME_SUCCESSFULLY_REGISTERED" />
          </Typography>
          <XdsPricingBlock {...pricingBlockProps} />
          <div className="buttonContainer">
            <Button
              onClick={() => redirect(PAGES.xds.registration.pathname)}
              isFullWidth={isMobile}
              size="large"
              variant="secondary"
            >
              <FormattedMessage id="XDS.REGISTER_ANOTHER" />
            </Button>
            <Button onClick={() => redirect(PAGES.xds.nameDetails(name))} isFullWidth={isMobile} size="large">
              <FormattedMessage id="XDS.VIEW_NAME" />
            </Button>
          </div>
        </div>
      </StyledBlock>
    </StyledContainer>
  );
};

export default CompleteRegistrationWidget;
