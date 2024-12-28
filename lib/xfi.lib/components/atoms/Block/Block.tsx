import { Box, StackProps, SxProps, Typography } from '@mui/material';
import { PropsWithChildren, ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import { useIntlHelpers } from '../../../i18n';
import { Loader } from '../loaders';
import { type BlockVariant, StyledBlock } from './styles';

export const BLOCK_TEST_ID = 'block-test-id';
export const TITLE_TEST_ID = 'block-title-test-id';
export const LOADER_TEST_ID = 'block-loader-test-id';

export type Props = PropsWithChildren<{
  isLoading?: boolean;
  /** @type {FormattedMessageId | ReactElement} */
  title?: string | ReactElement;
  className?: string;
  variant?: BlockVariant;
  titleSx?: SxProps;
}> &
  Omit<StackProps, 'title'>;

/**
 * A customizable block component that can display a title, content, and an optional loading indicator.
 *
 * The `Block` component provides a structured container that can include a title, child content,
 * and a loading indicator. The title can be a simple string, a `FormattedMessage` ID for localization,
 * or a custom React element.
 *
 * @component
 *
 * @param {Object} props - The props for the component.
 * @param {boolean} [props.isLoading=false] - If true, displays a loading indicator.
 * @param {string | React.ReactElement} [props.title] - The title to be displayed. Can be a string, `FormattedMessage` ID, or React element.
 * @param {string} [props.className] - Additional class names to apply to the component.
 * @param {BlockVariant} [props.variant = 'gradient'] - Block background variant.
 * @param {SxProps} [props.titleSx] - Custom styles to apply to the title container.
 * @param {React.ReactNode} props.children - The content to be displayed within the block.
 *
 * @returns {JSX.Element}
 */
const Block = ({ title, children, className, isLoading, variant, titleSx, ...props }: Props) => {
  const { isFormattedMessageId } = useIntlHelpers();

  return (
    <StyledBlock className={className} $variant={variant} {...props} data-testid={BLOCK_TEST_ID}>
      {title && (
        <Box className={'blockTitleContainer'} sx={titleSx} data-testid={TITLE_TEST_ID}>
          {isFormattedMessageId(title) ? (
            <Typography variant={'h4'} color={'background.light'}>
              <FormattedMessage id={title} />
            </Typography>
          ) : (
            title
          )}
        </Box>
      )}
      <Box className={'blockChildren'}>{children}</Box>
      {isLoading && (
        <div data-testid={LOADER_TEST_ID}>
          <Loader />
        </div>
      )}
    </StyledBlock>
  );
};

export default Block;
