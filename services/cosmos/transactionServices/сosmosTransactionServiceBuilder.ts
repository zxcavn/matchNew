import { CosmosService, ICosmosTransactionService } from '@/services';
import { CosmosMessageType } from '@/shared/types';

import ConvertCoinCosmosService from './convertCoinCosmosService';
import DelegateCosmosService from './delegateCosmosService';
import DepositCosmosService from './depositCosmosService';
import MultisendCosmosService from './multisendCosmosService';
import RedelegateCosmosService from './redelegateCosmosService';
import RewardCosmosService from './rewardCosmosService';
import SubmitProposalCosmosService from './submitProposalCosmosService';
import TransferCosmosService from './transferCosmosService';
import UndelegateCosmosService from './undelegateCosmosService';
import VoteCosmosService from './voteCosmosService';

const services = {
  [CosmosMessageType.MULTISEND]: MultisendCosmosService,
  [CosmosMessageType.TRANSFER]: TransferCosmosService,
  [CosmosMessageType.CONVERT_COIN]: ConvertCoinCosmosService,
  [CosmosMessageType.DELEGATE]: DelegateCosmosService,
  [CosmosMessageType.UNDELEGATE]: UndelegateCosmosService,
  [CosmosMessageType.REWARD]: RewardCosmosService,
  [CosmosMessageType.REDELEGATE]: RedelegateCosmosService,
  [CosmosMessageType.SUBMIT_PROPOSAL]: SubmitProposalCosmosService,
  [CosmosMessageType.DEPOSIT]: DepositCosmosService,
  [CosmosMessageType.VOTE]: VoteCosmosService,
};

class CosmosTransactionServiceBuilder {
  static build(type: CosmosMessageType): ICosmosTransactionService {
    const Service = services[type];

    if (!Service) {
      throw new Error(`Service is not implemented for ${type} type`);
    }

    return new Service(CosmosService.getInstance());
  }
}

export default CosmosTransactionServiceBuilder;
