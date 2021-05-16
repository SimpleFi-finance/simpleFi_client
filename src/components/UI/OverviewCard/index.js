import React from 'react';
import * as S from './OverviewCard.style'

export default function OverviewCard({ title, amount, numType }) {
  let roiSign = '';
  if (numType === 'percent') {
    roiSign = Number(amount) > 0
      ? '+'
      : Number(amount) === 0
        ? ''  
        : '-'
    amount = roiSign + Math.abs(amount);
  } else {
    amount = '' + amount || '--'
  }
  
  return (
    <S.Card>
      <S.CardContent value={roiSign} type={numType}>
        <h1>{title}</h1>
        <h2>{amount}</h2>
      </S.CardContent>
    </S.Card>
  )
}