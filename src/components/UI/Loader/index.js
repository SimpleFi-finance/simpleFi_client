import React from 'react'
import styled, { keyframes } from 'styled-components'

export const cube = keyframes`
  25% {
    transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    transform: translateX(0) translateY(42px) rotate(-270deg) scale(0.5);
  }
  100% {
    transform: rotate(-360deg);
  }
`

const Spinner = styled.div`
  margin: 100px auto;
  position: relative;
  width: ${({size}) => size || '30px'};
  height: ${({size}) => size || '30px'};
`

const DefaultCube = styled.div`
  width: ${({cubeSize}) => cubeSize || '15px'};
  height: ${({cubeSize}) => cubeSize || '15px'};
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({theme}) => theme.lightpurple};
  animation: ${cube} 2s infinite ease-in-out;
  animation-duration: ${({duration}) => duration || '1.8s'};
`

const StyledCube = styled(DefaultCube)` animation-delay: -0.9s; `

const Cube = ({ duration, size, cubeSize }) => {

    return (
        <Spinner size={size}>
            <DefaultCube cubeSize={cubeSize} duration={duration} />
            <StyledCube cubeSize={cubeSize} duration={duration} />
        </Spinner>
    )
}

export default Cube