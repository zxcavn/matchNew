import { Box } from '@mui/material';

import { useMediaQuery } from '../../../theme';
import { DesktopTable } from './DesktopTable';
import { MobileTable } from './MobileTable';
import { StyledTableContainer, StyledTablePagination } from './styles';
import type { TableProps } from './types';

/**
 * Component that renders either a desktop or mobile table based on the screen size.
 *
 * The `Table` component conditionally renders either a desktop or mobile table based on the screen size.
 *
 * @component
 *
 * @template T
 * @param {TableProps<T>} props - The props for the Table component.
 * @returns {JSX.Element} The rendered JSX element.
 */

const Table = <T,>(props: TableProps<T>) => {
  const { pagination } = props;
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const TableComponent = isMobile ? MobileTable : DesktopTable;

  return (
    <StyledTableContainer className="tableContainer">
      <Box sx={{ overflowX: 'scroll' }}>
        <TableComponent {...props} />
      </Box>
      {pagination && <StyledTablePagination {...pagination} />}
    </StyledTableContainer>
  );
};

export default Table;
