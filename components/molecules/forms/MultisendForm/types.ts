export type SelectName = 'firstSelect' | 'secondSelect';

export type InputName = 'firstInput' | 'secondInput';

export type FormChangeValues = {
  formId: string;
  values: FormValues;
  isValid: boolean;
  fieldCount: number;
};

export type FormValues = {
  address: string;
  firstSelect: string;
  firstInput: string;
  secondSelect: string;
  secondInput: string;
};

export type ImperativeHandlers = {
  isValidForm: () => boolean;
  setFieldValue: (field: keyof FormValues, value: string) => void;
  getFormValues: () => FormValues;
};
