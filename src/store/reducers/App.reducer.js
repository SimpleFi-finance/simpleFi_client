import * as actionTypes from '../actions/actionTypes.actions'
import { updateObject } from '../utils.store'

const initialState = {
  userAccounts: ['0x6A634f1Bec0E530C41cb81241aCC74fD0E3acB11'],
  trackedData: {
    tokens: {
      fetched: false,
      loading: false,
      error: null,
      data: [],
    },
    investments: {
      loading: false,
      error: null,
      fetched: false,
      data: []
    }
  },
  userData: {
    tokens: {
      fetched: false,
      error: null,
      loading: false,
      rewound: false,
      data: []
    },
    investments: {
      loading: false,
      error: null,
      fetched: false,
      data: []
    },
    unclaimed: {
      loading: false,
      error: null,
      fetched: false,
      data: []
    },
    transactions: {
      loading: false,
      error: null,
      fetched: false,
      data: []
    },
    tokenPrices: {
      data: []
    },
    hasROI: false
  }
}

const setLoading = (state, action) => {
  const { dataType, collection, loading } = action.payload;

  const updatedCollection = {
    ...state[dataType][collection],
    loading: loading
  }

  return updateObject(state, {
    [dataType]: {
      ...state[dataType],
      [collection]: updatedCollection
    }
  })
}

const setError = (state, action) => {
  const { dataType, collection, error } = action.payload;

  const updatedCollection = {
    ...state[dataType][collection],
    error: error
  }

  return updateObject(state, {
    [dataType]: {
      ...state[dataType],
     [collection]: updatedCollection
    }
  })
}

const setAccounts = (state, action) => {
  return updateObject(state, { userAccounts: action.payload || []})
}

const setTracked = (state, action) => {
  const { collection, data } = action.payload;

  const updatedState = {
    ...state.trackedData,
    [collection]: {
      ...state.trackedData[collection],
      loading: false,
      fetched: true,
      data: data
    }
  }

  return updateObject(state, {
    trackedData: updatedState
  })
}

const setRewoundFlag = (state, action) => {
  const updatedState = {
    ...state.userData,
    [action.payload]: {
      ...state.userData[action.payload],
      rewound: true
    }
  }
  return updateObject(state, { userData: updatedState })
}

const setUserData = (state, action) => {
  const { collection, data } = action.payload;

  const updatedState = {
    ...state.userData,
    [collection]: {
      ...state.userData[collection],
      loading: false,
      fetched: true,
      data: data
    }
  }

  return updateObject(state, { userData: updatedState })
}

const setUserDataPrices = (state, action) => {
  const { collection, data } = action.payload;

  const updatedState = {
    ...state.userData,
    [collection]: {
      ...state.userData[collection],
      prices: data
    }
  }

  return updateObject(state, { userData: updatedState })
}

const setRoiCalculated = (state, action) => {
  return updateObject(state, {
    userData: {
      ...state.userData, hasROI: true
    }
  })
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACCOUNTS:
      return setAccounts(state, action);
    case actionTypes.SET_LOADING:
      return setLoading(state, action);
    case actionTypes.SET_ERRORS:
      return setError(state, action);
    case actionTypes.SET_TRACKED:
      return setTracked(state, action);
    case actionTypes.SET_USER_DATA:
      return setUserData(state, action);
    case actionTypes.SET_REWOUND:
      return setRewoundFlag(state, action);
    case actionTypes.SET_USER_DATA_PRICES:
      return setUserDataPrices(state, action);
    case actionTypes.SET_ROI_CALCULATED:
      return setRoiCalculated(state, action);
    default:
      return state;
  }
}

export default reducer