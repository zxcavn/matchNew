import { styled } from '@mui/material';

import { useMediaQuery } from '../../../../theme';
import { type BlockProps, Block } from '../../../atoms/Block';
import { BLOCK_TEST_ID } from '../../../atoms/Block/Block';
import NotFound, { NotFoundConfig } from './NotFound';

export type Props = {
  hasData?: boolean;
  /** @type {FormattedMessageId | ReactElement} */
  notFound?: NotFoundConfig;
} & BlockProps;

/**
 * Component that represents a table block.
 *
 * The `TableBlock` component displays a block with table content.
 * It optionally shows a "Not Found" message when there is no data to display.
 *
 * @component
 *
 * @param {object} props - The props for the TableBlock component.
 * @param {boolean} [props.hasData] - Specifies whether there is data to display in the table.
 * @param {string | ReactElement} [props.notFoundText='NOT_FOUND'] - The message to display when there is no data.
 * @param {BlockProps} [props] - Additional props for the Block component.
 *
 * @returns {JSX.Element} The rendered JSX element.
 */
const TableBlock = ({ children, hasData, notFound, ...blockProps }: Props) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const margin = isMobile ? '1rem' : '1.5rem';

  const showNotFound = !blockProps.isLoading && !hasData;
  const showTable = hasData;

  return (
    <StyledTableBlock $hasData={hasData} {...blockProps} data-testid={BLOCK_TEST_ID}>
      {showNotFound && <NotFound config={notFound} sx={{ mb: margin, ml: margin }} />}
      {showTable && children}
    </StyledTableBlock>
  );
};

export const StyledTableBlock = styled(Block, { name: 'StyledTableBlock' })<{
  $hasData?: boolean;
}>(({ theme, $hasData }) => ({
  padding: 0,
  paddingTop: '1.5rem',
  overflow: 'hidden',
  minHeight: $hasData ? 'auto' : '18rem',

  [theme.breakpoints.down('md')]: {
    padding: 0,
    paddingTop: '1.5rem',
    minHeight: $hasData ? 'auto' : '15rem',
  },

  '& .tableContainer': {
    paddingBottom: '1.5rem',
  },

  '& .blockTitleContainer': {
    marginBottom: $hasData ? '1.5rem' : 0,
    paddingInline: '1.5rem',

    [theme.breakpoints.down('md')]: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
      marginBottom: $hasData ? '0.5rem' : 0,
    },
  },

  '& .blockChildren': {
    margin: $hasData ? 0 : 'auto',
  },
}));

export default TableBlock;
