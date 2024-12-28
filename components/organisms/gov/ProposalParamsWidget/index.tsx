import { Stack, Typography } from '@mui/material';
import { useElementSize } from '@xfi/hooks';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAppSelector } from '@/hooks';
import { govSelector } from '@/store/gov';

import { getOtherParams, getVotingParams } from './constants';
import { StyledParametersBlock } from './styles';

const ProposalParamsWidget = () => {
  const {
    proposal: { data: proposal },
  } = useAppSelector(govSelector);
  const {
    ref: containerRef,
    size: { width },
  } = useElementSize<HTMLDivElement>();
  const isValidVotingParams = useMemo(
    () => Boolean(proposal?.votingStartTime) && Boolean(proposal?.votingEndTime),
    [proposal]
  );
  const votingParams = useMemo(
    () => (isValidVotingParams ? getVotingParams(proposal) : null),
    [isValidVotingParams, proposal]
  );
  const otherParams = useMemo(() => getOtherParams(proposal), [proposal]);

  return (
    <StyledParametersBlock $width={width} $hasVotingParams={isValidVotingParams}>
      <Stack ref={containerRef}>
        {isValidVotingParams && (
          <Stack className="votingParams">
            {votingParams?.map(item => (
              <Stack key={item.title} className="paramBlock">
                <Typography variant="caption" color={'neutrals.secondaryText'}>
                  <FormattedMessage id={item.title} />
                </Typography>
                {item.value}
              </Stack>
            ))}
          </Stack>
        )}
        <Stack className="otherParams">
          {otherParams.map(item => (
            <Stack key={item.title} className="paramBlock">
              <Typography variant="caption" color={'neutrals.secondaryText'}>
                <FormattedMessage id={item.title} />
              </Typography>
              {item.value}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </StyledParametersBlock>
  );
};

export default ProposalParamsWidget;
