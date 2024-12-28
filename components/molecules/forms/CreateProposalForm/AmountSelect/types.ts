import { FormikErrors } from 'formik';

import { CosmosCurrency } from '@/shared/types';

export type SelectName = 'firstSelect' | 'secondSelect';

export type InputName = 'firstInput' | 'secondInput';

export type FormValues = {
  firstSelect: CosmosCurrency;
  firstInput: string;
  secondSelect: CosmosCurrency;
  secondInput: string;
};

export type FormChangeValues = {
  values: FormValues;
  isValid: boolean;
  fieldCount: number;
};

export type ImperativeHandlers = {
  getFormValues: () => FormValues;
  validateForm: (values?: FormValues | undefined) => Promise<FormikErrors<FormValues>>;
};
