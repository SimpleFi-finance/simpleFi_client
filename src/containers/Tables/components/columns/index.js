import React from 'react'
import * as Cells from '../cells'

// all columns options
const nameColumn = {
  id: 'name',
  header: 'Name',
  value: 'name',
  options: {
    headerStyle: { width: 100 },
    sortable: true,
    filterable: false,
    selectable: true,
    basic: true
  }
}
  
const stakeValueColumn = {
  id: 'stakedValue',
  header: 'Staked (%)',
  value: 'stakedValue',
  renderCell: ({ stakedValue }) => <Cells.PercentageCell value={stakedValue}/>,
  options: {
    headerStyle: { width: 100 },
    sortable: true,
    filterable: false,
    selectable: true,
    basic: true
  }
}

const RoiColumn = {
  id: 'roiValue',
  header: 'ROI',
  value: 'ROI',
  renderCell: ({ ROI }) => <Cells.PercentageCell value={ROI}/>,
  options: {
    headerStyle: { width: 100 },
    sortable: true,
    filterable: false,
    selectable: true,
    basic: true
  }
}

const ApyColumn = {
  id: 'apyValue',
  header: 'APY',
  value: 'APY',
  renderCell: ({ APY }) => <Cells.PercentageCell value={APY}/>,
  options: {
    headerStyle: { width: 100 },
    sortable: true,
    filterable: false,
    selectable: true,
    basic: true
  }
}
const InvestedColumn = {
  id: 'investedValue',
  header: 'Invested ($)',
  value: 'investedValue',
  renderCell: ({ investedValue }) => <Cells.CurrencyCell value={investedValue} />,
  options: {
    headerStyle: { width: 100 },
    sortable: true,
    filterable: false,
    selectable: true,
    basic: true
  }
}
const FarmingColumn = {
  id: 'farmingField',
  header: 'Yield product',
  value: 'farmingField',
  options: {
    headerStyle: { width: 100 },
    sortable: true,
    filterable: false,
    selectable: true,
    basic: true
  }
}
const AmountColumn = {
  id: 'amountValue',
  header: 'Total Holdings',
  value: 'userBalance',
  options: {
    headerStyle: { width: 100 },
    sortable: true,
    filterable: false,
    selectable: true,
    basic: true
  }
}
//TODO: change to accept differnet currencies
const CurrPriceColumn = {
  id: 'currPriceValue',
  header: 'Current Price',
  value: 'currentPrice',
  renderCell: ({ currentPrice }) => <Cells.CurrencyCell value={currentPrice}/>,
  options: {
    headerStyle: { width: 100 },
    sortable: true,
    filterable: false,
    selectable: true,
    basic: true
  }
}

const lockedColumn = {
  id: 'lockedValue',
  header: 'Invested',
  value: 'lockedAmount',
  renderCell: ({ lockedAmount }) => <Cells.PercentageCell value={lockedAmount} />,
  options: {
    headerStyle: { width: 100 },
    sortable: true,
    filterable: false,
    selectable: true,
    basic: true
  }
}
const valueColumn = {
  id: 'holdingsValue',
  header: 'Holdings Value',
  value: 'holdingsvalue',
  renderCell: ({ userBalance, currentPrice }) => <Cells.CurrencyCell value={Number(userBalance) * Number(currentPrice)}/>,
  options: {
    headerStyle: { width: 100 },
    sortable: true,
    filterable: false,
    selectable: true,
    basic: true
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  nameColumn,
  stakeValueColumn,
  RoiColumn,
  ApyColumn,
  InvestedColumn,
  FarmingColumn,
  AmountColumn,
  CurrPriceColumn,
  lockedColumn,
  valueColumn
}