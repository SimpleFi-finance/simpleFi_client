import {
  populateFieldTokensFromCache,
  addLockedTokenBalances,
  addUnclaimedBalances,
  addFieldSuppliesAndReserves,
  addStakedFieldBalances,
  addFieldInvestmentValues
} from './appHelpers'
import extractSummaryHoldingValues from './myAssetsHelpers/tokenHelpers';
import { extractSummaryFieldValues } from './myAssetsHelpers/fieldHelpers';
import toggleDropdown from './myAssetsHelpers/dropdownHelper';
import {
  findFieldAddressType,
  findUnclaimedBalanceType,
  combineFieldSuppliesAndReserves,
  sortLiquidityTxs,
  sortFarmingTxs,
  createWhitelist,
  filterRelatedFarmReceiptTokenTxs,
  sortReceiptAndRelatedTxs,
  calcEarningROI,
  calcFarmingROI
} from './ethHelpers';
import extractTempFieldDetailsCells from './detailsTableHelper';
import urlStringSanitiser from './urlStringSanitiser';
import formatHeadlines from './summaryBoxHelper';
import {extractTotalTokenBalance} from './tokenDetailsHelper';
import {
  extractDetailsPieChartValues,
  extractDetailsBarChartValues,
  chartCallbacks
} from './detailsChartHelpers';
import calcCombinedROI from './earningFieldDetailsHelpers';
import findUnderlyingFarmingTokens from './farmingFieldDetailsHelpers';

//eslint-disable-next-line import/no-anonymous-default-export
export default {
  populateFieldTokensFromCache,
  addUnclaimedBalances,
  addLockedTokenBalances,
  addFieldSuppliesAndReserves,
  addStakedFieldBalances,
  addFieldInvestmentValues,
  extractSummaryHoldingValues,
  extractSummaryFieldValues,
  toggleDropdown,
  findFieldAddressType,
  findUnclaimedBalanceType,
  combineFieldSuppliesAndReserves,
  sortLiquidityTxs,
  sortFarmingTxs,
  createWhitelist,
  filterRelatedFarmReceiptTokenTxs,
  sortReceiptAndRelatedTxs,
  calcEarningROI,
  calcFarmingROI,
  extractTempFieldDetailsCells,
  urlStringSanitiser,
  formatHeadlines,
  extractTotalTokenBalance,
  extractDetailsPieChartValues,
  extractDetailsBarChartValues,
  chartCallbacks,
  calcCombinedROI,
  findUnderlyingFarmingTokens
}