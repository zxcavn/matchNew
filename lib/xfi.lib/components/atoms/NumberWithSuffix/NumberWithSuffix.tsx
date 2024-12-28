import { FormattedNumber } from 'react-intl';

import { AUTOCOMPLETE_NONE_VALUE } from '../inputs';

export const TEST_ID = 'number-with-suffix-test-id';

export type Props = {
  value: string | number;
  minFractionDigits?: number;
  maxFractionDigits?: number;
};

const NumberWithSuffix = ({ value, minFractionDigits = 0, maxFractionDigits = 2 }: Props) => {
  const numericValue = typeof value === 'string' ? Number(value) : value;

  if (isNaN(numericValue)) {
    return <>{AUTOCOMPLETE_NONE_VALUE}</>;
  }

  return (
    <FormattedNumber
      data-testid={TEST_ID}
      value={numericValue}
      notation="compact"
      minimumFractionDigits={minFractionDigits}
      maximumFractionDigits={maxFractionDigits}
    />
  );
};

export default NumberWithSuffix;
