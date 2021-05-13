import getUserLiquidityHistory from './earningROIs/getUserLiquidityHistory';
import getUserFarmingHistory from './farmingROIs/getUserFarmingHistory';
import helpers from '../../../helpers';

const getROIs = async (userAccount, userFields, trackedFields, userTokenTransactions, userNormalTransactions, trackedTokens, userTokens, tokenPrices) => {

  const fieldsWithROI = [...userFields];
  
  for await (let field of fieldsWithROI) {

    let currInvestmentValue = 0;
    if (field.unstakedUserInvestmentValue) {
      currInvestmentValue += field.unstakedUserInvestmentValue;
    }
    if (field.stakedBalance) {
      currInvestmentValue += field.stakedBalance.reduce((acc, curr) => acc + curr.userInvestmentValue, 0);
    }

    if (field.isEarning) {
      const userLiquidityHistoryPromises = await getUserLiquidityHistory(trackedFields, field, trackedTokens, userTokenTransactions, userAccount);
      if (userLiquidityHistoryPromises) {
        const userLiquidityHistory = await Promise.all(userLiquidityHistoryPromises);
        field.investmentValue = currInvestmentValue;
        field.userTxHistory = userLiquidityHistory;
        field.earningROI = helpers.calcEarningROI(currInvestmentValue, userLiquidityHistory, field, tokenPrices);
      }
    }

    if (field.cropTokens.length) {
      //@dev: [{tx, [crop | receipt]Token, [priceApi,] [reward | staking | unstaking]Value, pricePerToken, txDate, [userBalanceAfterTx]}]
      const userFarmingHistory = await getUserFarmingHistory(field, userTokenTransactions, userNormalTransactions, trackedFields, trackedTokens, userAccount);
      field.investmentValue = currInvestmentValue;
      field.userFarmingTxHistory = userFarmingHistory;
      field.farmingROI = helpers.calcFarmingROI(userTokens, tokenPrices, field)
    }
  }
  return fieldsWithROI;
}

export default getROIs;