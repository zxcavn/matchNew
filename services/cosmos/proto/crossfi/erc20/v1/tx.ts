/* eslint-disable */
import { Params } from './genesis';
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Coin } from 'cosmjs-types/cosmos/base/v1beta1/coin';

export const protobufPackage = 'crossfi.erc20.v1';

/**
 * Copyright 2022 Evmos Foundation
 * This file is part of the Evmos Network packages.
 *
 * Evmos is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Evmos packages are distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with the Evmos packages. If not, see https://github.com/evmos/evmos/blob/main/LICENSE
 */

/** MsgConvertCoin defines a Msg to convert a native Cosmos coin to a ERC20 token */
export interface MsgConvertCoin {
  /**
   * coin is a Cosmos coin whose denomination is registered in a token pair. The
   * coin amount defines the amount of coins to convert.
   */
  coin?: Coin;
  /** receiver is the hex address to receive ERC20 token */
  receiver: string;
  /**
   * sender is the cosmos bech32 address from the owner of the given Cosmos
   * coins
   */
  sender: string;
}

/** MsgConvertCoinResponse returns no fields */
export interface MsgConvertCoinResponse {}

/**
 * MsgConvertERC20 defines a Msg to convert a ERC20 token to a native Cosmos
 * coin.
 */
export interface MsgConvertERC20 {
  /**
   * contract_address of an ERC20 token contract, that is registered in a token
   * pair
   */
  contractAddress: string;
  /** amount of ERC20 tokens to convert */
  amount: string;
  /** receiver is the bech32 address to receive native Cosmos coins */
  receiver: string;
  /** sender is the hex address from the owner of the given ERC20 tokens */
  sender: string;
}

/** MsgConvertERC20Response returns no fields */
export interface MsgConvertERC20Response {}

/**
 * MsgUpdateParams is the Msg/UpdateParams request type for Erc20 parameters.
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParams {
  /** authority is the address of the governance account. */
  authority: string;
  /**
   * params defines the x/evm parameters to update.
   * NOTE: All parameters must be supplied.
   */
  params?: Params;
}

/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponse {}

function createBaseMsgConvertCoin(): MsgConvertCoin {
  return { coin: undefined, receiver: '', sender: '' };
}

