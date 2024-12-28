import { Stack, styled, Typography } from '@mui/material';
import { ChangeEvent, PropsWithChildren, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button, Input } from '@/lib/xfi.lib/components/atoms';
import { LocalStorageService } from '@/services';
import { APP_PASSWORD } from '@/shared/constants/variables';

import { AuthLayout } from '@/components/templates';

const InitAppPasswordWrapper = ({ children }: PropsWithChildren) => {
  const [isShowWrapper, setIsShowWrapper] = useState(false);

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedAppPassword = atob(LocalStorageService.getAppPassword());

    setIsShowWrapper(!!APP_PASSWORD && storedAppPassword !== APP_PASSWORD);
  }, []);

  const handleChangeInput = (input: ChangeEvent<HTMLInputElement>) => {
    setInputValue(String(input.target.value));
  };
  const handleSubmitDevPassword = () => {
    if (inputValue === APP_PASSWORD) {
      LocalStorageService.setAppPassword(btoa(inputValue));
      setIsShowWrapper(false);
    }
  };

  return (
    <>
      {isShowWrapper ? (
        <AuthLayout>
          <Stack maxWidth="27.875rem" gap="2rem">
            <Stack gap="0.5rem">
              <Typography variant="h4" color="background.light">
                <FormattedMessage id="MOD_WRAPPER.ENTER_PASSWORD" />
              </Typography>
              <Typography variant="body1" color="background.light">
                <FormattedMessage id="MOD_WRAPPER.DESCRIPTION" />
              </Typography>
            </Stack>

            <StyledForm>
              <Input
                value={inputValue}
                id="input"
                placeholder={{ type: 'intl', id: 'MOD_WRAPPER.PASSWORD' }}
                onChange={handleChangeInput}
              />
              <Button className="confirmButtom" size="large" onClick={handleSubmitDevPassword}>
                <FormattedMessage id="MOD_WRAPPER.CONFIRM" />
              </Button>
            </StyledForm>
          </Stack>
        </AuthLayout>
      ) : (
        children
      )}
    </>
  );
};

const StyledForm = styled(Stack, { name: 'StyledPasswordForm' })(({ theme }) => ({
  gap: '2rem',

  '& > .confirmButtom': {
    alignSelf: 'flex-end',

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));

export default InitAppPasswordWrapper;
