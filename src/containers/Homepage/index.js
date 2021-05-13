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
import MailchimpSubscriber from 'react-mailchimp-subscribe'
import WaitingListForm from '../../components/UI/WaitingListForm'
import { Input } from '../../components/UI/Forms'
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';

const Welcome = (props) => {
  const loginSection = useRef()
  const aboutSection = useRef()
  const homepageRef = useRef()
  const partnershipSection = useRef()
  const [y, setY] = useState(0)
  const [subscribeForm, setSubscribe] = useState(false)
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
      props.history.push('/loading');
    } else {
      alert('Please enter a valid Ethereum address  ----- homepage')
    }
  }

  const scrollDirection = (scroll) => {
    return y < scroll.scrollTop  ? 'down' : 'up'
  }

  const onScroll = () => {
    setY(homepageRef.current.scrollTop)
    if (scrollDirection(homepageRef.current) === 'down') {
      if (isLoginVis
        && homepageRef.current.scrollTop >= (aboutSection.current.clientHeight / 4)
        && homepageRef.current.scrollTop <= (aboutSection.current.clientHeight)
      ) {
        props.history.push('/#about')
        aboutSection.current.scrollIntoView({ block: 'center'})
      } else if (isAboutVis 
        && homepageRef.current.scrollTop >= (aboutSection.current.clientHeight / 4) + aboutSection.current.clientHeight
        && homepageRef.current.scrollTop <= (aboutSection.current.clientHeight) * 2
      ) {
        props.history.push('/#partners')
        partnershipSection.current.scrollIntoView({ block: 'center'})
      }
    } else {
      if (isPartnerVis
        && homepageRef.current.scrollTop <= (aboutSection.current.clientHeight) * 2 + (aboutSection.current.clientHeight / 2)
      ) {
        props.history.push('/#about')
        aboutSection.current.scrollIntoView({ block: 'center'})
      } else if (isAboutVis
        && homepageRef.current.scrollTop <= aboutSection.current.clientHeight + (aboutSection.current.clientHeight / 3)
      ) {
        props.history.push('/')
        loginSection.current.scrollIntoView({ block: 'center'})
      }
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', onScroll, true)
    return () => document.removeEventListener('scroll', onScroll, true)
  })

  useEffect(() => {
    homepageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    setTimeout(() => {
      setSubscribe(true)
    }, 1000)
  }, [])

  return (
    <>
      <S.Subscriber isVisible={subscribeForm}>
        <MailchimpSubscriber
          url={process.env.REACT_APP_MAILCHIMP_URL}
          render={({ subscribe, status, message }) => (
            <>
              <Tooltip title="Close">
                <button
                  type="cancel"
                  color={'red'}
                  onClick={() => setSubscribe(false)}
                  style={{ color: 'black' }}
                >
                  <ClearIcon />
                </button>
              </Tooltip>
              <WaitingListForm
                close={() => setSubscribe(false)}
                status={status}
                message={message}
                onValidated={formData => subscribe(formData)}
              />
            </>
          )}
        />
      </S.Subscriber>
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
                onClick={() =>
                  props.connectAccount(props.history)}
              >
                {props.userAccounts.length
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
        <S.Section ref={aboutSection} >
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
    connectAccount: (history) => dispatch(actions.connectMetaMaskWallet(history))
  }
}

export default connect(mapState, mapDispatch)(withRouter(Welcome));