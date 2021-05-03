import React from 'react';
import * as S from './SummaryBox.style'
import formatHeadlines from './utils/summaryBoxHelper';

export default function SummaryBox({headlines, tableName, action}) {
  const boxHeadlines = formatHeadlines(tableName, headlines);

  return (
    <S.Container onClick={() => action()}>
      <h2>{tableName}</h2>
      <S.Headline>
        {boxHeadlines.formattedHeadlines.map((headline, index) => (
          <h3 key={`${tableName}-headline-${index}`}>{!headline.includes('NaN') ? headline : headline.replace('NaN', '0')}</h3>
        ))}
      </S.Headline>
    </S.Container>
  )
}

