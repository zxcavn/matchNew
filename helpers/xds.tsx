import { Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { generateRandomBytes, trimStringAndInsertDots } from '@xfi/helpers';
import { milliseconds } from 'date-fns';
import { FormattedMessage } from 'react-intl';

import type { CommitOptions, RegisterOptions } from '@/services/xds';
import { ROOT_XDS_DOMAIN } from '@/services/xds/constants';
import { EVM_CHAIN_ID, XDS_PUBLIC_RESOLVER_ADDRESS } from '@/shared/constants/variables';
import {
  INITIAL_REGISTRATION_QUEUE,
  REGISTRATION_INTERVAL,
  RENT_PRICE_TX_MULTIPLIER,
  SendNameStep,
  SetAsPrimaryNameStep,
} from '@/shared/constants/xds';
import type { RegistrationData, RegistrationStep } from '@/store/xds';

export const calculateUsdtPrice = (totalPrice: bigint, xfiUsdtRate: number) => {
  const usdtPrice =
    (totalPrice * MxNumberFormatter.parseUnits(String(xfiUsdtRate))) / MxNumberFormatter.parseUnits('1');

  return MxNumberFormatter.formatUnits(usdtPrice);
};

export const prepareRentPriceForRegisterTx = (rentPrice: bigint): bigint => {
  return (rentPrice * RENT_PRICE_TX_MULTIPLIER) / 100n;
};

export const getCurrentStep = (data: RegistrationData): RegistrationStep | undefined => {
  const { queue, stepIndex } = data;

  return queue[stepIndex];
};

export const mapDurationCountToSeconds = (count: number) => {
  return milliseconds({ [REGISTRATION_INTERVAL]: count }) / 1000;
};

export const generateRegistrationData = ({ name, address }: { name: string; address: string }): RegistrationData => ({
  payload: {
    name,
    owner: address,
    reverseRecord: true,
    duration: mapDurationCountToSeconds(1),
    secret: generateRandomBytes(32),
    resolver: XDS_PUBLIC_RESOLVER_ADDRESS,
  },
  stepIndex: 0,
  durationCount: 1,
  chainId: EVM_CHAIN_ID,
  queue: INITIAL_REGISTRATION_QUEUE,
  isCompleted: false,
  isStarted: false,
});

export const mapRegistrationDataToCommitOptions = ({ payload }: RegistrationData): CommitOptions => ({
  ...payload,
  duration: BigInt(payload.duration),
});

export const mapRegistrationDataToRegisterOptions = (data: RegistrationData, amount: bigint): RegisterOptions => ({
  ...mapRegistrationDataToCommitOptions(data),
  value: amount,
});

const isValidNameLabel = (label: string): boolean => {
  const AVAILABLE_LENGTH_REG_EXP = /^.{3,64}$/;
  const AVAILABLE_NAME_CHARACTERS_REG_EXP = /^[a-zA-Z0-9]+$/;

  return AVAILABLE_NAME_CHARACTERS_REG_EXP.test(label) && AVAILABLE_LENGTH_REG_EXP.test(label);
};

export const isValidXdsName = (name: string): boolean => {
  const chunks = name.split('.');
  const label = chunks.slice(0, chunks.length - 1).join('');

  return chunks.length > 1 && chunks.at(-1) === ROOT_XDS_DOMAIN && isValidNameLabel(label);
};

type NormalizeNameResult = {
  /**
   * @description label without domain
   * @example `name`
   */
  label: string;
  /**
   * @description full name with domain
   * @example `name.xfi`
   */
  name: string;
} | null;

export const normalizeName = (nameOrLabelParam: string): NormalizeNameResult => {
  const ROOT = `.${ROOT_XDS_DOMAIN}`;
  const nameOrLabel = nameOrLabelParam.toLowerCase();
  const label = nameOrLabel.endsWith(ROOT) ? nameOrLabel.slice(0, nameOrLabel.length - ROOT.length) : nameOrLabel;

  if (!isValidNameLabel(label)) {
    return null;
  }

  return {
    label,
    name: [label, ROOT].join(''),
  };
};

export const formatName = (name: string, { maxLength = 13 }: { maxLength?: number } = {}) => {
  const CHARS_AFTER_DOTS = 3;

  return name.length > maxLength
    ? trimStringAndInsertDots({
        value: name,
        charsBeforeDots: maxLength - CHARS_AFTER_DOTS,
        charsAfterDots: CHARS_AFTER_DOTS,
      })
    : name;
};

const checkRequiresUpdateXdsAddress = ({
  resolvedAddress,
  address,
}: {
  resolvedAddress: string;
  address: string;
}): boolean => {
  return resolvedAddress.toLowerCase() !== address.toLowerCase();
};

const checkRequiresSetPrimaryName = ({
  reverseRegistryName,
  name,
}: {
  reverseRegistryName: string | null;
  name: string;
}): boolean => {
  return !reverseRegistryName || (!!reverseRegistryName && reverseRegistryName.toLowerCase() !== name.toLowerCase());
};

export const getSendNameStepList = ({
  recipientAddress,
  xdsRecordAddress,
}: {
  recipientAddress: string;
  xdsRecordAddress: string;
}): SendNameStep[] => {
  if (!checkRequiresUpdateXdsAddress({ resolvedAddress: xdsRecordAddress, address: recipientAddress })) {
    return [
      SendNameStep.CHOOSE_RECIPIENT,
      SendNameStep.NOTICE,
      SendNameStep.TRANSFER_OWNERSHIP_TX,
      SendNameStep.COMPLETE,
    ];
  }

  return [
    SendNameStep.CHOOSE_RECIPIENT,
    SendNameStep.NOTICE,
    SendNameStep.UPDATE_ADDRESS_TX,
    SendNameStep.TRANSFER_OWNERSHIP_TX,
    SendNameStep.COMPLETE,
  ];
};

export const getSendNameChanges = ({
  recipientAddress,
  xdsRecordAddress,
}: {
  recipientAddress: string;
  xdsRecordAddress: string;
}) => {
  const getChanges = (message: string, address: string) => (
    <Typography sx={{ overflowWrap: 'break-word' }} variant="body1" color="neutrals.secondaryText">
      <FormattedMessage
        id={message}
        values={{
          address: trimStringAndInsertDots({
            value: address,
            charsAfterDots: 4,
            charsBeforeDots: 6,
          }),
          span: value => (
            <Typography component="span" variant="body1" color="background.light">
              {value}
            </Typography>
          ),
        }}
      />
    </Typography>
  );

  if (!checkRequiresUpdateXdsAddress({ resolvedAddress: xdsRecordAddress, address: recipientAddress })) {
    return [getChanges('XFD.UPDATE_OWNER_ROLE_TO_ADDRESS', recipientAddress)];
  }

  return [
    getChanges('XDS.UPDATE_XDS_RECORD_TO_ADDRESS', recipientAddress),
    getChanges('XFD.UPDATE_OWNER_ROLE_TO_ADDRESS', recipientAddress),
  ];
};

export const getSetAsPrimaryStepList = ({
  address,
  xdsRecordAddress,
  reverseRegistryName,
  name,
}: {
  address: string;
  xdsRecordAddress: string;
  reverseRegistryName: string | null;
  name: string;
}): SetAsPrimaryNameStep[] => {
  const stepList: SetAsPrimaryNameStep[] = [];

  if (checkRequiresUpdateXdsAddress({ address, resolvedAddress: xdsRecordAddress })) {
    stepList.push(SetAsPrimaryNameStep.MISMATCH_ADDRESS, SetAsPrimaryNameStep.UPDATE_ADDRESS_TX);
  }

  if (checkRequiresSetPrimaryName({ reverseRegistryName, name })) {
    stepList.push(SetAsPrimaryNameStep.SET_AS_PRIMARY_TX);
  }

  stepList.push(SetAsPrimaryNameStep.COMPLETE);

  return stepList;
};
