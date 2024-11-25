// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Campaigns {

    enum CampaignState { Active, Succeful, Failed }

    struct Campaign {
        string name;
        uint id_campaign;
        uint target_amount;
        uint current_amount;
        uint deadline;
        uint creationDate;
        address creator;
        CampaignState state;
    }

    uint public campaign_id = 0;

    event NewCampaign(uint campaignId, string name, uint target_amount, uint _days_deadline);
    event CampaignCancelled(uint campaignId, string name);
    event ContributionReceived(uint campaignId, uint amount, address contributor);

    Campaign[] public campaigns;
    mapping(uint => address[]) public contributorsByCampaignId;    
    mapping(address => mapping(uint => uint)) public campaignsByContributor;
    
    function createNewCampaign(uint _target_amount, uint _days_deadline, string memory _name) public {
        require(_target_amount > 0, "Target amount must be greater than zero ");
        
        uint newCampaignId = campaign_id;
        campaign_id++;
        Campaign memory campaign = Campaign(_name, newCampaignId,_target_amount, 0, _days_deadline, block.timestamp, msg.sender, CampaignState.Active);
        campaigns.push(campaign);

        
        emit NewCampaign(newCampaignId, _name, _target_amount, _days_deadline);
    }

    function getCampaigns() public view returns ( Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](campaigns.length);
        
        for (uint i = 0; i < campaigns.length; i++) {
            allCampaigns[i] = campaigns[i];
        }
        
        return allCampaigns;
    }

    function contribute(address _contributor, uint _campaignId) external payable { 
        require(msg.value > 0, "Contribution must be greater than 0");
        require(_campaignId < campaigns.length, "Campaign does not exist");
        
        Campaign storage campaign = campaigns[_campaignId];
        require(campaign.state == CampaignState.Active, "Can only contribute to active campaigns");

        uint valueEther = msg.value/(1 ether);
        if(campaignsByContributor[_contributor][_campaignId] == 0) {
            contributorsByCampaignId[_campaignId].push(_contributor);
        }
        campaignsByContributor[_contributor][_campaignId] += msg.value;
        campaign.current_amount += valueEther;

        emit ContributionReceived(_campaignId, valueEther, _contributor);
    }


    function getContributions(address contributor) public view returns (Campaign[] memory, uint[] memory) {
        uint contributionsCount = 0;
        for(uint i = 0; i < campaigns.length; i++) {
            if(campaignsByContributor[contributor][i] > 0) {
                contributionsCount++;
            }
        }

        Campaign[] memory contributorCampaigns = new Campaign[](contributionsCount);
        uint[] memory contributorAmounts = new uint[](contributionsCount);

        uint index = 0;
        for (uint i = 0; i < campaigns.length; i++) {
            uint contributedAmount = campaignsByContributor[contributor][i];
            if (contributedAmount > 0) {
                contributorCampaigns[index] = campaigns[i];
                contributorAmounts[index] = contributedAmount;
                index++;
            }
        }

        return (contributorCampaigns, contributorAmounts);
    }

    function cancelCampaign(uint _campaignId) public {
        require(_campaignId < campaigns.length, "Campaign does not exist");
        Campaign storage campaign = campaigns[_campaignId];

        require(campaign.creator == msg.sender, "Only the creator can cancel this campaign");
        require(campaign.state == CampaignState.Active, "Campaign is not active");

        campaign.state = CampaignState.Failed;

        for(uint i = 0; i < contributorsByCampaignId[_campaignId].length; i++) {
            address contributorAddress = contributorsByCampaignId[_campaignId][i];
            uint amountDonated = campaignsByContributor[contributorAddress][_campaignId];
            payable(contributorAddress).transfer(amountDonated);
        }

        emit CampaignCancelled(_campaignId, campaign.name);
    }
}
