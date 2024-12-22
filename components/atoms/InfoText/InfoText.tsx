import { Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Icon } from '@/lib/xfi.lib/components/atoms';
import { InfoIcon } from '@/lib/xfi.lib/icons';

import { StyledInfoTextContainer } from './styles';

export const TEST_ID = 'info-text-test-id';

export type Props = {
  formattedText: Parameters<typeof FormattedMessage>[number];
};

const InfoText = ({ formattedText }: Props) => {
  return (
    <StyledInfoTextContainer data-testid={TEST_ID}>
      <Icon src={InfoIcon} sx={{ fontSize: '1.25rem', flexShrink: 0 }} viewBox="0 0 20 20" />
      <Typography variant="body2" color="neutrals.secondaryText">
        <FormattedMessage {...formattedText} />
      </Typography>
    </StyledInfoTextContainer>
  );
};

export default InfoText;
