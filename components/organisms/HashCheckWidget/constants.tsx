import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { FormattedMessage } from 'react-intl';

import { Icon } from '@/lib/xfi.lib/components/atoms';
import { StyledLink } from '@/lib/xfi.lib/components/atoms/Link/styles';
import { SelectedTransactionsIcon } from '@/lib/xfi.lib/icons';
import { BlueArrowIcon, BlueStarIcon, MpxRoundIcon, XfiRoundIcon } from '@/public/icons';
import {
  DOCS_CROSSFI_STEP_1,
  DOCS_CROSSFI_STEP_2,
  DOCS_CROSSFI_STEP_3,
  DOCS_CROSSFI_STEP_4,
  DOCS_CROSSFI_STEP_6,
  DOCS_CROSSFI_STEP_7,
  DOCS_CROSSFI_STEP_8,
  DOCS_CROSSFI_STEP_9,
} from '@/shared/constants';

type Props = {
  checkBuyXfiClick: () => void;
  checkSwapMpxClick: () => void;
};

export const STEPS_CONFIG = ({ checkBuyXfiClick, checkSwapMpxClick }: Props) => [
  {
    description: (
      <Typography>
        <FormattedMessage
          id="STEPS.GET_XFI_COINS"
          values={{
            link: (
              <a href={DOCS_CROSSFI_STEP_1} target="_blank">
                <StyledLink component={'span'}>
                  <FormattedMessage id={'STEPS.GET_XFI'} />
                </StyledLink>
              </a>
            ),
          }}
        />
      </Typography>
    ),
    images: (
      <>
        <Image
          src={'/images/xfiCoin.webp'}
          width={103}
          height={103}
          style={{ position: 'absolute', left: '13rem', bottom: '1rem', transform: 'rotate(11.23deg)' }}
          alt="coin"
        />
        <Image
          src={'/images/xfiCoin.webp'}
          width={61.9}
          height={61.9}
          style={{ position: 'absolute', left: '11.5rem', bottom: '1rem', transform: 'rotate(-20.67deg)' }}
          alt="coin"
        />
      </>
    ),
  },
  {
    description: (
      <Typography>
        <FormattedMessage
          id="STEPS.ACCESS_MAIN_CONSOLE"
          values={{
            link: (
              <a href={DOCS_CROSSFI_STEP_2} target="_blank">
                <StyledLink component={'span'}>
                  <FormattedMessage id={'STEPS.MAIN_CONSOLE'} />
                </StyledLink>
              </a>
            ),
          }}
        />
      </Typography>
    ),
  },
  {
    description: (
      <Typography>
        <FormattedMessage
          id="STEPS.USE_OBTAINED_ADDRESS"
          values={{
            link: (
              <a href={DOCS_CROSSFI_STEP_3} target="_blank">
                <StyledLink component={'span'}>mx1.....</StyledLink>
              </a>
            ),
          }}
        />
      </Typography>
    ),
    images: (
      <>
        <Icon
          src={XfiRoundIcon}
          style={{
            position: 'absolute',
            left: '14.9rem',
            top: '0.4rem',
            width: '2.66375rem',
            height: '2.66375rem',
            transform: 'rotate(-12.6deg)',
          }}
          viewBox="0 0 33 33"
        />
        <Icon
          src={BlueArrowIcon}
          sx={{
            position: 'absolute',
            left: '17.125rem',
            top: '0.5rem',
            width: '4.6875rem',
            height: '3.75rem',
            zIndex: 1,
          }}
          viewBox="0 0 75 60"
        />
      </>
    ),
  },
  {
    description: (
      <Stack gap={'0.8125rem'}>
        <Typography>
          <FormattedMessage
            id="STEPS.CONVERT_XFI_TO_MPX"
            values={{
              link: (
                <a href={DOCS_CROSSFI_STEP_4} target="_blank">
                  <StyledLink component={'span'}>
                    <FormattedMessage id={'STEPS.CONVERT'} />
                  </StyledLink>
                </a>
              ),
            }}
          />
        </Typography>
        <StyledLink component={'span'} onClick={checkBuyXfiClick}>
          <FormattedMessage id="STEPS.NO_MPX_TO_PAY" />
        </StyledLink>
      </Stack>
    ),
    images: (
      <>
        <Icon
          src={XfiRoundIcon}
          sx={{
            position: 'absolute',
            left: '18.125rem',
            top: '4.375rem',
            fontSize: '2.3125rem',
            transform: 'rotate(-28.96deg)',
          }}
          viewBox="0 0 33 33"
        />
        <Icon
          src={MpxRoundIcon}
          sx={{
            position: 'absolute',
            left: '16rem',
            top: '0.7rem',
            fontSize: '1.9375rem',
          }}
          viewBox="0 0 33 33"
        />
        <Icon
          src={SelectedTransactionsIcon}
          sx={{
            position: 'absolute',
            left: '17.4rem',
            top: '2.6rem',
            fontSize: '1.5rem',
            transform: 'rotate(37.34deg)',
          }}
          viewBox="0 0 32 32"
        />
      </>
    ),
  },
  {
    description: (
      <Typography>
        <FormattedMessage
          id="STEPS.CONFIRM_CONVERT"
          values={{
            link: (
              <StyledLink component={'span'} onClick={checkSwapMpxClick}>
                <FormattedMessage id="SUMMARY.CONFIRM" />
              </StyledLink>
            ),
          }}
        />
      </Typography>
    ),
  },
  {
    description: (
      <Typography>
        <FormattedMessage
          id="STEPS.MPX_WILL_BE_CREDITED"
          values={{
            link: (
              <a href={DOCS_CROSSFI_STEP_6} target="_blank">
                <StyledLink component={'span'}>
                  <FormattedMessage id="STEPS.OLD_BALANCE" />
                </StyledLink>
              </a>
            ),
          }}
        />
      </Typography>
    ),
    images: (
      <>
        <Icon
          src={BlueStarIcon}
          viewBox="0 0 15 14"
          sx={{ position: 'absolute', left: '15.75rem', top: '-1.1456rem', width: '4.1606rem', height: '3.8856rem' }}
        />
        <Icon
          src={BlueStarIcon}
          viewBox="0 0 15 14"
          sx={{ position: 'absolute', left: '17.625rem', top: '4.1044rem', width: '1.6731rem', height: '1.5625rem' }}
        />
        <Icon
          src={BlueStarIcon}
          viewBox="0 0 15 14"
          sx={{ position: 'absolute', left: '17.5rem', top: '7.3544rem', width: '0.9369rem', height: '0.875rem' }}
        />
      </>
    ),
  },
  {
    description: (
      <Typography>
        <FormattedMessage
          id="STEPS.FAMILIARIZE_YOURSELF"
          values={{
            link: (
              <a href={DOCS_CROSSFI_STEP_7} target="_blank">
                <StyledLink component={'span'}>
                  <FormattedMessage id="STEPS.VALIDATORS" />
                </StyledLink>
              </a>
            ),
          }}
        />
      </Typography>
    ),
  },
  {
    description: (
      <Typography>
        <FormattedMessage
          id="STEPS.DELEGATE_MPX_COINS"
          values={{
            link: (
              <a href={DOCS_CROSSFI_STEP_8} target="_blank">
                <StyledLink component={'span'}>
                  <FormattedMessage id="STEPS.DELEGATE" />
                </StyledLink>
              </a>
            ),
          }}
        />
      </Typography>
    ),
    images: (
      <>
        <Image
          src={'/images/mpxCoin.webp'}
          width={86}
          height={86}
          style={{ position: 'absolute', right: '4.7rem', bottom: '0.2rem', transform: 'rotate(10.96deg)' }}
          alt="coin"
        />
        <Image
          src={'/images/mpxCoin.webp'}
          width={107}
          height={107}
          style={{
            position: 'absolute',
            right: '1.4rem',
            bottom: '0.2rem',
            transform: 'rotate(-17.9deg)',
          }}
          alt="coin"
        />
      </>
    ),
  },
  {
    description: (
      <Typography>
        <FormattedMessage
          id="STEPS.GET_XFI_REWARDS"
          values={{
            link: (
              <a href={DOCS_CROSSFI_STEP_9} target="_blank">
                <StyledLink component={'span'}>
                  <FormattedMessage id="STEPS.GET_XFI" />
                </StyledLink>
              </a>
            ),
          }}
        />
      </Typography>
    ),
  },
];
