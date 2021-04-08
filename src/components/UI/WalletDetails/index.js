import React from 'react'
import * as S from './walletDetails.style'
//wallet icons 
import Blockies from 'react-blockies';

const UserWallet = ({ userAccount, style }) => {
  return (
    <>
      <S.UserAddress style={ style }>
        <div>{userAccount?.length ? `${userAccount[0].slice(0,6)}...${userAccount[0].slice(-4)}` : '0x0000...0000'}</div>
        <Blockies className="user-blocky" seed={userAccount[0] || 'simpleFi'} size={7} scale={3}/>
      </S.UserAddress>
    </>
  )
}

export default UserWallet;