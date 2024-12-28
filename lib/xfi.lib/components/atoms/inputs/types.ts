import type { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import type { PropsWithTestId } from '../../../helpers/test';

export type CommonInputProps = PropsWithTestId<
  Partial<{
    id: string;
    className: string;
    name: string;
    isDisabled: boolean;
    isRequired: boolean;
    isError: boolean;
  }>
>;

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
