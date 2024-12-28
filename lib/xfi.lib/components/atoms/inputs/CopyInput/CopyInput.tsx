import { Copy } from '../../../atoms/copy';
import { type InputProps, Input } from '../Input';
import { NumberInput } from '../NumberInput';

export const TEST_ID = 'copy-input-test-id';

export type Props = Omit<InputProps, 'suffix'> & {
  variant?: 'text' | 'number';
};

/**
 * An input field with a "Copy" button that allows users to copy the input's value to the clipboard.
 *
 * The `CopyInput` component is designed for situations where you want to provide users with a way to easily copy text or numbers to their clipboard. It consists of an input field and a "Copy" button that copies the input's value when clicked.
 *
 * @component
 *
 * @param {Props} props - The props for configuring the `CopyInput` component.
 * @param {string} [props.value=""] - The initial value of the input field.
 * @param {string} [props.variant="text"] - The variant of the `CopyInput` component, which can be either "text" for text input or "number" for number input.
 * @param {InputProps} [props.rest] - Additional props to customize the behavior of the input field (e.g., onChange, label, placeholder, etc.).
 *
 * @returns {FC} The `CopyInput` component, which includes an input field and a "Copy" button for easily copying the input's value to the clipboard.
 */
const CopyInput = (props: Props) => {
  const { variant = 'text', value, ...rest } = props;

  const Component = variant === 'number' ? NumberInput : Input;

  return <Component data-testid={TEST_ID} value={value} suffix={<Copy variant="button" value={value} />} {...rest} />;
};

export default CopyInput;
