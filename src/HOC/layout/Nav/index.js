import React from 'react';
import UserWallet from '../../../components/UI/WalletDetails'
import Logo from '../../../components/UI/Logo'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import * as S from './navbar.style'

const Nav = ({ userAccount, history }) => {
  const style = {
    gridColumn: '8 / 11'
  }
  
  const currentLocation = history.location.pathname;
  
  let title = 'SimpleFi';

  switch (currentLocation) {
    case '/dashboard':
      title = 'Account Overview';
      break;
    case '/tokens':
      title = 'Tokens';
      break
    case '/earning':
      title = 'Invested'
      break
    case '/farming':
      title = 'Staked positions'
      break
    default:
      title = '';
      break
  }

  const goBack = () => {
    const loc = currentLocation.split('/').filter(el => el)
    const backLoc = loc.slice(0, -1).join('/')
    if (!backLoc) {
      history.push(`/dashboard`)
    } else {
      history.push(`/${backLoc}`)
    }
  }

  return (
    <S.Nav>
      {currentLocation !== '/' && currentLocation !== '/careers'
      ?
        <>
          {currentLocation !== '/dashboard' &&
            <button
              onClick={() => goBack()}
            >
              <ArrowBackIosIcon />
              Back
            </button>
          }
          <p>{title}</p>
          <UserWallet userAccount={userAccount} style={style} />
        </>
        :
        <>
          <S.LogoContainer>
            <Logo />
          </S.LogoContainer>
          <S.HomepageNav>
            {currentLocation !== '/' && <button onClick={() => history.push('/')}>home</button> } 
            <button onClick={() => history.push('/#about')}>about</button>
            <button onClick={() => history.push('/careers')}>careers</button>
          </S.HomepageNav>
        </>
      }
    </S.Nav>
  )
}

export default Nav;