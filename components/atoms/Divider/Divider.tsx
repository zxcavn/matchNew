import { Divider as DividerMui, DividerProps } from '@mui/material';

export type Props = DividerProps;

export const TEST_ID = 'divider-test-id';

const verticalSx = { width: 'inherit', height: 'inherit', borderWidth: '0 1px 0 0' };
const horizontalSx = { width: '100%', borderWidth: '1px 0 0 0' };

/**
 * A thin horizontal or vertical line that separates content.
 *
 * The `Divider` component is used to create a visual separation between content, such as lists or sections, by rendering a thin line. It can be customized by setting its orientation and adding additional styles using the `sx` prop.
 *
 * @component
 *
 * @param {DividerProps} props - The props for the component.
 * @param {Props} [props.sx] - Additional styles to apply to the divider.
 * @param {string} [props.orientation] - The orientation of the divider. Set to 'vertical' for a vertical divider or 'horizontal' for a horizontal divider.
 * @param {...any} [props.other] - Additional props to be passed to the underlying Material-UI Divider component.
 *
 * @returns {FC} The Divider component.
 */
const Divider = ({ sx, orientation, ...other }: Props) => {
  const orientationStyles = orientation === 'vertical' ? verticalSx : horizontalSx;

  return (
    <DividerMui
      sx={{
        ...orientationStyles,
        borderColor: 'neutrals.border',
        ...sx,
      }}
      {...other}
      data-testid={TEST_ID}
    />
  );
};

export default Divider;
