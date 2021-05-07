import React, { useEffect, useState } from 'react';
import DetailsTable from '../../components/DetailsTable/DetailsTable';
import DetailsBarChart from '../../components/DetailsBarChart/DetailsBarChart';
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import * as S from './earning.style'

function _calcCombinedROI(combinedFields) {
  const {earningField, farmingFields} = combinedFields;
  const investmentValue = earningField.earningROI.histInvestmentValue;
  const earningReturnValue = earningField.earningROI.absReturnValue;
  const farmingReturnValue = farmingFields.reduce((acc, curr) => acc + curr.farmingROI.absReturnValue, 0);
  const absReturnValue = earningReturnValue + farmingReturnValue;
  const combinedROI = absReturnValue / investmentValue;

  return ({roi: combinedROI, abs: absReturnValue})
}

const EarningFieldDetails = ({ id, investments, history }) => {
  const [computations, setComputations] = useState({
    roi: {
      roi: 0,
      value: 0
    },
    combinedROI: {
      roi: 0,
      value: 0
    },
    farming: [],
    earning: [],
    investment: {
      hist: 0,
      current: 0
    }
  });
  
  const currentField = investments.find(field => field.fieldId === id);

  useEffect(() => {
    if (!!currentField) {
      const farming = investments.filter(field => !field.isEarning && field.seedTokens[0].tokenId === currentField.receiptToken)
      const roi = {
        value: Number(currentField.earningROI.absReturnValue),
        roi: currentField.earningROI.allTimeROI
      }
      const combinedRoi = _calcCombinedROI({ earningField: currentField, farmingFields: farming })
      setComputations({
        roi: roi,
        combinedROI: {
          roi: combinedRoi.roi,
          value: combinedRoi.abs
        },
        farming: farming,
        earning: currentField,
        investment: {
          hist: Number(currentField.earningROI.histInvestmentValue),
          current: Number(currentField.investmentValue)
        }
      })
    } else {
      history.push('/dashboard');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentField])

  return (
    <S.Container>
      {currentField ?
        <>
          <S.SectionTitle>
            <h2>{currentField?.name} {currentField?.isEarning ? '(earning)' : '(farming)'}</h2>
          </S.SectionTitle>
          <S.FieldDetails>
            <div>
              <p>Protocol</p>
              <p>{currentField?.protocol.name}</p>
            </div>
            <div>
              <p>Current APY</p>
              <p> {((currentField.earningAPY * 100).toFixed(2) || (currentField.farmingAPY * 100).toFixed(2)).toLocaleString('undefined', { style: 'precent' })} %</p>
            </div>
            <div>
              <p>Underlying tokens</p> 
              <p>{currentField.seedTokens.reduce((acc, curr) => [...acc, curr.name], []).join(', ')}</p>
            </div>
            <div>
              <p>Linked farming fields</p>
              <p>{computations.farming.reduce((acc, curr) => [...acc, curr.name], []).join(', ')}</p>
            </div>
          </S.FieldDetails>

          <S.SectionTitle>
            <h2>Investment Performance</h2>
          </S.SectionTitle>
          <S.SnapshotContainer>
            <S.DataContainer>
              <S.DetailBox>
                <h2> ROI </h2>
                <div>
                  <h3>
                  {computations.combinedROI.roi.toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})} ({computations.combinedROI.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })})
                  </h3>
                  <p> Farmed: {((computations.combinedROI.roi) - Number(computations.roi.roi)).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})} ({(computations.combinedROI.value - Number(computations.roi.value)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })})</p>
                </div>
              </S.DetailBox>
              <S.DetailBox>
                <h2>Investment Value</h2>
                <div>
                  <h3>{computations.investment.current.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h3>
                  <p> Cumulative: {computations.investment.hist.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                </div>
              </S.DetailBox>
            </S.DataContainer>
            {computations.earning && computations.farming.length &&
              <S.DataContainer style={{margin: '0px auto'}}>
                <DetailsBarChart data={{earningField: computations.earning, farmingFields: computations.farming}} type='earningAndFarming'/>
              </S.DataContainer>
            }
          </S.SnapshotContainer>
          <S.SectionTitle>
            <h2>Transaction history</h2>
          </S.SectionTitle>
          <DetailsTable txHistory={currentField.userTxHistory} name={currentField.name}/>
        </>
        :
        <div>
          Loading...
        </div>
      }
    </S.Container>
  )
}

const mapState = state => {
  return {
    investments: state.App.userData.investments.data
  }
}
export default connect(mapState)(withRouter(EarningFieldDetails));