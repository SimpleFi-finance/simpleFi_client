import React, { useState } from 'react';
import { ethers } from 'ethers';
import simpleFiSplash from '../../assets/images/simpleFi-splash-blue-sun.svg';
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import { withRouter } from 'react-router'
import * as S from './homepage.style'
import About from '../AboutUs'
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';

const Welcome = (props) => {
  const [checkAccount, setCheckAccount] = useState(false)
  const [accountValue, setAccountValue] = useState('');

  function handleChange(e) {
    setAccountValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    checkAccount && setCheckAccount(false)
    if (ethers.utils.isAddress(accountValue)) {
      props.setAccount([accountValue.toLowerCase()]);
      props.history.push('/loading');
    } else {
      alert('Please enter a valid Ethereum address  ----- homepage')
    }
  }
  return (
    <>
      <S.Container id={'container'}>
        <S.Section id={'section-home'}>
          <S.Landing>
            <S.TitleText>
              Making decentralized finance accessible to everyone
            </S.TitleText>
            <img src={simpleFiSplash} alt="Welcome to SimpleFi"/>
          </S.Landing>
          <S.ConnectWallet>
            <S.ConnectWalletButton
              onClick={() =>
                props.connectAccount(props.history)}
            >
              {props.userAccounts.length
                ? 'Enter dashboard'
                : 'Connect wallet'
              }
            </S.ConnectWalletButton>
            <S.CheckAddress>
              {checkAccount ?
                <S.CheckAddressForm type="text" value={accountValue} onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      placeholder="e.g. 0xf147b...a133934"
                      name="name"
                      onChange={handleChange}
                    />
                    <Tooltip title='Lookup'>
                      <button
                        type="submit"
                        value="Submit">
                        <SearchIcon />
                      </button>
                    </Tooltip>
                    <Tooltip title='Close'>
                      <button
                        type="cancel"
                        color={'red'}
                        onClick={() => setCheckAccount(false)}
                        style={{ color: 'red' }}
                      >
                        <ClearIcon />
                      </button>
                    </Tooltip>
                  </div>
                </S.CheckAddressForm>
                :
                <S.AltConnect onClick={(e) => setCheckAccount(true)}>check account instead</S.AltConnect> 
              }
            </S.CheckAddress>
          </S.ConnectWallet>
        </S.Section>
        <S.Section id={'section-about'}>
          <About />
        </S.Section>
        <S.Section id={'section-holders'}>
          <p> Stakeholders</p>
          <div> insert logos </div>
        </S.Section>
        <S.Section id={'section-simpefi'}>
          <p> What we do </p>
          <div> insert dapp </div>
        </S.Section>
        <S.Section id={'section-partners'}>
          <p> Our Partners </p>
          <div> insert logos </div>
        </S.Section>
      </S.Container>
    </>
  )
}

const mapState = state => {
  return {
    userAccounts: state.App.userAccounts
  }
}
const mapDispatch = dispatch => {
  return {
    setAccount: (accounts) => dispatch(actions.setAccounts(accounts)),
    connectAccount: (history) => dispatch(actions.connectMetaMaskWallet(history))
  }
}

export default connect(mapState, mapDispatch)(withRouter(Welcome));