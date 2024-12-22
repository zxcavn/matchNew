import { MutableRefObject } from 'react';
import { IntlFormatters } from 'react-intl';
import * as Yup from 'yup';

import { type OptionType, TruncatedInput } from '@/lib/xfi.lib/components/atoms';
import {
  type FormBlockGenericValidationRules,
  type FormBlockInputsData,
  FormBlockInputTypesEnum,
} from '@/lib/xfi.lib/components/molecules';
import { ADDRESS_PREFIX, isAccountAddress } from '@/services/cosmos/helpers';
import { ProposalMessageType } from '@/shared/types';

import { type FormChangeValues, type ImperativeHandlers, AmountSelect } from './AmountSelect';
import type { CreateProposalFormValues } from './types';

export const PROPOSAL_TYPES_OPTIONS: OptionType<string>[] = [
  { value: ProposalMessageType.TEXT, label: { type: 'text', text: 'Text' } },
  { value: ProposalMessageType.COMMUNITY_POOL_SPEND, label: { type: 'text', text: 'Community pool spend' } },
  { value: ProposalMessageType.SOFTWARE_UPGRADE, label: { type: 'text', text: 'Software upgrade' } },
];

export const PROPOSAL_TITLE_LENGTH = {
  from: 10,
  to: 100,
};

export const PROPOSAL_DESCRIPTION_LENGTH = {
  from: 200,
  to: 10000,
};

export const PROPOSAL_INFO_LENGTH = {
  to: 15000,
};

export const getFormValidationRules = (
  proposalType: ProposalMessageType,
  formatMessage: IntlFormatters['formatMessage']
): FormBlockGenericValidationRules<CreateProposalFormValues> | undefined => {
  const shortMessage = formatMessage({ id: 'ERRORS.SHORT_REQUIRED_FIELD' });

  const shortRequired = Yup.string()
    .required(shortMessage)
    .test('trim', shortMessage, v => Boolean(v.trim()));

  const commonRules = {
    title: shortRequired.test(
      'titleLength',
      formatMessage(
        { id: 'SUMMARY.MUST_BE_BETWEEN' },
        { from: PROPOSAL_TITLE_LENGTH.from, to: PROPOSAL_TITLE_LENGTH.to }
      ),
      v => v.trim().length >= PROPOSAL_TITLE_LENGTH.from && v.trim().length <= PROPOSAL_TITLE_LENGTH.to
    ),
    description: shortRequired.test(
      'descriptionLength',
      formatMessage(
        { id: 'SUMMARY.MUST_BE_BETWEEN' },
        { from: PROPOSAL_DESCRIPTION_LENGTH.from, to: PROPOSAL_DESCRIPTION_LENGTH.to }
      ),
      v => v.trim().length >= PROPOSAL_DESCRIPTION_LENGTH.from && v.trim().length <= PROPOSAL_DESCRIPTION_LENGTH.to
    ),
  };

  switch (proposalType) {
    case ProposalMessageType.COMMUNITY_POOL_SPEND: {
      const validationRules = {
        recipient: shortRequired.test('isValidAddress', formatMessage({ id: 'ERRORS.INCORRECT_WALLET_ADDRESS' }), v => {
          const trimmedValue = v.trim();

          return isAccountAddress(trimmedValue);
        }),
      };

      return { ...commonRules, ...validationRules };
    }

    case ProposalMessageType.SOFTWARE_UPGRADE: {
      const validationRules = {
        name: shortRequired,
        info: shortRequired.test(
          'infoLength',
          formatMessage({ id: 'SUMMARY.MUST_BE_LESS_OR_EQUAL' }, { to: PROPOSAL_INFO_LENGTH.to }),
          v => v.trim().length <= PROPOSAL_INFO_LENGTH.to
        ),
        height: shortRequired,
      };

      return { ...commonRules, ...validationRules };
    }

    default:
      return commonRules;
  }
};

export const getProposalInputs = ({
  formRef,
  onChange,
}: {
  formRef: MutableRefObject<ImperativeHandlers | undefined>;
  onChange: (values: FormChangeValues) => void;
}): {
  [key in Exclude<ProposalMessageType, ProposalMessageType.TEXT>]: FormBlockInputsData<CreateProposalFormValues>;
} => ({
  [ProposalMessageType.COMMUNITY_POOL_SPEND]: [
    {
      type: FormBlockInputTypesEnum.component,
      inputProps: {
        render: ({ getField, handleChange, handleBlur }) => {
          const { value: recipient, error } = getField('recipient');

          return (
            <TruncatedInput
              name={'recipient'}
              label={{
                type: 'intl',
                id: 'PROPOSALS.RECIPIENT_ADDRESS',
              }}
              placeholder={{
                type: 'text',
                text: `${ADDRESS_PREFIX}1...`,
              }}
              value={recipient}
              isError={!!error}
              caption={error ? { type: 'intl', id: error } : undefined}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          );
        },
      },
    },
    {
      type: FormBlockInputTypesEnum.jsx,
      inputProps: {
        component: (
          <AmountSelect
            onChange={onChange}
            ref={ref => {
              if (ref) {
                formRef.current = ref;
              }
            }}
          />
        ),
      },
    },
  ],
  [ProposalMessageType.SOFTWARE_UPGRADE]: [
    {
      inputName: 'name',
      type: FormBlockInputTypesEnum.text,
      inputProps: {
        label: {
          type: 'intl',
          id: 'SUMMARY.NAME',
        },
        placeholder: { type: 'intl', id: 'PROPOSALS.ENTER_NAME' },
      },
    },
    {
      inputName: 'height',
      type: FormBlockInputTypesEnum.number,
      inputProps: {
        label: {
          type: 'intl',
          id: 'PROPOSALS.HEIGHT',
        },
        placeholder: { type: 'intl', id: 'PROPOSALS.ENTER_HEIGHT' },
      },
    },
    {
      inputName: 'info',
      type: FormBlockInputTypesEnum.text,
      inputProps: {
        label: {
          type: 'intl',
          id: 'SUMMARY.INFO',
        },
        placeholder: { type: 'intl', id: 'PROPOSALS.ENTER_INFO' },
        multiline: true,
        resizable: true,
        rows: 5,
      },
    },
  ],
});
