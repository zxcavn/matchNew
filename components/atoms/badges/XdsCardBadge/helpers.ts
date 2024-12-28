import { trimStringAndInsertDots } from '@xfi/helpers';

export const formatXdsBadgeName = (name: string) => {
  const MAX_NAME_LENGTH = 15;
  const CHARS_AFTER_DOTS = 3;

  return name.length > MAX_NAME_LENGTH
    ? trimStringAndInsertDots({
        value: name,
        charsBeforeDots: MAX_NAME_LENGTH - CHARS_AFTER_DOTS,
        charsAfterDots: CHARS_AFTER_DOTS,
      })
    : name;
};

export const formatXdsBadgeAddress = (address: string) => {
  return trimStringAndInsertDots({ value: address, charsBeforeDots: 4, charsAfterDots: 5 });
};
