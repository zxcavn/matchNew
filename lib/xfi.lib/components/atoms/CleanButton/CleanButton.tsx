import { ButtonBase, ButtonBaseProps } from '@mui/material';

import { SquareXmarkIcon } from '../../../icons';
import { Icon } from '../Icon';

export const TEST_ID = 'cleanButton-test-id';

const CleanButton = (props: ButtonBaseProps) => {
  return (
    <ButtonBase {...props}>
      <Icon src={SquareXmarkIcon} viewBox="0 0 20 21" sx={{ fontSize: '1.25rem' }} />
    </ButtonBase>
  );
};

export default CleanButton;
