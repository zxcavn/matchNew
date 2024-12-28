import React from 'react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../helpers/test';
import Dropdown from './Dropdown';

const TRIGGER_ID = 'trigger-test-id';
const CHILD_ID = 'child-test-id';
const MOCK_CHILD = () => <div data-testid={CHILD_ID}></div>;
const TRIGGER = <button data-testid={TRIGGER_ID}></button>;

describe('Dropdown Component', () => {
  const MOCK_PROPS = {
    isOpen: true,
    onClose: jest.fn(),
    trigger: TRIGGER,
  };

  test('# renders trigger and child components when open', () => {
    const { queryByTestId } = renderWithProviders(
      <Dropdown {...MOCK_PROPS}>
        <MOCK_CHILD />
      </Dropdown>
    );

    expect(queryByTestId(CHILD_ID)).toBeInTheDocument();
    expect(queryByTestId(TRIGGER_ID)).toBeInTheDocument();
  });

  test('# renders only trigger when is not open', () => {
    const { queryByTestId, getByTestId } = renderWithProviders(
      <Dropdown {...MOCK_PROPS} isOpen={false}>
        <MOCK_CHILD />
      </Dropdown>
    );

    expect(getByTestId(TRIGGER_ID)).toBeInTheDocument();
    expect(queryByTestId(CHILD_ID)).not.toBeInTheDocument();
  });

  test('# renders content and trigger as a function', () => {
    const trigger = (_open: boolean) => MOCK_PROPS.trigger;

    const { queryByTestId, getByTestId } = renderWithProviders(
      <Dropdown {...MOCK_PROPS} trigger={trigger}>
        <MOCK_CHILD />
      </Dropdown>
    );

    expect(getByTestId(TRIGGER_ID)).toBeInTheDocument();
    expect(queryByTestId(CHILD_ID)).toBeInTheDocument();
  });
});
