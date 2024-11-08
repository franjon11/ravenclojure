// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Campaigns {

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

    function contribute(uint _campaignId, uint _amount) external view { 
        Campaign memory campaign = campaigns[_campaignId];
        require(campaign.state == CampaignState.Active, "Can only contribute to active campaigns");

        // ...

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
}