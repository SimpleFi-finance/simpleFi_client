import React from 'react';
import * as S from './TokenDetails.style'
import DetailsPieChart from '../../components/DetailsPieChart/DetailsPieChart';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import OverviewCard from '../../components/UI/OverviewCard'

function _extractTotalTokenBalance(token) {
  const unlockedBalance = token.userBalance ? token.userBalance : 0;
  const lockedBalance = token.lockedBalance ? token.lockedBalance.reduce((acc, lockedBalance) => acc + lockedBalance.balance, 0) : 0;
  const unclaimedBalance = token.unclaimedBalance ? token.unclaimedBalance.reduce((acc, unclaimedBalance) => acc + unclaimedBalance.balance, 0) : 0;
  return unlockedBalance + lockedBalance + unclaimedBalance;
}

const TokenDetails = (props) => {
  const {
    tokens,
    prices,
    history,
    id
  } = props;
  
  let totalBalance, totalValue
  const currentToken = tokens.find(userToken => userToken.tokenId === id);
  if (!currentToken) {
    history.push('/dashboard');
  } else {
    totalBalance = currentToken && _extractTotalTokenBalance(currentToken);
    totalValue = currentToken && totalBalance * prices[currentToken.name].usd;
  }
  
  return(
    <S.Container>
      {currentToken ?
        <>
          <S.TokenHeader>
            <h2>{currentToken.name || '--'}</h2>
            {currentToken.address &&
              <div>
                <p>Contract address</p>
                <a href={`https://etherscan.io/token/${currentToken?.address}`} target="_blank" rel="noreferrer">{currentToken?.address}</a>
              </div>
            }
          </S.TokenHeader>
          <S.TokenContent>
            <S.OverviewToken>
              <OverviewCard
                title='Total Balance'
                amount={totalBalance.toFixed(2)}
              />
              <OverviewCard
                title='Current Value'
                amount={Number(totalValue).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
              />
            </S.OverviewToken>
            <S.TokenBreakdown>
              <h3>Breakdown of funds</h3>
              <div>
                <DetailsPieChart data={currentToken} type='token'/>
              </div>
            </S.TokenBreakdown>
          </S.TokenContent>
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
    tokens: state.App.userData.tokens.data,
    prices: state.App.userData.tokenPrices.data
  }
}

export default connect(mapState)(withRouter(TokenDetails))