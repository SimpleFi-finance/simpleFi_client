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
  width: 83%;
  align-self: center;
  padding: 0px 20px 10px 20px;
  box-shadow: 0 6px 2px -6px #BBB3E8;

  h1 {
    font-size: 1.5em;
    font-weight: 300;
    color: #FFF0F5CE;
  }
`;

export const TotalHoldingsCards = styled.div`
  display: flex;
  width: 80%;
  align-self: center;
  margin: 20px 0 50px 0;
  justify-content: center;

  @media (min-width: 640px) {
    margin-right: 80px;
  }

  @media (max-width: 639px) {
    flex-direction: column;
    align-items: center;
    margin-top: 5px;
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
  }
`;