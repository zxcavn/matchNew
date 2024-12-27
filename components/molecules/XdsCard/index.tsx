import { alpha, Box, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import type { MouseEventHandler } from 'react';
import { useIntl } from 'react-intl';

import { formatDate } from '@/helpers';
import type { AppLocale } from '@/lib/i18n';
import { Block, CopyButton, Divider } from '@/lib/xfi.lib/components/atoms';
import { theme } from '@/lib/xfi.lib/theme';
import type { XdsName } from '@/store/xds';

const IconShape = dynamic(() => import('@/lib/xfi.lib/components/atoms/IconShape'), { ssr: false });

export type XdsCardProps = XdsName & {
  onClick: () => void;
};

const XdsCard = ({ name, address, isPrimary, owner, ownerAddress, expires, onClick }: XdsCardProps) => {
  const { locale } = useIntl();

  return (
    <Block onClick={onClick} sx={{ cursor: 'pointer', overflow: 'hidden', padding: { xs: '1.5rem', md: '2rem' } }}>
      {isPrimary && (
        <Box
          position={'absolute'}
          width={'100%'}
          left={0}
          top={0}
          sx={{ boxShadow: '0px 0px 100px 30px rgba(10, 165, 217, 1)' }}
        />
      )}
      <Stack gap={'1.5rem'} paddingBottom={'1.5rem'} zIndex={1} position={'relative'}>
        <IconShape figureType={'xds'} width={150} height={150} />
        <Stack gap={'1rem'} display={'grid'} gridTemplateRows={'1.75rem 1.5rem'}>
          <Stack overflow={'hidden'} direction={'row'} gap={'0.5rem'} alignItems={'center'}>
            <Typography
              textOverflow={'ellipsis'}
              overflow={'hidden'}
              variant={'h3_infynyte'}
              textTransform={'uppercase'}
            >
              {name}
            </Typography>
            <div onClick={stopPropagation}>
              <CopyButton hasText={false} value={name} />
            </div>
          </Stack>
        </Stack>
      </Stack>
      <Divider
        orientation={'horizontal'}
        sx={{
          borderColor: alpha(theme.palette.neutrals.border, 0.4),
          width: { xs: 'calc(100% - 1rem)', md: 'initial' },
          marginLeft: { xs: '0.5rem', md: '0' },
        }}
      />
      <Stack gap={'1rem'} paddingTop={'1.5rem'}>
        <Stack flexWrap="wrap" gap={'1rem'} direction={{ xs: 'column', md: 'row' }}>
        </Stack>
      </Stack>
    </Block>
  );
};

export default XdsCard;

const stopPropagation: MouseEventHandler<HTMLElement> = event => {
  event.stopPropagation();
};
