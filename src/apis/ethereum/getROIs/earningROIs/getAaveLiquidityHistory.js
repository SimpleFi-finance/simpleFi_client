import { getAaveBalanceHistory } from '../../protocolQueries';
import getHistoricalPrice from '../../../../utils/getHistoricalPrices'
import helpers from '../../../../helpers';

async function getAaveLiquidityHistory (receiptToken, userReceiptTokenTxs, userAccount, whitelist) {
  const rawData = await getAaveBalanceHistory(userAccount);
  const rawDataFilteredByReceiptToken = rawData.data.user.reserves.filter(reserve => reserve.reserve.aToken.id === receiptToken.address.toLowerCase());
  
  let liquidityHistory = [];

  if (rawDataFilteredByReceiptToken.length) {
    const fieldBalanceHistory = rawDataFilteredByReceiptToken[0].aTokenBalanceHistory;
  
    liquidityHistory = userReceiptTokenTxs.map(async tx => {
      const targetSnapshot = fieldBalanceHistory.find(snapshot => Number(tx.timeStamp) === snapshot.timestamp);
      const userBalanceAfterTx = Number(targetSnapshot.currentATokenBalance)/Number(`1e${receiptToken.decimals}`);
      const pricePerToken = await getHistoricalPrice(receiptToken, tx.timeStamp);
  
      const txDate = new Date(Number(tx.timeStamp) * 1000);
      const {txIn, txOut, staked, unstaked} = helpers.sortLiquidityTxs(tx, userAccount, whitelist);
      return {tx, txDate, pricePerToken, txIn, txOut, staked, unstaked, userBalanceAfterTx}
    })
  }

  return liquidityHistory;
}

export default getAaveLiquidityHistory;