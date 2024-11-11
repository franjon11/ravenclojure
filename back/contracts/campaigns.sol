// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Campaigns {

    enum CampaignState { Active, Succeful, Failed }

    struct Campaign {
        string name;
        uint target_amount;
        uint current_amount;
        uint deadline;
        uint creationDate;
        address creator;
        CampaignState state;
    }

    event NewCampaign(uint campaignId, string name, uint target_amount, uint _days_deadline);

    Campaign[] public campaigns;
    
    function setCampaign(uint _target_amount, uint _days_deadline, string memory _name) public {
        require(_target_amount > 0, "Target amount must be greater than zero ");

        Campaign memory campaign = Campaign(_name, _target_amount, 0, _days_deadline, block.timestamp, msg.sender, CampaignState.Active);
        campaigns.push(campaign);

        uint campaignId = campaigns.length;
        emit NewCampaign(campaignId, _name, _target_amount, _days_deadline);
    }

    function getCampaigns() public view returns ( Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](campaigns.length);
        
        for (uint i = 0; i < campaigns.length; i++) {
            allCampaigns[i] = campaigns[i];
        }
        
        return allCampaigns;
    }

/*     function contribute(uint _campaignId, uint _amount) external view { 
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
    } */
}