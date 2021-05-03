import React from 'react'
// import TableFooter from './TableFooter'
import TableHeader from './TableHeader'
import Row from './TableRow'
import * as S from './table.style'

import get from 'lodash/get';

const Table = (props) => {

  const {
    filters,
    columns,
    customSort,
    items,
    align,
    tableId,
    onSort,
    sortable,
    filterable,
    onFilterChange,
    onFilterClear,
    stickyHeader, 
    stickyHeaderTop,
    onRowClick
  } = props;
  // sort the rows first
  const defaultSort = list => {
    const currentSort = filters.sort;
    if (!currentSort) return list;
    const { column, direction } = currentSort;
    const { value } = columns.find(x => x.id === column);
    return [...list].sort((a, b) => {
    const sortA = typeof value === 'function' ? value(a) : get(a, value);
    const sortB = typeof value === 'function' ? value(b) : get(b, value);
    if (direction === 'ASC') {
      if (sortA < sortB) return -1;
      if (sortA > sortB) return 1;
    } else {
      if (sortA > sortB) return -1;
      if (sortA < sortB) return 1;
    }
      return 0;
    });
  };
  
  const sortedItems = customSort ? customSort(items) : defaultSort(items);

  // create the headings for the table from the columns config

  const headings = columns.map((column, index) => {
    const isColumnSortable = get(column, 'options.sortable', false);
    const isColumnFilterable = get(column, 'options.filterable', false);

    return (
      <TableHeader
        tableId={tableId}
        key={`${tableId}-${column.id}`}
        column={column.id}
        onSort={onSort}
        sortable={sortable && isColumnSortable}
        filterable={filterable && isColumnFilterable}
        position={index / (columns.length - 1)}
        filters={filters}
        onFilterChange={onFilterChange}
        onFilterClear={onFilterClear}
        dataList={items.map(
          x =>
            typeof column.value === "function"
              ? column.value(x)
              : get(x, column.value),
        ).filter(x => x)}
        style={get(column, 'options.headerStyle', {})}
        rangeFilter={get(column, 'options.filterRange')}
        customFilter={get(column, 'options.customFilter')}
      >
        {column.header}
      </TableHeader>
    );
  });

  // create the rows 

  const rows = sortedItems.map((item, index) => {
    return (
      <Row
        key={item.key}
        tableId={tableId}
        columns={columns}
        item={item}
        onRowClick={onRowClick}
      />
    )
  });

  return (
    <S.TableContainer
      align={align}
      id={`${tableId}`}
      stickyHeader={stickyHeader}
      stickyHeaderTop={stickyHeaderTop}
    >
      	<table>
					<thead>
						<tr>{headings}</tr>
					</thead>
					<tbody>
						{/* {(filteredData.length === 0) && (
							<tr> 
								<TableRowLoader colSpan="100%" >
									{filteredData.length === 0 && 'No results found.'}
								</TableRowLoader>
							</tr>
						)} */}
						{rows}
        </tbody>
        <tfoot></tfoot>
				</table>
    </S.TableContainer>
  )
}

export default Table;