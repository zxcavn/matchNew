import { ButtonBase, ButtonBaseProps } from '@mui/material';

import { Icon } from '../../../../../components/atoms/Icon';
import { SquareXmarkIcon } from '../../../icons';

export const TEST_ID = 'cleanButton-test-id';

const CleanButton = (props: ButtonBaseProps) => {
  return (
    <ButtonBase {...props}>
      <Icon src={SquareXmarkIcon} viewBox="0 0 20 21" sx={{ fontSize: '1.25rem' }} />
    </ButtonBase>
  );
};

export default CleanButton;
