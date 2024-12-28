import { cleanup, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import InputFile, { DELETE_BUTTON_TEST_ID, INPUT_TEST_ID, TEST_ID } from './InputFile';

describe('InputFile component', () => {
  const CAPTION_TEXT = 'caption-text';

  beforeEach(cleanup);

  test('# component should be rendered on the screen with value', () => {
    const { getByTestId } = renderWithProviders(<InputFile name="file" value={[]} />);

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });

  test('# disable input when isDisabled prop is passed', () => {
    const { getByTestId } = renderWithProviders(<InputFile isDisabled name="file" value={[]} />);

    expect(getByTestId(INPUT_TEST_ID)).toBeDisabled();
  });

  test('# calls onChange prop when files are added', () => {
    const handleChange = jest.fn();
    const { getByTestId } = renderWithProviders(<InputFile name="file" value={[]} onChange={handleChange} />);

    const file1 = new File(['test1'], 'test1.png', { type: 'image/png' });
    const file2 = new File(['test2'], 'test2.png', { type: 'image/png' });

    fireEvent.change(getByTestId(INPUT_TEST_ID), { target: { files: [file1, file2] } });

    expect(handleChange).toHaveBeenCalledWith({
      target: { value: [file1, file2], name: 'file' },
    });
  });

  test('# calls onChange prop when files are deleted', () => {
    const handleChange = jest.fn();
    const { getByTestId } = renderWithProviders(
      <InputFile name="file" value={[new File(['test'], 'test.png', { type: 'image/png' })]} onChange={handleChange} />
    );
    const deleteButton = getByTestId(DELETE_BUTTON_TEST_ID);

    fireEvent.click(deleteButton as Element);

    expect(handleChange).toHaveBeenCalledWith({
      target: { value: [], name: 'file' },
    });
  });

  test('# calls onChange with max available count of files', () => {
    const handleChange = jest.fn();
    const { getByTestId } = renderWithProviders(<InputFile name="file" max={1} value={[]} onChange={handleChange} />);

    const file1 = new File(['test1'], 'test1.png', { type: 'image/png' });
    const file2 = new File(['test2'], 'test2.png', { type: 'image/png' });

    fireEvent.change(getByTestId(INPUT_TEST_ID), { target: { files: [file1, file2] } });

    expect(handleChange).toHaveBeenCalledWith({
      target: { value: [file1], name: 'file' },
    });
  });

  test('# renders caption when isError prop is true', () => {
    const { getByText } = renderWithProviders(
      <InputFile name="file" value={[]} isError caption={{ type: 'text', text: CAPTION_TEXT }} />
    );
    const caption = getByText(CAPTION_TEXT);

    expect(caption).toBeInTheDocument();
  });

  test('# renders multiple files when value prop contains multiple files', () => {
    const { getByText } = renderWithProviders(
      <InputFile
        name="file"
        value={[
          new File(['test1'], 'test1.png', { type: 'image/png' }),
          new File(['test2'], 'test2.png', { type: 'image/png' }),
        ]}
      />
    );
    const file1 = getByText('test1.png');
    const file2 = getByText('test2.png');

    expect(file1).toBeInTheDocument();
    expect(file2).toBeInTheDocument();
  });
});
