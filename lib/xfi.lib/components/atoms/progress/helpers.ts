export const getPercent = ({ currentValue, totalValue }: { currentValue: number; totalValue: number }) => {
  if (totalValue <= 0 || currentValue <= 0) {
    return 0;
  }
  return ((currentValue / totalValue) * 100).toFixed(2);
};
