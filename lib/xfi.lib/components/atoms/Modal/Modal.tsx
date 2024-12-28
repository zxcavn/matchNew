import { Stack, Typography } from '@mui/material';
import { useHandleKeyDown } from '@xfi/hooks';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { CloseIcon } from '../../../icons';
import { useMediaQuery } from '../../../theme';
import { Divider } from '../Divider';
import { Icon } from '../Icon';
import ScrollDisabler from '../ScrollDisabler';
import { StyledCloseButton, StyledModal } from './styles';

export const TEST_ID = 'modal-test-id';
export const CLOSE_BUTTON_TEST_ID = 'close-button-test-id';

export type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children?: ReactNode;
  footerComponent?: ReactNode;
  showCloseButton?: boolean;
  keepMounted?: boolean;
  title?: Parameters<typeof FormattedMessage>[0];
  hideFooter?: boolean;
};

type CloseButtonProps = {
  handleClick: () => void;
};

const CloseButton = ({ handleClick }: CloseButtonProps) => (
  <StyledCloseButton onClick={handleClick} data-testid={CLOSE_BUTTON_TEST_ID}>
    <Icon src={CloseIcon} viewBox={'0 0 20 20'} sx={{ fontSize: '1.25rem' }} />
  </StyledCloseButton>
);

/**
 * A modal window component for displaying content or forms in a dialog.
 *
 * The `Modal` component creates a modal window that can be used to display various forms of content, such as messages, forms, or any custom components, in a dialog-like overlay. It provides options for customizing the window's appearance and behavior, including the ability to display a close button, a title, and a custom footer component.
 *
 * @component
 *
 * @param {Props} props - The props for the component.
 * @param {boolean} props.isOpen - A boolean representing whether the modal is currently open or closed.
 * @param {function} props.setIsOpen - A function that allows you to control the open/closed state of the modal.
 * @param {ReactNode} [props.children] - The content to be displayed inside the modal.
 * @param {ReactNode} [props.footerComponent] - A custom footer component to be displayed at the bottom of the modal.
 * @param {boolean} [props.showCloseButton=true] - If true, a close button is displayed in the modal's header.
 * @param {boolean} [props.keepMounted=false] - If true, the modal's content is always kept in the DOM, even when it's closed.
 * @param {Parameters<typeof FormattedMessage>[0]} [props.title] - The title for the modal, defined using the `FormattedMessage` format.
 * @param {boolean} [props.hideFooter=false] - If true, the footer is hidden.
 *
 * @returns {FC} The `Modal` component, which displays content or forms in a modal dialog.
 */
const Modal = ({
  isOpen,
  setIsOpen,
  showCloseButton = true,
  title,
  keepMounted,
  footerComponent,
  hideFooter,
  children,
}: Props) => {
  const closePopup = () => {
    setIsOpen(false);
  };

  useHandleKeyDown('Escape', closePopup);

  const isShowHeader = showCloseButton || title;

  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const footer = !hideFooter && footerComponent;

  if (!isOpen && !keepMounted) return void null;

  return (
    <StyledModal className={clsx({ active: isOpen })} onClick={closePopup} data-testid={TEST_ID}>
      {isOpen && <ScrollDisabler />}

      <Stack className={clsx('content', { active: isOpen })} onClick={e => e.stopPropagation()}>
        <Stack flexGrow={1} overflow={'auto'}>
          {isShowHeader && (
            <Stack className={'headerWrapper'}>
              <Stack className={'header'}>
                {title && (
                  <Typography className="modalTitle" color="background.light" variant={'h3'}>
                    <FormattedMessage {...title} />
                  </Typography>
                )}
                {showCloseButton && <CloseButton handleClick={closePopup} />}
              </Stack>
              <Divider />
            </Stack>
          )}
          <Stack className={'main'}>{children}</Stack>
          {isMobile && footer && <>{footer}</>}
        </Stack>
        {!isMobile && footer && <>{footer}</>}
      </Stack>
    </StyledModal>
  );
};

export default Modal;
