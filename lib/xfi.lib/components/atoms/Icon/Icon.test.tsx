import { fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import Icon from './Icon';

const TEST_ID = 'icon-test-id';
const TEST_ICON = ({ ...props }) => <svg {...props}></svg>;

const PROPS = {
  ['data-testid']: TEST_ID,
  src: TEST_ICON,
  className: 'test-class',
  viewBox: '0 0 24 24',
  onClick: jest.fn(),
  htmlColor: 'red',
};

describe('Icon component', () => {
  test('# component should be rendered on the screen with props', () => {
    render(<Icon {...PROPS} />);

    const iconElement = screen.getByTestId(TEST_ID);

    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass(PROPS.className);
    expect(iconElement).toHaveAttribute('viewBox', PROPS.viewBox);
    expect(iconElement).toHaveAttribute('color', PROPS.htmlColor);

    expect(PROPS.onClick).toHaveBeenCalledTimes(0);
  });

  test('# component should call onClick', () => {
    render(<Icon {...PROPS} />);

    const iconElement = screen.getByTestId(TEST_ID);

    fireEvent.click(iconElement);

    expect(iconElement).toBeInTheDocument();
    expect(PROPS.onClick).toHaveBeenCalledTimes(1);
  });
});
