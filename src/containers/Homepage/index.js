import React, { useState, useRef, useEffect } from 'react';
import { ethers } from 'ethers';
import simpleFiSplash from '../../assets/images/simpleFi-splash-blue-sun.svg';
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import { withRouter } from 'react-router'
import * as S from './homepage.style'
import About from '../../components/AboutUs'
import Partners from '../../components/Partners';
import useVisibility from '../../hooks/useVisibility.hook'
import { Input } from '../../components/UI/Forms'

const Welcome = (props) => {
  const loginSection = useRef()
  const aboutSection = useRef()
  const homepageRef = useRef()
  const partnershipSection = useRef()
  const [checkAccount, setCheckAccount] = useState(false)
  const [accountValue, setAccountValue] = useState('');
  const isLoginVis = useVisibility(loginSection)
  const isAboutVis = useVisibility(aboutSection)
  const isPartnerVis = useVisibility(partnershipSection)

  const handleChange = (value) => {
    setAccountValue(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    checkAccount && setCheckAccount(false)
    if (ethers.utils.isAddress(accountValue)) {
      props.setAccount([accountValue.toLowerCase()]);
      // TODO: add call to backend for userdata tracking
      props.accountLogging(accountValue.toLowerCase(), false)
      props.history.push('/loading');
    } else {
      alert('Please enter a valid Ethereum address  ----- homepage')
    }
  }

  const onScroll = () => {
    if (isAboutVis && !isLoginVis && !isPartnerVis) {
      props.history.push('/#about')
    } else {
      props.history.push('/')
    }
  }

  useEffect(() => {
    if (props.history.location.hash.includes('about')) {
      aboutSection.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [props.history.location.hash])

  const onEnterDash = () => {
    if (props.userAccounts.length) {
      props.history.push('/dashboard')
    } else {
      props.connectAccount(props.history)
    }
  }
  useEffect(() => {
      document.addEventListener('scroll', onScroll, true)
      return () => document.removeEventListener('scroll', onScroll, true)
  })
  
  return (
    <>
      <S.Container ref={homepageRef}>
        <S.Section ref={loginSection} >
          <S.Landing>
            <S.TitleText>
              Making decentralized finance accessible to everyone
            </S.TitleText>
            <img src={simpleFiSplash} alt="Welcome to SimpleFi" />
          </S.Landing>
          <S.ConnectWallet>
            {!checkAccount && 
              <S.ConnectWalletButton
                onClick={() => onEnterDash()}
              >
                {props.userAccounts.length || window.ethereum.selectedAddress
                  ? 'Enter dashboard'
                  : 'Connect wallet'
                }
              </S.ConnectWalletButton>
            }
            <S.CheckAddress>
              {checkAccount ?
                <S.CheckAddressForm type="text" value={accountValue} onSubmit={handleSubmit}>
                  <Input
                    change={(value) => handleChange(value)}
                    onClose={() => setCheckAccount(false)}
                    placeholder="e.g. 0xf147b...a133934"
                    type="text"
                    hasSearch
                  />
                </S.CheckAddressForm>
                :
                <S.AltConnect onClick={(e) => setCheckAccount(true)}>Check an account instead</S.AltConnect> 
              }
            </S.CheckAddress>
          </S.ConnectWallet>
        </S.Section>
        <S.Section ref={aboutSection}>
          <About />
        </S.Section>
        <S.Section ref={partnershipSection} >
          <Partners />
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
    connectAccount: (history) => dispatch(actions.connectMetaMaskWallet(history)),
    accountLogging: (account, signed) => dispatch(actions.accountLogging({account: account, signed: signed}))
  }
}

export default connect(mapState, mapDispatch)(withRouter(Welcome));