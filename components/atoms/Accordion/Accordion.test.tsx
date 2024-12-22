import { fireEvent } from '@testing-library/react';

import { renderWithProviders } from '@/lib/xfi.lib/helpers/test';

import '@testing-library/jest-dom';
import Accordion, { ACCORDION_SUMMARY_TEST_ID, ACCORDION_TEST_ID } from './Accordion';

const HEADER_TEXT = 'header text';
const CONTENT_TEXT = 'content text';

describe('Accordion component', () => {
  const renderAccordion = () => {
    return renderWithProviders(<Accordion header={HEADER_TEXT}>{CONTENT_TEXT}</Accordion>);
  };

  test('# component should be rendered with correct header text', () => {
    const { getByTestId } = renderAccordion();

    expect(getByTestId(ACCORDION_TEST_ID)).toBeInTheDocument();

    expect(getByTestId(ACCORDION_SUMMARY_TEST_ID)).toHaveTextContent(HEADER_TEXT);
  });

  test('# component must not contain details when it is not expanded', () => {
    const { queryByText } = renderAccordion();

    expect(queryByText(CONTENT_TEXT)).not.toBeVisible();
  });

  test('# component must contain the details when expanded', () => {
    const { getByTestId, queryByText } = renderAccordion();

    fireEvent.click(getByTestId(ACCORDION_SUMMARY_TEST_ID));
    expect(queryByText(CONTENT_TEXT)).toBeVisible();
  });
});
