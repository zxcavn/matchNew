import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import { COLUMNS, ROWS } from '../__mocks__';
import DesktopTable, { TEST_ID } from './DesktopTable';

describe('DesktopTable Component', () => {
  test('# component should be rendered on the screen', () => {
    const { getByTestId } = renderWithProviders(<DesktopTable columns={COLUMNS} rows={ROWS} />);
    const table = getByTestId(TEST_ID);

    expect(table).toBeInTheDocument();
  });

  test('# renders table with correct columns and rows', () => {
    const { getByText } = renderWithProviders(<DesktopTable columns={COLUMNS} rows={ROWS} />);

    COLUMNS.forEach(({ label }) => {
      const columnHeader = getByText(label.text.toString());

      expect(columnHeader).toBeInTheDocument();
    });

    ROWS.forEach(row => {
      Object.values(row).forEach(data => {
        const cellData = getByText(data.toString());

        expect(cellData).toBeInTheDocument();
      });
    });
  });

  test('# renders table with correct column position', () => {
    const alignVariants = {
      center: 'MuiTableCell-alignCenter',
      left: 'MuiTableCell-alignLeft',
      right: 'MuiTableCell-alignRight',
    };
    const { getByText } = renderWithProviders(<DesktopTable columns={COLUMNS} rows={ROWS} />);

    COLUMNS.forEach(({ label }) => {
      const columnHeader = getByText(label.text.toString());

      const align = label.align;

      if (align) expect(columnHeader.closest('th')).toHaveClass(alignVariants[align]);
    });
  });
});
