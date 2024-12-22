import { GeneratedType } from '@cosmjs/proto-signing';
import type { defaultRegistryTypes } from '@cosmjs/stargate';
import { defaultRegistryTypes as defaultStargateTypes } from '@cosmjs/stargate/build/signingstargateclient';
import { Registry } from '@cosmjs/stargate/node_modules/@cosmjs/proto-signing';

import { CosmosMessageType } from '@/shared/types';

import { MsgConvertCoin } from './proto/crossfi/erc20/v1/tx';

const createDefaultRegistry = (): Registry => {
  const registry = new Registry(defaultStargateTypes as typeof defaultRegistryTypes);

  const types: Array<[CosmosMessageType, GeneratedType]> = [[CosmosMessageType.CONVERT_COIN, MsgConvertCoin]];

  types.forEach(([typeUrl, msgType]) => {
    registry.register(typeUrl, msgType);
  });

  return registry;
};

export default createDefaultRegistry();
