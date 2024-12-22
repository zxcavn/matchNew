import { Stack, Typography } from '@mui/material';
import trim from 'lodash/trim';
import { Dispatch, SetStateAction, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button, Input, Modal } from '@/lib/xfi.lib/components/atoms';
import { StyledLink } from '@/lib/xfi.lib/components/atoms/Link/styles';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { DOCS_CROSSFI_STEP_5 } from '@/shared/constants';

const DETAILS_LINK = DOCS_CROSSFI_STEP_5;

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  onSubmit: (hash: string) => void;
  isLoading: boolean;
};

const CheckSwapMpxModal = ({ setIsOpen, isOpen, onSubmit, isLoading }: Props) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const [hash, setHash] = useState('');

  return (
    <Modal title={{ id: 'MISSIONS.CONFIRM_TRANSACTION_HASH' }} isOpen={isOpen} setIsOpen={setIsOpen}>
      <Stack gap={'2rem'} width={'100%'}>
        <Typography variant="body2" color={'neutrals.secondaryText'}>
          <FormattedMessage
            id={'MISSIONS.CONFIRM_TRANSACTION_HASH_DESCRIPTION'}
            values={{
              detailsLink: (
                <a href={DETAILS_LINK} target="_blank">
                  <StyledLink component={'span'} variant="body2">
                    <FormattedMessage id={'SUMMARY.DETAILS'} />
                  </StyledLink>
                </a>
              ),
            }}
          />
        </Typography>
        <Input
          label={{ type: 'intl', id: 'SUMMARY.HASH' }}
          placeholder={{ type: 'intl', id: 'SUMMARY.ENTER_HASH' }}
          value={hash}
          onChange={e => setHash(trim(e.target.value))}
        />
        <Stack
          gap={'1rem'}
          direction={{ xs: 'column-reverse', md: 'row' }}
          alignSelf={'flex-end'}
          width={isMobile ? '100%' : undefined}
        >
          <Button variant={'secondary'} size={'large'} onClick={() => setIsOpen(false)} isFullWidth={isMobile}>
            <FormattedMessage id={'SUMMARY.CANCEL'} />
          </Button>
          <Button
            variant={'primary'}
            size={'large'}
            onClick={() => {
              onSubmit(trim(hash));
            }}
            isLoading={isLoading}
            isDisabled={!hash}
            isFullWidth={isMobile}
          >
            <FormattedMessage id={'SUMMARY.CONFIRM'} />
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default CheckSwapMpxModal;
