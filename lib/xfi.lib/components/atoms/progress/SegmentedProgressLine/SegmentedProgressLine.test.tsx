import { screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import SegmentedProgressLine, { SEGMENT_TEST_ID, TEST_ID } from './SegmentedProgressLine';

describe('SegmentedProgressLine component', () => {
  test('# renders correctly with no segments', () => {
    renderWithProviders(<SegmentedProgressLine />);

    const segmentedProgressLine = screen.getByTestId(TEST_ID);

    expect(segmentedProgressLine).toBeInTheDocument();
    const segments = screen.queryAllByTestId(SEGMENT_TEST_ID);

    expect(segments.length).toBe(0);
  });

  test('# renders multiple segments correctly', () => {
    renderWithProviders(
      <SegmentedProgressLine
        segments={[
          { background: 'green', value: -30, name: 'yes' },
          { background: 'red', value: 30, name: 'no' },
          { background: '', value: 40, name: 'abstain' },
        ]}
      />
    );

    const segments = screen.getAllByTestId(SEGMENT_TEST_ID);

    expect(segments.length).toBe(2);
  });
});
