import React, {useState, useEffect} from 'react';
import DetailsPieChart from '../../components/DetailsPieChart/DetailsPieChart';
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import * as S from '../EarningFieldDetails/earning.style'
import TransactionsTable from '../../components/TableTypes/TransactionTable'

//TODO: identify joint components with EarningFieldDetails container
function _findUnderlyingFarmingTokens (currentField, userFields) {
  if (currentField.seedTokens[0].isBase) {
    return currentField.seedTokens;
  } else {
    return userFields.find(userField => userField.receiptToken === currentField.seedTokens[0].tokenId).seedTokens;
  }
}

const FarmingFieldDetails = ({id, investments, history}) => {
  const [underlyingTokens, setUnderlyingTokens] = useState([]);
  const [mainAPY, setMainAPY] = useState(0);
  const [secondaryFarmingTokens, setSecondaryFarmingTokens] = useState(null);
  const [secondaryAPYs, setSecondaryAPYs] = useState(null);
  const [lockedValue, setLockedValue] = useState({title: 'Current', value: 0});
  const [ROIValue, setROIValue] = useState({ title: 'Total ROI', value: 0 });
  
  const currentField = investments.find(field => field.fieldId === id);
  if (!currentField) {
    history.push('/dashboard');
  }

  useEffect(() => {
    if (currentField) {
      setUnderlyingTokens(_findUnderlyingFarmingTokens (currentField, investments));
      setMainAPY(currentField.farmingAPY.primaryAPY ? `${(currentField.farmingAPY.primaryAPY.APY * 100).toFixed(2)}% (${currentField.farmingAPY.primaryAPY.name})` : `${(currentField.farmingAPY * 100).toFixed(2)}% (${currentField.cropTokens[0].name})`);
      const tempSecondaryFarmingTokens = currentField.farmingAPY.secondaryAPYs ? currentField.farmingAPY.secondaryAPYs : null;
      if (tempSecondaryFarmingTokens) {
        setSecondaryFarmingTokens(tempSecondaryFarmingTokens);
        setSecondaryAPYs(tempSecondaryFarmingTokens.reduce((acc, curr) => `${acc} ${(curr.cropAPY * 100).toFixed(2)}% (${curr.cropToken.name}), `, '').slice(0, -2))
      }

      setLockedValue({title: 'Current', value: Number(currentField.investmentValue)});
      setROIValue({title: 'Total ROI', value: Number(currentField.farmingROI.allTimeROI) })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentField]);

  return (
    <S.Container>
      {currentField ?
        <>
          <S.SectionTitle>
            <h2>{currentField?.name} (farming)</h2>
          </S.SectionTitle>
          <S.FieldDetails>
            <div>
              <p>Current APY</p>
              <p>{secondaryFarmingTokens ? mainAPY + ', ' + secondaryAPYs : mainAPY}</p>
            </div>
            <div>
              <p>Staking tokens</p>
              <p>{currentField.seedTokens[0].name}</p>
            </div>
            <div>
              <p>Underlying tokens</p>
              <p>{underlyingTokens.reduce((acc, curr) => [...acc, curr.name], []).join(', ')}</p>
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
                  {ROIValue.value.toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2})}
                  </h3>
                </div>
              </S.DetailBox>
              <S.DetailBox>
                <h2>Investment Value</h2>
                <div>
                  <h3>{Number(lockedValue.value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h3>
                  
                </div>
              </S.DetailBox>
            </S.DataContainer>
            {currentField.farmingROI && 
              <S.DataContainer style={{margin: '0px auto'}}> 
                <DetailsPieChart data={currentField.farmingROI} type='farming'/>
              </S.DataContainer>
            }
          </S.SnapshotContainer>
          <S.SectionTitle>
            <h2>Transaction history</h2>
          </S.SectionTitle>
          <TransactionsTable
            tableId={`farmingTransactions-${currentField.name}`}
            sortable
            filterable
            stickyHeader
            stickyHeaderTop='0px'
            align="center"
            data={currentField.userFarmingTxHistory}
          />
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
export default connect(mapState)(withRouter(FarmingFieldDetails));