import axios from '../../helpers/axios-general'
import { baseUrl, priceEP, manyPriceEP, currencyString } from './geckoEndPoints';

function currentPrice (tokenId) {
  return axios.get(baseUrl + priceEP + tokenId)
    .then(response => response.data.market_data.current_price.usd)
}

function manyPrices (tokenIds) {
  tokenIds = tokenIds.replace(/,/g, '%2C')
  return axios.get(baseUrl + manyPriceEP + tokenIds + currencyString)
    .then(response => response.data)
}

//eslint-disable-next-line import/no-anonymous-default-export
export default {
  currentPrice,
  manyPrices
}