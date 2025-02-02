import type { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

export type InputText =
  | {
      type: 'intl';
      /** @type {FormattedMessageId}  */
      id: string;
      values?: Parameters<typeof FormattedMessage>[0]['values'];
    }
  | {
      type: 'text';
      text: string;
    }
  | {
      type: 'jsx';
      component: ReactNode;
    };

export type AutocompleteText =
  | {
      type: 'text';
      text: string;
    }
  | {
      type: 'jsx';
      component: ReactNode;
      textLabel: string;
    };

export type InputPlaceholder = Exclude<InputText, { type: 'jsx' }>;

export type LabelPlacement = 'start' | 'end' | 'top' | 'bottom';
