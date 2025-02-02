import { Stack, SxProps, Typography, Zoom } from '@mui/material';
import { memo, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import { Icon } from '../../../../../../components/atoms/Icon';
import { Tooltip } from '../../../../../../components/atoms/Tooltip';
import type { PropsWithTestId } from '../../../../helpers/test';
import { useCopy } from '../../../../hooks';
import { CopyIcon } from '../../../../icons';
import { CopyTooltipTitle } from '../CopyTooltipTitle';
import { StyledButton } from './styles';

export const BUTTON_TEST_ID = 'button-test-id';
export const BUTTON_TEXT_TEST_ID = 'button-text-test-id';

export type Props = PropsWithTestId<{
  value?: string;
  /** @type {FormattedMessageId} */
  copyText?: string;
  isFilled?: boolean;
  hasText?: boolean;
  className?: string;
  sxProps?: SxProps;
  onClick?: () => void;
}>;

/**
 * A copy component with optional text and an icon for copying text.
 *
 * The `CopyButton` component allows users to copy text to the clipboard.
 *
 * @component
 * @param {Props} props - The props for the component.
 * @param {string} [props.value] - The text value to be copied to the clipboard.
 * @param {FormattedMessageId} [props.copyText = 'LIB.SUMMARY.COPY'] - Text for copy component. 'Copy' by default.
 * @param {boolean} [props.isFilled] - Specifies whether the copy icon is filled.
 * @param {boolean} [props.hasText=true] - Indicates whether to show the copy text.
 * @param {string} [props.className] - Add className.
 *
 * @returns {FC} The CopyButton component.
 */
const CopyButton = ({
  value,
  copyText = 'LIB.SUMMARY.COPY',
  isFilled,
  hasText = true,
  className,
  sxProps,
  onClick,
  ...rest
}: Props) => {
  const { isCopied, onCopy } = useCopy();

  const onHandle = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      onCopy(event, value);
      onClick?.();
    },
    [value, onCopy]
  );

  return (
    <Tooltip
      TransitionComponent={Zoom}
      placement="top"
      open={isCopied}
      title={<CopyTooltipTitle copyText={copyText} isCopied />}
      {...rest}
    >
      <StyledButton
        disableRipple
        $isFilled={isFilled}
        as={'div'}
        role={'button'}
        data-testid={BUTTON_TEST_ID}
        onClick={onHandle}
        onKeyDown={onHandle}
        className={className}
        sx={sxProps}
      >
        <Stack direction="row" alignItems="center" gap="0.25rem">
          {hasText && (
            <Typography variant="body2" data-testid={BUTTON_TEXT_TEST_ID}>
              <FormattedMessage id="LIB.SUMMARY.COPY" />
            </Typography>
          )}
          <Icon sx={{ fontSize: '1.25rem' }} src={CopyIcon} viewBox="0 0 20 20" />
        </Stack>
      </StyledButton>
    </Tooltip>
  );
};

export default memo(CopyButton);
