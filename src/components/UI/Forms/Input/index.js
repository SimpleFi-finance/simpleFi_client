import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components'

const InputSt = styled.div`
  width: 100%;
  padding: 5px 20px;
  background-color: white;
  border-radius: 30px;
  display: flex;
  box-shadow: 1px 1px 3px 0px rgba(0,0,0,0.5);

  input {
    border-radius: 10px;
    background-color: white;
    font-size: 1.1em;
    padding: 0 5px;
    margin: auto 2px;
    color: ${({theme})=> theme.darkGrey};
  }

  button {
    color: ${({theme})=> theme.activeItem};
    margin-left: 5px;
    padding: 5px;
    cursor: pointer;
  }
`;

const Input = ({ change, onClose, placeholder, type, hasSearch }) => {
  return (
    <InputSt>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => change(e.target.value)}
      />
      {hasSearch && 
        <Tooltip title='Lookup'>
          <button
            type="submit"
            value="Submit">
            <SearchIcon />
          </button>
        </Tooltip>
      }
      {!!onClose && 
        <Tooltip title='Close'>
          <button
            type="cancel"
            color={'red'}
            onClick={() => onClose()}
            style={{ color: 'red' }}
          >
            <ClearIcon />
          </button>
        </Tooltip>
      }
    </InputSt>
  )
}

export default Input