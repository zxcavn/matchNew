import { renderHook } from '@testing-library/react';

import { waitFor } from './../helpers/test/waitFor';
import useNavbarOverflow, { type UseNavbarOverflowConfig } from './useNavbarOverflow';

describe('useNavbarOverflow', () => {
  const mockItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  const mockConfig: UseNavbarOverflowConfig = {
    itemSize: 100,
    gap: 10,
    paddingX: 20,
    humpWidth: 50,
  };

  beforeAll(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1000,
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('# should return visible items when there is no overflow', () => {
    const { result } = renderHook(() => useNavbarOverflow(mockItems, mockConfig));
    const { visibleItems, hiddenItems, isOverflow } = result.current;

    expect(visibleItems.length).toBe(mockItems.length);
    expect(hiddenItems.length).toBe(0);
    expect(isOverflow).toBe(false);
  });

  test('# should return visible and hidden items when there is overflow', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 300,
    });

    const { result } = renderHook(() => useNavbarOverflow(mockItems, mockConfig));
    const { visibleItems, hiddenItems, groupedVisibleItems, isOverflow } = result.current;
    const groupedVisibleItemsCount = groupedVisibleItems.flat().length;

    expect(groupedVisibleItemsCount).toBe(mockItems.length - hiddenItems.length);
    expect(visibleItems.length).toBeLessThan(mockItems.length);
    expect(hiddenItems.length).toBe(mockItems.length - groupedVisibleItemsCount);
    expect(isOverflow).toBe(true);
  });

  test('# should return correct number of visible items based on window width', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 800,
    });

    const { result } = renderHook(() => useNavbarOverflow(mockItems, mockConfig));
    const { visibleItems, hiddenItems, isOverflow } = result.current;

    expect(visibleItems.length).toBe(mockItems.length);
    expect(hiddenItems.length).toBe(0);
    expect(isOverflow).toBe(false);
  });

  test('# should correctly calculate grouped visible items', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 500,
    });

    const { result } = renderHook(() => useNavbarOverflow(mockItems, mockConfig));
    const { groupedVisibleItems } = result.current;

    expect(groupedVisibleItems.length).toBe(2);
    expect(groupedVisibleItems[0].length).toBe(2);
    expect(groupedVisibleItems[1].length).toBe(2);
  });

  test('# should update visible items when window is resized', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1000,
    });

    const { result, rerender } = renderHook(() => useNavbarOverflow(mockItems, mockConfig));
    const { visibleItems } = result.current;

    expect(visibleItems.length).toBe(mockItems.length);

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 300,
    });

    waitFor(() => {
      window.dispatchEvent(new Event('resize'));
    });
    rerender(() => useNavbarOverflow(mockItems, mockConfig));
    expect(result.current.visibleItems.length).toBeLessThan(mockItems.length);
  });
});
