import axios from '../../helpers/axios-general'
import {baseUrl, priceEP, historyDaysString} from './geckoEndPoints';

async function getHistoricalPrice (tokenApi, txDate) {
  const pricesByDate = await getHistoricalPriceFromFirstTx(tokenApi, txDate);
  const formattedTimestamp = new Date(txDate * 1000).setHours(0,0,0);
  const target = pricesByDate.find(priceDateRecord => formattedTimestamp === new Date(priceDateRecord[0]).setHours(0,0,0));
  !target && console.error(' ---> price at date not found'); 
  return target ? target[1] : null;
}

const dayRangePriceCache = {}

function getHistoricalPriceFromFirstTx (tokenApi, firstTxTimestamp) {
  
  const startDate = new Date(firstTxTimestamp * 1000).setHours(0,0,0,0);
  
  let cachedStartDate;
  if (dayRangePriceCache[tokenApi]) {
    cachedStartDate = dayRangePriceCache[tokenApi][0][0];
  }

  if (!cachedStartDate || startDate < cachedStartDate) {
    const daysAgo = Math.ceil((Date.now() - startDate) / 86400000);
    return axios.get(baseUrl + priceEP + tokenApi + historyDaysString + daysAgo + '&interval=daily')
      .then(response => {
        const tokenPriceHist = response.data.prices;
        dayRangePriceCache[tokenApi] = tokenPriceHist;
        return dayRangePriceCache[tokenApi];
      })
  } else {
    return dayRangePriceCache[tokenApi];
  }
}

export {
  getHistoricalPrice,
  getHistoricalPriceFromFirstTx
}