/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './components/GlobalStyles'
import { colourTheme, darkTheme } from './components/GlobalStyles/themes'
import { connect } from 'react-redux'
import * as actions from './store/actions'
import { ModalProvider } from './components/Modal/ModalContext'
import Layout from './HOC/layout'
// pages
import Welcome from './containers/Homepage';
import Portfolio from './containers/Portfolio';
import TokenDetails from './containers/TokenDetails/TokenDetails';
import FarmingFieldDetails from './containers/FarmingFieldDetails/FarmingFieldDetails';
import EarningFieldDetails from './containers/EarningFieldDetails/EarningFieldDetails';
import Careers from './containers/Careers';
import About from './containers/AboutUs'
import DataLoading from './containers/DataLoading'
import { withRouter } from 'react-router-dom'

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const App = (props) => {
  useEffect(() => {
    if (!props.RoiCalculated) {
      if (props.history.location.pathname !== '/' && props.history.location.pathname !== '/loading') {
        props.history.push('/loading')
      }
    }
  }, [props.RoiCalculated, props.userAccounts])

  return (
    <ThemeProvider theme={props.themeUI === 'colour' ? colourTheme : darkTheme} >
      <ModalProvider>
        <StyledApp>
          <Layout>
            <Switch>
              <Route path='/' exact render={() => <Welcome />} />
              <Route path='/loading' exact render={() => <DataLoading />} />
              <Route path='/dashboard' exact render={() => <Portfolio />} />
              <Route path='/token/:tokenName' exact render={() => <TokenDetails />}/>
              <Route path='/farming/:fieldName' exact render={() => <FarmingFieldDetails />}/>
              <Route path='/earning/:fieldName' exact render={() => <EarningFieldDetails />}/>
              <Route path='/careers' exact render={() => <Careers />} />
              <Route path='/about' exact render={() =>  <About />} />
            </Switch> 
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