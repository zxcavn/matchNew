import { fireEvent, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../helpers/test';
import { TEST_ID as DIVIDER_TEST_ID } from '../Divider/Divider';
import Accordion, { ACCORDION_HEADER_TEST_ID, EXPAND_ICON_TEST_ID, TEST_ID } from './Accordion';

describe('Accordion component', () => {
  const DETAILS_TEST_ID = 'details-test-id';
  const UNEXPANDED_DETAILS_TEST_ID = 'unexpanded-details-test-id';
  const HEADER_TEST_ID = 'header-test-id';

  const HEADER = <header data-testid={HEADER_TEST_ID}>{HEADER_TEST_ID}</header>;
  const DETAILS = <p data-testid={DETAILS_TEST_ID}>{DETAILS_TEST_ID}</p>;
  const UNEXPANDED_DETAILS = <p data-testid={UNEXPANDED_DETAILS_TEST_ID}>{UNEXPANDED_DETAILS_TEST_ID}</p>;

  test('# component should be rendered on the screen with default props', () => {
    renderWithProviders(<Accordion headerSlot={HEADER} />);

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(HEADER_TEST_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(DIVIDER_TEST_ID)).toBeInTheDocument();

    expect(screen.queryByTestId(EXPAND_ICON_TEST_ID)).not.toBeInTheDocument();
  });

  test('# component must have unexpanded details', () => {
    renderWithProviders(<Accordion headerSlot={HEADER} unexpandedDetailsSlot={UNEXPANDED_DETAILS} />);

    expect(screen.getByTestId(UNEXPANDED_DETAILS_TEST_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(EXPAND_ICON_TEST_ID)).not.toBeInTheDocument();
  });

  test('# component must renders opened by prop condition', () => {
    renderWithProviders(<Accordion headerSlot={HEADER} detailsSlot={DETAILS} isExpandedDefault={true} />);

    expect(screen.getByTestId(DETAILS_TEST_ID)).toBeInTheDocument();
  });

  test('# component must render without divider if it disabled', () => {
    renderWithProviders(<Accordion headerSlot={HEADER} isShowDivider={false} />);

    expect(screen.queryByTestId(DIVIDER_TEST_ID)).not.toBeInTheDocument();
  });

  test('# component must have expanded details', () => {
    renderWithProviders(<Accordion headerSlot={HEADER} detailsSlot={DETAILS} />);

    expect(screen.getByTestId(EXPAND_ICON_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(DETAILS_TEST_ID)).toBeInTheDocument();
  });

  test('# component must have expanded and unexpanded details', () => {
    renderWithProviders(
      <Accordion headerSlot={HEADER} detailsSlot={DETAILS} unexpandedDetailsSlot={UNEXPANDED_DETAILS} />
    );
    expect(screen.getByTestId(EXPAND_ICON_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(DETAILS_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(UNEXPANDED_DETAILS_TEST_ID)).toBeInTheDocument();
  });

  test('# component must call onClick when accordion header is clicked', () => {
    const { getByTestId } = renderWithProviders(
      <Accordion headerSlot={HEADER} unexpandedDetailsSlot={UNEXPANDED_DETAILS} />
    );

    const accordionHeader = getByTestId(ACCORDION_HEADER_TEST_ID);

    fireEvent.click(accordionHeader);
    expect(screen.getByTestId(UNEXPANDED_DETAILS_TEST_ID)).toBeInTheDocument();
  });

  test('# component must call onChange when accordion is expanded or collapsed', () => {
    const handleChange = jest.fn();
    const { getByTestId } = renderWithProviders(
      <Accordion headerSlot={HEADER} detailsSlot={DETAILS} onChange={handleChange} />
    );

    const accordionHeader = getByTestId(ACCORDION_HEADER_TEST_ID);

    fireEvent.click(accordionHeader);
    expect(handleChange).toHaveBeenCalledWith(true);

    fireEvent.click(accordionHeader);
    expect(handleChange).toHaveBeenCalledWith(false);
  });
});
