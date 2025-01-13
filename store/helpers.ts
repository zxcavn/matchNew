import isEqual from 'lodash/isEqual';
import { createSelectorCreator, lruMemoize } from 'reselect';

/**
 * Create a "selector creator" that uses lodash.isequal instead of ===
 * Don't use it when create selector for primitives
 */
export const createDeepEqualSelector = createSelectorCreator(lruMemoize, isEqual);
