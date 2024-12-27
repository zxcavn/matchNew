import { Box, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import { Icon } from '@/lib/xfi.lib/components/atoms';
import { RecourseArrowIcon } from '@/public/icons';
import { EcosystemCardInfo } from '@/shared/constants';


import { StyledEcosystemCard, StyledHoverCard } from './styles';

type Props = {
  card: EcosystemCardInfo;
  isBox?: boolean;
  isButton?: boolean;
};

const EcosystemCard = ({ card, isBox, isButton }: Props) => {
  const { icon, href, href2, linkText, linkText2, viewBox } = card;


  return (
    <>
      {isButton ? (
        <StyledEcosystemCard>
          <StyledHoverCard>
            <Link href={href} target={'_blank'} className="ecosystemButtonLink">
              <Icon
                src={icon}
                viewBox={viewBox}
                sx={{
                  width: '11.562rem',
                  height: '3.875rem',
                }}
                className="ecosystemCardLogo"
              />
            </Link>
            {!isBox && (
              <>
                <div className="bg" />
                <div className="bgHover" />
              </>
            )}
          </StyledHoverCard>
        </StyledEcosystemCard>
      ) : (
        <StyledEcosystemCard>
        </StyledEcosystemCard>
      )}
    </>
  );
};

export default EcosystemCard;

const EcosystemCardLink = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link href={href} target={'_blank'} className="ecosystemCardLink">
      <Box display={'flex'} alignItems={'baseline'} gap={'0.5rem'}>
        <Typography variant="h3_infynyte" fontSize={{ xs: '1rem', md: '1.5rem' }}>
          <FormattedMessage id={text} />
        </Typography>
        <Icon
          src={RecourseArrowIcon}
          viewBox="0 0 29 28"
          sx={{ fontSize: '0.875rem' }}
          className="ecosystemCardArrow"
        />
      </Box>
    </Link>
  );
};
