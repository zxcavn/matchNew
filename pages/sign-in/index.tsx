import { SignInWidget } from '@/components/organisms';
import { AuthLayout, Page } from '@/components/templates';

const SignInPage = () => {
  return (
    <Page title="SUMMARY.LOGIN">
      <AuthLayout>
        <SignInWidget />
      </AuthLayout>
    </Page>
  );
};

export default SignInPage;
