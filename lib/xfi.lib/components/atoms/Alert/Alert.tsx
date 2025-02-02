import { AlertProps, Box, useTheme } from '@mui/material';
import { ElementType, forwardRef } from 'react';

import { Icon } from '../../../../../components/atoms/Icon';
import {
    CloseIcon,
    NotificationsErrorGradientIcon,
    NotificationsErrorIcon,
    NotificationsInfoGradientIcon,
    NotificationsInfoIcon,
    NotificationsSuccessGradientIcon,
    NotificationsSuccessIcon,
    NotificationsWarningGradientIcon,
    NotificationsWarningIcon,
} from '../../../icons';
import { AppThemeVariant } from './../../../theme';
import { StyledActionButton, StyledAlert } from './styles';

export const TEST_ID = 'alert-test-id';
export const ACTION_TEST_ID = 'action-test-id';
export const ICON_TEST_ID = 'icon-test-id';

export type Props = AlertProps & {
  onClose: () => void;
};

/**
 * Map of gradient icons for different severity levels.
 *
 * @component
 *
 * @type {object}
 * @property {ElementType} success - The icon for success severity.
 * @property {ElementType} error - The icon for error severity.
 * @property {ElementType} warning - The icon for warning severity.
 * @property {ElementType} info - The icon for information severity.
 */
const Alert = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { severity, children, onClose, ...other } = props;
  const isDarkMode = useTheme().palette.mode === AppThemeVariant.dark;

  return (
    <StyledAlert
      data-testid={TEST_ID}
      elevation={6}
      variant="filled"
      ref={ref}
      iconMapping={{
        success: <AlertIcon src={NotificationsSuccessIcon} />,
        warning: <AlertIcon src={NotificationsWarningIcon} />,
        error: <AlertIcon src={NotificationsErrorIcon} />,
        info: <AlertIcon src={NotificationsInfoIcon} />,
      }}
      action={
        <StyledActionButton data-testid={ACTION_TEST_ID} onClick={onClose}>
          <Icon src={CloseIcon} viewBox="0 0 20 20" />
        </StyledActionButton>
      }
      severity={severity}
      {...other}
    >
      {isDarkMode && (
        <Box className="gradient">
          <Icon className="gradientIcon" src={GRADIENT_ICON_MAP[severity || 'success']} viewBox="0 0 106 94" />
        </Box>
      )}
      {children}
    </StyledAlert>
  );
});

export const AlertIcon = ({ src }: { src: ElementType }) => {
  return <Icon data-testid={ICON_TEST_ID} sx={{ fontSize: '1.25rem' }} viewBox="0 0 20 20" src={src} />;
};

const GRADIENT_ICON_MAP = {
  success: NotificationsSuccessGradientIcon,
  error: NotificationsErrorGradientIcon,
  warning: NotificationsWarningGradientIcon,
  info: NotificationsInfoGradientIcon,
};

export default Alert;
