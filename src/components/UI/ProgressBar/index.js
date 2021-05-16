import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    margin: 2px auto;
  }
  progress {
    width: 100%;
    height: 10px;
    animation: 3s ease-in-out;
  }
  progress[value] {
    width: ${({ width }) => width};
    appearance: none;
    
    ::-webkit-progress-bar {
      height: 10px;
      border-radius: 2px;
      background-color: ${({theme}) => theme.lightpurple};
    }
    
    ::-webkit-progress-value {
      height: 10px;
      border-radius: 2px;
      background-color: ${({theme}) => theme.activeItem};
      transition: width 3s ease;
    }
  }
`;

const ProgressBar = ({ value, max }) => {
  return (
    <Container>
      {/* <span> {value}% </span> */}
      <progress value={value} max={max} />
    </Container>
  )
}

export default ProgressBar

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number
}

ProgressBar.defaultProps = {
  max: 100
}