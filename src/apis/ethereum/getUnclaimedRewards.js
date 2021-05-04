import { ethers } from 'ethers';
import provider from './../../utils/ethProvider';
import unclaimedBalanceInterfaceTypes from '../../data/fieldData/unclaimedBalanceTypes';

function _findUnclaimedBalanceType (fieldId, tokenId) {
  for (const type in unclaimedBalanceInterfaceTypes) {
    const targetInterface = unclaimedBalanceInterfaceTypes[type].find(contractInt => contractInt.tokenId === tokenId && contractInt.fieldId === fieldId)
    if (targetInterface) {
      return type;
    }
  }
  return null;
}

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