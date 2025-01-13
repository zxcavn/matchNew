import { Box, useTheme } from '@mui/material';
import clsx from 'clsx';
import { type MouseEventHandler, type PropsWithChildren, type ReactNode, forwardRef } from 'react';

import Spinner from '../Spinner';
import { StyledButton } from './styles';

export const TEST_ID = 'button-test-id';
export const LOADER_TEST_ID = 'button-loader-test-id';

export type ButtonSize = 'large' | 'medium' | 'small' | 'largeIcon' | 'mediumIcon' | 'smallIcon';

export type ButtonVariant = 'primary' | 'secondary' | 'transparent';
export type ButtonVariantClass =
  | 'primary_dark'
  | 'primary_light'
  | 'secondary_dark'
  | 'secondary_light'
  | 'transparent_dark'
  | 'transparent_light';

export type Props = PropsWithChildren<
  Partial<{
    size: ButtonSize;
    variant: ButtonVariant;
    isLoading: boolean;
    isDisabled: boolean;
    startIcon: ReactNode;
    endIcon: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
    className: string;
    isFullWidth: boolean;
    type: 'submit' | 'button';
  }>
>;

/**
 * A customizable button component with various sizes and loading state support.
 *
 * The `Button` component is used to create customizable buttons with different sizes and loading state support. It can be used to trigger various actions in the application.
 *
 * @component
 *
 * @param {Props} props - The props for the component.
 * @param {ButtonSize} [props.size='medium'] - The size of the button ('medium', 'large', 'smallIcon', 'largeIcon').
 * @param {ButtonVariant} [props.variant='primary'] - The variant of the button ('primary', 'secondary').
 * @param {boolean} [props.isLoading] - A boolean to indicate if the button is in a loading state.
 * @param {boolean} [props.isDisabled] - A boolean to disable the button.
 * @param {ReactNode} [props.startIcon] - An optional icon or element to be displayed at the start of the button.
 * @param {ReactNode} [props.endIcon] - An optional icon or element to be displayed at the end of the button.
 * @param {MouseEventHandler<HTMLButtonElement>} [props.onClick] - The click event handler for the button.
 * @param {string} [props.className] - An optional CSS class name to apply to the button.
 * @param {boolean} [props.isFullWidth] - A boolean to make the button full width.
 * @param {'submit' | 'button'} [props.type] - The type of the button ('submit', 'button').
 * @param {ReactNode} props.children - The child elements to be displayed within the button.
 *
 * @returns {FC} The Button component.
 */
const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const themeMode = useTheme().palette.mode;

  const {
    size = 'medium',
    isLoading,
    isDisabled,
    variant = 'primary',
    startIcon,
    endIcon,
    onClick,
    children,
    className,
    isFullWidth,
    ...other
  } = props;

  return (
    <StyledButton
      ref={ref}
      className={clsx(className, {
        [`${variant}_${themeMode}`]: variant,
        [size]: size,
        isFullWidth,
        isLoading,
      })}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      disableRipple
      data-testid={TEST_ID}
      {...other}
    >
      {isLoading && <Loader />}
      <div className={clsx('buttonChildren', isLoading && 'transparent')}>{children}</div>
    </StyledButton>
  );
});

const Loader = () => (
  <Box data-testid={LOADER_TEST_ID} className="loaderWrapper">
    <Spinner />
  </Box>
);

export default Button;
