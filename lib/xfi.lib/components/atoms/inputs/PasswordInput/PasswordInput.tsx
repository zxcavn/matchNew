import { Box, Stack, Typography } from '@mui/material';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { DEFAULT_PASSWORD_RULES } from '../../../../constants/passwordRule';
import { EyeCloseIcon, EyeOpenIcon } from '../../../../icons';
import { useMediaQuery } from '../../../../theme';
import { Icon } from '../../Icon';
import { type InputProps, Input } from '../Input';
import { StyledPasswordInput } from './styles';

export const TEST_ID = 'passwordInput-test-id';
export const TOOLTIP_TEST_ID = 'rulesTooltip-test-id';
export const SHOW_PASS_TEST_ID = 'showPass-test-id';

export type Props = InputProps & {
  isWithValidation?: boolean;
  passwordRules?: {
    rule: RegExp;
    message: string;
  }[];
};

const PasswordInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { value, onBlur, onChange, passwordRules, isWithValidation = false } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isShowTooltip, setIsShowTooltip] = useState(false);
  const [errors, setErrors] = useState(passwordRules ?? DEFAULT_PASSWORD_RULES);

  const allPasswordRules = passwordRules ?? DEFAULT_PASSWORD_RULES;

  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const getErrors = useCallback(() => {
    const currentErrors = allPasswordRules.filter(item => {
      return !value || !value.match(item.rule);
    });

    if (!currentErrors.length) {
      setIsShowTooltip(false);
    }

    setErrors(currentErrors);
  }, [value]);

  useEffect(() => {
    if (value) {
      setIsShowTooltip(true);
    }

    getErrors();
  }, [value]);

  return (
    <StyledPasswordInput
      open={isWithValidation && Boolean(errors.length) && isShowTooltip}
      disableHoverListener
      PopperProps={{
        modifiers: [
          {
            name: 'preventOverflow',
            options: {
              boundary: 'viewport',
            },
          },
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['bottom'],
            },
          },
        ],
      }}
      title={
        <Box className="passRules" data-testid={TOOLTIP_TEST_ID}>
          <Typography className="tooltipTitle">
            <FormattedMessage id="LIB.PASSWORD_CONTAIN" />:
          </Typography>
          <ul>
            {errors?.map((item, index) => {
              if (value && value.match(item.rule)) {
                return null;
              }

              return (
                <Stack direction={'row'} alignItems={'center'} gap={'0.5rem'} key={index} component={'li'}>
                  <Box className={'listMarker'} />
                  <Typography color={'neutrals.buttonText'} variant="body2" whiteSpace={'nowrap'}>
                    <FormattedMessage id={item.message} />
                  </Typography>
                </Stack>
              );
            })}
          </ul>
        </Box>
      }
      placement={isMobile ? 'bottom' : 'right-start'}
    >
      <Input
        {...props}
        data-testid={TEST_ID}
        onFocus={() => setIsShowTooltip(true)}
        onBlur={event => {
          setIsShowTooltip(false);
          onBlur?.(event);
        }}
        onChange={event => {
          onChange?.(event);
        }}
        ref={ref}
        type={isPasswordVisible ? 'text' : 'password'}
        suffix={
          <Icon
            data-testid={SHOW_PASS_TEST_ID}
            src={isPasswordVisible ? EyeOpenIcon : EyeCloseIcon}
            sx={{ fontSize: '1.25rem' }}
            viewBox="0 0 20 20"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        }
      />
    </StyledPasswordInput>
  );
});

export default PasswordInput;
