import { ButtonBaseProps, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

import { Icon, IconProps } from '@/lib/xfi.lib/components/atoms';
import { MinusIcon, PlusIcon } from '@/lib/xfi.lib/icons';

import { StyledButton, StyledCounterContainer } from './styles';

type Props = PropsWithChildren<{
  value: number;
  onChange: (value: number) => void;
  minValue?: number;
}>;

const Counter = ({ value, minValue = 1, onChange, children }: Props) => {
  return (
    <StyledCounterContainer>
      <CounterButton disabled={value <= minValue} onClick={() => onChange(value - 1)} icon={MinusIcon.dark} />
      <Typography align="center" variant="h3" component="span" color="primary.main">
        {children}
      </Typography>
      <CounterButton onClick={() => onChange(value + 1)} icon={PlusIcon.dark} />
    </StyledCounterContainer>
  );
};

type CounterButtonProps = ButtonBaseProps & {
  icon: IconProps['src'];
};

const CounterButton = ({ icon, ...buttonProps }: CounterButtonProps) => {
  return (
    <StyledButton {...buttonProps}>
      <Icon src={icon} viewBox="0 0 20 20" sx={{ fontSize: { md: '2rem', xs: '1.5rem' } }} />
    </StyledButton>
  );
};

export default Counter;
