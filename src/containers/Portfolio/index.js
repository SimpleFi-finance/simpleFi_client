import React, { useState, useEffect } from 'react';
import './MyAssets.css';
import OverviewCard from '../../components/OverViewCard/OverviewCard';
import SummaryBox from '../../components/SummaryBox/SummaryBox';
import helpers from '../../helpers/index';
import { holdingHeaders, holdingCurrencyCells, farmingHeaders, farmingCurrencyCells, earningHeaders, earningCurrencyCells } from '../../data/summaryHeaders';
import { connect } from 'react-redux'

const MyAssets = (props) => {
  const [holdingHeadlines, setHoldingHeadlines] = useState({totalInvested: 0, totalUnclaimed: 0, totalValue: 0});
  const [farmingHeadlines, setFarmingHeadlines] = useState(['Loading', 'Loading']);
  const [earningHeadlines, setEarningHeadlines] = useState(['Loading', 'Loading']);
  const [holdingValues, setHoldingValues] = useState({ baseTokens:[], receiptTokens:[] });
  const [farmingValues, setFarmingValues] = useState([]);
  const [earningValues, setEarningValues] = useState([]);
  const [totalROI, setTotalROI] = useState({farmingROI: 0, earningROI: 0});
  const { userData, userAccounts } = props

  useEffect(() => {
    window.scrollTo(0, 0);
  },[])

  // combine available and locked token balances and add prices from coinGecko
  // separate farming and earning fields
  useEffect(() => {
    if(userData.hasROI) {
      const {summaryTableValues, overviewValues} = helpers.extractSummaryHoldingValues(userData.tokens.data, userData.tokenPrices.data);
      setHoldingValues(summaryTableValues);
      setHoldingHeadlines(overviewValues);
  
      const {farmingFields, earningFields, totalInvested, totalROI} = helpers.extractSummaryFieldValues(userData.investments.data);
      setFarmingHeadlines({investment: totalInvested.farmingInv, ROI: totalROI.farmingROI});
      setEarningHeadlines({investment: totalInvested.earningInv, ROI: totalROI.earningROI});
  
      setFarmingValues(farmingFields);
      setEarningValues(earningFields);
      setTotalROI(totalROI);
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [userData.hasROI])

  return (
    <div className="myassets-summary">
      <div className="summary-overview-cards-container">
          <OverviewCard title='Total assets' amount={userData.hasROI ? Number(holdingHeadlines.totalValue.toFixed()).toLocaleString() : '--'}/>
          <OverviewCard title='Total ROI' numType='percent' amount={userData.hasROI ? (Number((totalROI.farmingROI + totalROI.earningROI) * 100).toFixed(2)).toLocaleString() : '--'}/>
      </div>

      <div className="account-overview">
        <h1>Account overview</h1>
      </div>

      <div className="summary-container-sup">
        <div className="summary-container summary-holding">
          <SummaryBox headlines={holdingHeadlines} userValues={holdingValues.baseTokens} headers={holdingHeaders} tableName='holding' currencyCells={holdingCurrencyCells} allLoaded={userData.hasROI}/>
        </div>

        <div className="summary-container summary-earning">
        <SummaryBox headlines={earningHeadlines} userValues={earningValues} headers={earningHeaders} tableName='earning' currencyCells={earningCurrencyCells} allLoaded={userData.hasROI}/>  
        </div>
        
        <div className="summary-container summary-farming">
          <SummaryBox headlines={farmingHeadlines} userValues={farmingValues} headers={farmingHeaders} tableName='farming' currencyCells={farmingCurrencyCells} allLoaded={userData.hasROI}/>
        </div>

      </div>

    </div>
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
export default connect(mapState, mapDispatch)(MyAssets)