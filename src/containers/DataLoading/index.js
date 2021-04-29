/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import * as S from './DataLoading.style'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import { withRouter } from 'react-router-dom'
import ProgressBar from '../../components/UI/ProgressBar'
import { SwitchTransition } from 'react-transition-group'
import Background from '../../components/UI/BackgroundLoading'
import Logo from '../../components/UI/Logo'
/**
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
    history,
    trackedData,
    rewindHoldings,
    userAccounts,
    getTrackedData,
    getUserData,
    userData
  } = props

  const [fetchStage, setFetchStage] = useState('trackedData')
  const [progress, setProgress] = useState(0)

  const displayHelper = {
    trackedData: 'Gathering Protocols Data',
    userData: 'Collecting User Portfolio and activity',
    userBalances: 'Rewinding Balances',
    userROI: 'Calculating ROI and APY'
  }
  useEffect(() => {
    //get tracked fields and tokens with contracts and user data
    if (userAccounts.length && !trackedData.tokens.fetched && !userData.tokens.rewound && !trackedData.tokens.loading) {
      getTrackedData();
      setProgress(progress + 1)
    }
    if (_completeFetchingData(trackedData) && !userData.tokens.rewound) {
      setFetchStage('userData')
      getUserData();
      setProgress(progress + 1)
    }
  }, [
    trackedData.tokens.fetched,
    trackedData.investments.fetched
  ])

  useEffect(() => {
    // get underlying holdings of user from fields
    if (_completeFetchingData(userData) && !userData.tokens.rewound) {
      setFetchStage('userBalances')
      rewindHoldings()
      setProgress(progress + 1)
    }
  }, [
    userData.tokens.fetched,
    userData.investments.fetched,
    userData.unclaimed.fetched,
    userData.transactions.fetched
  ])

  useEffect(() => {
    if (_completeFetchingData(userData) && userData.hasROI) {
      setFetchStage('userROI')
      setProgress(progress + 1)
      setTimeout(() => history.push('/dashboard'), 3000)
    }
  }, [userData.hasROI])

  return (
    <>
      <Background />
      <S.Container>
        <S.LoadingTextContainer>
          <SwitchTransition mode={'out-in'}>
            <S.TransitionSt
              key={fetchStage}
              timeout={500}
            >
              <p>
                {displayHelper[fetchStage]}
              </p>
            </S.TransitionSt>
          </SwitchTransition>
        </S.LoadingTextContainer>
        <S.LogoSpinner>
          <Logo type={'icon'} />
        </S.LogoSpinner>
        <S.ProgressBar>
          <ProgressBar value={progress / Object.keys(displayHelper).length * 100} max={100} />
        </S.ProgressBar>
      </S.Container>
    </>
  )
}


const mapState = state => {
  return {
    userAccounts: state.App.userAccounts,
    trackedData: state.App.trackedData,
    userData: state.App.userData,
  }
}

const mapDispatch = dispatch => {
  return {
    getTrackedData: () => dispatch(actions.getTrackedData()),
    getUserData: () => dispatch(actions.getUserData()),
    rewindHoldings: () => dispatch(actions.rewindHoldings())
  }
}

export default connect(mapState, mapDispatch)(withRouter(DataLoading));