import getCurveLiquidityHistory from './getCurveLiquidityHistory';
import getUniswapLiquidityHistory from './getUniswapLiquidityHistory';
import getAaveLiquidityHistory from './getAaveLiquidityHistory';
import helpers from '../../../../helpers';


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