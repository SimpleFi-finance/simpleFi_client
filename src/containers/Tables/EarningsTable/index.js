import React, { useState } from 'react'
import Table from '../../../components/UI/Table'
import columnsOptions from '../components/columns'

const EarningsTable = (props) => {

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

  const earningColumns = [
    columnsOptions.nameColumn,
    columnsOptions.InvestedColumn,
    columnsOptions.stakeValueColumn,
    columnsOptions.RoiColumn,
    columnsOptions.ApyColumn,
  ].filter(x => x)

  const selectableColumns = earningColumns.filter(el => el.options.selectable).map(x=> {
			if(selectedColumns.includes(x.id)) return {id: x.id, selected: true, name: x.header}
      return {id: x.id, selected: false, name: x.header}
		})
    //TODO: add logic to updated selectedColumns
  const columns = !selectedColumns.length ? earningColumns.filter(x=> x.options.basic===true) : earningColumns.filter(x => selectedColumns.includes(x.id));
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
      allColumns={earningColumns}
      selectableColumns={selectableColumns}
      selectedColumn={selectedColumns}
      customSort={(data) => customSort(data)}
      updateColumns={() => setSelectedColumns([])}
      items={data.map(x => ({
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

export default EarningsTable