import React, { useState, useRef } from 'react';
import { ethers } from 'ethers';
import simpleFiSplash from '../../assets/images/simpleFi-splash-blue-sun.svg';
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import { withRouter } from 'react-router'
import * as S from './homepage.style'
import About from '../AboutUs'
const Welcome = (props) => {

  const [accountValue, setAccountValue] = useState('');
  const accountFormRef = useRef(null);
  const accountButtonRef = useRef(null);

  function toggleForm(e, formRef, buttonRef) {
    e.preventDefault();
    const form = formRef.current.style;
    const button = buttonRef.current.style;
    form.display = 'flex';
    form.animation = 'growDown 300ms ease-in-out forwards';
    button.display = 'none';
  }

  function handleChange(e) {
    setAccountValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (ethers.utils.isAddress(accountValue)) {
      props.setAccount([accountValue.toLowerCase()]);
      props.history.push('/loading');
    } else {
      console.log('Please enter a valid Ethereum address  ----- homepage')
    }
  }

  return (
    <>
      <S.Container id={'container'}>
        <S.Section>
          <S.Landing>
            <S.TitleText>
              <h2>Making decentralized finance accessible to everyone</h2>
            </S.TitleText>
            <img src={simpleFiSplash} alt="Welcome to SimpleFi"/>
          </S.Landing>
          <S.ConnectData>
            <S.ConnectDataButton
              onClick={() =>
                props.connectAccount(props.history)}
            >
              {props.userAccounts.length
                ? 'View dashboard'
                : 'Connect wallet'
              }
            </S.ConnectDataButton>
            <S.AltConnect ref={accountButtonRef} onClick={(e) => toggleForm(e, accountFormRef, accountButtonRef)}>check account instead</S.AltConnect>
            <S.AltConnectForm ref={accountFormRef} type="text" value={accountValue} onSubmit={handleSubmit}>
              <input type="text"  placeholder="e.g. 0xf147b...a133934" name="name" onFocus={e => e.target.placeholder = ''} onBlur={e => e.target.placeholder = 'e.g. 0xf147b...a133934'} onChange={handleChange}/>
              <button type="submit" value="Submit">Check</button>
            </S.AltConnectForm>
          </S.ConnectData>
        </S.Section>
        <S.Section>
          <About />
        </S.Section>
        <S.Section>
          <p> Stakeholders</p>
          <div> insert logos </div>
        </S.Section>
        <S.Section>
          <p> What we do </p>
          <div> insert dapp </div>
        </S.Section>
        <S.Section>
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
    connectAccount: (history, currentAccounts) => dispatch(actions.connectMetaMaskWallet(history, currentAccounts))

  }
}
export default connect(mapState, mapDispatch)(withRouter(Welcome));