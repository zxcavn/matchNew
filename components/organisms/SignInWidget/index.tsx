import { Typography } from '@mui/material';
import { redirect } from '@xfi/helpers';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAuth } from '@/hooks';
import { PAGES } from '@/shared/constants';

import { CreateWalletLink, SignInForm, SignInFormValues } from '@/components/molecules';

import { StyledSignInContainer } from './styles';

const SignInWidget = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const { authorizeByMnemonic, isLoading } = useAuth();

  const onSubmit = async ({ mnemonic }: SignInFormValues) => {
    setError('');
    authorizeByMnemonic(mnemonic, {
      onSuccess: () => redirect(PAGES.cosmosWallet.pathname),
      onError: ({ additional }) => setError(additional?.id || 'MESSAGES.ERROR'),
    });
  };

  return (
    <StyledSignInContainer>
      <Typography color="background.light" variant="h4">
        <FormattedMessage id="SUMMARY.LOGIN" />
      </Typography>
      <SignInForm onSubmit={onSubmit} onClickBack={() => router.back()} error={error} isLoading={isLoading.mnemonic} />
      <CreateWalletLink mt="1rem" />
    </StyledSignInContainer>
  );
};

export default SignInWidget;
