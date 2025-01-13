export const getColors = (withAnimation?: boolean, isDarkTheme?: boolean) => {
  return isDarkTheme
    ? {
        from: withAnimation ? '#0CC2FF' : '#FFFFFF',
        to: withAnimation ? '#080C17' : '#38CDFF',
      }
    : {
        from: withAnimation ? '#0CC2FF' : '#D1F3FF',
        to: withAnimation ? '#F0F2FA' : '#38CDFF',
      };
};
