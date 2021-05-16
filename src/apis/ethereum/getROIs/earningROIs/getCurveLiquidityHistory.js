import { getOneCurvePoolRawData } from '../../protocolQueries';
import helpers from '../../../../helpers';
import getHistoricalPrice from '../../../../utils/getHistoricalPrices'


async function getCurveLiquidityHistory(field, receiptToken, userReceiptTokenTxs, relatedFarmReceiptTokenTxs, userAccount, whitelist) {
  // assumes that at least one of userReceiptTokenTxs or relatedFarmReceiptTokenTxs will have a length
  const sortedReceiptAndRelatedTxs = helpers.sortReceiptAndRelatedTxs (userReceiptTokenTxs, relatedFarmReceiptTokenTxs);
  const timeFormatter = new Intl.DateTimeFormat('en-GB');
  const historicalCurveStats = await getOneCurvePoolRawData(field.name);

  const liquidityHistory = sortedReceiptAndRelatedTxs.map(async tx => {
    const txDate = new Date(Number(tx.timeStamp) * 1000);
    //@dev: simplify date to just day/month/year (no time) to find corresponding day in curve snapshot data
    const compDate = timeFormatter.format(txDate);
    const historicalStat = historicalCurveStats.find(day => compDate === timeFormatter.format(new Date(Number(day.timestamp) * 1000)));

    let fieldHistReserveValue = 0;

    for (let seed of field.seedTokens) {
      const histPrice = await getHistoricalPrice(seed, tx.timeStamp)
      const seedDecimalDivisor = Number(`1e${seed.decimals}`);
      const decimaledReserve = historicalStat.balances[seed.seedIndex]/seedDecimalDivisor;
      fieldHistReserveValue += histPrice * decimaledReserve;
    }
    //TODO: check impact of split admin fees and use of virtual price
    const pricePerToken = fieldHistReserveValue / (historicalStat.supply / Number(`1e${receiptToken.tokenContract.decimals}`));
    const {txIn, txOut, staked, unstaked} = helpers.sortLiquidityTxs(tx, userAccount, whitelist);

    return {tx, txDate, pricePerToken, txIn, txOut, staked, unstaked}
  })
  return liquidityHistory;
}

export default getCurveLiquidityHistory;