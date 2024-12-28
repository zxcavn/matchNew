export const RG_COMMON_PASSWORD_RULE =
  /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9! @#$%^&*()-_=+[\]{};:'",.<>/?`~]{8,}$/;
export const RG_MIN_LENGTH_PASSWORD_RULE = /^.{8,}$/;
export const RG_MAX_LENGTH_PASSWORD_RULE = /^.{8,20}$/;
export const RG_NUMBER_PASSWORD_RULE = /^(?=.*\d)/;
export const RG_LETTER_PASSWORD_RULE = /^(?=.*[a-z])/;
export const RG_BIG_LETTER_PASSWORD_RULE = /^(?=.*[A-Z])/;
export const RG_SPECIAL_CHARACTER_PASSWORD_RULE = /^(?=.*[@$#!%*?&'+/=^_`{|}[\]\\():;"<>,.§±~-])/;
export const RG_ONLY_LATIN = /^[a-zA-Z0-9! @#$%^&*()-_=+[\]{};:'",.<>/?`~]*$/;
export const RG_NO_TRAILING_SPACES = /^\S(?:.*\S)?$/;

export const DEFAULT_PASSWORD_RULES = [
  {
    rule: RG_MIN_LENGTH_PASSWORD_RULE,
    message: 'LIB.PASSWORD.TOOLTIP.RULE_1',
  },
  {
    rule: RG_MAX_LENGTH_PASSWORD_RULE,
    message: 'LIB.PASSWORD.TOOLTIP.RULE_2',
  },
  {
    rule: RG_NUMBER_PASSWORD_RULE,
    message: 'LIB.PASSWORD.TOOLTIP.RULE_3',
  },
  {
    rule: RG_LETTER_PASSWORD_RULE,
    message: 'LIB.PASSWORD.TOOLTIP.RULE_4',
  },
  {
    rule: RG_BIG_LETTER_PASSWORD_RULE,
    message: 'LIB.PASSWORD.TOOLTIP.RULE_5',
  },
  {
    rule: RG_SPECIAL_CHARACTER_PASSWORD_RULE,
    message: 'LIB.PASSWORD.TOOLTIP.RULE_6',
  },
  {
    rule: RG_ONLY_LATIN,
    message: 'LIB.PASSWORD.TOOLTIP.RULE_7',
  },
  {
    rule: RG_NO_TRAILING_SPACES,
    message: 'LIB.PASSWORD.TOOLTIP.RULE_8',
  },
];
