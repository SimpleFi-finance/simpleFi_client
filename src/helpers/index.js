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
  sortLiquidityTxs,
  sortFarmingTxs,
  createWhitelist,
  filterRelatedFarmReceiptTokenTxs,
  sortReceiptAndRelatedTxs,
  calcEarningROI,
  calcFarmingROI
} from './ethHelpers';
import extractTempFieldDetailsCells from './detailsTableHelper';
import formatHeadlines from './summaryBoxHelper';
import {
  extractDetailsPieChartValues,
  extractDetailsBarChartValues,
  chartCallbacks
} from './detailsChartHelpers';

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
  sortLiquidityTxs,
  sortFarmingTxs,
  createWhitelist,
  filterRelatedFarmReceiptTokenTxs,
  sortReceiptAndRelatedTxs,
  calcEarningROI,
  calcFarmingROI,
  extractTempFieldDetailsCells,
  formatHeadlines,
  extractDetailsPieChartValues,
  extractDetailsBarChartValues,
  chartCallbacks
}