import { Box, TooltipProps, Zoom } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import type { PropsWithTestId } from '../../../../helpers/test';
import { ANIMATION_DELAY_MILLISECONDS, useCopy } from '../../../../hooks';
import { Tooltip } from '../../Tooltip';
import { CopyTooltipTitle } from '../CopyTooltipTitle';

export const TOOLTIP_TEST_ID = 'tooltip-test-id';
export const LINK_TEST_ID = 'link-tooltip-test-id';

export type TooltipLinkProps = { href: string; target?: string };

export type Props = Omit<TooltipProps, 'title'> &
  PropsWithTestId & {
    value?: string;
    /** @type {FormattedMessageId} */
    copyText?: string;
    onClick?: () => void;
  };

/**
 * A component for copying text to the clipboard, available as a link or a text.
 *
 * The `CopyTooltip` component allows users to copy text to the clipboard. It can be shown as link or as icon with text
 *
 * @component
 *
 * @param {Props} props - The props for the component.
 * @param {string} [props.value] - The text value to be copied to the clipboard.
 * @param {FormattedMessageId} [props.copyText = 'LIB.SUMMARY.COPY'] - Text for copy component.
 * @param {TooltipProps} [...rest] -  rest tooltip props
 *
 * @returns {FC} The Copy component.
 */
const CopyTooltip = ({ value, copyText = 'LIB.SUMMARY.COPY', onClick, ...props }: Props) => {
  const { isOpen, isCopied, setIsOpen, onCopy } = useCopy();
  const [isShowCopiedComponent, setIsShowCopiedComponent] = useState(false);

  useEffect(() => {
    if (!isCopied) return;

    setIsShowCopiedComponent(true);
    setTimeout(() => {
      setIsShowCopiedComponent(false);
    }, ANIMATION_DELAY_MILLISECONDS + TOOLTIP_ANIMATION_DURATION);
  }, [isCopied]);

  const onHandle = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      onCopy(event, value);
      onClick?.();
    },
    [value, onCopy]
  );

  const title = <CopyTooltipTitle isCopied={isShowCopiedComponent} onClick={onHandle} copyText={copyText} />;

  return (
    <Tooltip
      TransitionComponent={Zoom}
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      leaveDelay={isCopied ? ANIMATION_DELAY_MILLISECONDS : 0}
      placement={props.placement ?? 'bottom'}
      data-testid={TOOLTIP_TEST_ID}
      {...props}
      title={title}
    >
      <Box sx={{ cursor: 'pointer' }}>{props.children}</Box>
    </Tooltip>
  );
};

const TOOLTIP_ANIMATION_DURATION = 100;

export default CopyTooltip;
