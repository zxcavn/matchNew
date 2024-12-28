import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import { Icon } from '@/lib/xfi.lib/components/atoms';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { HtxIcon, MexcIcon, PancakeSwapIcon, RecourseArrowIcon, ShurikenIcon, UniswapIcon } from '@/public/icons';
import { CROSSFI_GET_MPX, HTX_LINK, MEXC_LINK, PANCAKESWAP_LINK, UNISWAP_LINK } from '@/shared/constants';

import { Parallelepiped } from '@/components/atoms';

import ResourcesTitle from '../ResourcesTitle';
import { StyledResourcesGetMpxXfi } from './styles';

const ResourcesGetMpxXfi = () => {
  const isTablet = useMediaQuery(theme => theme.breakpoints.down('md'));
  const cardPadding = isTablet ? '0.6875rem' : '1.75rem';

  return (
    <>
      <Stack component={'section'} gap={{ xs: '1.5rem', md: '4rem' }}>
        <ResourcesTitle position={'.02'} title={'RESOURCES.GET_XFI.TITLE'} />
        <StyledResourcesGetMpxXfi>
          <Box className="imageWrapper">
            <Image src={'/images/xfiCoin.webp'} fill alt="xfiCoin" />
          </Box>
          <Stack
            flexDirection={'row'}
            justifyContent={'center'}
            gap={{ xs: '1rem', md: '1.5rem' }}
            width={'100%'}
            maxWidth={{ xs: '20.5rem', md: '38.875rem' }}
          >
            <Stack alignItems={'center'} gap={{ xs: '1rem', md: '1.5rem' }} width={'100%'}>
              <Typography variant={'h3_infynyte'} color={'neutrals.secondaryText'} textAlign={'center'}>
                <FormattedMessage id={'RESOURCES.GET_XFI.CEX'} />
              </Typography>
              <a href={MEXC_LINK} className="link" target={'_blank'} style={{ padding: cardPadding }}>
                <Icon
                  src={MexcIcon}
                  sx={{
                    fontSize: { md: '2.2rem', xs: '1rem' },
                    width: '100%',
                  }}
                  viewBox="0 0 209 32"
                />
                <div className="bg" />
                <div className="bgHover" />
              </a>
              <a href={HTX_LINK} className="link" target={'_blank'} style={{ padding: cardPadding }}>
                <Icon
                  src={HtxIcon}
                  sx={{ fontSize: { md: '3.125rem', xs: '1.5625rem' }, width: '100%' }}
                  viewBox="0 0 130 50"
                />
                <div className="bg" />
                <div className="bgHover" />
              </a>
            </Stack>
            <Stack alignItems={'center'} gap={{ xs: '1rem', md: '1.5rem' }} width={'100%'}>
              <Typography variant={'h3_infynyte'} color={'neutrals.secondaryText'} textAlign={'center'}>
                <FormattedMessage id={'RESOURCES.GET_XFI.DEX'} />
              </Typography>
              <a href={UNISWAP_LINK} className="link" target={'_blank'} style={{ padding: cardPadding }}>
                <Icon
                  src={UniswapIcon}
                  sx={{
                    fontSize: { md: '2.8rem', xs: '1.7rem' },
                    width: '100%',
                  }}
                  viewBox="0 0 200 43"
                />
                <div className="bg" />
                <div className="bgHover" />
              </a>
              <a href={PANCAKESWAP_LINK} className="link" target={'_blank'} style={{ padding: cardPadding }}>
                <Icon
                  src={PancakeSwapIcon}
                  sx={{
                    fontSize: { md: '3.125rem', xs: '2rem' },
                    width: '100%',
                  }}
                  viewBox="0 0 246 50"
                />
                <div className="bg" />
                <div className="bgHover" />
              </a>
            </Stack>
          </Stack>
        </StyledResourcesGetMpxXfi>
      </Stack>
      <Stack component={'section'} gap={{ xs: '1.5rem', md: '4rem' }}>
        <ResourcesTitle position={'.03'} title={'RESOURCES.GET_MPX.TITLE'} />
        <StyledResourcesGetMpxXfi flexDirection="row">
          <Box className="imageWrapper">
            <Image src={'/images/mpxCoin.webp'} fill alt="mpxCoin" />
            <Box className="resourceBgImage">
              <Image src={'/images/background/resourceBg.webp'} fill alt="resourceBg" />
            </Box>
          </Box>
          <Stack gap={'2.25rem'} maxWidth={'33rem'}>
            <Stack gap={'1rem'} direction={'row'}>
              <Icon src={ShurikenIcon} viewBox={'0 0 16 16'} sx={{ mt: '0.25rem' }} />
              <Typography color={'background.light'} variant={'h3'} className={'getMpxFontStyle'}>
                <FormattedMessage
                  id={'RESOURCES.GET_MPX.TEXT'}
                  values={{
                    subText: (
                      <Typography
                        component={'span'}
                        color={'neutrals.secondaryText'}
                        variant={'h3'}
                        className={'getMpxFontStyle'}
                      >
                        <FormattedMessage id={'RESOURCES.GET_MPX.SUB_TEXT'} />
                      </Typography>
                    ),
                  }}
                />
              </Typography>
            </Stack>
            <Stack gap={'1rem'} direction={'row'}>
              <Icon src={ShurikenIcon} viewBox={'0 0 16 16'} sx={{ mt: '0.25rem' }} />
              <Typography color={'background.light'} variant={'h3'} className={'getMpxFontStyle'}>
                <FormattedMessage id={'RESOURCES.GET_MPX.TEXT_2'} />
              </Typography>
            </Stack>
            <Link href={CROSSFI_GET_MPX} target="_blank" className={'getMpxButton'}>
              <Parallelepiped sx={{ padding: '0.15rem 1.375rem 0.625rem', width: 'fit-content' }}>
                <Box display={'flex'} alignItems={'baseline'} gap={'0.5rem'}>
                  <Typography variant="h3_infynyte" className={'getMpxFontStyle'} textTransform={'lowercase'}>
                    <FormattedMessage id={'RESOURCES.PURCHASE_MPX'} />
                  </Typography>
                  <Icon
                    src={RecourseArrowIcon}
                    viewBox="0 0 29 28"
                    sx={{ fontSize: '0.875rem' }}
                    className="ecosystemCardArrow"
                  />
                </Box>
              </Parallelepiped>
            </Link>
          </Stack>
        </StyledResourcesGetMpxXfi>
      </Stack>
    </>
  );
};

export default ResourcesGetMpxXfi;
