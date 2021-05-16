import React from 'react'
import styled, {keyframes} from 'styled-components'

export const stretch = keyframes`
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
	}
`
const durationTime = durationT => (durationT ? parseInt(durationT, 10) : 1.2)
const Spinner = styled.div`
  margin: 100px auto;
  width: ${({size}) => size || '50px'};
  text-align: center;
  font-size: 10px;
  height: ${({ size }) => size || '30px'};
`

const DefaultRect = styled.div`
  background-color: ${({theme}) => theme.accent || 'white'};
  height: 100%;
  width: ${({rectWidth}) => rectWidth || '6px'};
  display: inline-block;
  animation: ${stretch} 1.2s infinite ease-in-out;
  animation-duration: ${({duration}) => durationTime(duration)}s;
`

const Rect2 = styled(DefaultRect)`
  animation-delay: -${({duration}) => durationTime(duration) - 0.1}s;
`
const Rect3 = styled(DefaultRect)`
  animation-delay: -${({duration}) => durationTime(duration) - 0.2}s;
`
const Rect4 = styled(DefaultRect)`
  animation-delay: -${({duration}) => durationTime(duration) - 0.3}s;
`
const Rect5 = styled(DefaultRect)`
  animation-delay: -${({duration}) => durationTime(duration) - 0.4}s;
`
const Stretch = ({ duration, size }) => {

  return (
    <Spinner size={size}>
      <DefaultRect duration={duration}/>
      <Rect2 duration={duration}/>
      <Rect3 duration={duration}/>
      <Rect4 duration={duration}/>
      <Rect5 duration={duration}/>
    </Spinner>
  )
}

export default Stretch