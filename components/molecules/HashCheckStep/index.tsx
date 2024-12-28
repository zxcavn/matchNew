import { Stack, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { Icon } from '@/lib/xfi.lib/components/atoms';
import { AppThemeVariant } from '@/lib/xfi.lib/theme';
import { StepOverlineIcon } from '@/public/icons';

import { StyledHashCheckStep } from './styles';

type Props = {
  index: number;
  description: ReactNode;
  images?: ReactNode;
  className?: string;
};

const HashCheckStep = ({ index, description, images, className }: Props) => {
  const theme = useTheme();

  return (
    <StyledHashCheckStep className={className}>
      <Icon src={StepOverlineIcon} viewBox="0 0 339 34" className="overlineIcon" />
      <Stack className="stepCard">
        <Image
          src={`/images/hashCheckCard/hashCheckCard.${theme.palette.mode}.webp`}
          width={338}
          height={206}
          alt="step"
        />
        <Stack className="stepDescription" gap={'1rem'}>
          <Typography
            variant="h2"
            color={theme.palette.mode === AppThemeVariant.light ? 'background.light' : 'primary.main'}
            sx={{ fontSize: { xs: '2rem' } }}
          >
            <FormattedMessage id="SUMMARY.STEP_NUMBER" values={{ value: `# ${index}` }} />
          </Typography>
          {description}
        </Stack>
        {images}
      </Stack>
    </StyledHashCheckStep>
  );
};

export default HashCheckStep;
