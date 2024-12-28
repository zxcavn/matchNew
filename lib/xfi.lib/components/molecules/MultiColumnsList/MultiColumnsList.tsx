import { Box } from '@mui/material';

import { useMediaQuery } from '../../../theme';
import { DesktopMultiColumnsList } from './DesktopMultiColumnsList';
import { MobileMultiColumnsList } from './MobileMultiColumnsList';
import { StyledTableContainer, StyledTablePagination } from './styles';
import type { MultiColumnsListProps } from './types';

/**
 * Component that renders either a desktop or mobile table based on the screen size.
 *
 * The `MultiColumnsList` component conditionally renders either a desktop or mobile table based on the screen size.
 *
 * @component
 *
 * @template T
 * @param {MultiColumnsListProps<T>} props - The props for the MultiColumnsList component.
 * @returns {JSX.Element} The rendered JSX element.
 */

const MultiColumnsList = <T,>(props: MultiColumnsListProps<T>) => {
  const { pagination } = props;
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const TableComponent = isMobile ? MobileMultiColumnsList : DesktopMultiColumnsList;

  return (
    <StyledTableContainer className="tableContainer">
      <Box sx={{ overflowX: 'scroll' }}>
        <TableComponent {...props} />
      </Box>
      {pagination && <StyledTablePagination {...pagination} />}
    </StyledTableContainer>
  );
};

export default MultiColumnsList;
