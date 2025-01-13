import type { AccountData } from '@cosmjs/proto-signing';
import type { StdFee } from '@cosmjs/stargate';
import { MxNumberFormatter } from '@xfi/formatters';
import { CommunityPoolSpendProposal } from 'cosmjs-types/cosmos/distribution/v1beta1/distribution';
import { TextProposal } from 'cosmjs-types/cosmos/gov/v1beta1/gov';
import type { MsgSubmitProposal } from 'cosmjs-types/cosmos/gov/v1beta1/tx';
import { SoftwareUpgradeProposal } from 'cosmjs-types/cosmos/upgrade/v1beta1/upgrade';

import {
  type ICosmosTransactionService,
  CosmosService,
  InsufficientBalanceError,
  InvalidAddressError,
  isAccountAddress,
  NotEnoughCoinsForCommissionError,
  performAsync,
} from '@/services';
import {
  type CosmosMessage,
  type SubmitProposalOptions,
  type TransactionResponse,
  CosmosCurrency,
  CosmosMessageType,
  ProposalMessageType,
} from '@/shared/types';

class SubmitProposalCosmosService implements ICosmosTransactionService<SubmitProposalOptions> {
  constructor(private readonly baseService: CosmosService) {}

  private getTxOptions({ address, content, initialDeposit }: SubmitProposalOptions & { address: string }) {
    let proposalContent;

    switch (content.type) {
      case ProposalMessageType.TEXT:
        proposalContent = {
          typeUrl: content.type,
          value: TextProposal.encode({
            title: content.title,
            description: content.description,
          }).finish(),
        };
        break;

      case ProposalMessageType.COMMUNITY_POOL_SPEND:
        proposalContent = {
          typeUrl: content.type,
          value: CommunityPoolSpendProposal.encode({
            title: content.title,
            description: content.description,
            recipient: content.recipient,
            amount: content.amount,
          }).finish(),
        };
        break;

      case ProposalMessageType.SOFTWARE_UPGRADE:
        proposalContent = {
          typeUrl: content.type,
          value: SoftwareUpgradeProposal.encode({
            title: content.title,
            description: content.description,
            plan: content.plan,
          }).finish(),
        };
        break;
    }

    const msgSubmitProposal: MsgSubmitProposal = {
      content: proposalContent,
      initialDeposit: [initialDeposit],
      proposer: address,
    };

    const message: CosmosMessage = {
      typeUrl: CosmosMessageType.SUBMIT_PROPOSAL,
      value: msgSubmitProposal,
    };

    return message;
  }

  async calculateFee({ gasCurrency, content, initialDeposit }: SubmitProposalOptions): Promise<StdFee> {
    return performAsync(async () => {
      const { newWallet } = await this.baseService.getAccounts();
      const message = this.getTxOptions({ address: newWallet.address, content, initialDeposit });

      this.validateMessageOrThrowError(message);

      const client = await this.baseService.getSigningStargateClient({ gasCurrency });

      await this.checkEnoughCoinsOrThrowError({ wallet: newWallet, initialDeposit });

      const fee = await this.baseService.calculateFeeBase({
        client,
        accountData: newWallet,
        message,
        gasCurrency,
      });

      await this.checkEnoughCoinsOrThrowError({ wallet: newWallet, initialDeposit, fee });

      return fee;
    });
  }

  async send(options: SubmitProposalOptions & { type: ProposalMessageType }): Promise<TransactionResponse> {
    return performAsync(async () => {
      const { content, initialDeposit, gasCurrency } = options;
      const { newWallet } = await this.baseService.getAccounts();
      const message = this.getTxOptions({ address: newWallet.address, content, initialDeposit });

      this.validateMessageOrThrowError(message);

      const stdFee = await this.calculateFee(options);

      await this.checkEnoughCoinsOrThrowError({ wallet: newWallet, initialDeposit, fee: stdFee });

      const client = await this.baseService.getSigningStargateClient({ gasCurrency });
      const txHash = await client.signAndBroadcastSync(newWallet.address, [message], stdFee);

      return { txHash };
    });
  }

  async checkEnoughCoinsOrThrowError({
    wallet,
    initialDeposit,
    fee,
  }: {
    wallet: AccountData;
    initialDeposit: {
      amount: string;
      denom: CosmosCurrency;
    };
    fee?: StdFee;
  }) {
    const { mpx: mpxBalance, xfi: xfiBalance } = await this.baseService.getBalanceByCoins(wallet.address);
    const isEnoughForDeposit =
      MxNumberFormatter.toBigInt(initialDeposit.amount) < MxNumberFormatter.toBigInt(mpxBalance.amount);

    if (!isEnoughForDeposit) throw new InsufficientBalanceError();

    if (!fee) return;

    const { denom: feeDenom, amount: feeAmount } = fee.amount[0];

    this.baseService.validateCurrency(feeDenom);

    switch (feeDenom) {
      case CosmosCurrency.XFI: {
        const isEnough =
          isEnoughForDeposit && MxNumberFormatter.toBigInt(feeAmount) <= MxNumberFormatter.toBigInt(xfiBalance.amount);

        if (!isEnough) throw new NotEnoughCoinsForCommissionError();

        break;
      }

      case CosmosCurrency.MPX: {
        const isEnough =
          isEnoughForDeposit &&
          MxNumberFormatter.toBigInt(initialDeposit.amount) + MxNumberFormatter.toBigInt(feeAmount) <=
            MxNumberFormatter.toBigInt(mpxBalance.amount);

        if (!isEnough) throw new NotEnoughCoinsForCommissionError();

        break;
      }
    }
  }

  private validateMessageOrThrowError({ value }: CosmosMessage & { typeUrl: CosmosMessageType.SUBMIT_PROPOSAL }) {
    const { proposer } = value;

    if (!isAccountAddress(proposer)) {
      throw new InvalidAddressError(proposer);
    }
  }
}

export default SubmitProposalCosmosService;
