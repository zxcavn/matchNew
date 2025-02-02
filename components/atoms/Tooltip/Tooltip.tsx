import { TooltipProps } from '@mui/material';
import { useIntl } from 'react-intl';


import { StyledTooltip } from './styles';

export const TEST_ID = 'tooltip-test-id';

export type Props = TooltipProps;

/**
 * A customizable tooltip component for providing additional information or context to users.
 *
 * The `Tooltip` component allows you to create tooltips for various UI elements. Tooltips provide additional information or context when users interact with an element, such as hovering over an icon or button.
 *
 * @component
 *
 * @param {Props} props - The props for configuring the `Tooltip` component.
 * @param {React.ReactNode} [props.children] - The content that triggers the tooltip when interacted with (e.g., hovered over).
 * @param {string | React.ReactNode} props.title - The content to display within the tooltip. This can be a simple text string or more complex JSX content.
 *
 * @returns {FC} The `Tooltip` component for creating customizable tooltips.
 */
const Tooltip = (props: Props) => {
  const { children, title, ...rest } = props;

  const { formatMessage } = useIntl();


  return (
    <StyledTooltip
      enterTouchDelay={0}
      data-testid={TEST_ID}
      {...rest}
      title={(title) ? formatMessage({ }) : title}
      arrow
    >
      {children}
    </StyledTooltip>
  );
};

export default Tooltip;
