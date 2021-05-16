import get from 'lodash/get';
import React from 'react'
import styled from 'styled-components'

const TrSt = styled.tr`
  td {
    height: 55px;
    z-index: 1;
    cursor: ${({ clickable }) => clickable ? 'pointer' : ''};
    /* .visible-on-hover {
      visibility: hidden;
    } */
  }

  &:hover td {
    &:first-child {
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
      box-shadow: inset 4px 0 0 0 ${({theme}) => theme.accent};
    }
    &:last-child {
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;
      box-shadow: inset -4px 0 0 0 ${({theme}) => theme.accent};
    }
    /* .visible-on-hover {
      visibility: visible;
    } */
  }
`;

const CellSt = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  max-width: 100%;
`;

const Row = (props) => {
  const { tableId, item, columns, onRowClick } = props;

  const renderCellContent = (column, item, tableId) => {

    if (column.renderCell) {
      return column.renderCell(item, tableId);
    } else if (typeof column.value === 'function') {
      return column.value(item);
    }
    return get(item, column.value, '-')
  }

  const onClickRow = (id) => {
    if (onRowClick) {
      return onRowClick(id)
    } else {
      return null
    }
  }

  return (
    <>
      <TrSt
        clickable={!!onRowClick}
        onClick={() => onClickRow(item.id)}
      >
        {columns.map((column) => (
          <td
            key={`tr-${tableId}-${column.id}`}
            style={get(column, 'options.cellStyle', {})}
          >
            <CellSt>
              {renderCellContent(column, item, tableId)}
            </CellSt>
          </td>
        ))}
      </TrSt>
    </>
  )
};

export default Row;