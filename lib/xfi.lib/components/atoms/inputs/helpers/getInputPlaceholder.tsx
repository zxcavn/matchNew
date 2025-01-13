import { IntlFormatters } from 'react-intl';

import type { InputPlaceholder } from '../types';

/**
 * Returns a function that generates input placeholders based on the provided `formatMessage` function.
 *
 * The `getInputPlaceholder` function takes an `formatMessage` function and returns a placeholder generator function. The placeholder generator function takes an `InputPlaceholder` object and generates a corresponding placeholder string based on the specified content type, such as plain text or an internationalized (intl) message.
 *
 * @param {IntlFormatters['formatMessage']} formatMessage - A function to format internationalized messages.
 *
 * @returns {(props?: InputPlaceholder) => string} A placeholder generator function that takes an `InputPlaceholder` object and returns the generated placeholder string.
 */
const getInputPlaceholder = (formatMessage: IntlFormatters['formatMessage']) => {
  return (props?: InputPlaceholder): string => {
    if (!props) return '';

    switch (props.type) {
      case 'text': {
        return props.text;
      }

      case 'intl': {
        return formatMessage(props);
      }
    }
  };
};

export default getInputPlaceholder;
