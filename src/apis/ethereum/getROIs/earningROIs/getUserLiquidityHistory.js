import getCurveLiquidityHistory from './getCurveLiquidityHistory';
import getUniswapLiquidityHistory from './getUniswapLiquidityHistory';
import getAaveLiquidityHistory from './getAaveLiquidityHistory';
import helpers from '../../../../helpers';

/**
 * 
 * @param {Array} trackedFields - all tracked fields
 * @param {Object} field - currently analysed earning field
 * @param {Array} trackedTokens - all tokens tracked by SimpleFi
 * @param {Array} userTokenTransactions - all ERC20 token transactions involving the user's account
 * @param {String} userAccount - user's ethereum account
 * @dev - switch is based on the field's protocol name, assuming liquidity history
 *      - extraction method is the same for all of a protocol's earning fields 
 *      - whitelist is used to identify when receiptTokens are staked elsewhere
 *      - relatedFarmReceiptTokenTxs is used when 1) related farming fields have receipt tokens, and 2) the user received these tokens without having to stake directly in the related farming field
 * @return {Array} - a list of user transactions ready to be processed by calcROI helper: {
 *    pricePerToken: at the time of the transaction
 *    one of four tx types: txIn, txOut, staked or unstaked (one filled with value, others undefined)
 *    txDate: date object
 *    tx: object containing all tx details (content can vary based on source)
 *    userBalanceAfterTx: only for certain fields that continuously update user token balances (e.g. aTokens)
 *  }
 */
const getUserLiquidityHistory = async (trackedFields, field, trackedTokens, userTokenTransactions, userAccount) => {

  const receiptToken = trackedTokens.find(trackedToken => trackedToken.tokenId === field.receiptToken);
  const userReceiptTokenTxs = userTokenTransactions.filter(tx => tx.contractAddress === receiptToken.address.toLowerCase());
  const relatedFarmReceiptTokenTxs = helpers.filterRelatedFarmReceiptTokenTxs(trackedFields, trackedTokens, userTokenTransactions, receiptToken);
  const whitelist = helpers.createWhitelist(trackedFields, field);
  
  let liquidityHistory;
  const protocol = field.protocol.name
  
  if (protocol === 'Curve') {
    liquidityHistory = await getCurveLiquidityHistory(field, receiptToken, userReceiptTokenTxs, relatedFarmReceiptTokenTxs, userAccount, whitelist);
  } else if (protocol === 'Uniswap') {
    liquidityHistory = await getUniswapLiquidityHistory(field, userReceiptTokenTxs, userAccount, whitelist);
  } else if (protocol === 'Aave') {
    liquidityHistory = await getAaveLiquidityHistory(receiptToken, userReceiptTokenTxs, userAccount, whitelist);
  }

  return liquidityHistory;
}

export default getUserLiquidityHistory;