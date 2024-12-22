import { Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { generateRegistrationData } from '@/helpers';
import { useCurrentRegistrationItem, useRegistrationData } from '@/hooks/xds';
import { Button, ButtonProps, Modal } from '@/lib/xfi.lib/components/atoms';

type Props = Omit<ButtonProps, 'children' | 'onClick'>;

const ResetRegistration = (buttonProps: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { setCurrentData, deleteData } = useRegistrationData();
  const data = useCurrentRegistrationItem();

  const openModal = useCallback(() => setIsOpenModal(true), []);

  const closeModal = useCallback(() => setIsOpenModal(false), []);

  const onSubmit = useCallback(() => {
    if (!data) return;

    const { name, owner } = data.payload;

    deleteData(name);
    setCurrentData(
      generateRegistrationData({
        name,
        address: owner,
      })
    );
    closeModal();
    window.scrollTo({ top: 0 });
  }, [data]);

  return (
    <>
      <Button onClick={openModal} variant="secondary" size="large" {...buttonProps}>
        <FormattedMessage id="SUMMARY.BACK" />
      </Button>

      <Modal title={{ id: 'XDS.RESET_TRANSACTION.TITLE' }} isOpen={isOpenModal} setIsOpen={closeModal}>
        <Stack height="100%" gap="2rem" justifyContent="space-between">
          <Stack gap="1.5rem">
            <Typography variant="body1" color="neutrals.secondaryText">
              <FormattedMessage id="XDS.RESET_TRANSACTION.DESCRIPTION" />
            </Typography>
            <Typography variant="body1" color="neutrals.secondaryText">
              <FormattedMessage id="SUMMARY.ARE_YOU_SURE_TO_CONTINUE" />
            </Typography>
          </Stack>
          <Button isFullWidth onClick={onSubmit} variant="secondary" size="large">
            <FormattedMessage id="SUMMARY.RESET_AND_GO_BACK" />
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default ResetRegistration;
