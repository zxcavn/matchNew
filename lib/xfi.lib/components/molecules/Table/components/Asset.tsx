import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

export const TEST_ID = 'asset-test-id';

export type Props = {
  value: ReactNode;
  text: ReactNode;
  className?: string;
};

/**
 * Component that represents an amount or asset of a transaction.
 *
 * The `Asset` component displays the value and text of an asset in a styled container.
 *
 * @component
 *
 * @param {object} props - The props for the Asset component.
 * @param {ReactNode} props.value - The value of the asset.
 * @param {ReactNode} props.text - The text of the asset.
 * @param {string} [props.className] - The optional class name for styling.
 *
 * @returns {JSX.Element} The rendered JSX element.
 */
const Asset = ({ value, text, className }: Props) => {
  return (
    <Stack className={className} alignItems="center" direction="row" gap="0.25rem" data-testid={TEST_ID}>
      <Typography color="background.light" variant="subtitle1">
        {value}
      </Typography>
      <Typography color="neutrals.secondaryText" variant="body1">
        {text}
      </Typography>
    </Stack>
  );
};

export default Asset;
