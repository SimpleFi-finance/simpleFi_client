import { getOneCurveHistReceiptPrice } from './getCurveFarmingPriceHistory';
import getOneUniswapHistReceiptPrice from './getUniswapFarmingPriceHistory';
import getHistoricalPrice from '../../../../utils/getHistoricalPrices'
import helpers from '../../../../helpers';

async function getUserFarmingHistory(field, userTokenTransactions, userNormalTransactions, trackedFields, trackedTokens, userAccount) {

  const farmingTxs = helpers.sortFarmingTxs(field, userTokenTransactions, userNormalTransactions, trackedTokens, userAccount);

  for (let tx of farmingTxs) {
    
    let farmSeedTokenPriceAndDate;
    const { farmSeedToken } = tx;
    const txTimestamp = tx.tx.timeStamp;

    switch (field.seedTokens[0].protocol.name) {
      case 'Curve':
        farmSeedTokenPriceAndDate = await getOneCurveHistReceiptPrice(farmSeedToken, txTimestamp, trackedFields);
        break;
          
      case 'Uniswap':
        const poolAddress = field.seedTokens[0].address;
        const txBlockNumber = tx.tx.blockNumber;
        farmSeedTokenPriceAndDate = await getOneUniswapHistReceiptPrice(txBlockNumber, userAccount, poolAddress);
        break;
  
      // default is for cases when the farm seed token is a simple base token (e.g. 1inch)
      default: 
        const pricePerToken = await getHistoricalPrice(farmSeedToken, txTimestamp);
        const txDate = new Date(Number(txTimestamp) * 1000);
        farmSeedTokenPriceAndDate = {pricePerToken, txDate}
    }

    if (tx.cropToken) {
      const histTokenPrice = await getHistoricalPrice (tx, tx.tx.timeStamp);
      tx.txDate = new Date(Number(tx.tx.timeStamp) * 1000);
      tx.pricePerToken = histTokenPrice;
      tx.pricePerFarmSeedToken = farmSeedTokenPriceAndDate.pricePerToken;
    } else {
      tx.pricePerToken = farmSeedTokenPriceAndDate.pricePerToken;
      tx.txDate = farmSeedTokenPriceAndDate.txDate;
    }
  }

  //@dev: [{tx, receiptToken, [cropToken,] txDate, [reward | staking | unstaking]Amount, pricePerToken, [pricePerFarmSeedToken,] [priceApi]}]
  return farmingTxs;
}

export default getUserFarmingHistory;