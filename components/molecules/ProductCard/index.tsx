import { Box, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import { Icon } from '@/lib/xfi.lib/components/atoms';
import { Product } from '@/shared/constants';

import { Parallelepiped } from '@/components/atoms';

import { StyledProductCard } from './styles';

const ProductCard = ({ card }: { card: Product }) => {
  const { icon, viewBox, highlightedDescription, description, linkText, linkText2, href, href2 } = card;

  return (
    <StyledProductCard>
      <Stack className={'iconWrapper'} alignItems={'center'} justifyContent={'center'}>
        <Icon
          src={icon}
          viewBox={viewBox}
          sx={{ maxWidth: '17.188rem', width: 'fit-content', height: 'fit-content' }}
        />
      </Stack>
      <Stack
        padding={{ xs: '1.5rem 0.937rem 1.5rem 1.5rem', md: '2rem' }}
        gap={'1.438rem'}
        justifyContent={'space-between'}
        flex={'auto'}
      >
        <Box>
          <Typography variant="h3" color={'primary.main'} component={'span'}>
            {highlightedDescription} -
          </Typography>{' '}
          <Typography variant="h3" component={'span'}>
            <FormattedMessage id={description} />
          </Typography>
        </Box>

        {href ? (
          <Box display={'flex'} gap={'1rem'}>
            <Link href={href} target="_blank">
              <Parallelepiped sx={{ padding: '0.15rem 1.375rem 0.625rem' }}>
                <Typography variant="h3_infynyte" className="productCardButtonText">
                  <FormattedMessage id={linkText} />
                </Typography>
              </Parallelepiped>
            </Link>
            {href2 && (
              <Link href={href2} target="_blank">
                <Parallelepiped sx={{ padding: '0.15rem 1.375rem 0.625rem' }}>
                  <Typography variant="h3_infynyte" className="productCardButtonText">
                    <FormattedMessage id={linkText2} />
                  </Typography>
                </Parallelepiped>
              </Link>
            )}
          </Box>
        ) : (
          <Typography variant="h3_infynyte" fontSize={{ xs: '1rem', md: '1.5rem' }} pb={'0.625rem'}>
            <FormattedMessage id={'SUMMARY.COMING_SOON'} />
          </Typography>
        )}
      </Stack>
    </StyledProductCard>
  );
};

export default ProductCard;
