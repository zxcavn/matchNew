export const ABI = [
  {
    type: 'constructor',
    stateMutability: 'nonpayable',
    inputs: [
      { type: 'address', name: '_ens', internalType: 'contract ENS' },
      { type: 'address', name: '_registrar', internalType: 'contract IBaseRegistrar' },
      { type: 'address', name: '_metadataService', internalType: 'contract IMetadataService' },
    ],
  },
  { type: 'error', name: 'CannotUpgrade', inputs: [] },
  { type: 'error', name: 'IncompatibleParent', inputs: [] },
  {
    type: 'error',
    name: 'IncorrectTargetOwner',
    inputs: [{ type: 'address', name: 'owner', internalType: 'address' }],
  },
  { type: 'error', name: 'IncorrectTokenType', inputs: [] },
  {
    type: 'error',
    name: 'LabelMismatch',
    inputs: [
      { type: 'bytes32', name: 'labelHash', internalType: 'bytes32' },
      { type: 'bytes32', name: 'expectedLabelhash', internalType: 'bytes32' },
    ],
  },
  { type: 'error', name: 'LabelTooLong', inputs: [{ type: 'string', name: 'label', internalType: 'string' }] },
  { type: 'error', name: 'LabelTooShort', inputs: [] },
  { type: 'error', name: 'NameIsNotWrapped', inputs: [] },
  { type: 'error', name: 'OperationProhibited', inputs: [{ type: 'bytes32', name: 'node', internalType: 'bytes32' }] },
  {
    type: 'error',
    name: 'Unauthorised',
    inputs: [
      { type: 'bytes32', name: 'node', internalType: 'bytes32' },
      { type: 'address', name: 'addr', internalType: 'address' },
    ],
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      { type: 'address', name: 'owner', internalType: 'address', indexed: true },
      { type: 'address', name: 'approved', internalType: 'address', indexed: true },
      { type: 'uint256', name: 'tokenId', internalType: 'uint256', indexed: true },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ApprovalForAll',
    inputs: [
      { type: 'address', name: 'account', internalType: 'address', indexed: true },
      { type: 'address', name: 'operator', internalType: 'address', indexed: true },
      { type: 'bool', name: 'approved', internalType: 'bool', indexed: false },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ControllerChanged',
    inputs: [
      { type: 'address', name: 'controller', internalType: 'address', indexed: true },
      { type: 'bool', name: 'active', internalType: 'bool', indexed: false },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ExpiryExtended',
    inputs: [
      { type: 'bytes32', name: 'node', internalType: 'bytes32', indexed: true },
      { type: 'uint64', name: 'expiry', internalType: 'uint64', indexed: false },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'FusesSet',
    inputs: [
      { type: 'bytes32', name: 'node', internalType: 'bytes32', indexed: true },
      { type: 'uint32', name: 'fuses', internalType: 'uint32', indexed: false },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'NameUnwrapped',
    inputs: [
      { type: 'bytes32', name: 'node', internalType: 'bytes32', indexed: true },
      { type: 'address', name: 'owner', internalType: 'address', indexed: false },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'NameWrapped',
    inputs: [
      { type: 'bytes32', name: 'node', internalType: 'bytes32', indexed: true },
      { type: 'bytes', name: 'name', internalType: 'bytes', indexed: false },
      { type: 'address', name: 'owner', internalType: 'address', indexed: false },
      { type: 'uint32', name: 'fuses', internalType: 'uint32', indexed: false },
      { type: 'uint64', name: 'expiry', internalType: 'uint64', indexed: false },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      { type: 'address', name: 'previousOwner', internalType: 'address', indexed: true },
      { type: 'address', name: 'newOwner', internalType: 'address', indexed: true },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TransferBatch',
    inputs: [
      { type: 'address', name: 'operator', internalType: 'address', indexed: true },
      { type: 'address', name: 'from', internalType: 'address', indexed: true },
      { type: 'address', name: 'to', internalType: 'address', indexed: true },
      { type: 'uint256[]', name: 'ids', internalType: 'uint256[]', indexed: false },
      { type: 'uint256[]', name: 'values', internalType: 'uint256[]', indexed: false },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TransferSingle',
    inputs: [
      { type: 'address', name: 'operator', internalType: 'address', indexed: true },
      { type: 'address', name: 'from', internalType: 'address', indexed: true },
      { type: 'address', name: 'to', internalType: 'address', indexed: true },
      { type: 'uint256', name: 'id', internalType: 'uint256', indexed: false },
      { type: 'uint256', name: 'value', internalType: 'uint256', indexed: false },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'URI',
    inputs: [
      { type: 'string', name: 'value', internalType: 'string', indexed: false },
      { type: 'uint256', name: 'id', internalType: 'uint256', indexed: true },
    ],
    anonymous: false,
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: '_tokens',
    inputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'allFusesBurned',
    inputs: [
      { type: 'bytes32', name: 'node', internalType: 'bytes32' },
      { type: 'uint32', name: 'fuseMask', internalType: 'uint32' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'approve',
    inputs: [
      { type: 'address', name: 'to', internalType: 'address' },
      { type: 'uint256', name: 'tokenId', internalType: 'uint256' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'balanceOf',
    inputs: [
      { type: 'address', name: 'account', internalType: 'address' },
      { type: 'uint256', name: 'id', internalType: 'uint256' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256[]', name: '', internalType: 'uint256[]' }],
    name: 'balanceOfBatch',
    inputs: [
      { type: 'address[]', name: 'accounts', internalType: 'address[]' },
      { type: 'uint256[]', name: 'ids', internalType: 'uint256[]' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'canExtendSubnames',
    inputs: [
      { type: 'bytes32', name: 'node', internalType: 'bytes32' },
      { type: 'address', name: 'addr', internalType: 'address' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'canModifyName',
    inputs: [
      { type: 'bytes32', name: 'node', internalType: 'bytes32' },
      { type: 'address', name: 'addr', internalType: 'address' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'controllers',
    inputs: [{ type: 'address', name: '', internalType: 'address' }],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'address', name: '', internalType: 'contract ENS' }],
    name: 'ens',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [{ type: 'uint64', name: '', internalType: 'uint64' }],
    name: 'extendExpiry',
    inputs: [
      { type: 'bytes32', name: 'parentNode', internalType: 'bytes32' },
      { type: 'bytes32', name: 'labelhash', internalType: 'bytes32' },
      { type: 'uint64', name: 'expiry', internalType: 'uint64' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'address', name: 'operator', internalType: 'address' }],
    name: 'getApproved',
    inputs: [{ type: 'uint256', name: 'id', internalType: 'uint256' }],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      { type: 'address', name: 'owner', internalType: 'address' },
      { type: 'uint32', name: 'fuses', internalType: 'uint32' },
      { type: 'uint64', name: 'expiry', internalType: 'uint64' },
    ],
    name: 'getData',
    inputs: [{ type: 'uint256', name: 'id', internalType: 'uint256' }],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'isApprovedForAll',
    inputs: [
      { type: 'address', name: 'account', internalType: 'address' },
      { type: 'address', name: 'operator', internalType: 'address' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'isWrapped',
    inputs: [
      { type: 'bytes32', name: 'parentNode', internalType: 'bytes32' },
      { type: 'bytes32', name: 'labelhash', internalType: 'bytes32' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'isWrapped',
    inputs: [{ type: 'bytes32', name: 'node', internalType: 'bytes32' }],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'address', name: '', internalType: 'contract IMetadataService' }],
    name: 'metadataService',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'string', name: '', internalType: 'string' }],
    name: 'name',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bytes', name: '', internalType: 'bytes' }],
    name: 'names',
    inputs: [{ type: 'bytes32', name: '', internalType: 'bytes32' }],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [{ type: 'bytes4', name: '', internalType: 'bytes4' }],
    name: 'onERC721Received',
    inputs: [
      { type: 'address', name: 'to', internalType: 'address' },
      { type: 'address', name: '', internalType: 'address' },
      { type: 'uint256', name: 'tokenId', internalType: 'uint256' },
      { type: 'bytes', name: 'data', internalType: 'bytes' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'address', name: '', internalType: 'address' }],
    name: 'owner',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'address', name: 'owner', internalType: 'address' }],
    name: 'ownerOf',
    inputs: [{ type: 'uint256', name: 'id', internalType: 'uint256' }],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'recoverFunds',
    inputs: [
      { type: 'address', name: '_token', internalType: 'address' },
      { type: 'address', name: '_to', internalType: 'address' },
      { type: 'uint256', name: '_amount', internalType: 'uint256' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [{ type: 'uint256', name: 'registrarExpiry', internalType: 'uint256' }],
    name: 'registerAndWrapETH2LD',
    inputs: [
      { type: 'string', name: 'label', internalType: 'string' },
      { type: 'address', name: 'wrappedOwner', internalType: 'address' },
      { type: 'uint256', name: 'duration', internalType: 'uint256' },
      { type: 'address', name: 'resolver', internalType: 'address' },
      { type: 'uint16', name: 'ownerControlledFuses', internalType: 'uint16' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'address', name: '', internalType: 'contract IBaseRegistrar' }],
    name: 'registrar',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [{ type: 'uint256', name: 'expires', internalType: 'uint256' }],
    name: 'renew',
    inputs: [
      { type: 'uint256', name: 'tokenId', internalType: 'uint256' },
      { type: 'uint256', name: 'duration', internalType: 'uint256' },
    ],
  },
  { type: 'function', stateMutability: 'nonpayable', outputs: [], name: 'renounceOwnership', inputs: [] },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'safeBatchTransferFrom',
    inputs: [
      { type: 'address', name: 'from', internalType: 'address' },
      { type: 'address', name: 'to', internalType: 'address' },
      { type: 'uint256[]', name: 'ids', internalType: 'uint256[]' },
      { type: 'uint256[]', name: 'amounts', internalType: 'uint256[]' },
      { type: 'bytes', name: 'data', internalType: 'bytes' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'safeTransferFrom',
    inputs: [
      { type: 'address', name: 'from', internalType: 'address' },
      { type: 'address', name: 'to', internalType: 'address' },
      { type: 'uint256', name: 'id', internalType: 'uint256' },
      { type: 'uint256', name: 'amount', internalType: 'uint256' },
      { type: 'bytes', name: 'data', internalType: 'bytes' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'setApprovalForAll',
    inputs: [
      { type: 'address', name: 'operator', internalType: 'address' },
      { type: 'bool', name: 'approved', internalType: 'bool' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'setChildFuses',
    inputs: [
      { type: 'bytes32', name: 'parentNode', internalType: 'bytes32' },
      { type: 'bytes32', name: 'labelhash', internalType: 'bytes32' },
      { type: 'uint32', name: 'fuses', internalType: 'uint32' },
      { type: 'uint64', name: 'expiry', internalType: 'uint64' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'setController',
    inputs: [
      { type: 'address', name: 'controller', internalType: 'address' },
      { type: 'bool', name: 'active', internalType: 'bool' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [{ type: 'uint32', name: '', internalType: 'uint32' }],
    name: 'setFuses',
    inputs: [
      { type: 'bytes32', name: 'node', internalType: 'bytes32' },
      { type: 'uint16', name: 'ownerControlledFuses', internalType: 'uint16' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'setMetadataService',
    inputs: [{ type: 'address', name: '_metadataService', internalType: 'contract IMetadataService' }],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'setRecord',
    inputs: [
      { type: 'bytes32', name: 'node', internalType: 'bytes32' },
      { type: 'address', name: 'owner', internalType: 'address' },
      { type: 'address', name: 'resolver', internalType: 'address' },
      { type: 'uint64', name: 'ttl', internalType: 'uint64' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'setResolver',
    inputs: [
      { type: 'bytes32', name: 'node', internalType: 'bytes32' },
      { type: 'address', name: 'resolver', internalType: 'address' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [{ type: 'bytes32', name: 'node', internalType: 'bytes32' }],
    name: 'setSubnodeOwner',
    inputs: [
      { type: 'bytes32', name: 'parentNode', internalType: 'bytes32' },
      { type: 'string', name: 'label', internalType: 'string' },
      { type: 'address', name: 'owner', internalType: 'address' },
      { type: 'uint32', name: 'fuses', internalType: 'uint32' },
      { type: 'uint64', name: 'expiry', internalType: 'uint64' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [{ type: 'bytes32', name: 'node', internalType: 'bytes32' }],
    name: 'setSubnodeRecord',
    inputs: [
      { type: 'bytes32', name: 'parentNode', internalType: 'bytes32' },
      { type: 'string', name: 'label', internalType: 'string' },
      { type: 'address', name: 'owner', internalType: 'address' },
      { type: 'address', name: 'resolver', internalType: 'address' },
      { type: 'uint64', name: 'ttl', internalType: 'uint64' },
      { type: 'uint32', name: 'fuses', internalType: 'uint32' },
      { type: 'uint64', name: 'expiry', internalType: 'uint64' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'setTTL',
    inputs: [
      { type: 'bytes32', name: 'node', internalType: 'bytes32' },
      { type: 'uint64', name: 'ttl', internalType: 'uint64' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'setUpgradeContract',
    inputs: [{ type: 'address', name: '_upgradeAddress', internalType: 'contract INameWrapperUpgrade' }],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'supportsInterface',
    inputs: [{ type: 'bytes4', name: 'interfaceId', internalType: 'bytes4' }],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'transferOwnership',
    inputs: [{ type: 'address', name: 'newOwner', internalType: 'address' }],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'unwrap',
    inputs: [
      { type: 'bytes32', name: 'parentNode', internalType: 'bytes32' },
      { type: 'bytes32', name: 'labelhash', internalType: 'bytes32' },
      { type: 'address', name: 'controller', internalType: 'address' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'unwrapETH2LD',
    inputs: [
      { type: 'bytes32', name: 'labelhash', internalType: 'bytes32' },
      { type: 'address', name: 'registrant', internalType: 'address' },
      { type: 'address', name: 'controller', internalType: 'address' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'upgrade',
    inputs: [
      { type: 'bytes', name: 'name', internalType: 'bytes' },
      { type: 'bytes', name: 'extraData', internalType: 'bytes' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'address', name: '', internalType: 'contract INameWrapperUpgrade' }],
    name: 'upgradeContract',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'string', name: '', internalType: 'string' }],
    name: 'uri',
    inputs: [{ type: 'uint256', name: 'tokenId', internalType: 'uint256' }],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'wrap',
    inputs: [
      { type: 'bytes', name: 'name', internalType: 'bytes' },
      { type: 'address', name: 'wrappedOwner', internalType: 'address' },
      { type: 'address', name: 'resolver', internalType: 'address' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [{ type: 'uint64', name: 'expiry', internalType: 'uint64' }],
    name: 'wrapETH2LD',
    inputs: [
      { type: 'string', name: 'label', internalType: 'string' },
      { type: 'address', name: 'wrappedOwner', internalType: 'address' },
      { type: 'uint16', name: 'ownerControlledFuses', internalType: 'uint16' },
      { type: 'address', name: 'resolver', internalType: 'address' },
    ],
  },
];