import { MenuItem, Typography } from '@mui/material';
import { openNewSource } from '@xfi/helpers';
import { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Dropdown } from '@/lib/xfi.lib/components/atoms';
import { XdsName } from '@/store/xds';

import { makeEvent, OPTIONS, ReminderOption } from './helpers';
import { StyledButton, TRIGGER_CONTAINER_SX } from './styles';

type Props = {
  details: XdsName;
  isDisabled: boolean;
};

const SetReminder = ({ details, isDisabled }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = useCallback(
    (makeUrlFunction: ReminderOption['makeUrl']) => {
      const event = makeEvent(details);

      openNewSource(makeUrlFunction(event), '_blank');
    },
    [details]
  );

  return (
    <Dropdown
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
      triggerContainerSx={TRIGGER_CONTAINER_SX}
      trigger={
        <StyledButton size="large" variant="transparent" onClick={() => setIsOpen(true)} isDisabled={isDisabled}>
          <FormattedMessage id="XDS_NAME.SET_REMINDER" />
        </StyledButton>
      }
    >
      {OPTIONS.map(({ label, makeUrl }) => (
        <MenuItem onClick={() => onClick(makeUrl)} key={label}>
          <Typography variant="body2" color="background.light">
            <FormattedMessage id={label} />
          </Typography>
        </MenuItem>
      ))}
    </Dropdown>
  );
};

export default SetReminder;
