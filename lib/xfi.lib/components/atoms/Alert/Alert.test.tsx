import { AlertColor } from '@mui/material';
import { fireEvent, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../helpers/test';
import Alert, { ACTION_TEST_ID, ICON_TEST_ID, TEST_ID } from './Alert';

describe('Alert component', () => {
  const CONTENT = 'text content message';
  let onClick: ReturnType<typeof jest.fn>;

  beforeEach(() => {
    onClick = jest.fn();
  });

  test('# component should be rendered on the screen with content', () => {
    renderWithProviders(<Alert onClose={onClick}>{CONTENT}</Alert>);
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID)).toHaveTextContent(CONTENT);
  });

  test('# component must have close action', () => {
    renderWithProviders(<Alert onClose={onClick} />);
    fireEvent.click(screen.getByTestId(ACTION_TEST_ID));
    expect(onClick).toHaveBeenCalled();
  });

  test('# component must have icon by severity', () => {
    let screen: ReturnType<typeof renderWithProviders>;
    const severities: AlertColor[] = ['error', 'info', 'success', 'warning'];

    severities.forEach(severity => {
      if (screen) {
        screen.rerender(
          <Alert severity={severity} onClose={onClick}>
            {CONTENT}
          </Alert>
        );
      } else {
        screen = renderWithProviders(
          <Alert severity={severity} onClose={onClick}>
            {CONTENT}
          </Alert>
        );
      }

      expect(screen.getByTestId(ICON_TEST_ID)).toBeInTheDocument();
    });
  });
});
