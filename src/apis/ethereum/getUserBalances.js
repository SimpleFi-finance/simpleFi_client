import { ethers } from 'ethers';
import provider from './../../utils/ethProvider';

async function _getOneAccountBalance (account, targetContract) {
  if (!targetContract) {
    const balance = await provider.getBalance(account);
    return Number(ethers.utils.formatEther(balance));
  } else {
    /* @dev: the || is necessary because fields have several contract types, incl. balanceContract,
    while tokens only have one - this function is used to get the user balance of both tokens and fields */
    const { contract, decimals } = targetContract.balanceContract || targetContract;
    let balance = await contract.balanceOf(account);
    balance = Number(ethers.utils.formatUnits(balance, decimals));
    
    return balance;
  }
}

function getAllUserBalances(account, collection) {
    const balancePromises = Promise.all(
      collection.map(
        async fieldOrToken => {
          const contract = fieldOrToken.tokenId
            ? fieldOrToken.tokenContract
            : fieldOrToken.fieldContracts;

          const userBalance = await _getOneAccountBalance(account, contract);
          if (userBalance) return { ...fieldOrToken, userBalance }
        }
      )
    )
    .then(tokensWithBalances =>
      tokensWithBalances.filter(token => token)
    )

    return balancePromises;
  }

export {
  getAllUserBalances,
}

