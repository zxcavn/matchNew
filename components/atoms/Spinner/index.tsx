import { styled } from '@mui/material';

import { shouldForwardProp } from '../../../helpers';
import { AppThemeVariant } from '../../../theme';

export type Props = Partial<{
  size: string;
  className: string;
}>;

const Spinner = ({ size = '1.25rem', className }: Props) => {
  return <StyledSpinner $size={size} className={className} />;
};

/**
 * A circular spinner component for indicating loading or processing.
 *
 * The `Spinner` component displays a circular spinner that can be customized with size and additional CSS classes. It is typically used to indicate loading or processing while waiting for content or actions to complete.
 *
 * @component
 *
 * @param {Props} props - The props for configuring the `Spinner` component.
 * @param {string} [props.size='1.25rem'] - The size of the spinner. It can be provided as a CSS size value (e.g., '1.25rem').
 * @param {string} [props.className] - Additional CSS classes to be applied to the spinner.
 *
 * @returns {FC} The `Spinner` component for displaying a circular loading spinner.
 */
export const StyledSpinner = styled('div', { name: 'StyledSpinner', shouldForwardProp })<{ $size: string }>(
  ({ theme, $size }) => ({
    width: $size,
    height: $size,
    borderRadius: '50%',
    display: 'inline-block',
    borderTop: `2px solid ${
      theme.palette.mode === AppThemeVariant.dark ? theme.palette.common.white : theme.palette.primary.main
    }`,
    borderRight: '2px solid transparent',
    animation: 'rotation 1s linear infinite',

    '@keyframes rotation': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  })
);

export default Spinner;
