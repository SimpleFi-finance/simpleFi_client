import React from 'react';
import './TokenDetails.css';
import DetailsPieChart from '../../components/DetailsPieChart/DetailsPieChart';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

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
    <div className="token-details">
      <div className="token-details-titles">
        <h2>{currentToken?.name || '--'}</h2>
        <p><span className='token-title-header'>Contract address</span>: <a href={`https://etherscan.io/token/${currentToken.address}`} target="_blank" rel="noreferrer">{currentToken.address}</a></p>
      </div>

      <div className="token-details-overviews">
        <div className="token-details-numbers">
          <div className="token-overview token-roi">
            <h2>Total balance</h2>
            <p>{Number(totalBalance.toFixed(2)).toLocaleString()}</p>
          </div>

          <div className="token-overview token-invested">
            <h2>Current value</h2>
            <p>${Number(totalValue.toFixed(2)).toLocaleString()}</p>
          </div>
        </div>

        <div className="token-source-container">
            <h2>Source of funds</h2>
          <div className="token-source-chart">
            <DetailsPieChart data={currentToken} type='token'/>
          </div>
        </div>
      </div>
    </div>
    )
}

const mapState = state => {
  return {
    tokens: state.App.userData.tokens.data,
    prices: state.App.userData.tokenPrices.data
  }
}

export default connect(mapState)(withRouter(TokenDetails))