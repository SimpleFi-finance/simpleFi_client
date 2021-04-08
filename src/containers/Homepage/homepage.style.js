import styled from 'styled-components'
import Button from '../../components/UI/Button'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 140px;
`;

export const Landing = styled.div`
  max-height: 60%;
  max-width: 80%;
  display: flex;
  flex-direction: row;
  margin: auto;

  img {
    max-width: 30%;
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
  height: calc(100vh - 140px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TitleText = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: auto;

  h2 {
    all: unset;
    margin: auto;
    color: ${({theme}) => theme.text};
    font-size: 1.8em;
    line-height: 2em;
  }

  @media (max-width: 950px) {
    width: 100%;
  }
`;

export const LogoContainer = styled.div`
  height: 65px;
  margin: auto;
  margin-bottom: 50px;
`;


export const ConnectData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  height: 20%;

  @media (max-width: 950px) {

  }
`;

export const ConnectDataButton = styled(Button)`
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

export const AltConnectForm = styled.form`
  display: none;
  justify-content: center;
  align-items: center;
  position:relative;
  margin: 10px;

  input {
    font-weight: 300;
    padding: 5px 20px;
    border-radius: 10px;
    box-shadow: 1px 1px 3px 0px rgba(0,0,0,0.5);
    background-color: white;
    font-size: 0.9em;
    font-weight: 350;
    color: ${({theme})=> theme.darkGrey};
  }

  button {
    background-color: ${({theme})=> theme.activeItem};
    color: white;
    font-weight: 300;
    margin-left: 10px;
    padding: 5px 20px;
    border-radius: 10px;
    box-shadow: 1px 1px 3px 0px rgba(0,0,0,0.5);
    cursor: pointer;
  }
`;

export const Title = styled.div`
  height
`;