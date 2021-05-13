import styled from 'styled-components'

export const Container = styled.div`
  height: 95%;
  width: 90%;
  margin: auto;

  h1 {
    font-size: 1.5em;
    padding: 15px 15px;
  }
`;

export const SectionTitle = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.lightpurple};
  width: 100%;
  padding: 5px 0px;
  margin: 15px 0px;
  position: sticky;
  top: 0px;
  background-color: ${({theme}) => theme.background};
  h2 {
    font-size: 1.2em;
    padding: 10px;
    font-style: italic;
  }
`;

export const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 250px;
  border-radius: 4px;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.lightpurple};
  
  h2 {
    font-size: 1.3em;
    padding-left: 10px;
    margin-bottom: 10px;
    font-style: italic;
  }

  div {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 2px auto;
    justify-content: center;
    h3 {
      font-size: 1.2em;
      padding-left: 20px;
      margin: auto;
      margin-bottom: 10px;
    }
  
    p {
      font-size: 0.8em;
      padding-left: 20px;
      margin: auto;
      color: ${({theme}) => theme.hoverMain};
    }
  }
`;

export const SnapshotContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  justify-content: space-evenly;
  align-content: center;
  max-width: 900px;
  margin: 10px auto;

  @media (max-width: 840px) {
    flex-direction: column;
    height: fit-content;
    & > div {
      width: 100%;
      &:first-child {
        margin-bottom: 20px;
      }
    }
  }
`;

export const DataContainer = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  width: 40%;
  padding: 10px;
  & > div {
    &:first-child {
      margin-bottom: 10px;
    }
  }
`;

export const FieldDetails = styled.div`
  width: 90%;
  margin: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;

  @media (max-width: 750px) {
    flex-direction: column;
    width: 100%;
    margin: 20px 2px;
    gap: 20px;
  }

  div {
    display: flex;
    margin: 10px;
    flex-direction: column-reverse;
    min-width: 250px;
    max-width: 350px;
    @media (max-width: 750px) {
      margin: auto;  
    }
    & > p {
      &:first-child {
        font-size: 0.7em;
        padding: 0px;
        border-top: 1px solid ${({theme}) => theme.hoverMain};
        text-align: right;
        color: ${({theme}) => theme.hoverMain};
      }
    }
  }
`;
