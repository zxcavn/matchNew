import { Stack, Typography } from '@mui/material';
import { useElementSize } from '@xfi/hooks';
import { useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAppSelector } from '@/hooks';
import { Block, Button } from '@/lib/xfi.lib/components/atoms';
import { NONE_VALUE } from '@/shared/constants';
import { ProposalMessageType } from '@/shared/types';
import { govSelector } from '@/store/gov';

import { getProposalContent } from './constants';
import { StyledProposalDetails } from './styles';

const MAX_DESCRIPTION_HEIGHT = 269;

const ProposalDetailsWidget = () => {
  const {
    ref: descriptionRef,
    size: { scrollHeight },
  } = useElementSize<HTMLDivElement>();

  const {
    proposal: { data: proposal },
  } = useAppSelector(govSelector);

  const [isShowMore, setIsShowMore] = useState(false);
  const [isDescriptionLong, setIsDescriptionLong] = useState(false);

  const proposalContent = useMemo(() => {
    const proposalType = proposal?.content?.type;

    if (proposalType && proposalType !== ProposalMessageType.TEXT) {
      return getProposalContent({ proposal });
    } else {
      return null;
    }
  }, [proposal]);

  useEffect(() => {
    setIsDescriptionLong(scrollHeight > MAX_DESCRIPTION_HEIGHT);
  }, [scrollHeight]);

  return (
    <StyledProposalDetails $isShowMore={isShowMore}>
      <Block variant="transparent">
        <Stack alignItems={'center'}>
          <Typography ref={descriptionRef} className={'description'} variant="body2">
            {proposal?.content?.description || NONE_VALUE}
          </Typography>
          {isDescriptionLong && (
            <Button className="showButton" variant="transparent" onClick={() => setIsShowMore(prev => !prev)}>
              <FormattedMessage id={isShowMore ? 'SUMMARY.SHOW_LESS' : 'SUMMARY.SHOW_MORE'} />
            </Button>
          )}
        </Stack>
      </Block>
      {proposalContent ? proposalContent : null}
    </StyledProposalDetails>
  );
};

export default ProposalDetailsWidget;
