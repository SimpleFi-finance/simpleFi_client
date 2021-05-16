import React, { useState, useEffect } from 'react';
import OverviewCard from '../../components/UI/OverviewCard';
import SummaryBox from '../../components/UI/SummaryBox';
import helpers from '../../helpers';
import { connect } from 'react-redux'
import * as S from './dashboard.style'
import { withRouter } from 'react-router-dom'

const MyAssets = (props) => {
  const { userData } = props
  const [holdingHeadlines, setHoldingHeadlines] = useState({totalInvested: 0, totalUnclaimed: 0, totalValue: 0});
  const [farmingHeadlines, setFarmingHeadlines] = useState(['Loading', 'Loading']);
  const [earningHeadlines, setEarningHeadlines] = useState(['Loading', 'Loading']);
  const [totalROI, setTotalROI] = useState({ farmingROI: 0, earningROI: 0 });
  
  useEffect(() => {
    if(userData.hasROI) {
      const {overviewValues} = helpers.extractSummaryHoldingValues(userData.tokens.data, userData.tokenPrices.data);
      setHoldingHeadlines(overviewValues);
      const {totalInvested, totalROI} = helpers.extractSummaryFieldValues(userData.investments.data);
      setFarmingHeadlines({investment: totalInvested.farmingInv, ROI: totalROI.farmingROI});
      setEarningHeadlines({investment: totalInvested.earningInv, ROI: totalROI.earningROI});
      setTotalROI(totalROI);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [userData.hasROI])

  return (
    <S.Container>
      <S.OverflowEl>
        <S.HorizontalContainer>
          <OverviewCard
            title='Total assets'
            amount={userData.hasROI
              ? Number(holdingHeadlines.totalValue).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
              : '--'}
          />
          <OverviewCard
            title='Total ROI'
            numType='percent'
            amount={userData.hasROI
              ? (Number((totalROI.farmingROI + totalROI.earningROI) * 100).toFixed(2)).toLocaleString()
              : '--'}
          />
        </S.HorizontalContainer>
        <S.Title>
          <h1>Assets</h1>
        </S.Title>
        <S.DataContainer>
          <SummaryBox
            headlines={holdingHeadlines}
            tableName='tokens'
            action={() => props.history.push('/tokens')}
          />
        </S.DataContainer>
        <S.Title>
          <h1>Investments</h1>
        </S.Title>
        <S.DataContainer>
          <SummaryBox
            headlines={earningHeadlines}
            tableName='earning'
            action={() => props.history.push('/earning')}
          />
          <SummaryBox
            headlines={farmingHeadlines}
            tableName='farming'
            action={() => props.history.push('/farming')}
          />
        </S.DataContainer>
      </S.OverflowEl>
    </S.Container>
  )
}
const mapState = state => {
  return {
    userAccount: state.App.userAccounts,
    userData: state.App.userData
  }
}

const mapDispatch = dispatch => {
  return {

  }
}
export default connect(mapState, mapDispatch)(withRouter(MyAssets))