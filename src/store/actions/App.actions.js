import * as actionTypes from './actionTypes.actions';
import axios from '../../utils/axiosInstances/axios-backend'
import axiosUserData from '../../utils/axiosInstances/axios-userdata'
import apis from '../../apis';
import getTokenPrices from '../../utils/getTokenPrices';
import helpers from '../../helpers'
// TODO: add notifications
// ---------------- Generic actions ------------------

const _metaMaskConnect = async () => {
  try {
    return await window.ethereum.request({ method: 'eth_requestAccounts' });
  } catch (err) {
    alert('Metamask Error - Please refresh')
    console.error('metamask connect',err)
    return { err }
  }
}

export const _setLoading = (dataType, collection, bool) => {
  return {
    type: actionTypes.SET_LOADING,
    payload: {
      dataType,
      collection,
      loading: bool
    }
  }
}

export const _setError = (dataType, collection, error) => {
  return {
    type: actionTypes.SET_ERRORS,
    payload: {
      dataType,
      collection,
      error: error
    }
  }
}

export const _attachContracts = (type, collection) => {
  return dispatch => {
    const updatedCollection = apis.createBalanceContracts(collection)
    dispatch(_setTracked(type, updatedCollection))
  }  
}

export const _setTracked = (type, payload) => {
  return {
    type: actionTypes.SET_TRACKED,
    payload: {
      collection: type,
      data: payload
    }
  }
}

export const _setUserData = (type, collection) => {
  return {
    type: actionTypes.SET_USER_DATA,
    payload: {
      collection: type,
      data: collection
    }
  }
}

export const _setRewoundFlag = (type) => {
  return {
    type: actionTypes.SET_REWOUND,
    payload: type
  }
}

export const _setRoiCalculated = () => {
  return {
    type: actionTypes.SET_ROI_CALCULATED
  }
}
export const _setUserDataPrices = (type, collection) => {
  return {
    type: actionTypes.SET_USER_DATA_PRICES,
    payload: {
      collection: type,
      data: collection
    }
  }
}
export const _setAccountSuccess = (accounts) => {
  return {
    type: actionTypes.SET_ACCOUNTS,
    payload: accounts
  }
}
// ---------------------------------------------------
export const accountLogging = ({account, signed}) => {
  return dispatch => {
    axiosUserData.post(`/accounts/${account}`, {
      signed: signed
    })
  }
}

export const setAccounts = (inputAccount = []) => {
  return dispatch => {
    localStorage.setItem('account', inputAccount)
    dispatch(_setAccountSuccess(inputAccount))
  }
}

export const connectMetaMaskWallet = (history) => {
  return async dispatch => {
    if (window.ethereum) {
      const newAccount = await _metaMaskConnect();
      if (newAccount.error) {
        if (newAccount.error.code === 4001) {
          alert('Please Connect to Metamask')
        } else {
          alert('Oops, something went wrong - page will reload')
          window.location.reload();
        }
      } else if (newAccount.length) {
        // TODO: add call to backend for userdata tracking
        dispatch(accountLogging({ account: newAccount[0], signed: true }))
        dispatch(setAccounts(newAccount))
        history.push('/loading');
      }
    } else {
      alert('Please install Metamask to use SimpleFi (https://metamask.io/)')
    }
  }
}
// ------------- tracked contracts ------------

export const getTrackedTokens = () => {
  return (dispatch) => {
    dispatch(_setLoading('trackedData', 'tokens', true))

    axios.get('/tokens').then(response => {
      dispatch(_attachContracts('tokens', response.data));
    })
    .catch(err => {
      console.log(err)
      alert('Something went wrong retrieving tokens - please retry')
      window.location.reload();
    })
  }
}

export const getTrackedInvestments = () => {
  return dispatch => {
    dispatch(_setLoading('trackedData', 'investments', true))
    axios.get('/investments').then(response => {
      dispatch(_attachContracts('investments', response.data))
    })
    .catch(err => {
      console.log(err)
      alert('Something went wrong retrieving investments - please retry')
      window.location.reload();
    })
  }
}

export const getTrackedData = () => {
  return dispatch => {
    dispatch(getTrackedTokens())
    dispatch(getTrackedInvestments())
  }
}
// -------------------USER data---------------------

export const getUserTransactions = (addresses) => {
  return dispatch => {
    axios.get(`/users/transactions/${addresses[0]}`)
    .then(response => {
      dispatch(_setUserData('transactions', response.data))
    })
    .catch(err => {
      alert('Something went wrong retrieving transactions - please retry')
      window.location.reload();
    })
  }
}

