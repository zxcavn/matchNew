import { Box, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import { Icon } from '@/lib/xfi.lib/components/atoms';
import { RecourseArrowIcon } from '@/public/icons';
import { EcosystemCardInfo } from '@/shared/constants';

import { Parallelepiped } from '@/components/atoms';

import { StyledEcosystemCard, StyledHoverCard } from './styles';

type Props = {
  card: EcosystemCardInfo;
  isBox?: boolean;
  isButton?: boolean;
};

const EcosystemCard = ({ card, isBox, isButton }: Props) => {
  const { icon, href, href2, linkText, linkText2, viewBox } = card;

  const CardWrapper = isBox ? Parallelepiped : StyledHoverCard;

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
          <CardWrapper sx={{ padding: 0, justifyContent: 'start', width: '100%' }}>
            <Stack
              padding={
                isBox
                  ? { xs: '2.563rem 1.875rem 1.75rem 1.438rem', md: '3.75rem 2.5rem' }
                  : { xs: '3.9rem 2.5rem', md: '3.75rem 2.5rem' }
              }
              alignItems={'start'}
              gap={'1.5rem'}
            >
              <Icon src={icon} sx={{ height: '3.188rem', width: 'auto' }} viewBox={viewBox} />
              <Box display={'flex'} gap={'1.5rem'} zIndex={1}>
                <EcosystemCardLink href={href} text={String(linkText)} />
                {href2 && linkText2 && <EcosystemCardLink href={href2} text={linkText2} />}
              </Box>
            </Stack>
            {!isBox && (
              <>
                <div className="bg" />
                <div className="bgHover" />
              </>
            )}
          </CardWrapper>
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
