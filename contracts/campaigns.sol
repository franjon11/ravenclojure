// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Campaigns {

    struct Campaign {
        uint target_amount;
        uint deadline;
        uint creationDate;
    }

    uint public totalCampaigns;
    mapping(uint => Campaign) public campaigns;
    
    function setCampaign(uint _target_amount, uint _days_deadline) public {

        totalCampaigns++;
        campaigns[totalCampaigns] = Campaign({
            target_amount: _target_amount,
            deadline: _days_deadline,
            creationDate: block.timestamp
        });
    }

    function getCampaigns() public view returns ( Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](totalCampaigns);
        
        for (uint i = 0; i < totalCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }
        
        return allCampaigns;
    }
}