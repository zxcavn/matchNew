import { Typography, TypographyProps } from '@mui/material';
import { ReactElement } from 'react';

export const TEST_ID = 'text-test-id';

export type Props = {
  value: string | ReactElement;
  format?: (value: string) => string;
  typographyProps?: TypographyProps;
};

/**
 * Component that represents a text element.
 *
 * The `Text` component displays a text value with optional formatting and typography props.
 *
 * @component
 *
 * @param {object} props - The props for the Text component.
 * @param {string | ReactElement} props.value - The text value to display.
 * @param {(value: string) => string} [props.format] - A function to format the text value.
 * @param {TypographyProps} [props.typographyProps] - Additional props for the Typography component from Material-UI.
 *
 * @returns {JSX.Element} The rendered JSX element.
 */

const Text = ({ value, format = value => value, typographyProps = {} }: Props) => {
  return (
    <Typography
      whiteSpace={{ md: 'nowrap' }}
      variant="body1"
      color="background.light"
      {...typographyProps}
      data-testid={TEST_ID}
    >
      {typeof value === 'string' ? format(value) : value}
    </Typography>
  );
};

export default Text;
