import { redirect } from '@xfi/helpers';

import { useAppSelector } from '@/hooks';
import { PAGES } from '@/shared/constants';
import { CreateWalletStepEnum } from '@/store/wallet';
import { createWalletStepSelector, walletMnemonicSelector } from '@/store/wallet/selectors';

import { ConfirmStep, MnemonicStep, PrivacyPolicyStep } from '@/components/organisms';
import { AuthLayout, Page } from '@/components/templates';

const CreatePage = () => {
  const createWalletStep = useAppSelector(createWalletStepSelector);
  const mnemonic = useAppSelector(walletMnemonicSelector);

  const renderStepComponent = () => {
    switch (createWalletStep) {
      case CreateWalletStepEnum.privacy: {
        return <PrivacyPolicyStep />;
      }

      case CreateWalletStepEnum.mnemonic: {
        if (!mnemonic) {
          redirect(PAGES.home.pathname);

          return null;
        }

        return <MnemonicStep />;
      }

      case CreateWalletStepEnum.confirm: {
        return <ConfirmStep />;
      }

      default: {
        redirect(PAGES.home.pathname);

        return null;
      }
    }
  };

  return (
    <Page title="WALLET.CREATE_NEW">
      <AuthLayout>{renderStepComponent()}</AuthLayout>
    </Page>
  );
};

export default CreatePage;
