import React from 'react';
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
import MyAssets from './containers/MyAssets/MyAssets';
import TokenDetails from './containers/TokenDetails/TokenDetails';
import FarmingFieldDetails from './containers/FarmingFieldDetails/FarmingFieldDetails';
import EarningFieldDetails from './containers/EarningFieldDetails/EarningFieldDetails';
import Careers from './containers/Careers';
import About from './containers/AboutUs'
import DataLoading from './containers/DataLoading'

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const App = (props) => {

  return (
    <ThemeProvider theme={props.themeUI === 'colour' ? colourTheme : darkTheme} >
      <ModalProvider>
        <StyledApp>
          <Layout>
            <Switch>
              <Route path='/' exact render={() => <Welcome />} />
              <Route path='/loading' exact render={() => <DataLoading />} />
              {/* <Route path='/dashboard' exact render={() => <MyAssets userTokens={userTokens} userFields={userFields} userAccount={props.userAccounts} userTokenPrices={userTokenPrices} setCurrentDetail={setCurrentDetail} allLoadedFlag={allLoadedFlag} />}/> */}
              <Route path='/dashboard' exact render={() => <MyAssets />}/>
              <Route path='/token/:tokenName' exact render={() => <TokenDetails />}/>
              {/* <Route path='/token/:tokenName' exact render={() => <TokenDetails name={currentDetail} userTokens={userTokens} userTokenPrices={userTokenPrices} />}/> */}
              <Route path='/farming/:fieldName' exact render={() => <FarmingFieldDetails />}/>
              {/* <Route path='/farming/:fieldName' exact render={() => <FarmingFieldDetails name={currentDetail} userFields={userFields} />}/> */}
              <Route path='/earning/:fieldName' exact render={() => <EarningFieldDetails />}/>
              {/* <Route path='/earning/:fieldName' exact render={() => <EarningFieldDetails name={currentDetail} userFields={userFields} />}/> */}
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
    userAccounts: state.App.userAccounts
  }
}

const mapDispatch = dispatch => {
  return {
    setAccounts: (inputAccounts) => dispatch(actions.setAccounts(inputAccounts || []))
  }
} 

export default connect(mapStateToProps, mapDispatch)(App);