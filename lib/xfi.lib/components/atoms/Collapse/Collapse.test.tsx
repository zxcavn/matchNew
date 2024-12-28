import { fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders, waitFor } from '../../../helpers/test';
import Collapse, { COLLAPSE_TEST_ID, DETAILS_TEST_ID, HEADER_TEST_ID, SUMMARY_TEST_ID } from './Collapse';

describe('Collapse component', () => {
  const headerText = 'Collapse Header';
  const childrenText = 'Collapse Children';

  test('# component should be rendered on the screen with default props', () => {
    const { getByTestId, queryByTestId } = renderWithProviders(
      <Collapse header={headerText} isExpanded={false} setIsExpanded={jest.fn()}>
        {childrenText}
      </Collapse>
    );

    expect(queryByTestId(COLLAPSE_TEST_ID)).toBeInTheDocument();
    expect(getByTestId(HEADER_TEST_ID)).toHaveTextContent(headerText);
    expect(queryByTestId(DETAILS_TEST_ID)).not.toBeVisible();
  });

  test('# component should shows children when header is clicked', async () => {
    let isExpanded = false;
    const setIsExpanded = jest.fn(value => {
      isExpanded = typeof value === 'function' ? value(isExpanded) : value;
    });

    const { getByTestId, rerender } = renderWithProviders(
      <Collapse header={headerText} isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
        {childrenText}
      </Collapse>
    );

    fireEvent.click(getByTestId(SUMMARY_TEST_ID));

    rerender(
      <Collapse header={headerText} isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
        {childrenText}
      </Collapse>
    );

    await waitFor(() => {
      expect(getByTestId(HEADER_TEST_ID)).toHaveTextContent(headerText);
      expect(getByTestId(DETAILS_TEST_ID)).toBeVisible();
      expect(getByTestId(DETAILS_TEST_ID)).toHaveTextContent(childrenText);
    });
  });
});
