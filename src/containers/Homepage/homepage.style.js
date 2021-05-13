import styled from 'styled-components'
import Button from '../../components/UI/Button'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 70px;
  overflow-y: auto;
`;

export const Subscriber = styled.div`
  position: absolute;
  z-index: 400;
  bottom: 15px;
  border: 2px solid ${({ theme }) => theme.lightpurple};
  right: ${({ isVisible }) => isVisible ? '15px' : '-700px'};
  width: 40%;
  height: 200px;
  -webkit-box-shadow: 0 9px 7px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 9px 7px rgba(0, 0, 0, 0.3);
  box-shadow: 0 9px 7px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.border};
  color: ${({theme}) => theme.darkGrey};
  border-radius: 4px;
  padding: 5px;
  div {
    display: flex;
    flex-direction: column;
  }
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
  min-height: calc(100vh - 210px);
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