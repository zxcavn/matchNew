import { Box, MenuProps, SxProps } from '@mui/material';
import { cloneElement, ReactElement, useRef } from 'react';

import type { ThemeSxProps } from '../../../theme';
import ScrollDisabler from '../ScrollDisabler';
import { StyledMenu } from './styles';

export type Props = Omit<MenuProps, 'open' | 'onClose'> & {
  trigger: ((isOpen: boolean) => ReactElement) | ReactElement;
  isOpen: boolean;
  onClose: () => void;
  paperSx?: SxProps;
  triggerContainerSx?: ThemeSxProps;
};

/**
 * A dropdown component for displaying content in on temporary surfaces
 *
 * The `Dropdown` component displays contents on a temporary surface. It appears when the user interacts with a trigger element.
 *
 * @component
 *
 * @param {Props} props - The props for the component.
 * @param {boolean} props.isOpen - The boolean representing whether the temporary surface is currently open or closed.
 * @param {function|ReactElement} props.trigger - The function or component which open a temporary surface.
 * @param {function} props.onClose - The function which close temporary surface.
 * @param {SxProps} [props.paperSx] - Props to change appearance of menu paper.
 * @param {SxProps} [props.triggerContainerSx] - Props to change appearance of trigger container.
 *
 * @returns {FC} The `Dropdown` component for displaying content in on temporary surfaces.
 */
const Dropdown = (props: Props) => {
  const { trigger, children, isOpen, onClose, paperSx, triggerContainerSx = {}, ...others } = props;
  const ref = useRef<HTMLDivElement | null>(null);

  const renderTrigger = (isOpen: boolean) => {
    if (typeof trigger === 'function') {
      const comp = trigger(isOpen);

      return !!trigger && cloneElement(comp);
    }

    return !!trigger && cloneElement(trigger);
  };

  return (
    <>
      <Box ref={ref} width={'fit-content'} sx={{ cursor: 'pointer', ...triggerContainerSx }}>
        {renderTrigger(isOpen)}
      </Box>

      {isOpen && <ScrollDisabler />}

      <StyledMenu
        id="menu-appbar"
        $paperSx={paperSx}
        anchorEl={ref.current}
        $minWidth={ref?.current?.offsetWidth ?? 'auto'}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        MenuListProps={{ variant: 'menu' }}
        {...others}
        open={isOpen}
        onClose={onClose}
      >
        {children}
      </StyledMenu>
    </>
  );
};

export default Dropdown;
