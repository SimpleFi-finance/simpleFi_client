import { getOneCurvePoolRawData } from '../../protocolQueries';
import getHistoricalPrice from '../../../../utils/getHistoricalPrices'

async function getOneCurveHistReceiptPrice(token, timestamp, trackedFields) {
  //@dev: assumes that Curve staking/farming fields only have one seed token
  const targetEarnField = trackedFields.find(trackedField => trackedField.receiptToken === token.tokenId);
  const historicalCurveStats = await getOneCurvePoolRawData(targetEarnField.name);
  const timeFormatter = new Intl.DateTimeFormat('en-GB');
  const txDate = new Date(Number(timestamp) * 1000);
  const compDate = timeFormatter.format(txDate);
  const historicalStat = historicalCurveStats.find(day => compDate === timeFormatter.format(new Date(Number(day.timestamp) * 1000)));
  
  let fieldHistReserveValue = 0;

  for (let seed of targetEarnField.seedTokens) {
    const histSeedValue = await getHistoricalPrice(seed, timestamp);
    //CHECK: handle error in case no seed index (some seeds only added later to contract and are not present in old raw stats)
    const seedDecimalDivisor = Number(`1e${seed.decimals}`);
    const decimaledReserve = historicalStat.balances[seed.seedIndex]/seedDecimalDivisor;
    fieldHistReserveValue += histSeedValue * decimaledReserve;
  }

  const pricePerToken = fieldHistReserveValue / (historicalStat.supply / Number(`1e${token.tokenContract.decimals}`));
  return {pricePerToken, txDate};
}


//NOTE: this function is not currently in use
async function getCurveHistReceiptPrices (field, receiptToken, userReceiptTokenTxs) {
  const historicalCurveStats = await getOneCurvePoolRawData(field.name);
  const timeFormatter = new Intl.DateTimeFormat('en-GB');

  const txHistoryWithPrices = userReceiptTokenTxs.map(async tx => {
    const txDate = new Date(Number(tx.timeStamp) * 1000);
    const compDate = timeFormatter.format(txDate);
    const historicalStat = historicalCurveStats.find(day => compDate === timeFormatter.format(new Date(Number(day.timestamp) * 1000)));

    const geckoDateformat = compDate.replace(/\//gi, '-')
    let fieldHistReserveValue = 0;

    for (let seed of field.seedTokens) {
      const histSeedValue = await getHistoricalPrice(seed, geckoDateformat);
      const decimaledReserve = historicalStat.balances[seed.seedIndex]/Number(`1e${seed.tokenContract.decimals}`);
      fieldHistReserveValue += histSeedValue * decimaledReserve;
    }
    //TODO: check impact of split admin fees and use of virtual price
    const pricePerToken = fieldHistReserveValue / (historicalStat.supply / Number(`1e${receiptToken.tokenContract.decimals}`));
    return {tx, receiptToken, pricePerToken, txDate}
  })

  return txHistoryWithPrices;
}

export {
  getOneCurveHistReceiptPrice,
  getCurveHistReceiptPrices
}