import { Box, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import { FormattedMessage } from 'react-intl';

import { useMediaQuery } from '@/lib/xfi.lib/theme';

import { ShapeBackground } from '@/components/atoms';

import { StyledContainer, StyledDescriptionContainer } from './styles';

type Props = PropsWithChildren<{
  className?: string;
}>;

const SearchXdsNameBlock = ({ className, children }: Props) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  return (
    <StyledContainer className={className}>
      <StyledDescriptionContainer>
        <Typography className="title" zIndex={1} variant="h1_infynyte" component="h4" color="background.light">
          <FormattedMessage id="XDS.SEARCH.TITLE" />
        </Typography>
        <Typography zIndex={1} variant="body1" color="neutrals.secondaryText">
          <FormattedMessage id="XDS.SEARCH.DESCRIPTION" />
        </Typography>
        {!isMobile && (
          <>
            <ShapeBackground
              figureType={'xds'}
              className={'xdsBgImage1'}
              width={280}
              height={280}
              backgroundProps={BACKGROUND_PROPS_SHAPE_1}
            />
            <ShapeBackground
              figureType={'xds'}
              className={'xdsBgImage2'}
              width={280}
              height={280}
              backgroundProps={BACKGROUND_PROPS_SHAPE_2}
            />
          </>
        )}
      </StyledDescriptionContainer>

      <Box className="searchInputContainer">{children}</Box>
    </StyledContainer>
  );
};

export default SearchXdsNameBlock;

const BACKGROUND_PROPS_SHAPE_1 = {
  width: 210,
  height: 642,
  rotation: 135,
  y: -60,
  x: 90,
};

const BACKGROUND_PROPS_SHAPE_2 = {
  width: 210,
  height: 642,
  rotation: 45,
  y: -60,
  x: 50,
};
