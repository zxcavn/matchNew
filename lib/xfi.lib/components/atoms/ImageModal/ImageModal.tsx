import { Box, Stack } from '@mui/material';
import { useHandleKeyDown } from '@xfi/hooks';
import { ReactNode } from 'react';

import { Icon } from '../../../../../components/atoms/Icon';
import { CloseIcon } from '../../../icons';
import { StyledImageModal } from './styles';

export const TEST_ID = 'image-modal-test-id';
export const CLOSE_BUTTON_TEST_ID = 'close-button-image-modal-test-id';

export type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children?: ReactNode;
};

/**
 * ImageModal component provides a modal for displaying images.
 *
 * @component
 *
 * @param {object} props - The properties of the component.
 * @param {boolean} props.isOpen - Indicates whether the modal is open or closed.
 * @param {Function} props.setIsOpen - A function to set the open/close state of the modal.
 * @param {ReactNode} [props.children] - The content to be displayed within the modal.
 *
 * @returns {FC} The rendered ImageModal component.
 */
const ImageModal = ({ isOpen, setIsOpen, children }: Props) => {
  const closePopup = () => {
    setIsOpen(false);
  };

  useHandleKeyDown('Escape', closePopup);

  return (
    <StyledImageModal open={isOpen} onClick={closePopup} data-testid={TEST_ID}>
      <Stack className={'content'} onClick={e => e.stopPropagation()}>
        <Box className={'closeButton'} onClick={closePopup} data-testid={CLOSE_BUTTON_TEST_ID}>
          <Icon src={CloseIcon} viewBox={'0 0 20 20'} sx={{ fontSize: '1.25rem' }} />
        </Box>
        {children}
      </Stack>
    </StyledImageModal>
  );
};

export default ImageModal;
