import { Stack, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Modal } from '@/lib/xfi.lib/components/atoms';
import { FormBlock, FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules';
import { useValidationRules } from '@/lib/xfi.lib/hooks';

import FormButtons from '@/components/molecules/forms/FormButtons';

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  onSubmit: ({ hash }: { hash: string }) => void;
};

const CheckMissionModal = ({ setIsOpen, isOpen, onSubmit }: Props) => {
  const { formatMessage } = useIntl();
  const validationRules = useValidationRules();

  const onSubmitForm = ({ hash }: { hash: string }) => onSubmit({ hash: hash.trim() });

  return (
    <Modal title={{ id: 'SUMMARY.CHECK_YOU_TASK' }} isOpen={isOpen} setIsOpen={setIsOpen}>
      <Stack gap={'2rem'}>
        <Typography variant="body1" color={'neutrals.secondaryText'}>
          <FormattedMessage id="MISSIONS.INSERT_THE_HASH" />
        </Typography>
        <FormBlock<{ hash: string }>
          id="checkTaskForm"
          validationRules={{
            hash: validationRules.required,
          }}
          onSubmit={onSubmitForm}
          inputsData={[
            {
              inputName: 'hash',
              type: FormBlockInputTypesEnum.text,
              inputProps: {
                label: { type: 'text', text: formatMessage({ id: 'SUMMARY.HASH' }) },
                placeholder: { type: 'intl', id: 'SUMMARY.ENTER_HASH' },
              },
            },
            {
              type: FormBlockInputTypesEnum.jsx,
              inputProps: {
                component: <FormButtons onCancel={() => setIsOpen(false)} />,
              },
            },
          ]}
        />
      </Stack>
    </Modal>
  );
};

export default CheckMissionModal;
