import { Stack, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import * as Yup from 'yup';

import { Block, Modal } from '@/lib/xfi.lib/components/atoms';
import { StyledLink } from '@/lib/xfi.lib/components/atoms/Link/styles';
import { FormBlock, FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules';
import { DOCS_CROSSFI_STEP_4_1 } from '@/shared/constants';

import FormButtons from '@/components/molecules/forms/FormButtons';

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  onSubmit: ({ hash }: { hash: string }) => void;
  isLoading: boolean;
};

const ConfirmWithdrawalHashModal = ({ setIsOpen, isOpen, onSubmit, isLoading }: Props) => {
  const { formatMessage } = useIntl();

  return (
    <Modal title={{ id: 'STEPS.CONFIRM_TRANSACTION_HASH' }} isOpen={isOpen} setIsOpen={setIsOpen}>
      <Stack gap={'2rem'}>
        <Typography variant="body1" color={'neutrals.secondaryText'}>
          <FormattedMessage id="STEPS.INSERT_TRANSACTION_HASH" />
        </Typography>
        <FormBlock<{ hash: string }>
          id="checkBuyXfiForm"
          validationRules={{
            hash: Yup.string().test('trim', formatMessage({ id: 'LIB.ERRORS.REQUIRED_FIELD' }), value =>
              Boolean(value?.trim())
            ),
          }}
          onSubmit={onSubmit}
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
                component: (
                  <>
                    <Block sx={{ padding: '1rem' }}>
                      <Typography>
                        <FormattedMessage
                          id="STEPS.READ_TERMS_CONDITIONS_NOTE"
                          values={{
                            link: (
                              <a href={DOCS_CROSSFI_STEP_4_1} target="_blank">
                                <StyledLink component={'span'}>
                                  <FormattedMessage id={'STEPS.TERMS_AND_CONDITIONS'} />
                                </StyledLink>
                              </a>
                            ),
                          }}
                        />
                      </Typography>
                    </Block>
                    <FormButtons isLoading={isLoading} onCancel={() => setIsOpen(false)} />
                  </>
                ),
              },
            },
          ]}
        />
      </Stack>
    </Modal>
  );
};

export default ConfirmWithdrawalHashModal;
