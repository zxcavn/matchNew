import { FormattedMessage } from 'react-intl';

import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../../helpers/test';
import enMessages from '../../../../i18n/messages/en.json';
import type { InputPlaceholder, InputText } from '../types';
import getInputPlaceholder from './getInputPlaceholder';
import renderInputText from './renderInputText';

const TEST_COMPONENT_ID = 'component-test-id';
const TEST_TEXT = 'Test Text';

const mockFormatMessage = jest
  .fn()
  .mockImplementation((message: { id: keyof typeof enMessages }) => enMessages[message.id]);

describe('inputs helpers', () => {
  describe('renderInputText', () => {
    test('# should return null if props are not provided', () => {
      const inputText = renderInputText();

      expect(inputText).toBeNull();
    });

    test('# should render the provided JSX component if type is "jsx"', () => {
      const TestComponent = () => <div data-testid={TEST_COMPONENT_ID} />;
      const { getByTestId } = renderWithProviders(
        <>{renderInputText({ type: 'jsx', component: <TestComponent /> })}</>
      );

      expect(getByTestId(TEST_COMPONENT_ID)).toBeInTheDocument();
    });

    test('# should render the provided text if type is "text"', () => {
      const testText = renderInputText({ type: 'text', text: TEST_TEXT });

      expect(testText).toEqual(TEST_TEXT);
    });

    test('# should render the FormattedMessage component if type is "intl"', () => {
      const intlMessage: InputText = { type: 'intl', id: 'LIB.SUMMARY.COPY' };
      const intlText = renderInputText(intlMessage);

      expect(intlText).toEqual(<FormattedMessage {...intlMessage} />);
    });
  });

  describe('getInputPlaceholder', () => {
    test('# should return an empty string if props are not provided', () => {
      const getPlaceholder = getInputPlaceholder(mockFormatMessage);
      const placeholder = getPlaceholder();

      expect(placeholder).toBe('');
    });

    test('# should return the text directly if type is "text"', () => {
      const getPlaceholder = getInputPlaceholder(mockFormatMessage);
      const placeholderText = 'Enter your name';
      const placeholder = getPlaceholder({ type: 'text', text: placeholderText });

      expect(placeholder).toBe(placeholderText);
    });

    test('# should return the formatted message if type is "intl"', () => {
      const getPlaceholder = getInputPlaceholder(mockFormatMessage);
      const intlMessage: InputPlaceholder = { type: 'intl', id: 'LIB.SUMMARY.COPY' };
      const placeholder = getPlaceholder(intlMessage);

      expect(placeholder).toBe(enMessages['LIB.SUMMARY.COPY']);
      expect(mockFormatMessage).toHaveBeenCalledWith(intlMessage);
    });
  });
});
