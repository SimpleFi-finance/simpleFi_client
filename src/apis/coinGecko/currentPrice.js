import axios from '../../utils/axios-general'
import { supportedCurrencies } from '../../utils/generalData';

const baseUrl = 'https://api.coingecko.com/api/v3';
const manyPriceEP = '/simple/price?ids=';
const currencyString = "&vs_currencies=" + supportedCurrencies.join('%2C');

function manyPrices (tokenIds) {
  tokenIds = tokenIds.replace(/,/g, '%2C')
  return axios.get(baseUrl + manyPriceEP + tokenIds + currencyString)
    .then(response => response.data)
    .catch(err => console.log(err))
}


export default manyPrices