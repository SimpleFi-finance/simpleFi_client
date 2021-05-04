import { ethers } from 'ethers';
import provider from './../../utils/ethProvider';
import getTotalFieldSupply from './getTotalFieldSupply';
import helpers from '../../helpers'

async function getFieldSeedReserves (field, token, tokenContract, cache, totalFieldSupplyCache) {
  
  //Check in cache if reserves already fetched
  const findFieldinCache = cache.filter(fieldWithReserves => fieldWithReserves.fieldName === field.name)[0];
  if (findFieldinCache) {
    const seedIndex = findFieldinCache.seedReserves.findIndex(seed => seed.tokenName === token.name);
    if (seedIndex !== -1) {
      return findFieldinCache.seedReserves[seedIndex].fieldReserve;
    }
  }

  const reserveAddress = helpers.findFieldAddressType(field, 'underlying');
  const { addressType, address, abi } = reserveAddress;

  const decimals = token.decimals;
  const tokenIndex = token.seedIndex;

  let fieldReserve;
  
  switch (addressType) {

    case "curveSwap":
      
      //CHECK: this check is needed because of multiple calls to getFieldSeedReserves for the same fields
      if (!field.fieldContracts.underlyingContract) {
        field.fieldContracts.underlyingContract = new ethers.Contract(address, abi, provider);
      }
      fieldReserve = await field.fieldContracts.underlyingContract.balances(tokenIndex);
      fieldReserve = ethers.utils.formatUnits(fieldReserve, decimals)
      break;

    case "curveSNX":

      if (!field.fieldContracts.underlyingContract) {
        field.fieldContracts.underlyingContract = new ethers.Contract(address, abi, provider);
      }
      const fieldDepositContract = field.contractAddresses.find(contractAddress => contractAddress.addressTypes.includes('deposit'));
      fieldReserve = await field.fieldContracts.underlyingContract.balanceOf(fieldDepositContract.address);
      fieldReserve = ethers.utils.formatUnits(fieldReserve, decimals)
      break;

    case "uniswap":
      const uniReserveContract = field.fieldContracts.balanceContract.contract;
      const _fieldReserves = await uniReserveContract.getReserves();
      fieldReserve = Number(ethers.utils.formatUnits(_fieldReserves[tokenIndex], decimals));
      break;

    case "aave":

      fieldReserve = await getTotalFieldSupply (field.name, field.fieldContracts.balanceContract, decimals, totalFieldSupplyCache);
      break;
    
      default:
      fieldReserve = await tokenContract.contract.balanceOf(address);
      fieldReserve = Number(ethers.utils.formatUnits(fieldReserve, decimals));
  }
  
  if (findFieldinCache) {
    findFieldinCache.seedReserves.push({
      tokenName: token.name,
      fieldReserve
    })
  } else {
    cache.push({
    fieldName: field.name, 
    seedReserves: [{tokenName: token.name, fieldReserve}]
    })
  }

  return fieldReserve;
}

export default getFieldSeedReserves