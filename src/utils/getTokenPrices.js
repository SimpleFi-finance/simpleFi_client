import axios from '../utils/axios-simplefi'
import { supportedCurrencies } from './generalData';

async function getTokenPrices(userTokens, userFields, trackedTokens) {

  const apiList = [];
  const nonBaseTokens = [];
  const currencyModel = {};
  supportedCurrencies.forEach(currency => currencyModel[currency] = 0);

  userTokens.forEach(token => {
    const { name, tokenId, isBase, priceApi } = token;
    if (priceApi) apiList.push(priceApi);
    else {
      if (!isBase) nonBaseTokens.push({name, tokenId});
      else throw new Error(`token ${name} is neither base nor has an price api`);
    }
  })

  //@dev: assumption that all crop tokens are base tokens
  userFields.forEach(userField => {
    if (userField.cropTokens.length) {
      userField.cropTokens.forEach(token => {
        if (!apiList.includes(token.priceApi)) apiList.push(token.priceApi)
      })
    }
  })
  // TODO: handle possible request error
  const baseTokenPrices = await axios.get('/prices')
  const revertToName = Object.entries(baseTokenPrices.data.data).map(token => {
    const targetToken = trackedTokens.find(trackedToken => trackedToken.priceApi === token[0]);
    token[0] = targetToken.name;
    return token;
  })
  const tokenPrices = Object.fromEntries(revertToName);
  // determine composite price of non-base tokens
  nonBaseTokens.forEach(token => {
    //NOTE: recursion may be required in edge cases where field's seeds are not base
    const parentField = userFields.find(field => field.receiptToken === token.tokenId);
    const { totalSupply } = parentField;
    const parentSeeds = parentField.seedTokens.map(seedToken => {
      const {name, fieldReserve} = seedToken;
      return {name, fieldReserve}
    });

    const parentSeedValues = parentSeeds.map(seed => {
      const seedReserveValues = {};
      for (let currency in tokenPrices[seed.name]) {
        seedReserveValues[currency] =
          tokenPrices[seed.name][currency]
          * seed.fieldReserve
      }
      return seedReserveValues;
    });
    const combinedTokenPrices = parentSeedValues.reduce((acc, curr) => {
      for (let currencyVal in curr) {
        acc[currencyVal] += curr[currencyVal];
      }
      return acc;
    },{...currencyModel})
    for (let currencyVal in combinedTokenPrices) {
      combinedTokenPrices[currencyVal] = combinedTokenPrices[currencyVal]/totalSupply;
    }

    tokenPrices[token.name] = combinedTokenPrices;
  })
  //{[token.name]: {eur: x, gbp: y, usd: z}, ....}
  return tokenPrices;
  
}

export default getTokenPrices;