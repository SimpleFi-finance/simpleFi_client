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
async function rewinder (investmentCollection, trackedTokens, trackedInvestments) {
  const userTokenBalances = [];
  const userFeederFieldBalances = [];
  const totalFieldSupplyCache = []; // { fieldName, totalFieldSupply }
  const fieldSeedReserveCache = []; // { fieldName, seedReserves: [{tokenName, fieldReserve}] }

  for (const investment of investmentCollection) {
    const { contract, decimals } = investment.fieldContracts.balanceContract;
    const totalMainFieldSupply = await getTotalFieldSupply(investment.name, contract, decimals, totalFieldSupplyCache);
    const userShareOfMainField = investment.userBalance / totalMainFieldSupply;
    
    //@dev: will extract the balance of underlying seed tokens owned by the user
    for (const token of investment.seedTokens) {
      await tokenBalanceExtractor(token, investment, userShareOfMainField)
    }
  }

  const fieldBalances = _combineFieldSuppliesAndReserves(totalFieldSupplyCache, fieldSeedReserveCache);

  return {
    userTokenBalances,
    userFeederFieldBalances,
    fieldBalances
  };

  async function tokenBalanceExtractor (token, investment, share, via) {
    const { tokenId, isBase, tokenContract } = token;
    
    let fieldSeedReserve = await getFieldSeedReserves(investment, token, tokenContract, fieldSeedReserveCache, totalFieldSupplyCache);

    const userTokenBalance = fieldSeedReserve * share;
    const balanceObj = {token, userTokenBalance, investment};
    if (via) balanceObj.via = via;
    userTokenBalances.push(balanceObj);
    
    if (!isBase) {
      let feederField = trackedInvestments.find(field => field.receiptToken === tokenId);
      const parentField = investment;

      [feederField] = helpers.populateFieldTokensFromCache([feederField], trackedTokens);

      const { contract, decimals } = feederField.fieldContracts.balanceContract;
      const totalFeederSupply = await getTotalFieldSupply(feederField.name, contract, decimals, totalFieldSupplyCache);
      const userFieldBalance = fieldSeedReserve * share;
      const userFeederShare = userFieldBalance / totalFeederSupply;

      const excludeFeeder = investment.isEarning ? true : false;

      userFeederFieldBalances.push({feederField, userFieldBalance, parentField, excludeFeeder});
      
      for (const token of feederField.seedTokens) {
        await tokenBalanceExtractor(token, feederField, userFeederShare, parentField)
      }
    }
  }
}

export default rewinder;