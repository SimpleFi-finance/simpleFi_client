import axios from './axiosInstances/axios-backend'

let localCache = {}
const extractHistoricalPrices = async (token, firstTransaction) => {
  
  const priceApi = token.priceApi || token.cropTokens[0].priceApi

  if (!localCache[priceApi]) {
    await axios.get(`/prices/historic`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          localCache = { ...response.data }
        }
      })
      .catch(err => console.log(err))
  }

  const timestamp = new Date((firstTransaction * 1000)).setHours(0, 0, 0, 0)
  
  let transactionPriceHist = localCache[priceApi].find(el => el.timestamp === timestamp)

  if (!transactionPriceHist) {
    transactionPriceHist = await axios.post(`/prices/historic`, { timestamp: timestamp, token: { priceApi: token.priceApi, tokenId: token.tokenId } })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          localCache[priceApi].push({
            ...response.data.data,
            timestamp: timestamp,
            name: priceApi
          })
          return response.data.data
        }
      })
      .catch(err => console.log(err))
  }
  return transactionPriceHist?.price_usd
}

export default extractHistoricalPrices;