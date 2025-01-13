import { useDebouncedCallback } from '@xfi/hooks';
import chunk from 'lodash/chunk';
import { useEffect, useMemo, useState } from 'react';

export type UseNavbarOverflowConfig = {
  itemSize: number;
  gap: number;
  paddingX: number;
  humpWidth: number;
};

const DEBOUNCE = 40;

const DEFAULT_CONFIG: UseNavbarOverflowConfig = {
  itemSize: 32,
  gap: 24,
  paddingX: 64,
  humpWidth: 100,
};

const useNavbarOverflow = <T>(navbarItems: Array<T>, config: UseNavbarOverflowConfig = DEFAULT_CONFIG) => {
  const { itemSize, gap, paddingX, humpWidth } = config;
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const debouncedSetWindowWidth = useDebouncedCallback(setWindowWidth, DEBOUNCE, { leading: true });

  useEffect(() => {
    const listener = () => debouncedSetWindowWidth(window.innerWidth);

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [debouncedSetWindowWidth]);

  return useMemo(() => {
    const itemCount = navbarItems.length;
    const navItemsWidth = itemCount * itemSize + (itemCount - 1) * gap;
    const containerWidth = windowWidth - paddingX;
    const isOverflow = containerWidth < navItemsWidth;

    if (!isOverflow) {
      return {
        isOverflow,
        visibleItems: navbarItems,
        hiddenItems: [],
        groupedVisibleItems: [[], []],
      };
    }

    let visibleCount = Math.ceil((containerWidth - humpWidth) / (itemSize + gap));

    visibleCount = visibleCount % 2 ? visibleCount - 1 : visibleCount;

    const hiddenCount = itemCount - visibleCount;
    const visibleItems = navbarItems.slice(0, visibleCount);
    const middleIndex = Math.floor(visibleCount / 2);

    return {
      isOverflow,
      visibleItems,
      hiddenItems: navbarItems.slice(-hiddenCount),
      groupedVisibleItems: chunk(visibleItems, middleIndex),
    };
  }, [navbarItems, itemSize, gap, paddingX, humpWidth, windowWidth]);
};

export default useNavbarOverflow;
