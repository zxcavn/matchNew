import { Typography, useTheme, Zoom } from '@mui/material';
import { trimStringAndInsertDots } from '@xfi/helpers';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { type TxOperationType } from '../../../../helpers';
import type { PropsWithTestId } from '../../../../helpers/test/types';
import { Tooltip } from '../../Tooltip';
import { Badge } from '../Badge';
import { generateBadgeContent } from './generateBadgeContent';

export const TEST_ID = 'operation-badge-test-id';

export type Props = PropsWithTestId<{
  type?: TxOperationType;
  name?: string;
  tooltipTitle?: string;
}>;

/**
 * A badge component for indicating different operation types.
 *
 * The `OperationBadge` component is used to display badges for different types of operations, such as 'send', 'bond', 'unbond', etc. It provides thematic colors and text for each type of operation.
 *
 * @component
 *
 * @param {Props} props - The props for the component.
 * @param {OperationBadgeVariant} [props.type='other'] - The type of operation for which the badge is displayed.
 * @param {string} [props.name] - The name of operation.
 * @param {number} [props.tooltipTitle] - The title for the tooltip.
 *
 * @returns {FC} The OperationBadge component.
 */
const OperationBadge = ({ type = 'other', name, tooltipTitle, ...props }: Props) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const { color, backgroundColor, text } = generateBadgeContent(type, theme);

  return (
    <>
      {type === 'fail' && !!tooltipTitle ? (
        <Tooltip
          title={
            <Typography variant="body1">
              <FormattedMessage id="LIB.ERROR_CODE" />: {tooltipTitle}
            </Typography>
          }
          TransitionComponent={Zoom}
          open={isOpen}
          onMouseLeave={() => setIsOpen(false)}
          onMouseEnter={() => setIsOpen(true)}
        >
          <div>
            <Badge data-testid={TEST_ID} color={color} backgroundColor={backgroundColor} {...props}>
              {name ? (
                trimStringAndInsertDots({ value: name, charsBeforeDots: 13, charsAfterDots: 0 })
              ) : (
                <FormattedMessage id={text} />
              )}
            </Badge>
          </div>
        </Tooltip>
      ) : (
        <Badge data-testid={TEST_ID} color={color} backgroundColor={backgroundColor} {...props}>
          {name ? (
            trimStringAndInsertDots({ value: name, charsBeforeDots: 13, charsAfterDots: 0 })
          ) : (
            <FormattedMessage id={text} />
          )}
        </Badge>
      )}
    </>
  );
};

export default OperationBadge;
