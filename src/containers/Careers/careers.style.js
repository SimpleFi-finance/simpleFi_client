import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Intro = styled.div`
  display: flex;
  flex-direction: row;
  flex: 2;

  img {
    object-fit: contain;
    margin: auto;
    width: 40%;
    height: 100%;
  }

  @media ( max-width: 800px) {
    flex-direction: column;
    img {
      width: 70%;
    }
  }
`;

export const Text = styled.div`
  width: 60%;
  height: 100%;
  margin: auto 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 5%;

  h2 {
    font-size: 2em;
    line-height: 1.2em;
    margin: auto;
    color: ${({theme}) => theme.text};
  }

  p {
    font-size: 1.6em;
    line-height: 1.2em;
    margin: auto;
    color: ${({theme}) => theme.text};
  }
  @media ( max-width: 800px) {
    width: 100%;
    h2 {
      margin-bottom: 30px;
    }
  }
`;

export const OpenPositions = styled.div`
  flex: 2;
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-content: center;
  h2 {
    font-size: 1.7em;
    padding: 40px 0px;
    flex: 1;
    margin: auto;
    line-height: 1.2em;
    color: ${({ theme }) => theme.text};
  }
  div {
    flex: 5;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: center;
  }

  @media (max-width: 800px) {
    div {
      gap: 40px;
    }
  }
`;

export const List = styled.div``;