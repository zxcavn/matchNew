import { Stack } from '@mui/material';
import type { PropsWithChildren, ReactElement } from 'react';

import { Modal } from '@/lib/xfi.lib/components/atoms';

import Description from './Description';
import Details from './Details';
import StepIndicator from './StepIndicator';
import SubmitButton from './SubmitButton';

type Props = PropsWithChildren<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: string;
  buttonSlot: ReactElement;
}>;

const XdsOperationModal = ({ isOpen, setIsOpen, title = 'SUMMARY.CONFIRM_DETAILS', children, buttonSlot }: Props) => {
  return (
    <Modal title={{ id: title }} isOpen={isOpen} setIsOpen={setIsOpen}>
      <Stack height="100%" gap="2rem" justifyContent="space-between">
        <Stack gap="1.5rem">{children}</Stack>
        {buttonSlot}
      </Stack>
    </Modal>
  );
};

XdsOperationModal.Description = Description;
XdsOperationModal.Details = Details;
XdsOperationModal.StepIndicator = StepIndicator;
XdsOperationModal.SubmitButton = SubmitButton;

export default XdsOperationModal;
