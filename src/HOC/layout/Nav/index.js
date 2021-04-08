import React from 'react';
import UserWallet from '../../../components/UI/WalletDetails'
import Logo from '../../../components/UI/Logo'

import * as S from './navbar.style'

const Nav = ({ userAccount, history }) => {
  const style = {
    gridColumn: '8 / 11'
  }
  let title = 'SimpleFi'
  switch (history.location.pathname) {
    case '/dashboard':
      title = 'Portfolio';
      break;
    case '/holdings':
      title = 'Holdings';
      break
    case '/earnings':
      title = 'Invested'
      break
    case '/farming':
      title = 'Staked positions'
      break
    case '/careers':
      title = 'Careers';
      break
    case '/about':
      title = 'Our Aim';
      break
    default:
      title = 'SimpleFi.finance';
  }


  return (
    <S.Nav>
      {history.location.pathname !== '/' && history.location.pathname !== '/careers'
      ?
        <>
          <p> {title}</p>
          <UserWallet userAccount={userAccount} style={style} />
        </>
        :
        <>
          <S.LogoContainer>
            <Logo />
          </S.LogoContainer>
          <S.HomepageNav>
            {history.location.pathname !== '/' && <button onClick={() => history.push('/')}>home</button> } 
            <button onClick={() => history.push('/#about')}>about</button>
            <button onClick={() => history.push('/careers')}>careers</button>
          </S.HomepageNav>
        </>
      }
    </S.Nav>
  )
}

export default Nav;