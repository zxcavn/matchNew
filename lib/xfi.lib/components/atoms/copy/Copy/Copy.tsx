import { type CopyButtonProps, CopyButton } from '../CopyButton';
import { type CopyTooltipProps, CopyTooltip } from '../CopyTooltip';

export type Props =
  | ({
      variant: 'button';
    } & CopyButtonProps)
  | ({
      variant: 'tooltip';
    } & CopyTooltipProps);

/**
 * A component for copying text to the clipboard, available as a button or a tooltip.
 *
 * The `Copy` component allows users to copy text to the clipboard. It can be used as a button or as a tooltip with an associated component. It provides options for customizing the appearance and behavior of the copy feature.
 *
 * @component
 *
 * @param {Props} props - The props for the component.
 * @param {string} [props.className] - An optional CSS class name to apply to the component.
 * @param {string} [props.value] - The text value to be copied to the clipboard.
 * @param {boolean} [props.isFilled] - Specifies whether the copy icon is filled.
 * @param {boolean} [props.hasText] - Indicates whether to show the copy text.
 * @param {FormattedMessageId} [props.copyText] - The text value to be copied to the clipboard.
 * @param {'button' | 'tooltip'} props.variant - The variant of the `Copy` component. Choose between 'button' or 'tooltip'.
 * @param {string} [props.copyText = 'LIB.SUMMARY.COPY'] - Text for copy component. 'Copy' by default.
 * @param {string} [props.link] - Text for copy component. 'Copy' by default.
 * @param {TooltipProps} [...rest] -  rest tooltip props
 *
 * @returns {FC} The Copy component.
 */
const Copy = ({ copyText = 'LIB.SUMMARY.COPY', ...props }: Props) => {
  if (props.variant === 'tooltip') {
    return (
      <CopyTooltip copyText={copyText} {...props}>
        {props.children}
      </CopyTooltip>
    );
  }

  return <CopyButton copyText={copyText} hasText={false} {...props} />;
};

export default Copy;
