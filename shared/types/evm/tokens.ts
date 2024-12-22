export enum EMpxToken {
  eMpx = 'eMpx',
  mpxCheque = 'mpxCheque',
}

type Token = Readonly<{
  symbol: string;
  text: string;
}>;

export const TOKENS: Readonly<Record<EMpxToken, Token>> = {
  eMpx: {
    symbol: 'eMpx',
    text: 'eMPX',
  },
  mpxCheque: {
    symbol: 'mpxCheque',
    text: 'MPX_CHEQUE',
  },
} as const;
