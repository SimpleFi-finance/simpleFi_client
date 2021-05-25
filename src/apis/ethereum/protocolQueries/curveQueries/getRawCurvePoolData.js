import curveEPs from './curveRawStatsEPs';
import axios from '../../../../utils/axiosInstances/axios-general'

const { curveMainEP, apyEP, indivPoolEPs, indivPoolConcat } = curveEPs
let apyCache;
const poolCache ={};

/**
 * @dev - this ep can also be used to get volume for all pools
 * @return {array} current nominal daily, monthly, weekly and total APY for all Curve pools
 */
async function getAllCurvePoolRawAPY() {
  if (!apyCache) {
    return axios.get(curveMainEP + apyEP).then(response => {
      return response.data
    })
  }
  return apyCache;
}

/**
 * 
 * @param {String} name - name of the curve earning (liquidity) field
 * @return {Array} - full daily pool data history, including reserves, timestamp, balances, etc. 
 */
async function getOneCurvePoolRawData(name) {
  if (poolCache[name]) {
    return poolCache[name]
  } else {
    const path = indivPoolEPs[name] + indivPoolConcat;
    poolCache[name] = await axios.get(curveMainEP + path).then(response => response.data)
    return poolCache[name];
  }
}

export {
  getOneCurvePoolRawData,
  getAllCurvePoolRawAPY
} 