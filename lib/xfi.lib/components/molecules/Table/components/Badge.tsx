import { Stack } from '@mui/material';

import { TX_ERROR_MESSAGES } from '../../../../helpers';
import {
  type OperationBadgeProps,
  type ValidatorStatusBadgeProps,
  OperationBadge,
  ValidatorStatusBadge,
} from '../../../atoms';

export const TEST_ID = 'badge-test-id';

export type Props = { failed?: boolean } & (
  | {
      badgeVariant: 'operationType';
      type: OperationBadgeProps['type'];
      name?: string;
      code?: number;
    }
  | {
      badgeVariant: 'validatorStatus';
      status: ValidatorStatusBadgeProps['status'];
    }
);

/**
 * Component that renders either an OperationBadge or ValidatorStatusBadge based on props.
 *
 * The `Badge` component renders either an `OperationBadge` or `ValidatorStatusBadge` based on the `badgeVariant` prop.
 * If `badgeVariant` is set to `'operationType'`, it renders an `OperationBadge` with the specified `type` and `name`.
 * If `badgeVariant` is set to `'validatorStatus'`, it renders a `ValidatorStatusBadge` with the specified `status`.
 * Additionally, it can render a failure badge if the `failed` prop is `true`.
 *
 * @component
 *
 * @param {object} props - The props for Badge component.
 * @param {boolean} [props.failed] - Specifies whether the badge should indicate failure.
 * @param {('operationType'|'validatorStatus')} props.badgeVariant - Specifies the type of badge to render.
 * @param {string} [props.name] - The name for the operation badge.
 * @param {OperationBadgeProps['type']} [props.type] - The type for the operation badge.
 * @param {ValidatorStatusBadgeProps['status']} [props.status] - The status for the validator status badge.
 *
 * @returns {JSX.Element} The rendered JSX element.
 */
const Badge = (props: Props) => {
  if (props.badgeVariant === 'validatorStatus') {
    return <ValidatorStatusBadge status={props.status} />;
  }

  const { type, failed, name, code } = props;

  return (
    <Stack flexDirection="row" alignItems="center" gap="0.25rem" data-testid={TEST_ID}>
      <OperationBadge type={type} name={name} />
      {failed && <OperationBadge type={'fail'} tooltipTitle={code ? TX_ERROR_MESSAGES[code] : String(code)} />}
    </Stack>
  );
};

export default Badge;
