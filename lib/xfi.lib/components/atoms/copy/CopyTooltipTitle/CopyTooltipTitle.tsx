import { Typography } from '@mui/material';
import { MouseEventHandler } from 'react';
import { FormattedMessage } from 'react-intl';

import { CheckIcon, CopyIcon } from '../../../../icons';
import { Icon } from '../../Icon';
import { StyledCopyTooltipTitleWrapper } from './styles';

export const TOOLTIP_TITLE_TEST_ID = 'tooltip-title-test-id';

export type Props = {
  /** @type {FormattedMessageId} */
  copyText: string;
  isCopied?: boolean;
  onClick?: MouseEventHandler;
};

/**
 * A component representing the title of a tooltip in the CopyTooltip component.
 *
 * The `CopyTooltipTitle` component displays an icon and text, indicating whether the text has been copied. It can be customized with different text and icons.
 *
 * @component
 *
 * @param {Props} props - The props for the component.
 * @param {string} props.copyText - Text for the copy component.
 * @param {boolean} [props.isCopied=false] - Indicates whether the text has been copied.
 * @param {MouseEventHandler} [props.onClick] - Event handler for the click action.
 *
 * @returns {FC} The CopyTooltipTitle component.
 */
const CopyTooltipTitle = ({ isCopied = false, onClick, copyText }: Props) => {
  const text = isCopied ? 'LIB.SUMMARY.COPIED' : copyText;

  return (
    <StyledCopyTooltipTitleWrapper data-testid={TOOLTIP_TITLE_TEST_ID} onClick={onClick}>
      <Icon
        className="icon"
        src={isCopied ? CheckIcon : CopyIcon.dark}
        viewBox="0 0 20 20"
        sx={{ fontSize: '1.25rem' }}
      />
      <Typography variant="body1">
        <FormattedMessage id={text} />
      </Typography>
    </StyledCopyTooltipTitleWrapper>
  );
};

export default CopyTooltipTitle;
