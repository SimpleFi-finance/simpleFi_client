import React, { useState } from 'react'
import Table from '../../UI/Table'
import columnsOptions from '../components/columns'
import extractTxData from './utils/extractTransactionData'

const TransactionsTable = (props) => {
  const {
    tableId,
    sortable,
    filterable,
    stickyHeader,
    stickyHeaderTop,
    align,
    onRowClick,
    data
  } = props;
  const [selectedColumns, setSelectedColumns] = useState([])

  const transactionsColumns = [
    columnsOptions.dateColumn,
    columnsOptions.ActionTxColumn,
    columnsOptions.TxAmountColumn,
    columnsOptions.BalanceDeltaColumn,
    columnsOptions.BalanceColumn
  ].filter(x => x)

  const selectableColumns = transactionsColumns.filter(el => el.options.selectable).map(x=> {
			if(selectedColumns.includes(x.id)) return {id: x.id, selected: true, name: x.header}
      return {id: x.id, selected: false, name: x.header}
		})
    //TODO: add logic to updated selectedColumns
  const columns = !selectedColumns.length ? transactionsColumns.filter(x=> x.options.basic===true) : transactionsColumns.filter(x => selectedColumns.includes(x.id));
  // add logic for custom sorting and for filtering
  const activeFilters = {
    sort: {},
    filters: {}
  }

  const customSort = (items) => {
    return [...items]
  }
  
  let finalBalance = 0,
    balanceChange = ''
  const txData = data.map(tx => {
    const dataTx = extractTxData(tx)
    if (dataTx.balanceEffect === 'plus') {
      if (dataTx.priceData.userBalanceAfterTx !== undefined) {
        finalBalance = dataTx.priceData.userBalanceAfterTx;
      } else {
        finalBalance += dataTx.amount;
      }
      balanceChange = `➚ ${dataTx.amount.toFixed(2)}`
    } else if (dataTx.balanceEffect === 'minus') {
      if (dataTx.priceData.userBalanceAfterTx !== undefined) {
        finalBalance = dataTx.priceData.userBalanceAfterTx;
      } else {
        finalBalance -= dataTx.amount;
      }
      balanceChange = `➘ ${finalBalance.toFixed(2)}`
    } else {
      balanceChange = `↔`
    }
    
    return {
      ...dataTx,
      amount: dataTx.amount.toFixed(2),
      investedValue: Number(dataTx.amount) * Number(dataTx.priceData.pricePerToken),
      balanceChange: balanceChange,
      finalBalance: dataTx.priceData.pricePerFarmSeedToken
        ? Number(finalBalance) * Number(dataTx.priceData.pricePerFarmSeedToken)
        : Number(finalBalance) * Number(dataTx.priceData.pricePerToken),
    }
  })

  return (
    <Table
      tableId={tableId}
      sortable={sortable}
      align={align}
      filterable={filterable}
      columns={columns}
      allColumns={transactionsColumns}
      selectableColumns={selectableColumns}
      selectedColumn={selectedColumns}
      customSort={(data) => customSort(data)}
      updateColumns={() => setSelectedColumns([])}
      items={txData.map(x => ({
        ...x,
        key: x.id
      }))}
      filters={activeFilters}
      stickyHeader={stickyHeader}
      stickyHeaderTop={stickyHeaderTop}
      onRowClick={onRowClick}
    />
  )
}

export default TransactionsTable