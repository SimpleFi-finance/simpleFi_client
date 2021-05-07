import styled from 'styled-components'
import Button from '../../components/UI/Button'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 140px;
`;

export const Landing = styled.div`
  height: 70%;
  max-width: 80%;
  display: flex;
  flex-direction: row;
  margin: auto;

  img {
    max-width: 50%;
    max-height: 80%;
    object-fit: contain;
  }
  @media (max-width: 950px) {
    flex-direction: column-reverse;
    max-height: 100%;
    max-width: 100%;

    img {
      max-width: 60%;
      max-height: 50%;
      margin: auto;
    }
  }
`;

export const Section = styled.div`
  min-height: calc(100vh - 140px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TitleText = styled.h2`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: auto;
  all: unset;
  margin: auto;
  color: ${({theme}) => theme.text};
  font-size: 1.8em;
  line-height: 2em;

  @media (max-width: 950px) {
    width: 100%;
  }
`;

export const LogoContainer = styled.div`
  height: 65px;
  margin: auto;
  margin-bottom: 50px;
`;


export const ConnectWallet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  height: 20%;

  @media (max-width: 950px) {

  }
`;

export const ConnectWalletButton = styled(Button)`
    justify-content: center;
`;

export const AltConnect = styled(Button)`
  color: ${({theme})=> theme.lightpurple};
  text-decoration: underline;
  background-color: unset;
  box-shadow: unset;
  font-size: 0.9em;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.activeItem};
    background-color: unset;
  }
`;

export const CheckAddressForm = styled.form`
  justify-content: center;
  align-items: center;
  position:relative;
  margin: 10px;
  div {
    width: 100%;
    padding: 5px 15px;
    background-color: white;
    border-radius: 20px;
    display: flex;
    box-shadow: 1px 1px 3px 0px rgba(0,0,0,0.5);
  }
  input {
    border-radius: 10px;
    background-color: white;
    font-size: 1.1em;
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

export const CheckAddress = styled.div`
  display: flex;
  transform: 300ms ease-in-out;
`;

export const Fade = styled.div`
  display: flex;
  transition: 0.5s;
  opacity: ${({ entered }) => entered ? 1 : 0};
`;