export const getUserTokensBalance = (addresses, trackedData) => {
  return dispatch => {
    apis.getAllUserBalances(addresses[0], trackedData.tokens.data)
    .then(tokensBalances => {
      dispatch(_setUserData('tokens', tokensBalances))
    })
    .catch(err => {
      alert('Something went wrong calculating tokens balances - please retry')
    })
  }
}

// getstate fields and tokens and calc user balances and return fields with balances
export const getUserInvestmentsBalance = (addresses, trackedData) => {
  return dispatch => {
    apis.getAllUserBalances(addresses[0], trackedData.investments.data)
      .then(balances => {
      // populate seedFields contracts
      const balancesWithContracts = helpers.populateFieldTokensFromCache(balances, trackedData.tokens.data)
      dispatch(_setUserData('investments', balancesWithContracts))
    })
    .catch(err => {
      console.log(err)
    })
  }
}

// calculate unclaimed rewards

export const getUserUnclaimedBalance = (addresses, trackedData) => {
  return dispatch => {
    apis.getUnclaimedRewards(addresses[0], trackedData.investments.data).then(unclaimedBalances => {
      dispatch(_setUserData('unclaimed', unclaimedBalances))
    })
  }
}


export const getUserData = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const trackedData = state.App.trackedData;
    const accounts = state.App.userAccounts;
    dispatch(getUserTransactions(accounts))
    dispatch(getUserTokensBalance(accounts, trackedData))
    dispatch(getUserUnclaimedBalance(accounts, trackedData))
    dispatch(getUserInvestmentsBalance(accounts, trackedData))
  }
}

//--------------------- APY and ROI -------------------------

export const rewindHoldings = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { trackedData, userData } = state.App
    apis.rewinder(userData.investments.data, trackedData.tokens.data, trackedData.investments.data)
      .then(underlyingInvestments => {
        //tokens
        const lockedBalanceTokens = helpers.addLockedTokenBalances(underlyingInvestments.userTokenBalances, userData.tokens.data);
        const tokensWithUnclaimedBalance = helpers.addUnclaimedBalances(userData.unclaimed.data, lockedBalanceTokens, trackedData.tokens.data);
        //investments
        const stakedInvestments = helpers.addStakedFieldBalances(underlyingInvestments.userFeederFieldBalances, userData.investments.data);
        const investmentsWithSuppliesAndReserves = helpers.addFieldSuppliesAndReserves(underlyingInvestments.fieldBalances, stakedInvestments)

        dispatch(_setRewoundFlag('tokens'))
        dispatch(_getTokenPrices(tokensWithUnclaimedBalance, investmentsWithSuppliesAndReserves))
    })
  }
}

export const _getTokenPrices = (userTokensRewound, investmentsWithSuppliesAndReserves) => {
  return (dispatch, getState) => {
    const state = getState();
    const trackedTokens = state.App.trackedData.tokens;

    getTokenPrices(userTokensRewound, investmentsWithSuppliesAndReserves, trackedTokens.data)
      .then(tokenPrices => {
        const investmentsWithValues = helpers.addFieldInvestmentValues(investmentsWithSuppliesAndReserves, tokenPrices)

        dispatch(_getUserReturns(investmentsWithValues, userTokensRewound, tokenPrices));
    })
  }
}

export const _getUserReturns = (userInvestments, userTokensRewound, userTokenPrices) => {
  return (dispatch, getState) => {
    const state = getState();
    const accounts = state.App.userAccounts;
    const trackedData = state.App.trackedData;
    const userTransactions = state.App.userData.transactions.data
    apis.getAPYs(userInvestments, userTokensRewound, userTokenPrices)
      .then(investmentsWithAPYs => {
      const accountsNew = accounts.map(el => el.toLowerCase())
      apis.getROIs(
        accountsNew[0],
        investmentsWithAPYs,
        trackedData.investments.data,
        userTransactions.userTokenTransactions,
        userTransactions.userNormalTransactions,
        trackedData.tokens.data,
        userTokensRewound,
        userTokenPrices
      ).then(investmentsWithROI => {
        dispatch(_setUserData('tokens', userTokensRewound))
        dispatch(_setUserData('investments', investmentsWithROI))
        dispatch(_setUserData('tokenPrices', userTokenPrices))
        dispatch(_setRoiCalculated())
      })
    })
  }
}
