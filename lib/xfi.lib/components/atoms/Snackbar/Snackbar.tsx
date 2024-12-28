import { Slide, SnackbarOrigin } from '@mui/material';
import { memo, ReactElement } from 'react';

import { useMediaQuery } from '../../../theme';
import { StyledSnackbar } from './styles';

export const TEST_ID = 'snackbar-test-id';

export type Props = {
  direction?: 'left' | 'right' | 'up' | 'down';
  isOpen: boolean;
  id?: string;
  children: ReactElement;
  onClose: () => void;
  autoHideDuration?: number;
};

/**
 * A component for displaying snackbars with various configurations.
 *
 * The `Snackbar` component is used to display a snackbar with customizable properties, such as direction, open state, and auto-hide duration. It utilizes the `Slide` component for transition animations.
 *
 * @component
 *
 * @param {Props} props - The props for configuring the `Snackbar` component.
 * @param {'left' | 'right' | 'up' | 'down'} [props.direction='left'] - The direction from which the snackbar appears.
 * @param {boolean} props.isOpen - A boolean indicating whether the snackbar is open.
 * @param {string} [props.id] - An optional unique identifier for the snackbar.
 * @param {ReactElement} props.children - The content to be displayed within the snackbar.
 * @param {() => void} props.onClose - A callback function to be executed when the snackbar is closed.
 * @param {number} [props.autoHideDuration] - The duration (in milliseconds) for auto-hiding the snackbar. If not specified, the snackbar will remain open until manually closed.
 *
 * @returns {FC} The `Snackbar` component for displaying snackbars.
 */
const Snackbar = memo(({ children, isOpen, direction = 'left', onClose, autoHideDuration }: Props) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const anchorOrigin: SnackbarOrigin = isMobile
    ? { vertical: 'top', horizontal: 'center' }
    : { vertical: 'bottom', horizontal: 'left' };

  return (
    <StyledSnackbar
      data-testid={TEST_ID}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      open={isOpen}
      autoHideDuration={autoHideDuration}
      disableWindowBlurListener
      ClickAwayListenerProps={{
        disableReactTree: true,
        touchEvent: false,
        mouseEvent: false,
      }}
      TransitionComponent={props => <Slide {...props} direction={direction} />}
    >
      {children}
    </StyledSnackbar>
  );
});

export default Snackbar;
