/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './components/GlobalStyles'
import { colourTheme, darkTheme } from './components/GlobalStyles/themes'
import { connect } from 'react-redux'
import * as actions from './store/actions'
import { ModalProvider } from './components/Modal/ModalContext'
import Layout from './HOC/layout'
// pages
import Welcome from './containers/Homepage';
import Dashboard from './containers/Dashboard';
import TokenDetails from './containers/TokenDetails';
import FarmingFieldDetails from './containers/FarmingFieldDetails/FarmingFieldDetails';
import EarningFieldDetails from './containers/EarningFieldDetails/EarningFieldDetails';
import Careers from './containers/Careers';
import DataLoading from './containers/DataLoading'
import TableViews from './containers/Tables'

import { withRouter } from 'react-router-dom'

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  background-color: ${({theme}) => theme.background};
`;

const App = (props) => {
  useEffect(() => {
    if (!props.RoiCalculated) {
      if (!props.userAccounts.length) {
        props.history.push('/')
      } else if (props.history.location.pathname !== '/loading') {
        props.history.push('/loading')
      }
    }
  }, [props.RoiCalculated, props.userAccounts])

  if (window.ethereum) {
    window.ethereum.on('accountsChanged', function (accounts) {
      if (props.userAccounts !== accounts && accounts.length) {
        if (props.userAccounts.length) {
          props.setAccounts(accounts)
        }
      } else {
        props.setAccounts([])
        if (props.history.location.pathname !== 'careers') {
          props.history.push('/')
        }
      }
    });
  }
  //TODO: fix metamask and accounts handling
  return (
    <ThemeProvider theme={props.themeUI === 'colour' ? colourTheme : darkTheme} >
      <ModalProvider>
        <StyledApp>
          <Layout>
            {props.userAccounts.length ?
              <Switch>
                <Route path='/' exact render={() => <Welcome />} />
                <Route path='/loading' exact render={() => <DataLoading />} />
                <Route path='/dashboard' exact render={() => <Dashboard />} />
                <Route path='/tokens' exact render={() => <TableViews />} />
                <Route path='/tokens/:id' render={(props) => <TokenDetails {...props.match.params} />} />
                <Route path='/earning' exact render={() => <TableViews />} />
                <Route path='/earning/:id' render={(props) => <EarningFieldDetails {...props.match.params} />} />
                <Route path='/farming' exact render={() => <TableViews />} />
                <Route path='/farming/:id' render={(props) => <FarmingFieldDetails {...props.match.params} />} />
                <Route path='/careers' exact render={() => <Careers />} />
                <Route path='/careers/:id' exact render={(props) => <Careers {...props.match.params} />} />
                <Route path="*" >
                  <Redirect to="/dashboard"/>
                </Route>
              </Switch>
              :
              <Switch>
                <Route path='/' exact render={() => <Welcome />} />
                <Route path='/careers' exact render={() => <Careers />} />
                <Route path='/careers/:id' exact render={(props) => <Careers {...props.match.params} />} />
                <Route path="*" >
                  <Redirect to="/"/>
                </Route>
              </Switch>
            }
          </Layout>
          <GlobalStyles />
        </StyledApp>
      </ModalProvider>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    themeUI: state.UI.theme,
    userAccounts: state.App.userAccounts,
    RoiCalculated:  state.App.userData.hasROI
  }
}

const mapDispatch = dispatch => {
  return {
    setAccounts: (inputAccounts) => dispatch(actions.setAccounts(inputAccounts || []))
  }
} 

export default connect(mapStateToProps, mapDispatch)(withRouter(App));