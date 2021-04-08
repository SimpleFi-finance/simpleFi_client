/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import * as S from './DataLoading.style'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
/**
 * 
 * @dev This page is only used when a user changes accounts or enters the dashboard for first time to compute all needed data. Data will then be updated dynamically
 */

// all data fetching methods go here, all laoding props go here, visualise what the app is fetching 
const _completeFetchingData = (collection) => {
  const dataSetsCondition = []
  for (const el in collection) {
    dataSetsCondition.push(collection[el].fetched)
  }
  return !dataSetsCondition.includes(false)
}

const DataLoading = (props) => {

  const {
    trackedData,
    rewindHoldings,
    userAccounts,
    getTrackedData,
    getUserData,
    userData
  } = props

  useEffect(() => {
    //get tracked fields and tokens with contracts and user data
    if (userAccounts.length && !trackedData.tokens.fetched && !userData.tokens.rewound) {
      getTrackedData();
    }
    if (_completeFetchingData(trackedData) && !userData.tokens.rewound) {
      getUserData();
    }
  }, [trackedData.tokens.fetched, trackedData.investments.fetched])

  // get underlying holdings of user from fields
  useEffect(() => {
    if (_completeFetchingData(userData) && !userData.tokens.rewound) {
      rewindHoldings()
    }
  }, [userData.tokens.fetched, userData.investments.fetched, userData.unclaimed.fetched, userData.transactions.fetched])

  return (
    <S.Container>
      <div>
        <p> Preparing dApplication </p>
        <p>
          Loading tracked Tokens
        </p>
        <p> Loading tracked Fields</p>
        <p> Creating contract interfaces </p>
      </div>
      <div>
        <p> Loading balances </p>
        <p> Fetching Token and farming balances </p>
        <p> Fetching transactions history</p>
        <p> Fetching unclaimed rewards</p>
      </div>
      <div>
        <p> Rewinding invested balances </p>
        <p> Rewinding underlying farming investments </p>
        <p> Rewinding underlying tokens </p>
      </div>
      <div>
        <p> Calculating APYs and ROIs </p>
        <p> Fetching token and field prices </p>
        <p> Calculating APYs </p>
        <p> Calculating ROIs </p>
      </div>
    </S.Container>
  )
}

const mapState = state => {
  return {
    userAccounts: state.App.userAccounts,
    trackedData:  state.App.trackedData,
    userData: state.App.userData
  }
}

const mapDispatch = dispatch => {
  return {
    getTrackedData: () => dispatch(actions.getTrackedData()),
    getUserData: () => dispatch(actions.getUserData()),
    rewindHoldings: () => dispatch(actions.rewindHoldings())
  }
}

export default connect(mapState, mapDispatch)(DataLoading);