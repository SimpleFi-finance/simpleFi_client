import styled from 'styled-components'

const ButtonSt = styled.button`
  justify-content: center;
  background-color: ${({theme})=> theme.activeItem};
  color: white;
  font-size: 1.3em;
  font-weight: 300;
  margin: 5px;
  padding: 10px 20px;
  border-radius: 30px;
  box-shadow: 1px 1px 3px 0px rgba(0,0,0,0.5);
  cursor: pointer;

  &:hover {
    background-color: ${({theme}) => theme.hover};
  }

  &:focus {
    outline: 0;
  }

  &:disabled {
    background-color: ${({theme})=> theme.disabled};
    border: 2px solid ${({theme})=> theme.disabled};
    opacity: 0.5;
    color: ${({theme}) => theme.text};
    cursor: not-allowed;
  }
`;

export default ButtonSt
