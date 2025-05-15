export const smartContractAddress =
  "0xF34BDADa33Fc40A2f09Ea5D406c2B3e205830E44";
export const NFTContractAddress = "0xAF5896ae9FB980e79917fE6f6324A81904193d7e";
export const smartContractAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContractAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AlreadyVoted",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidCandidate",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidElection",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "enum ElectionVote.Role",
        name: "role",
        type: "uint8",
      },
    ],
    name: "InvalidRole",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidVotingPeriod",
    type: "error",
  },
  {
    inputs: [],
    name: "NameCannotBeEmpty",
    type: "error",
  },
  {
    inputs: [],
    name: "NoNFTOwnership",
    type: "error",
  },
  {
    inputs: [],
    name: "NotEligibleToVote",
    type: "error",
  },
  {
    inputs: [],
    name: "Unauthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "VotingIsActive",
    type: "error",
  },
  {
    inputs: [],
    name: "VotingNotActive",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "candidateId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "image",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "vision",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "mission",
        type: "string",
      },
    ],
    name: "CandidateAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "enum ElectionVote.ElectionType",
        name: "electionType",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "string",
        name: "faculty",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "program",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "departement",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "dpm",
        type: "string",
      },
    ],
    name: "ElectionCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
    ],
    name: "GlobalVotingStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum ElectionVote.Role",
        name: "role",
        type: "uint8",
      },
    ],
    name: "RoleAssigned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "candidateId",
        type: "uint256",
      },
    ],
    name: "VoteSubmitted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "image",
        type: "string",
      },
      {
        internalType: "string",
        name: "vision",
        type: "string",
      },
      {
        internalType: "string",
        name: "mission",
        type: "string",
      },
    ],
    name: "addCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "enum ElectionVote.Role",
        name: "role",
        type: "uint8",
      },
    ],
    name: "assignRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "enum ElectionVote.ElectionType",
        name: "electionType",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "faculty",
        type: "string",
      },
      {
        internalType: "string",
        name: "program",
        type: "string",
      },
      {
        internalType: "string",
        name: "departement",
        type: "string",
      },
      {
        internalType: "string",
        name: "dpm",
        type: "string",
      },
    ],
    name: "createElection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "electionCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "elections",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "enum ElectionVote.ElectionType",
        name: "electionType",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "faculty",
        type: "string",
      },
      {
        internalType: "string",
        name: "program",
        type: "string",
      },
      {
        internalType: "string",
        name: "departement",
        type: "string",
      },
      {
        internalType: "string",
        name: "dpm",
        type: "string",
      },
      {
        internalType: "string",
        name: "kpurmFaculty",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "candidateCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
    ],
    name: "getAllCandidates",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
          {
            internalType: "string",
            name: "vision",
            type: "string",
          },
          {
            internalType: "string",
            name: "mission",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "voteCount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
        ],
        internalType: "struct ElectionVote.Candidate[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllElections",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "enum ElectionVote.ElectionType",
            name: "electionType",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "faculty",
            type: "string",
          },
          {
            internalType: "string",
            name: "program",
            type: "string",
          },
          {
            internalType: "string",
            name: "departement",
            type: "string",
          },
          {
            internalType: "string",
            name: "dpm",
            type: "string",
          },
          {
            internalType: "string",
            name: "kpurmFaculty",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "candidateCount",
            type: "uint256",
          },
        ],
        internalType: "struct ElectionVote.ElectionView[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllUsersWithRoles",
    outputs: [
      {
        internalType: "address[]",
        name: "users",
        type: "address[]",
      },
      {
        internalType: "enum ElectionVote.Role[]",
        name: "roles",
        type: "uint8[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getElectionsByRole",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "enum ElectionVote.ElectionType",
            name: "electionType",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "faculty",
            type: "string",
          },
          {
            internalType: "string",
            name: "program",
            type: "string",
          },
          {
            internalType: "string",
            name: "departement",
            type: "string",
          },
          {
            internalType: "string",
            name: "dpm",
            type: "string",
          },
          {
            internalType: "string",
            name: "kpurmFaculty",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "candidateCount",
            type: "uint256",
          },
        ],
        internalType: "struct ElectionVote.ElectionView[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getGlobalVotingPeriod",
    outputs: [
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNFTHolders",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "holder",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "tokenIds",
            type: "uint256[]",
          },
        ],
        internalType: "struct ElectionVote.WhitelistInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getRole",
    outputs: [
      {
        internalType: "enum ElectionVote.Role",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "globalVotingPeriod",
    outputs: [
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "enum ElectionVote.ElectionType",
        name: "",
        type: "uint8",
      },
    ],
    name: "hashVoted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isVotingActive",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nftContractAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "startGlobalVoting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userRoles",
    outputs: [
      {
        internalType: "enum ElectionVote.Role",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "electionId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "candidateId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
export const NFTContractAbi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AlreadyMinted",
    type: "error",
  },
  {
    inputs: [],
    name: "NFTNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferBlocked",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "getNFTData",
    outputs: [
      {
        internalType: "string",
        name: "faculty",
        type: "string",
      },
      {
        internalType: "string",
        name: "program",
        type: "string",
      },
      {
        internalType: "string",
        name: "departement",
        type: "string",
      },
      {
        internalType: "string",
        name: "dpm",
        type: "string",
      },
      {
        internalType: "string",
        name: "image",
        type: "string",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
      {
        internalType: "string",
        name: "faculty",
        type: "string",
      },
      {
        internalType: "string",
        name: "program",
        type: "string",
      },
      {
        internalType: "string",
        name: "image",
        type: "string",
      },
      {
        internalType: "string",
        name: "departement",
        type: "string",
      },
      {
        internalType: "string",
        name: "dpm",
        type: "string",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalMinted",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
