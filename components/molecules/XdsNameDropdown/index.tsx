import { Stack, SxProps, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { formatName } from '@/helpers/xds';
import { Copy, Dropdown, Icon } from '@/lib/xfi.lib/components/atoms';
import { ArrowDownIcon } from '@/lib/xfi.lib/icons';

type Props = {
  name: string;
  sx?: SxProps;
};

const XdsNameDropdown = ({ name, sx }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  return (
    <Dropdown
      sx={sx}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      triggerContainerSx={{ height: '1.25rem' }}
      trigger={isOpen => (
        <Icon
          onClick={() => setIsOpen(true)}
          viewBox="0 0 20 20"
          src={ArrowDownIcon}
          sx={{
            fontSize: '1.25rem',
            transform: isOpen ? 'rotate(180deg)' : 'initial',
            transition: 'transform 0.2s',
            path: { stroke: theme.palette.background.light },
          }}
        />
      )}
    >
      <Stack minWidth="9.75rem">
        <Typography pl="0.75rem" variant="caption" color="neutrals.secondaryText">
          <FormattedMessage id="SUMMARY.XDS_NAME" />
        </Typography>
        <Stack p="0.75rem" gap="0.5rem">
          <Stack gap="0.25rem" direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="body2" color="background.light">
              {formatName(name)}
            </Typography>
            <Copy variant="button" value={name} />
          </Stack>
        </Stack>
      </Stack>
    </Dropdown>
  );
};

export default XdsNameDropdown;
