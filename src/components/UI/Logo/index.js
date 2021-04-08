import React from 'react'
import styled from 'styled-components'
import Icon from '../../../assets/logos/simpleFi-icon.png'
import simplefiLogo from '../../../assets/logos/simplefi-logotype.png'

const StyledLogo = styled.div`
  width: 100%;
  height: 100%;
  margin: 2px auto;

  img {
    height: 100%;
    width:100%;
    object-fit: contain;
  }
`
  
const Logo = ({ type }) => {
  return (
    <>
      <StyledLogo>
        <img src={type === 'icon' ? Icon : simplefiLogo } alt="SimpleFi-logo" />
      </StyledLogo>
    </>
  )
}

export default Logo;