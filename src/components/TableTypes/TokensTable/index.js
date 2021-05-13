import React, { useState } from 'react'
import Table from '../../UI/Table'
import columnsOptions from '../components/columns'

const TokensTable = (props) => {
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

  const tokensColumns = [
    columnsOptions.nameColumn,
    columnsOptions.AmountColumn,
    columnsOptions.lockedColumn,
    columnsOptions.CurrPriceColumn,
    columnsOptions.valueColumn,
  ].filter(x => x)

  const selectableColumns = tokensColumns.filter(el => el.options.selectable).map(x=> {
			if(selectedColumns.includes(x.id)) return {id: x.id, selected: true, name: x.header}
      return {id: x.id, selected: false, name: x.header}
		})
    //TODO: add logic to updated selectedColumns
  const columns = !selectedColumns.length ? tokensColumns.filter(x=> x.options.basic===true) : tokensColumns.filter(x => selectedColumns.includes(x.id));
  // add logic for custom sorting and for filtering
  const activeFilters = {
    sort: {},
    filters: {}
  }

  const customSort = (items) => {
    return [...items]
  }

  return (
    <Table
      tableId={tableId}
      sortable={sortable}
      align={align}
      filterable={filterable}
      columns={columns}
      allColumns={tokensColumns}
      selectableColumns={selectableColumns}
      selectedColumn={selectedColumns}
      customSort={(data) => customSort(data)}
      updateColumns={() => setSelectedColumns([])}
      items={data.map(x => ({
        ...x,
        key: x.id,
        holdingsValue: Number(x.userBalance) * Number(x.currentPrice)
      }))}
      filters={activeFilters}
      stickyHeader={stickyHeader}
      stickyHeaderTop={stickyHeaderTop}
      onRowClick={onRowClick}
    />
  )
}

export default TokensTable