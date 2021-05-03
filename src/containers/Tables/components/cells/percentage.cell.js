import React from 'react'

export const PercentageCell = ({ value }) => {
  const percentage = Number(value*100).toFixed(2)
  return (
    <p>{percentage.toLocaleString(undefined, { style: 'percent' })} %</p>
  )
}