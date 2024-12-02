// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./campaignsRewards.sol";

contract Campaigns {

    enum CampaignState { Active, Succeful, Failed }

    struct Campaign {
        string name;
        uint id_campaign;
        uint target_amount; // In wei
        uint current_amount; // In wei
        uint deadline; // In seconds
        uint creationDate; // Timestamp
        address creator;
        CampaignState state;
    }

    uint public campaign_id = 0;

    event NewCampaign(uint campaignId, string name, uint target_amount, uint _days_deadline);
    event CampaignChangeState(uint campaignId, uint timestamp, CampaignState state);
    event ContributionReceived(uint campaignId, uint amount, address contributor);

    Campaign[] public campaigns;
    mapping(uint => address[]) public contributorsByCampaignId;    
    mapping(address => mapping(uint => uint)) public campaignsByContributor;

    CampaignRewards private rewardContract;

    constructor(address _rewardsAddress) {
        rewardContract = CampaignRewards(_rewardsAddress);
    }
    
    function createNewCampaign(uint _target_amount, uint _days_deadline, string memory _name) public {
        require(_target_amount > 0, "Target amount must be greater than zero");

        uint newCampaignId = campaign_id;
        campaign_id++;
        Campaign memory campaign = Campaign(
            _name, 
            newCampaignId, 
            _target_amount, 
            0, 
            block.timestamp + (_days_deadline * 1 days),
            block.timestamp, 
            msg.sender, 
            CampaignState.Active
        );
        campaigns.push(campaign);

        emit NewCampaign(newCampaignId, _name, _target_amount, _days_deadline);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](campaigns.length);
        
        for (uint i = 0; i < campaigns.length; i++) {
            allCampaigns[i] = campaigns[i];
        }
        
        return allCampaigns;
    }

    function contribute(uint _campaignId) external payable { 
        require(msg.value > 0, "Contribution must be greater than 0");
        require(_campaignId < campaigns.length, "Campaign does not exist");
        
        Campaign storage campaign = campaigns[_campaignId];
        require(campaign.state == CampaignState.Active, "Can only contribute to active campaigns");
        require(block.timestamp <= campaign.deadline, "Campaign deadline has passed");

        require(msg.sender != campaign.creator, "Creators cannot contribute to their own campaigns");

        if (campaignsByContributor[msg.sender][_campaignId] == 0) {
            contributorsByCampaignId[_campaignId].push(msg.sender);
        }
        campaignsByContributor[msg.sender][_campaignId] += msg.value;
        campaign.current_amount += msg.value;

        emit ContributionReceived(_campaignId, msg.value, msg.sender);

        if (campaign.current_amount >= campaign.target_amount) {
            campaign.state = CampaignState.Succeful;
            closeCampaign(_campaignId);
        }
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
            campaignsByContributor[contributorAddress][_campaignId] = 0;
            payable(contributorAddress).transfer(amountDonated);
        }

        emit CampaignChangeState(_campaignId, block.timestamp, CampaignState.Failed);
    }

    function closeCampaign(uint _campaignId) private {
        Campaign storage campaign = campaigns[_campaignId];

        if (campaign.state == CampaignState.Failed) return;
        if (campaign.state == CampaignState.Succeful) {
            emit CampaignChangeState(_campaignId, block.timestamp, CampaignState.Succeful);

            // entregar rewards
            distributeRewards(_campaignId);

            payable(campaign.creator).transfer(campaign.target_amount);
        }
        if (campaign.state == CampaignState.Active) {
            if (campaign.deadline < campaign.creationDate) {
                if (campaign.current_amount >= campaign.target_amount) {
                    campaign.state = CampaignState.Succeful;
                    closeCampaign(_campaignId);
                } 
                else {
                    campaign.state = CampaignState.Failed;
                    emit CampaignChangeState(_campaignId, block.timestamp, CampaignState.Failed);
                }
            }
        }
    }

    function setRemainingTime() public {
        for(uint i = 0; i < campaigns.length; i++) {
            Campaign storage campaign = campaigns[i];
            if (campaign.state == CampaignState.Active) {
                campaign.deadline -= (block.timestamp - campaign.creationDate);
                closeCampaign(i);
            }
        }
    }

    function distributeRewards(uint _campaignId) private {
        Campaign storage campaign = campaigns[_campaignId];
        uint totalAmount = campaign.current_amount;

        for (uint i = 0; i < contributorsByCampaignId[_campaignId].length; i++) {
            address contributor = contributorsByCampaignId[_campaignId][i];
            uint donatedAmount = campaignsByContributor[contributor][_campaignId];

            uint percentage = (donatedAmount * 100) / totalAmount;

            // Llamamos a mintReward con los dos argumentos requeridos
            rewardContract.mintReward(contributor, percentage);
        }
    }

    function getRewardsByContributor(address contributor) external view returns (uint256[4] memory) {
        return rewardContract.balanceOf(contributor);
    }

    function getRanking() external view returns (address[] memory, uint[] memory, uint[4][] memory ) {
        return rewardContract.getContributorRanking();
    }

}
