export const ABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_rewardAddress",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "campaignId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "string",
				name: "name",
				type: "string"
			}
		],
		name: "CampaignCancelled",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "campaignId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "address",
				name: "contributor",
				type: "address"
			}
		],
		name: "ContributionReceived",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "campaignId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "string",
				name: "name",
				type: "string"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "target_amount",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "_days_deadline",
				type: "uint256"
			}
		],
		name: "NewCampaign",
		type: "event"
	},
	{
		inputs: [],
		name: "campaign_id",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "campaigns",
		outputs: [
			{
				internalType: "string",
				name: "name",
				type: "string"
			},
			{
				internalType: "uint256",
				name: "id_campaign",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "target_amount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "current_amount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "creationDate",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "creator",
				type: "address"
			},
			{
				internalType: "enum Campaigns.CampaignState",
				name: "state",
				type: "uint8"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "campaignsByContributor",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_campaignId",
				type: "uint256"
			}
		],
		name: "cancelCampaign",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_campaingId",
				type: "uint256"
			}
		],
		name: "closeCampaing",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_campaignId",
				type: "uint256"
			}
		],
		name: "contribute",
		outputs: [],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "contributorsByCampaignId",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_target_amount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "_days_deadline",
				type: "uint256"
			},
			{
				internalType: "string",
				name: "_name",
				type: "string"
			}
		],
		name: "createNewCampaign",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function"
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
						type: "string"
					},
					{
						internalType: "uint256",
						name: "id_campaign",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "target_amount",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "current_amount",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "creationDate",
						type: "uint256"
					},
					{
						internalType: "address",
						name: "creator",
						type: "address"
					},
					{
						internalType: "enum Campaigns.CampaignState",
						name: "state",
						type: "uint8"
					}
				],
				internalType: "struct Campaigns.Campaign[]",
				name: "",
				type: "tuple[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "contributor",
				type: "address"
			}
		],
		name: "getContributions",
		outputs: [
			{
				components: [
					{
						internalType: "string",
						name: "name",
						type: "string"
					},
					{
						internalType: "uint256",
						name: "id_campaign",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "target_amount",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "current_amount",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "creationDate",
						type: "uint256"
					},
					{
						internalType: "address",
						name: "creator",
						type: "address"
					},
					{
						internalType: "enum Campaigns.CampaignState",
						name: "state",
						type: "uint8"
					}
				],
				internalType: "struct Campaigns.Campaign[]",
				name: "",
				type: "tuple[]"
			},
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "contributor",
				type: "address"
			}
		],
		name: "getRewardsByContributor",
		outputs: [
			{
				internalType: "uint256[4]",
				name: "",
				type: "uint256[4]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "rewardContract",
		outputs: [
			{
				internalType: "contract Reward",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];
export const contractAddress = "0x9e861e375ED943aC01279E8A0670bf40713B2209";
