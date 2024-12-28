import { Stack, StackProps, Typography } from '@mui/material';
import { redirect } from '@xfi/helpers';
import { FormattedMessage } from 'react-intl';

import { useAppDispatch } from '@/hooks';
import { Link } from '@/lib/xfi.lib/components/atoms';
import { PAGES } from '@/shared/constants';
import { CreateWalletStepEnum, setWalletStep } from '@/store/wallet';

type Props = Omit<StackProps, 'children'>;

const CreateWalletLink = (props: Props) => {
  const dispatch = useAppDispatch();

  const onClickCreate = () => {
    dispatch(setWalletStep(CreateWalletStepEnum.privacy));
    redirect(PAGES.create.pathname);
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" gap="0.25rem" {...props}>
      <Typography variant="body2" color="background.light">
        <FormattedMessage id="WALLET.DO_NOT_HAVE_WALLET" />
      </Typography>
      <Link onClick={onClickCreate}>
        <FormattedMessage id="WALLET.CREATE_NEW" />
      </Link>
    </Stack>
  );
};

export default CreateWalletLink;
