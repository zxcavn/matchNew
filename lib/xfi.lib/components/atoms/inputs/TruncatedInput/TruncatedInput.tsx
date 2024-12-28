import { useTruncatedElement } from '@xfi/hooks';
import { FocusEvent, ForwardedRef, forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';

import { type InputProps, Input } from '../Input';

export type Props = InputProps & { paddingSumPx?: number };

const TruncatedInput = (
  { value, onFocus: onFocusProp, onBlur: onBlurProp, paddingSumPx = 34, ...rest }: Props,
  forwardedRef: ForwardedRef<HTMLInputElement>
) => {
  const elementRef = useRef<HTMLInputElement>(null);
  const [hasFocus, setHasFocus] = useState(false);

  const { truncatedValue } = useTruncatedElement({ elementRef, elementValue: value, paddingSumPx });

  useImperativeHandle(forwardedRef, () => elementRef.current as HTMLInputElement);

  const onFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      onFocusProp?.(event);
      setHasFocus(true);
    },
    [onFocusProp]
  );

  const onBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      onBlurProp?.(event);
      setHasFocus(false);
    },
    [onBlurProp]
  );

  const displayValue = hasFocus ? value : truncatedValue;

  return <Input ref={elementRef} value={displayValue} onFocus={onFocus} onBlur={onBlur} {...rest} />;
};

export default forwardRef(TruncatedInput);
