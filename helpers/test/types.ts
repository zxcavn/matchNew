export type PropsWithTestId<P = unknown> = P & {
  'data-testid'?: string;
};
