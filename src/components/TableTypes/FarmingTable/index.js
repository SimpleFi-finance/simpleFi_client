import React, { useState } from 'react'
import Table from '../../UI/Table'
import columnsOptions from '../components/columns'

const FarmingTable = (props) => {

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

  const farmingColumns = [
    columnsOptions.nameColumn,
    columnsOptions.InvestedColumn,
    columnsOptions.FarmingColumn,
    columnsOptions.RoiColumn,
    columnsOptions.ApyColumn,
  ].filter(x => x)

  const selectableColumns = farmingColumns.filter(el => el.options.selectable).map(x=> {
    if(selectedColumns.includes(x.id)) return {id: x.id, selected: true, name: x.header}
    return {id: x.id, selected: false, name: x.header}
  })
    //TODO: add logic to updated selectedColumns
  const columns = !selectedColumns.length ? farmingColumns.filter(x=> x.options.basic===true) : farmingColumns.filter(x => selectedColumns.includes(x.id));
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
      allColumns={farmingColumns}
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

export default FarmingTable;