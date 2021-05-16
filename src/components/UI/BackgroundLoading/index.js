import { ReactComponent as BackgroundSvg } from '../../../assets/images/background.svg'
import React from 'react'
import styled from 'styled-components'

const BackgroundSt = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Background = () => {
  return (
    <BackgroundSt>
      <BackgroundSvg />
    </BackgroundSt>
  )
}

export default Background;