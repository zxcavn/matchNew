import { Stack } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useAppValidationRules } from '@/hooks';
import { Button, Select } from '@/lib/xfi.lib/components/atoms';
import {
  FormBlock,
  FormBlockGenericValidationRules,
  FormBlockInputsData,
  FormBlockInputTypesEnum,
} from '@/lib/xfi.lib/components/molecules';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { CosmosCurrency, ProposalMessageType, ViewOnlyProposalMessageType } from '@/shared/types';

import { FormChangeValues, ImperativeHandlers } from './AmountSelect';
import {
  getFormValidationRules,
  getProposalInputs,
  PROPOSAL_DESCRIPTION_LENGTH,
  PROPOSAL_TYPES_OPTIONS,
} from './constants';
import type {
  CommunityPoolSpendProposalValues,
  CreateProposalFormValues,
  CreateProposalOutputValues,
  SoftwareUpgradeProposalValues,
  TextProposalValues,
} from './types';

type Props = {
  onSubmit: (values: CreateProposalOutputValues) => void;
  onChange: (
    values: CreateProposalFormValues & {
      type: Exclude<ProposalMessageType, ViewOnlyProposalMessageType>;
    }
  ) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
};

export const CreateProposalForm = ({ isLoading, isDisabled, onChange, onSubmit }: Props) => {
  const { formatMessage } = useIntl();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const validationRules = useAppValidationRules();
  const amountSelectFormRef = useRef<ImperativeHandlers>();
  const resetFormRef = useRef<() => void>();
  const [isDisabledAmountForm, setIsDisabledAmountForm] = useState(true);

  const [formValidationRules, setFormValidationRules] = useState<
    FormBlockGenericValidationRules<CreateProposalFormValues> | undefined
  >();
  const [proposalType, setProposalType] = useState<Exclude<ProposalMessageType, ViewOnlyProposalMessageType>>(
    ProposalMessageType.TEXT
  );
  const [proposalInputs, setProposalInputs] = useState<FormBlockInputsData<CreateProposalFormValues>>([]);

  const isDisabledForm =
    proposalType === ProposalMessageType.COMMUNITY_POOL_SPEND ? isDisabled || isDisabledAmountForm : isDisabled;

  useEffect(() => {
    resetFormRef.current?.();

    if (proposalType !== ProposalMessageType.TEXT) {
      setProposalInputs(
        getProposalInputs({ formRef: amountSelectFormRef, onChange: onChangeAmountSelectFrom })[proposalType]
      );
    } else {
      setProposalInputs([]);
    }

    const commonRules = {
      title: validationRules.required,
      description: validationRules.required,
    };

    const additionalRules = getFormValidationRules(proposalType, formatMessage);

    setFormValidationRules({ ...commonRules, ...additionalRules });
  }, [proposalType, validationRules, formatMessage]);

  const onSubmitForm = async (values: CreateProposalFormValues) => {
    switch (proposalType) {
      case ProposalMessageType.TEXT: {
        const result: TextProposalValues = {
          ...values,
          type: ProposalMessageType.TEXT,
          title: values.title.trim(),
          description: values.description.trim(),
        };

        onSubmit(result);
        break;
      }

      case ProposalMessageType.COMMUNITY_POOL_SPEND: {
        const getAmount = (): {
          amount: string;
          denom: CosmosCurrency;
        }[] => {
          const amountsValues = amountSelectFormRef.current && amountSelectFormRef.current.getFormValues();

          const createAmount = (amount: string, denom: CosmosCurrency) => ({
            amount: MxNumberFormatter.parseUnits(amount).toString(),
            denom,
          });

          const firstAmount = createAmount(
            amountsValues?.firstInput || '',
            amountsValues?.firstSelect || CosmosCurrency.MPX
          );

          const amountDenom = [firstAmount];

          if (amountsValues?.secondInput) {
            const secondAmount = createAmount(
              amountsValues?.secondInput || '',
              amountsValues?.secondSelect || CosmosCurrency.MPX
            );

            amountDenom.push(secondAmount);
          }

          return amountDenom;
        };

        const result: CommunityPoolSpendProposalValues = {
          ...values,
          type: ProposalMessageType.COMMUNITY_POOL_SPEND,
          title: values.title.trim(),
          description: values.description.trim(),
          recipient: values.recipient.trim(),
          amount: getAmount(),
        };

        onSubmit(result);
        break;
      }

      case ProposalMessageType.SOFTWARE_UPGRADE: {
        const result: SoftwareUpgradeProposalValues = {
          ...values,
          type: ProposalMessageType.SOFTWARE_UPGRADE,
          title: values.title.trim(),
          description: values.description.trim(),
          name: values.name.trim(),
          height: values.height.trim(),
          info: values.info.trim(),
        };

        onSubmit(result);
        break;
      }
    }
  };

  const onChangeAmountSelectFrom = async ({ isValid }: FormChangeValues) => {
    await amountSelectFormRef.current?.validateForm();

    setIsDisabledAmountForm(!isValid);
  };

  const onChangeForm = (values: CreateProposalFormValues) => {
    const resultValues: CreateProposalFormValues & {
      type: Exclude<ProposalMessageType, ViewOnlyProposalMessageType>;
    } = { ...values, type: proposalType };

    onChange(resultValues);
  };

  return (
    <FormBlock<CreateProposalFormValues>
      id="create-proposal-form"
      observerHandler={onChangeForm}
      formHandlersCb={({ resetForm }) => (resetFormRef.current = resetForm)}
      onSubmit={onSubmitForm}
      validationRules={formValidationRules}
      inputsData={[
        {
          inputName: 'title',
          type: FormBlockInputTypesEnum.text,
          inputProps: {
            label: { type: 'intl', id: 'SUMMARY.HEADING' },
            placeholder: { type: 'intl', id: 'PROPOSALS.ENTER_HEADING' },
          },
        },
        {
          type: FormBlockInputTypesEnum.jsx,
          inputProps: {
            component: (
              <Select
                label={{
                  type: 'intl',
                  id: 'SUMMARY.TYPE',
                }}
                options={PROPOSAL_TYPES_OPTIONS}
                value={proposalType}
                onChange={e =>
                  setProposalType(e.target.value as Exclude<ProposalMessageType, ViewOnlyProposalMessageType>)
                }
              />
            ),
          },
        },
        {
          inputName: 'description',
          type: FormBlockInputTypesEnum.text,
          inputProps: {
            label: { type: 'intl', id: 'SUMMARY.DESCRIPTION' },
            placeholder: { type: 'intl', id: 'PROPOSALS.ENTER_DESCRIPTION' },
            caption: {
              type: 'text',
              text: formatMessage(
                { id: 'SUMMARY.MUST_BE_BETWEEN' },
                { from: PROPOSAL_DESCRIPTION_LENGTH.from, to: PROPOSAL_DESCRIPTION_LENGTH.to }
              ),
            },
            multiline: true,
            resizable: true,
            rows: 5,
          },
        },
        ...proposalInputs,
        {
          type: FormBlockInputTypesEnum.jsx,
          inputProps: {
            component: (
              <Stack mt={'1rem'} alignItems={'flex-end'}>
                <Button
                  type="submit"
                  size="large"
                  isFullWidth={isMobile}
                  isLoading={isLoading}
                  isDisabled={isDisabledForm}
                >
                  <FormattedMessage id={'PROPOSALS.CREATE'} />
                </Button>
              </Stack>
            ),
          },
        },
      ]}
    />
  );
};

export default CreateProposalForm;
