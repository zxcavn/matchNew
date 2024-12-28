import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { VALIDATORS_CARDS } from '@/shared/constants';

import { Parallelepiped } from '@/components/atoms';
import { EcosystemCard, ResourcesTitle } from '@/components/molecules';

const ValidatorsCards = () => {
  const [isShowMore, setIsShowMore] = useState(false);
  const [formattedValidatorsCards, setFormattedValidatorsCards] = useState(VALIDATORS_CARDS);
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  useEffect(() => {
    isMobile && isShowMore
      ? setFormattedValidatorsCards(VALIDATORS_CARDS)
      : setFormattedValidatorsCards(VALIDATORS_CARDS.slice(0, 5));
    !isMobile && (setFormattedValidatorsCards(VALIDATORS_CARDS), setIsShowMore(false));
  }, [isMobile, isShowMore]);

  return (
    <Stack component={'section'} gap={'2.75rem'} className="validatorsSection">
      <ResourcesTitle position={'.04'} title={'SUMMARY.VALIDATORS_TOOLS'} />
      <Box className="validatorsBlock">
        {formattedValidatorsCards.map(card => (
          <EcosystemCard card={card} key={card.href} isButton />
        ))}
        {isMobile && (
          <Box
            onClick={e => {
              setIsShowMore(!isShowMore);
              const validatorsSection = document.querySelector('.validatorsSection');

              setTimeout(() => {
                validatorsSection?.scrollIntoView({ block: 'start', behavior: 'smooth' });
              }, 100);
              e.stopPropagation();
            }}
          >
            <Parallelepiped
              sx={{
                marginTop: '1.313rem',
                padding: '0.25rem 1.375rem 0.75rem',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h3_infynyte" textTransform={'lowercase'}>
                <FormattedMessage id={isShowMore ? 'SUMMARY.SHOW_LESS' : 'SUMMARY.SHOW_MORE'} />
              </Typography>
            </Parallelepiped>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default ValidatorsCards;
