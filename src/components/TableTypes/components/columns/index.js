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
  renderCell: ({ stakedValue }) => <Cells.CurrencyCell value={stakedValue} percent/>,
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
  renderCell: ({ ROI }) => <Cells.CurrencyCell value={ROI} percent/>,
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
  renderCell: ({ APY }) => <Cells.CurrencyCell value={APY} percent/>,
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
  renderCell: ({ lockedAmount }) => <Cells.CurrencyCell value={lockedAmount} percent/>,
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
  value: 'holdingsValue',
  renderCell: ({ holdingsValue }) => <Cells.CurrencyCell value={holdingsValue}/>,
  options: {
    headerStyle: { width: 100 },
    sortable: true,
    filterable: false,
    selectable: true,
    basic: true
  }
}
const dateColumn = {
  id: 'date',
  header: 'Date',
  value: 'date',
  options: {
    headerStyle: { width: 100 },
    sortable: true,
    filterable: false,
    selectable: true,
    basic: true
  }
}

const ActionTxColumn = {
  id: 'txAction',
  header: 'Action',
  value: 'action',
  options: {
    headerStyle: { width: 100 },
    sortable: true,
    filterable: false,
    selectable: true,
    basic: true
  }
}
const BalanceDeltaColumn = {
  id: 'txHistBalance',
  header: 'Hist. Change',
  value: 'balanceChange',
  options: {
    headerStyle: { width: 100 },
    sortable: true,
    filterable: false,
    selectable: true,
    basic: true
  }
}
const TxAmountColumn = {
  id: 'txAmount',
  header: 'Amount',
  value: 'amount',
  options: {
    headerStyle: { width: 100 },
    sortable: true,
    filterable: false,
    selectable: true,
    basic: true
  }
}

const BalanceColumn = {
  id: 'txBalance',
  header: 'Balance',
  value: 'finalbalance',
  renderCell: ({ finalBalance }) => <Cells.CurrencyCell value={finalBalance}/>,
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
  dateColumn,
  stakeValueColumn,
  RoiColumn,
  ApyColumn,
  InvestedColumn,
  FarmingColumn,
  AmountColumn,
  CurrPriceColumn,
  lockedColumn,
  valueColumn,
  ActionTxColumn,
  BalanceDeltaColumn,
  TxAmountColumn,
  BalanceColumn
}