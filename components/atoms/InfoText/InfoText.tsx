import { Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { KeplrIcon } from '../../../public/icons';
import { Icon } from '../Icon';

import { StyledInfoTextContainer } from './styles';

export const TEST_ID = 'info-text-test-id';

export type Props = {
  formattedText: Parameters<typeof FormattedMessage>[number];
};

const InfoText = ({ formattedText }: Props) => {
  return (
    <StyledInfoTextContainer data-testid={TEST_ID}>
      <Icon src={KeplrIcon} sx={{ fontSize: '1.25rem', flexShrink: 0 }} viewBox="0 0 20 20" />
      <Typography variant="body2" color="neutrals.secondaryText">
        <FormattedMessage {...formattedText} />
      </Typography>
    </StyledInfoTextContainer>
  );
};

export default InfoText;