export const MsgConvertCoin = {
  encode(message: MsgConvertCoin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.coin !== undefined) {
      Coin.encode(message.coin, writer.uint32(10).fork()).ldelim();
    }
    if (message.receiver !== '') {
      writer.uint32(18).string(message.receiver);
    }
    if (message.sender !== '') {
      writer.uint32(26).string(message.sender);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConvertCoin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConvertCoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.coin = Coin.decode(reader, reader.uint32());
          break;
        case 2:
          message.receiver = reader.string();
          break;
        case 3:
          message.sender = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgConvertCoin {
    return {
      coin: isSet(object.coin) ? Coin.fromJSON(object.coin) : undefined,
      receiver: isSet(object.receiver) ? String(object.receiver) : '',
      sender: isSet(object.sender) ? String(object.sender) : '',
    };
  },

  toJSON(message: MsgConvertCoin): unknown {
    const obj: any = {};
    message.coin !== undefined && (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
    message.receiver !== undefined && (obj.receiver = message.receiver);
    message.sender !== undefined && (obj.sender = message.sender);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgConvertCoin>, I>>(object: I): MsgConvertCoin {
    const message = createBaseMsgConvertCoin();
    message.coin = object.coin !== undefined && object.coin !== null ? Coin.fromPartial(object.coin) : undefined;
    message.receiver = object.receiver ?? '';
    message.sender = object.sender ?? '';
    return message;
  },
};

function createBaseMsgConvertCoinResponse(): MsgConvertCoinResponse {
  return {};
}

export const MsgConvertCoinResponse = {
  encode(_: MsgConvertCoinResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConvertCoinResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConvertCoinResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgConvertCoinResponse {
    return {};
  },

  toJSON(_: MsgConvertCoinResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgConvertCoinResponse>, I>>(_: I): MsgConvertCoinResponse {
    const message = createBaseMsgConvertCoinResponse();
    return message;
  },
};

function createBaseMsgConvertERC20(): MsgConvertERC20 {
  return { contractAddress: '', amount: '', receiver: '', sender: '' };
}

export const MsgConvertERC20 = {
  encode(message: MsgConvertERC20, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.contractAddress !== '') {
      writer.uint32(10).string(message.contractAddress);
    }
    if (message.amount !== '') {
      writer.uint32(18).string(message.amount);
    }
    if (message.receiver !== '') {
      writer.uint32(26).string(message.receiver);
    }
    if (message.sender !== '') {
      writer.uint32(34).string(message.sender);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConvertERC20 {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConvertERC20();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddress = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        case 3:
          message.receiver = reader.string();
          break;
        case 4:
          message.sender = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgConvertERC20 {
    return {
      contractAddress: isSet(object.contractAddress) ? String(object.contractAddress) : '',
      amount: isSet(object.amount) ? String(object.amount) : '',
      receiver: isSet(object.receiver) ? String(object.receiver) : '',
      sender: isSet(object.sender) ? String(object.sender) : '',
    };
  },

  toJSON(message: MsgConvertERC20): unknown {
    const obj: any = {};
    message.contractAddress !== undefined && (obj.contractAddress = message.contractAddress);
    message.amount !== undefined && (obj.amount = message.amount);
    message.receiver !== undefined && (obj.receiver = message.receiver);
    message.sender !== undefined && (obj.sender = message.sender);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgConvertERC20>, I>>(object: I): MsgConvertERC20 {
    const message = createBaseMsgConvertERC20();
    message.contractAddress = object.contractAddress ?? '';
    message.amount = object.amount ?? '';
    message.receiver = object.receiver ?? '';
    message.sender = object.sender ?? '';
    return message;
  },
};

function createBaseMsgConvertERC20Response(): MsgConvertERC20Response {
  return {};
}

export const MsgConvertERC20Response = {
  encode(_: MsgConvertERC20Response, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConvertERC20Response {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConvertERC20Response();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgConvertERC20Response {
    return {};
  },

  toJSON(_: MsgConvertERC20Response): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgConvertERC20Response>, I>>(_: I): MsgConvertERC20Response {
    const message = createBaseMsgConvertERC20Response();
    return message;
  },
};

function createBaseMsgUpdateParams(): MsgUpdateParams {
  return { authority: '', params: undefined };
}

export const MsgUpdateParams = {
  encode(message: MsgUpdateParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== '') {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateParams {
    return {
      authority: isSet(object.authority) ? String(object.authority) : '',
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(object: I): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? '';
    message.params =
      object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
};

function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}

export const MsgUpdateParamsResponse = {
  encode(_: MsgUpdateParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateParamsResponse {
    return {};
  },

  toJSON(_: MsgUpdateParamsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(_: I): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
};

/** Msg defines the erc20 Msg service. */
export interface Msg {
  /**
   * ConvertCoin mints a ERC20 representation of the native Cosmos coin denom
   * that is registered on the token mapping.
   */
  ConvertCoin(request: MsgConvertCoin): Promise<MsgConvertCoinResponse>;
  /**
   * ConvertERC20 mints a native Cosmos coin representation of the ERC20 token
   * contract that is registered on the token mapping.
   */
  ConvertERC20(request: MsgConvertERC20): Promise<MsgConvertERC20Response>;
  /**
   * UpdateParams defined a governance operation for updating the x/erc20 module
   * parameters. The authority is hard-coded to the Cosmos SDK x/gov module
   * account
   */
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ConvertCoin = this.ConvertCoin.bind(this);
    this.ConvertERC20 = this.ConvertERC20.bind(this);
    this.UpdateParams = this.UpdateParams.bind(this);
  }
  ConvertCoin(request: MsgConvertCoin): Promise<MsgConvertCoinResponse> {
    const data = MsgConvertCoin.encode(request).finish();
    const promise = this.rpc.request('crossfi.erc20.v1.Msg', 'ConvertCoin', data);
    return promise.then(data => MsgConvertCoinResponse.decode(new _m0.Reader(data)));
  }

  ConvertERC20(request: MsgConvertERC20): Promise<MsgConvertERC20Response> {
    const data = MsgConvertERC20.encode(request).finish();
    const promise = this.rpc.request('crossfi.erc20.v1.Msg', 'ConvertERC20', data);
    return promise.then(data => MsgConvertERC20Response.decode(new _m0.Reader(data)));
  }

  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request('crossfi.erc20.v1.Msg', 'UpdateParams', data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
