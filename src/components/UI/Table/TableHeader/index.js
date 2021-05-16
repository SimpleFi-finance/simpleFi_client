import React from 'react'
import * as S from './header.style'

const Header = (props) => {
  const {
    children,
    tableId,
    column,
    onSort,
    sortable,
    filterable,
    position,
    filters,
    onFilterChange,
    dataList,
    style
  } = props

  return (
    <S.TableHeader>
      {children}
    </S.TableHeader>
  )
}

export default Header