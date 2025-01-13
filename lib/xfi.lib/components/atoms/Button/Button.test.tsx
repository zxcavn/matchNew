import { fireEvent, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../helpers/test';
import Button, {
  type ButtonSize,
  type ButtonVariant,
  type ButtonVariantClass,
  LOADER_TEST_ID,
  TEST_ID,
} from './Button';

describe('Button component', () => {
  const BUTTON_TEXT = 'Button text';

  let onClick: ReturnType<typeof jest.fn>;

  beforeEach(() => {
    onClick = jest.fn();
  });

  test('# component should be rendered on the screen with default props', () => {
    renderWithProviders(<Button onClick={onClick}>{BUTTON_TEXT}</Button>);

    const buttonElement = screen.getByTestId(TEST_ID);
    const expectedClasses: (ButtonSize | ButtonVariantClass)[] = ['primary_dark', 'medium'];

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(BUTTON_TEXT);
    expectedClasses.forEach(className => {
      expect(buttonElement).toHaveClass(className);
    });
    expect(buttonElement).not.toBeDisabled();
  });

  test('# component must have button behavior', () => {
    const { rerender } = renderWithProviders(<Button onClick={onClick}>{BUTTON_TEXT}</Button>);

    const buttonElement = screen.getByTestId(TEST_ID);

    fireEvent.click(buttonElement);
    expect(buttonElement).toBeEnabled();
    expect(onClick).toHaveBeenCalled();

    onClick.mockReset();
    rerender(
      <Button isDisabled onClick={onClick}>
        {BUTTON_TEXT}
      </Button>
    );

    fireEvent.click(buttonElement);
    expect(buttonElement).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });

  test('# component must have loader', () => {
    const { rerender, queryByTestId } = renderWithProviders(<Button onClick={onClick}>{BUTTON_TEXT}</Button>);
    const buttonElement = screen.getByTestId(TEST_ID);

    expect(queryByTestId(LOADER_TEST_ID)).not.toBeInTheDocument();
    rerender(
      <Button isLoading onClick={onClick}>
        {BUTTON_TEXT}
      </Button>
    );

    fireEvent.click(buttonElement);
    expect(queryByTestId(LOADER_TEST_ID)).toBeInTheDocument();
    expect(onClick).not.toHaveBeenCalled();
    expect(buttonElement).toBeDisabled();
  });

  test('# component mush have ButtonSize', () => {
    const sizes: ButtonSize[] = ['large', 'medium', 'small', 'largeIcon', 'mediumIcon', 'smallIcon'];

    let screen: ReturnType<typeof renderWithProviders>;

    sizes.forEach(size => {
      if (screen) {
        screen.rerender(
          <Button size={size} data-testid={TEST_ID}>
            {BUTTON_TEXT}
          </Button>
        );
      } else {
        screen = renderWithProviders(
          <Button size={size} data-testid={TEST_ID}>
            {BUTTON_TEXT}
          </Button>
        );
      }

      const buttonElement = screen.getByTestId(TEST_ID);

      expect(buttonElement).toHaveClass(size);
    });
  });

  test('# component must have ButtonVariant', () => {
    const variants: ButtonVariant[] = ['primary', 'secondary', 'transparent'];
    const variantsClasses: ButtonVariantClass[] = ['primary_dark', 'secondary_dark', 'transparent_dark'];
    let screen: ReturnType<typeof renderWithProviders>;

    variants.forEach((variant, index) => {
      if (screen) {
        screen.rerender(<Button variant={variant}>{BUTTON_TEXT}</Button>);
      } else {
        screen = renderWithProviders(<Button variant={variant}>{BUTTON_TEXT}</Button>);
      }

      const buttonElement = screen.getByTestId(TEST_ID);

      expect(buttonElement).toHaveClass(variantsClasses[index]);
    });
  });

  test('# component must have startIcon & endIcon', () => {
    const ICON_TEST_ID_1 = 'iconTestId';
    const ICON_TEST_ID_2 = 'anotherIconTestId';

    const { getByTestId } = renderWithProviders(
      <Button
        endIcon={<div data-testid={ICON_TEST_ID_2} />}
        startIcon={<div data-testid={ICON_TEST_ID_1} />}
        onClick={onClick}
      >
        {BUTTON_TEXT}
      </Button>
    );

    expect(getByTestId(ICON_TEST_ID_1)).toBeInTheDocument();
    expect(getByTestId(ICON_TEST_ID_2)).toBeInTheDocument();
  });
});
