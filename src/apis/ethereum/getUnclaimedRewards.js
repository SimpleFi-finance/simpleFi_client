import { ethers } from 'ethers';
import provider from './../../utils/ethProvider';
import unclaimedBalanceInterfaceTypes from '../../data/fieldData/unclaimedBalanceTypes';

/**
 * 
 * @param {UUID} fieldId - id of the currently analysed field
 * @param {UUID} tokenId - id of the currently analysed token
 * @dev - this check is necessary due to the myriad different methods used by protocol smart contracts
 *        to check unclaimed reward balances, particularly when there are multiple crop tokens
 * @returns {String || null} - the specific type of the unclaimedBalance method
 */
function _findUnclaimedBalanceType (fieldId, tokenId) {
  for (const type in unclaimedBalanceInterfaceTypes) {
    const targetInterface = unclaimedBalanceInterfaceTypes[type].find(contractInt => contractInt.tokenId === tokenId && contractInt.fieldId === fieldId)
    if (targetInterface) {
      return type;
    }
  }
  return null;
}


/**
 * 
 * @param {String} userAccount - currently analysed user account
 * @param {Array} trackedFields - all fields tracked by SimpleFi
 * @dev - we assume that the same contract address is used to check the balance of multiple
 *        crop tokens (albeit with different methods saved in the cropToken DB table)
 *      - most methods to check unclaimed balances will only require one argument (the userAccount)
 *        but others will require more (e.g. the token address), hence the necessity of the switch statement
 *      - note that the method name for checking balances varies from contract to contract
 *        (and/or token to token when multiple crops) and is stored in the SimpleFi DB
 * @returns {Array} - array of objects containing the field, tokenId, and unclaimedBalance
 */
async function getUnclaimedRewards(userAccount, trackedFields) {
  const unclaimedCropBalances = [];
  const farmFields = trackedFields.filter(field => field.cropTokens.length)

  for (let field of farmFields) {
    const { cropTokens, fieldId } = field;
    for (let cropToken of cropTokens) {
      const { tokenId } = cropToken;
      const balanceInterface = _findUnclaimedBalanceType(fieldId, tokenId)

      //identify the contract used for checking unclaimed balances and create an ethers.js contract interface
      try {
        const targetAddress = field.contractAddresses.find(contract => contract.addressTypes.includes('unclaimedReward'));
        const unclaimedRewardContract = new ethers.Contract(targetAddress.address, targetAddress.contractInterface.abi, provider);
        let unclaimedBalance;
        
        switch (balanceInterface) {
          case 'altCurveRewardGauge':
            unclaimedBalance = await unclaimedRewardContract[cropToken.unclaimedBalanceMethod](userAccount, cropToken.token.address);
            break;

          default: 
            unclaimedBalance = await unclaimedRewardContract[cropToken.unclaimedBalanceMethod](userAccount);
        }

        unclaimedBalance = Number(ethers.utils.formatUnits(unclaimedBalance, targetAddress.decimals));
        if (unclaimedBalance) {
          unclaimedCropBalances.push({field, tokenId, unclaimedBalance});
        }
      } catch (err) {
        console.error('Unclaimed rewards error', err);
      }
    }
  }
  return unclaimedCropBalances;
}

export default getUnclaimedRewards;