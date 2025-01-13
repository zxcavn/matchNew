import { copyValue } from '@xfi/helpers';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useMediaQuery } from '../theme';

export const ANIMATION_DELAY_MILLISECONDS = 1500;

const useCopy = () => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const [isCopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onCopy = useCallback(
    async (event: React.MouseEvent | React.KeyboardEvent, copyText?: string) => {
      try {
        event.preventDefault();

        await copyValue(copyText || '');
        setIsCopied(true);

        if (isMobile) {
          setTimeout(() => {
            setIsCopied(false);
          }, ANIMATION_DELAY_MILLISECONDS);
        }
      } catch (e) {
        console.error('copy error', e);
      }
    },
    [isMobile]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isCopied) {
        setIsCopied(false);
        setIsOpen(false);
      }
    }, ANIMATION_DELAY_MILLISECONDS);

    return () => {
      clearInterval(timer);
    };
  }, [isCopied]);

  return useMemo(
    () => ({
      onCopy,
      isOpen,
      isCopied,
      setIsOpen,
    }),
    [isCopied, isOpen, onCopy]
  );
};

export default useCopy;
