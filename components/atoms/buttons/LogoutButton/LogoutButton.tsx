import { KeplrIcon } from '@/public/icons';
import { useMediaQuery } from '@/theme';
import { Icon } from '../../Icon';
import { Tooltip } from '../../Tooltip';

import { StyledLogoutButton } from './styles';

export const TEST_ID = 'logout-button-test-id';

export type Props = {
  handleLogoutClick: () => void;
  isExtensionConnection: boolean;
};

const LogoutButton = ({ handleLogoutClick, isExtensionConnection }: Props) => {
  const isTablet = useMediaQuery(theme => theme.breakpoints.down('md'));

  return (
    <Tooltip
      title={'SUMMARY.LOG_OUT'}
      placement={'bottom'}
      componentsProps={tooltipComponentsProps}
      enterNextDelay={150}
    >
      <StyledLogoutButton
        $withExtension={isExtensionConnection}
        onClick={handleLogoutClick}
        size="largeIcon"
        variant={isTablet && !isExtensionConnection ? 'transparent' : 'secondary'}
        data-testid={TEST_ID}
      >
        <Icon className="keplrIcon" src={KeplrIcon} viewBox="0 0 24 24" />
        <Icon className="logoutIcon" src={KeplrIcon} viewBox={'0 0 20 20'} />
      </StyledLogoutButton>
    </Tooltip>
  );
};

const tooltipComponentsProps = {
  tooltip: {
    sx: { '&&&': { marginLeft: '0.875rem', padding: '0.69rem 0.75rem' } },
  },
};

export default LogoutButton;
