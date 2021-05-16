import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import uiReducer from './store/reducers/UI.reducer'
import appReducer from './store/reducers/App.reducer'

import thunk from 'redux-thunk';

const composeEnhancers = process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const rootReducer = combineReducers({
  UI: uiReducer,
  App: appReducer
});

const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(thunk)	
));


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
