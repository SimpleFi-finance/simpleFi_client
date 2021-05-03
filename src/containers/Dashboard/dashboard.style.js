import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export const OverflowEl = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const Title = styled.div`
  width: 90%;
  align-self: center;
  padding: 0px 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({theme}) => theme.lightpurple}; 

  h1 {
    font-size: 1.5em;
    font-weight: 300;
    color: #FFF0F5CE;
  }
`;

export const HorizontalContainer = styled.div`
  width: 80%;
  margin: 30px auto;
  max-width: 900px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  @media (max-width: 640px) {
    flex-direction: column;
    height: fit-content;
    & > * {
      &:first-child {
        margin-bottom: 20px;
      }
    }
  }
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  justify-content: center;
  margin: 20px auto;
  margin-bottom: 40px;
  padding: 0px;
  cursor: pointer;
  
  & > * {
    &:hover {
      background-color: ${({theme}) => theme.hoverMain}
    }
    &:last-child {
      margin-bottom: 50px;
    }
  }
`;