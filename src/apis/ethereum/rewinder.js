import helpers from '../../helpers';
import { getTotalFieldSupply, getFieldSeedReserves } from './';

function _combineFieldSuppliesAndReserves(supplies, reserves) {
  let combinedBalances = [...supplies];

  for (let field of combinedBalances) {
    const findFieldReserves = reserves.filter(reserve => reserve.fieldName === field.fieldName)[0];
    field.seedReserves = findFieldReserves.seedReserves;
  }

  return combinedBalances;
}
async function rewinder (userFields, trackedTokens, trackedFields) {
  const userTokenBalances = [];
  const userFeederFieldBalances = [];
  const totalFieldSupplyCache = []; // { fieldName, totalFieldSupply }
  const fieldSeedReserveCache = []; // { fieldName, seedReserves: [{tokenName, fieldReserve}] }

  for (const mainField of userFields) {
    const { contract, decimals } = mainField.fieldContracts.balanceContract;
    const totalMainFieldSupply = await getTotalFieldSupply(mainField.name, contract, decimals, totalFieldSupplyCache);
    const userShareOfMainField = mainField.userBalance / totalMainFieldSupply;
    
    //@dev: will extract the balance of underlying seed tokens owned by the user
    for (const token of mainField.seedTokens) {
      await tokenBalanceExtractor(token, mainField, userShareOfMainField)
    }
  }

  const fieldBalances = _combineFieldSuppliesAndReserves(totalFieldSupplyCache, fieldSeedReserveCache);

  return {
    userTokenBalances,
    userFeederFieldBalances,
    fieldBalances
  };

  async function tokenBalanceExtractor (token, field, share, via) {
    const { tokenId, isBase, tokenContract } = token;
    
    let fieldSeedReserve = await getFieldSeedReserves(field, token, tokenContract, fieldSeedReserveCache, totalFieldSupplyCache);

    const userTokenBalance = fieldSeedReserve * share;
    const balanceObj = {token, userTokenBalance, field};

    if (via) balanceObj.via = via;
    userTokenBalances.push(balanceObj);
    if (!isBase) {
      let feederField = trackedFields.find(field => field.receiptToken === tokenId);
      const parentField = field;

      [feederField] = helpers.populateFieldTokensFromCache([feederField], trackedTokens);

      const { contract, decimals } = feederField.fieldContracts.balanceContract;
      const totalFeederSupply = await getTotalFieldSupply(feederField.name, contract, decimals, totalFieldSupplyCache);
      const userFieldBalance = fieldSeedReserve * share;
      const userFeederShare = userFieldBalance / totalFeederSupply;

      const excludeFeeder = field.isEarning ? true : false;

      userFeederFieldBalances.push({feederField, userFieldBalance, parentField, excludeFeeder});
      
      for (const token of feederField.seedTokens) {
        await tokenBalanceExtractor(token, feederField, userFeederShare, parentField)
      }
    }
  }
}

export default rewinder;