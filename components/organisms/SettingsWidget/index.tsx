import { Box, Stack, Typography } from '@mui/material';
import { useDebouncedCallback } from '@xfi/hooks';
import { millisecondsToMinutes, minutesToMilliseconds } from 'date-fns';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { setLanguage } from '@/lib/i18n';
import { Block, Divider, NumberInput, Select, SelectProps, Switch } from '@/lib/xfi.lib/components/atoms';
import { LANGUAGES } from '@/shared/constants';
import { autoDetectNftSelector, autoDetectTokenSelector, autoLockSelector } from '@/store/app/selectors';
import { setAutoDetectNft, setAutoDetectToken, setAutoLockData } from '@/store/app/slice';

type AutodetectionProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  value: boolean;
  title: string;
  text: string;
};

const SettingsWidget = () => (
  <Block>
    <Stack gap={{ xs: '1.5rem', md: '2rem' }} divider={<Divider />}>
      <LanguageSetting />
      <AutoDetectTokenSetting />
      <AutoDetectNft />
      <AutoLockSetting />
    </Stack>
  </Block>
);
const LanguageSetting = () => {
  const dispatch = useAppDispatch();
  const { locale } = useIntl();
  const router = useRouter();

  const onChangeLanguage: SelectProps['onChange'] = e => {
    if (Array.isArray(e.target.value)) {
      return;
    }
    const newLang = e.target.value;

    dispatch(setLanguage(newLang));
    router.push(router.pathname, router.asPath, { locale: newLang });
  };

  return (
    <Stack gap={'1rem'}>
      <Typography variant={'subtitle1'}>
        <FormattedMessage id={'SUMMARY.LANGUAGE'} />
      </Typography>
      <Box maxWidth={{ md: '29.4375rem' }}>
        <Select options={LANGUAGES} value={locale} onChange={onChangeLanguage} />
      </Box>
    </Stack>
  );
};

const Autodetection = ({ onChange, value, title, text }: AutodetectionProps) => {
  return (
    <Stack gap={{ xs: '1rem', md: '1.5rem' }}>
      <Stack
        flexDirection={'row'}
        alignItems={'center'}
        gap={'1.5rem'}
        justifyContent={{ xs: 'space-between', md: 'initial' }}
      >
        <Typography variant={'subtitle1'}>
          <FormattedMessage id={title} />
        </Typography>
        <Switch onChange={onChange} value={value} />
      </Stack>
      <Typography color={'neutrals.secondaryText'} maxWidth={{ md: '29.4375rem' }}>
        <FormattedMessage id={text} />
      </Typography>
    </Stack>
  );
};

const AutoDetectTokenSetting = () => {
  const dispatch = useAppDispatch();
  const autoDetectToken = useAppSelector(autoDetectTokenSelector);

  const onChangeAutoDetectToken = () => {
    dispatch(setAutoDetectToken(!autoDetectToken));
  };

  return (
    <Autodetection
      onChange={onChangeAutoDetectToken}
      value={autoDetectToken}
      title={'SUMMARY.AUTODETECTION_TOKENS'}
      text={'SUMMARY.AUTODETECTION_TOKENS.SUBTITLE'}
    />
  );
};

const AutoDetectNft = () => {
  const dispatch = useAppDispatch();
  const autoDetectNft = useAppSelector(autoDetectNftSelector);

  const onChangeAutoDetectToken = () => {
    dispatch(setAutoDetectNft(!autoDetectNft));
  };

  return (
    <Autodetection
      onChange={onChangeAutoDetectToken}
      value={autoDetectNft}
      title={'SUMMARY.AUTODETECTION_NFT'}
      text={'SUMMARY.AUTODETECTION_NFT.SUBTITLE'}
    />
  );
};

const AutoLockSetting = () => {
  const dispatch = useAppDispatch();
  const autoLock = useAppSelector(autoLockSelector);
  const [autoLockTimerInput, setAutoLockTimerInput] = useState(String(millisecondsToMinutes(autoLock.timer)));

  const debouncedSave = useDebouncedCallback((inputValue: string) => {
    const timer = minutesToMilliseconds(Number(inputValue || 0));

    dispatch(
      setAutoLockData({
        timer,
        expiresIn: timer ? Date.now() + timer : 0,
      })
    );
  });

  const onChangeAutoLockTimer = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setAutoLockTimerInput(newValue);
    debouncedSave(newValue);
  };

  return (
    <Stack gap={{ xs: '1rem', md: '1.5rem' }} maxWidth={{ md: '29.4375rem' }}>
      <Stack flexDirection={'row'}>
        <Typography variant={'subtitle1'}>
          <FormattedMessage id={'SUMMARY.AUTO_LOCK'} />
        </Typography>
      </Stack>
      <Typography color={'neutrals.secondaryText'}>
        <FormattedMessage id={'SUMMARY.AUTO_LOCK.TITLE'} />
      </Typography>
      <Stack flexDirection={{ xs: 'column', md: 'row' }} gap={'1rem'}>
        <Box flexGrow={1}>
          <NumberInput
            onChange={onChangeAutoLockTimer}
            value={autoLockTimerInput}
            placeholder={{ type: 'text', text: '0' }}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default SettingsWidget;
