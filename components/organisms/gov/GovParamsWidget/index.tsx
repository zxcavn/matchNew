import { Stack, Typography } from '@mui/material';
import { useElementSize } from '@xfi/hooks';
import { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useAppSelector } from '@/hooks';
import { Loader } from '@/lib/xfi.lib/components/atoms';
import { govSelector } from '@/store/gov';

import { getGovFormattedParams } from './constants';
import { StyledGovParamsBlock } from './styles';

const GovParamsWidget = () => {
  const { locale } = useIntl();
  const {
    ref: containerRef,
    size: { width },
  } = useElementSize<HTMLDivElement>();
  const {
    govParams: { data: govParams, isLoading },
  } = useAppSelector(govSelector);
  const params = useMemo(() => getGovFormattedParams(govParams, locale), [govParams, locale]);

  return (
    <StyledGovParamsBlock $width={width} variant="transparent">
      <Stack className="paramsWrapper" ref={containerRef}>
        {!isLoading ? (
          params.map(({ name, value }) => (
            <Stack key={name} className="paramBlock" gap={'1rem'}>
              <Typography variant="caption" color="neutrals.secondaryText">
                <FormattedMessage id={name} />
              </Typography>
              <Typography variant="subtitle2">{value}</Typography>
            </Stack>
          ))
        ) : (
          <Loader />
        )}
      </Stack>
    </StyledGovParamsBlock>
  );
};

export default GovParamsWidget;
