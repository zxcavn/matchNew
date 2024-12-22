export type DeepNonNullable<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export type ActiveModal = 'send' | 'confirm' | 'success' | null;

export type PropsWithLoading = {
  isLoading?: boolean;
};

export type WithKeyPrefix<T, P extends string> = {
  [K in keyof T as `${P}${string & K}`]: T[K];
};
