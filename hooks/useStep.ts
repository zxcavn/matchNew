import { useCallback, useState } from 'react';

const useStep = <T>(stepList: Array<T>) => {
  const [step, setStep] = useState<T | null>(null);

  const setNextStep = useCallback(
    (prev?: T) => setStep(prevStep => changeStep({ direction: 'forward', stepList, prevStep: prev || prevStep })),
    [stepList]
  );

  const setPreviousStep = useCallback(
    (prev?: T) => setStep(prevStep => changeStep({ direction: 'backward', stepList, prevStep: prev || prevStep })),
    [stepList]
  );

  const resetStep = useCallback(() => setStep(null), []);

  return {
    step,
    setStep,
    setNextStep,
    setPreviousStep,
    resetStep,
  };
};

const changeStep = <T>({
  direction,
  stepList,
  prevStep,
}: {
  direction: 'forward' | 'backward';
  stepList: Array<T>;
  prevStep: T | null;
}): T | null => {
  if (!prevStep) {
    return stepList.at(0) || null;
  }

  const index = stepList.indexOf(prevStep);
  const nextStep = stepList[index + (direction === 'forward' ? 1 : -1)];

  return nextStep || null;
};

export default useStep;
