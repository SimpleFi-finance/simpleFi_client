import { ethers } from 'ethers';
import provider from './../../utils/ethProvider';

function createBalanceContracts (collection) {
  const collectionWithContracts = [];
  
  collection.forEach(element => {
    
    //for Fields
    if (element.fieldId) {
      const { contractAddresses } = element;
      let balanceAddress = contractAddresses.filter(address => address.addressTypes.includes('balance'));
      if (balanceAddress.length === 1) {
        balanceAddress = balanceAddress[0]
      } else {
        throw new Error('Error identifying balance address, may not exist or not be unique - createBalanceContracts()');
      }
      element.fieldContracts = {
        balanceContract: {
          contract: new ethers.Contract(balanceAddress.address, balanceAddress.contractInterface.abi, provider),
          decimals: balanceAddress.decimals
        }
      }
    }

    //for tokens
    else if (element.name !== 'Eth') {
      const { address, contractInterface, decimals } = element;
      element.tokenContract = {
        contract: new ethers.Contract(address, contractInterface.abi, provider),
        decimals
      }
    }

    collectionWithContracts.push(element);
  })

  return collectionWithContracts;
}

export default createBalanceContracts;

