import React from 'react';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../helpers/test';
import enMessages from '../../../i18n/messages/en.json';
import Block, { BLOCK_TEST_ID, LOADER_TEST_ID, TITLE_TEST_ID } from './Block';

describe('Block component', () => {
  const CHILDREN_TEXT = 'Test Children';

  const renderBlock = (props = {}) =>
    renderWithProviders(
      <Block {...props}>
        <div>{CHILDREN_TEXT}</div>
      </Block>
    );

  test('# renders Block component with default props', () => {
    const { queryByTestId } = renderBlock();

    expect(queryByTestId(LOADER_TEST_ID)).not.toBeInTheDocument();
  });

  test('# renders Block component with isLoading true', () => {
    const { queryByTestId } = renderBlock({ isLoading: true });

    expect(queryByTestId(LOADER_TEST_ID)).toBeInTheDocument();
  });

  test('# renders Block component with title', () => {
    const title = 'Test Title';
    const { queryByTestId, queryByText } = renderBlock({ title });

    expect(queryByTestId(TITLE_TEST_ID)).toHaveTextContent(title);
    expect(queryByText(CHILDREN_TEXT)).toBeInTheDocument();
  });

  test('# renders Block component without title', () => {
    const { queryByTestId, queryByText } = renderBlock();

    expect(queryByTestId(TITLE_TEST_ID)).toBeNull();
    expect(queryByText(CHILDREN_TEXT)).toBeInTheDocument();
  });

  test('# renders Block component with ReactElement title', () => {
    const title = <span>Custom Title</span>;
    const { getByText } = renderBlock({ title });

    expect(getByText('Custom Title')).toBeInTheDocument();
    expect(getByText(CHILDREN_TEXT)).toBeInTheDocument();
  });

  test('# renders Block component with FormattedMessage title', () => {
    const title = 'LIB.OPERATIONS.BOND';
    const { getByText } = renderBlock({ title });

    expect(getByText(enMessages[title])).toBeInTheDocument();
    expect(getByText(CHILDREN_TEXT)).toBeInTheDocument();
  });

  test('# renders Block component with custom className', () => {
    const className = 'custom-class';
    const { getByTestId } = renderBlock({ className });

    expect(getByTestId(BLOCK_TEST_ID)).toHaveClass(className);
  });

  test('# renders Block component with custom titleSx', () => {
    const title = 'LIB.SUMMARY.TITLE';
    const titleSx = { color: 'red' };
    const { getByTestId } = renderBlock({ title, titleSx });

    expect(getByTestId(TITLE_TEST_ID)).toHaveStyle('color: red');
  });
});
