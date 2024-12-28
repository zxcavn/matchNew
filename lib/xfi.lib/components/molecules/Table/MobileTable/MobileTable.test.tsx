import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import { type Rows, COLUMNS, MOBILE_CONFIG, ROWS } from '../__mocks__';
import { type ColumnType, type MobileTableConfig, ColumnTypesEnum } from '../types';
import MobileTable, { TEST_ID } from './MobileTable';

describe('MobileTable Component', () => {
  test('# renders table with correct count columns and rows', () => {
    const { getByText, getAllByText, getByTestId } = renderWithProviders(
      <MobileTable columns={COLUMNS} rows={ROWS} mobileConfig={MOBILE_CONFIG} />
    );

    const table = getByTestId(TEST_ID);

    expect(table).toBeInTheDocument();

    const columnsWithoutHeader = COLUMNS.filter(column => column.id !== MOBILE_CONFIG.headerId);

    columnsWithoutHeader.forEach(({ label }) => {
      const columnHeaders = getAllByText(label.text.toString());

      expect(columnHeaders.length).toBe(MOBILE_CONFIG.unexpandedIds?.length);
    });

    ROWS.forEach(row => {
      Object.values(row).forEach(data => {
        const cellData = getByText(data.toString());

        expect(cellData).toBeInTheDocument();
      });
    });
  });

  test('# show expanded items when accordion is closed', () => {
    const MOBILE_EXPANDED_CONFIG: MobileTableConfig<Rows> = {
      headerId: 'id',
      unexpandedIds: ['name'],
      renderTitle: ({ id }) => <p>{id}</p>,
    };

    const { getByText } = renderWithProviders(
      <MobileTable columns={COLUMNS} rows={ROWS} mobileConfig={MOBILE_EXPANDED_CONFIG} />
    );
    const textFromName = getByText(ROWS[0].name);
    const textFromPosition = getByText(ROWS[0].position);

    expect(textFromName).toBeVisible();
    expect(textFromPosition).not.toBeVisible();
  });

  test('# should hide unexpanded elements when accordion is closed', () => {
    const MOBILE_EXPANDED_CONFIG: MobileTableConfig<Rows> = {
      headerId: 'id',
      renderTitle: ({ id }) => <p>{id}</p>,
    };

    const { getByText } = renderWithProviders(
      <MobileTable columns={COLUMNS} rows={ROWS} mobileConfig={MOBILE_EXPANDED_CONFIG} />
    );
    const textFromName = getByText(ROWS[0].name);
    const textFromPosition = getByText(ROWS[0].position);

    expect(textFromName).not.toBeVisible();
    expect(textFromPosition).not.toBeVisible();
  });
  test('# should render custom mobile rows', () => {
    const MOBILE_COLUMNS_TEXT = 'mobile columns text';

    const MOBILE_CONFIG_COLUMNS: Array<ColumnType<Rows>> = [
      {
        id: 'name',
        label: { text: MOBILE_COLUMNS_TEXT },
        type: ColumnTypesEnum.jsx,
        render: () => <p>{MOBILE_COLUMNS_TEXT}</p>,
      },
    ];
    const MOBILE_CONFIG_WITH_COLUMNS: MobileTableConfig<Rows> = {
      headerId: 'id',
      renderTitle: ({ id }) => <p>{id}</p>,
      columns: MOBILE_CONFIG_COLUMNS,
    };

    const { getAllByText } = renderWithProviders(
      <MobileTable columns={COLUMNS} rows={ROWS} mobileConfig={MOBILE_CONFIG_WITH_COLUMNS} />
    );

    const textFromName = getAllByText(MOBILE_COLUMNS_TEXT);

    expect(textFromName.length).not.toBe(0);
  });
});
