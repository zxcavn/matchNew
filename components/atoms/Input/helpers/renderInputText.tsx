import { FormattedMessage } from 'react-intl';

import type { InputText } from '../types';

/**
 * Renders input text based on the provided configuration.
 *
 * The `renderInputText` function takes an `InputText` object as its argument and returns a corresponding JSX element. The `InputText` object specifies the type of content to render, such as plain text, a JSX component, or an internationalized (intl) message.
 *
 * @param {InputText} [props] - An `InputText` object that defines the content to render.
 *
 * @returns {JSX.Element | null} The rendered content as a JSX element, or `null` if no `InputText` object is provided.
 */
const renderInputText = (props?: InputText) => {
  if (!props) return null;

  switch (props.type) {
    case 'jsx': {
      return props.component;
    }

    case 'text': {
      return props.text;
    }

    case 'intl': {
      return <FormattedMessage {...props} />;
    }
  }
};

export default renderInputText;
