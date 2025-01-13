import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { NONE_VALUE } from '../../../constants';
import { useIntlHelpers } from '../../../i18n';
import { Copy } from '../copy/Copy';

export const TITLE_TEST_ID = 'collapse-header-title-test-id';

type Props = {
  title?: string;
  copyData?: string;
};

const CollapseHeader = ({ title, copyData }: Props) => {
  const { isFormattedMessageId } = useIntlHelpers();

  return (
    <Stack gap="0.25rem" direction="row" alignItems="center">
      <Typography data-testid={TITLE_TEST_ID} variant="body2" color="background.light">
        {isFormattedMessageId(title) ? <FormattedMessage id={title} /> : title || NONE_VALUE}
      </Typography>
      <Copy variant="button" value={copyData} />
    </Stack>
  );
};

export default CollapseHeader;
