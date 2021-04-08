import { ethers } from 'ethers';
import provider from './ethProvider';

/**
 * @func getOneAccountBalance retrieves balance of an ethereum account's tokens and stakes
 * @param {account} string user account address for which balance is requested
 * @param {contract} string token contract (optional - defaults to Eth, which does not have a contract)
 * @returns {string} account balance
 */
//TODO: memoize - some tokens and fields fetch balances from same contract
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

/**
 * 
 * @param {String} account - Ethereum address of the token or field for which the user's balance is being sought
 * @param {Array} fieldOrTokenArr - array of tracked tokens or tracked fields
 * @returns {Array} - balances added to each field or token in the arry
 * @dev this function is used for both tracked tokens and fields
 */
  //CHECK: consider one call to Etherscan for token balances
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

