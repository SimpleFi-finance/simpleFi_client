import helpers from '../../helpers';
import { getTotalFieldSupply, getFieldSeedReserves } from './';


const userTokenBalances = [];
const userFeederFieldBalances = [];
const totalFieldSupplyCache = []; // { fieldName, totalFieldSupply }
const fieldSeedReserveCache = []; // { fieldName, seedReserves: [{tokenName, fieldReserve}] }
let localTrackedTokens = [];
let localTrackedFields = [];
/**
 * 
 * @param {Object} token - the currently analysed seed token of the target field
 * @param {Object} field - the field currently analysed (either a main field, or
 *                         after recursion, a feeder field)
 * @param {Float} share - the user's percentage holding of the Field's total supply
 * @param {Object} via - the currently analysed field's parent field
 * @dev  - this is a recursive function: if the currently analysed token isn't base, i.e.
 *         is the receipt (e.g. LP token) of another "feeder" field then the if (!isBase)
 *         condition identifies the feeder field, preps it (fetch total supply and calc
 *         user share) and runs its seed tokens through this function again until the tokens
 *         are all base
         - this function does not return anything, it's only role is to push data to
            the main Rewinder function's caches: 
              * userTokenBalances
              * userFeederFieldBalances
              * fieldSeedReserveCache (passed onto getFieldSeedReserves())
*/
//TODO: add explainer on why totalFieldSupplyCache is passed to getFieldSeedReserve: to get Aave token supply which is = reserve of underlying and that operation is prob unnecessary 
async function _tokenBalanceExtractor(token, investment, share, via) {
  const { tokenId, isBase, tokenContract } = token;
  //get total reserve of token within the pool
  //@dev: field seed reserves are the number of underlying tokens held by the field
  let fieldSeedReserve = await getFieldSeedReserves(investment, token, tokenContract, fieldSeedReserveCache, totalFieldSupplyCache);
  
  // if isBase or !isBase
  //NOTE: for Aave, this is redundant - literally just reverts the operation in top end of rewinder
  const userTokenBalance = fieldSeedReserve * share;
  const balanceObj = {token, userTokenBalance, investment};
  
  // get subfield path
  if (via) balanceObj.via = via;
  userTokenBalances.push(balanceObj);
  
  //CHECK here what happens when the Aave Curve pool recurses
  //CHECK this assumes  there is just one seed for 
  if (!isBase) {
    let feederField = localTrackedFields.find(field => field.receiptToken === tokenId);
    const parentField = investment;

    //TODO: stop this from changing tracked Fields as well as user fields
    //TODO: avoid populating this multiple times (another time in App.js)
    [feederField] = helpers.populateFieldTokensFromCache([feederField], localTrackedTokens);

    const { contract, decimals } = feederField.fieldContracts.balanceContract;
    const totalFeederSupply = await getTotalFieldSupply(feederField.name, contract, decimals, totalFieldSupplyCache);
    const userFieldBalance = fieldSeedReserve * share;
    const userFeederShare = userFieldBalance / totalFeederSupply;

    /* @dev: - uFFB will be recorded in state as rewoundFieldBalances, and will contain any field
                with a receipt token that was fed into the currently analysed field
              - currently earning fields that receive LP/receipt tokens are flagged as "excludeFeeder"
                so they are not displayed or included in ROI calcs
    */
    const excludeFeeder = investment.isEarning ? true : false;

    userFeederFieldBalances.push({feederField, userFieldBalance, parentField, excludeFeeder});
    
    for (const token of feederField.seedTokens) {
      await _tokenBalanceExtractor(token, feederField, userFeederShare, parentField)
    }
  }

}
//------------------------------
/**
 * 
  * @param {Array} collection - all locations of type [LP, stake, LPwithStake] the user is currently invested in at a depth of 0 (investment not restaked elsewhere)
  * @param {Array} trackedTokens - all tokens tracked by SimpleFi
  * @param {Array} trackedFields - all investment fields of type [LP, stake, LPwithStake] tracked by SimpleFi
  * //TODO: detailed @dev explanation
  * @dev: total supply indicates either 1) how many receipt tokens have been minted by the field
  * or 2) how many input tokens the field holds (in cases where it issues no receipts)
*/
async function rewinder(investmentCollection, trackedTokens, trackedFields) {
  localTrackedFields = trackedFields
  localTrackedTokens = trackedTokens

  for (const investment of investmentCollection) {
    const { contract, decimals } = investment.fieldContracts.balanceContract;

    const totalMainFieldSupply = await getTotalFieldSupply(investment.name, contract, decimals, totalFieldSupplyCache);
    const userShareOfMainField = investment.userBalance / totalMainFieldSupply;
    
    //@dev: will extract the balance of underlying seed tokens owned by the user
    for (const token of investment.seedTokens) {
      await _tokenBalanceExtractor(token, investment, userShareOfMainField)
    }
  }

  const fieldBalances = helpers.combineFieldSuppliesAndReserves(totalFieldSupplyCache, fieldSeedReserveCache);

  return {
    userTokenBalances,
    userFeederFieldBalances,
    fieldBalances
   };

}

export default rewinder;