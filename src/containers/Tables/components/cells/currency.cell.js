import React from 'react'
import styled from 'styled-components'

export const CurrencyCell = ({value, currency}) => {
  return (
    <p>
      {value.toLocaleString('en-US', { style: 'currency', currency: `${currency || 'USD'}` })}
    </p>
  )
}
