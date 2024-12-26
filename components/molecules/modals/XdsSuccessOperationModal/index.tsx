import { Stack, Typography } from '@mui/material';
import { trimStringAndInsertDots } from '@xfi/helpers';
import { type ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button, Icon, Modal } from '@/lib/xfi.lib/components/atoms';
import { useIntlHelpers } from '@/lib/xfi.lib/i18n';
import { CloseIcon } from '@/lib/xfi.lib/icons';



import { StyledContainer } from './styles';

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  operationTitle: string;
  name: string;
  description?: {
    text: string;
    additional?: ReactElement;
  };
  detailsSlot: ReactElement;
  button: {
    text: string;
    onClick: () => void;
  };
};

const XdsSuccessOperationModal = ({
  isOpen,
  setIsOpen,
  operationTitle,
  name,
  description,
  detailsSlot,
  button,
}: Props) => {
  const { isFormattedMessageId } = useIntlHelpers();

  const displayName = trimStringAndInsertDots({
    value: name,
    charsAfterDots: 0,
    charsBeforeDots: 18,
  });

  return (
    <Modal showCloseButton={false} isOpen={isOpen} setIsOpen={setIsOpen}>
      <StyledContainer>
        <Stack alignItems={'flex-end'} width="100%">
          <Icon
            src={CloseIcon}
            viewBox={'0 0 20 20'}
            sx={{ fontSize: '1.25rem', cursor: 'pointer' }}
            onClick={() => setIsOpen(false)}
          />
        </Stack>
        <Typography variant="h3" component={'div'}>
          <FormattedMessage id={'SUMMARY.CONGRATULATIONS'} />
        </Typography>
        <Stack width="100%" gap={'2rem'} height={'100%'} justifyContent={'space-between'}>
          <Stack gap={'2rem'}>
            <Typography
              sx={{ overflowWrap: 'break-word' }}
              textAlign={'center'}
              variant="h4_infynyte"
              component={'span'}
            >
              {isFormattedMessageId(operationTitle) ? (
                <FormattedMessage
                  id={operationTitle}
                  values={{
                    name: displayName,
                    span: value => (
                      <Typography variant="h4_infynyte" component={'span'} color="primary.main">
                        {value}
                      </Typography>
                    ),
                  }}
                />
              ) : (
                <>
                  {operationTitle}{' '}
                  <Typography variant="h4_infynyte" component={'span'} color="primary.main">
                    {displayName}
                  </Typography>
                </>
              )}
            </Typography>

            {description && (
              <Typography
                sx={{ overflowWrap: 'break-word' }}
                textAlign={'center'}
                variant="body1"
                color="neutrals.secondaryText"
              >
                {isFormattedMessageId(description.text) ? <FormattedMessage id={description.text} /> : description.text}{' '}
                {description?.additional}
              </Typography>
            )}
            {detailsSlot}
          </Stack>
          <Button onClick={button.onClick} isFullWidth={true} size="large">
            {isFormattedMessageId(button.text) ? <FormattedMessage id={button.text} /> : button.text}
          </Button>
        </Stack>
      </StyledContainer>
    </Modal>
  );
};

export default XdsSuccessOperationModal;
