// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./reward.sol";

contract Campaigns {
    Reward public rewardContract;
    enum CampaignState { Active, Succeful, Failed }

    struct Campaign {
        uint target_amount;
        uint current_amount;
        uint deadline;
        uint creationDate;
        address creator;
        CampaignState state;
    }
    
    uint public totalCampaigns;
    mapping(uint => Campaign) public campaigns;

    mapping(uint => address[]) public contributorsByCampaign;    
    mapping(address => mapping(uint => uint)) public campaignsByContributor;

    constructor(address _rewardAddress) {
        rewardContract = Reward(_rewardAddress);
    }
    
    function setCampaign(uint _target_amount, uint _days_deadline) public {
        require(_target_amount > 0, "Target amount must be greater than zero ");
        totalCampaigns++;
        campaigns[totalCampaigns] = Campaign({
            target_amount: _target_amount,
            current_amount: 0,
            deadline: _days_deadline,
            creationDate: block.timestamp,
            creator: msg.sender,
            state: CampaignState.Active
        });
    }

    function getCampaigns() public view returns ( Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](totalCampaigns);
        
        for (uint i = 0; i < totalCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }
        
        return allCampaigns;
    }

    function contribute(address _contributor, uint _campaignId, uint _amount) external { 
        Campaign memory campaign = campaigns[_campaignId];
        require(campaign.state == CampaignState.Active, "Can only contribute to active campaigns");

        // ...
        if(campaignsByContributor[_contributor][_campaignId] == 0) {
            contributorsByCampaign[_campaignId].push(_contributor);
        }
        campaignsByContributor[_contributor][_campaignId] += _amount;

        campaign.current_amount += _amount;
    }

    function cancelCampaign(uint _campaignId) external {
        Campaign memory campaign = campaigns[_campaignId];
        require(campaign.creator == msg.sender, "Only the creator of the campaign can cancel it");
        require(campaign.state == CampaignState.Active, "Only active campaigns can be cancelled");

        // ...

        delete campaigns[_campaignId];
        totalCampaigns--;
    }

    function closeCampaing(uint _campaingId) public {
        Campaign memory campaign = campaigns[_campaingId];
        //_giveReward(contributorAddress, donatedAmount, totalAmount);
        if(campaign.state == CampaignState.Succeful) {
            // Se realiza la transaccion al owner de la campaña

            uint totalAmount = campaign.target_amount;
            for(uint i = 0; i < contributorsByCampaign[_campaingId].length; i++) {
                address contributorAddress = contributorsByCampaign[_campaingId][i];
                uint donatedAmount = campaignsByContributor[contributorAddress][_campaingId];
                _giveReward(contributorAddress, donatedAmount, totalAmount);
            }
            
        } else {
            // Se devuelve el dinero a los contribuyentes
        }
    }

    function _giveReward(address contributorAddress, uint donatedAmount, uint totalAmount) internal {
        uint percentage = (donatedAmount * 100) / totalAmount;
        uint8 tier;
        if(percentage > 0 && percentage <= 25) {
            tier = 0;   // BRONZE
        } else if (percentage > 25 && percentage <= 50) {
            tier = 1;   // SILVER
        } else if (percentage > 50 && percentage <= 75) {
            tier = 2;   // GOLD
        } else if (percentage > 75 && percentage <= 100) {
            tier = 3;   // DIAMOND
        }

        rewardContract.mint(contributorAddress, tier, 1);
    }
}