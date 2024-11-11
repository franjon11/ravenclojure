export const ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "campaignId",
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
        internalType: "uint256",
        name: "target_amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_days_deadline",
        type: "uint256",
      },
    ],
    name: "NewCampaign",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_target_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_days_deadline",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "setCampaign",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "campaigns",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "target_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "current_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "creationDate",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "enum Campaigns.CampaignState",
        name: "state",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCampaigns",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "target_amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "current_amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "creationDate",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "enum Campaigns.CampaignState",
            name: "state",
            type: "uint8",
          },
        ],
        internalType: "struct Campaigns.Campaign[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const contractAddress = "0x0b520D114E0995Da760E50bfDAEf3364E00108CD";
