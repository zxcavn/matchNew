import type { AutocompleteText } from '../types';

/**
 * Renders autocomplete text based on the provided configuration.
 *
 * @param {AutocompleteText} [props] - An `AutocompleteText` object that defines the content to render.
 *
 * @returns {JSX.Element | null} The rendered content as a JSX element, or `null` if no `AutocompleteText` object is provided.
 */
const renderAutocompleteText = (props?: AutocompleteText) => {
  if (!props) return null;

  switch (props.type) {
    case 'jsx': {
      return props.textLabel;
    }

    case 'text': {
      return props.text;
    }
  }
};

export default renderAutocompleteText;
