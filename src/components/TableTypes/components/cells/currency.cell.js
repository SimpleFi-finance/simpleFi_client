import React from 'react'
import styled from 'styled-components'

const CellSt = styled.div`
  width: max-content;

  p {
    width: max-content;
    white-space: nowrap;
  }
`;

export const CurrencyCell = ({ value, percent, currency }) => {
  
  const valTransform = !percent
    ? value.toLocaleString('en-US',{ style: 'currency', currency: `${currency || 'USD'}` })
    : value.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 })
  return (
    <CellSt>
      <p>
        {valTransform}
      </p>
    </CellSt>
  )
}
