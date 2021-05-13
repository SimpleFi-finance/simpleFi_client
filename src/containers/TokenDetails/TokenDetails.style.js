import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TokenHeader = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-around;

  h2 {
    font-size: 2.8em;
    width: max-content;
    line-height: 1.2em;
    letter-spacing: 2px;
    margin: auto;
    color: ${({ theme }) => theme.text};
  }

  div {
    display: flex;
    margin: auto;
    margin-bottom: 2px;
    flex-direction: column-reverse;
    width: max-content;

    a {
      all: unset;
      padding: 2px 15px;
      font-size: 1.1em;
      line-height: 1em;
      color: ${({ theme }) => theme.text};
      cursor: pointer;
      &:hover {
        color: ${({ theme}) => theme.activeItem};
      }
    }

    p {
      border-top: 1px solid ${({ theme }) => theme.lightpurple};
      text-align: right;
      color: ${({theme}) => theme.hoverMain};
      font-size: 0.8em;
      font-style: italic;
    }
  }

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const TokenContent = styled.div`
  flex: 6;
  display: flex;
  margin-top: 5%;
  flex-direction: column;
  justify-content: center;
`;

export const OverviewToken = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  gap: 40px;

   @media (max-width: 800px) {
    flex-direction: column;
    margin-bottom: 40px;
  }
`;

export const TokenBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;

  h3 {
    font-size: 1.6em;
    line-height: 1.2em;
    margin: auto;
  }

   div {
     margin: 10px;
     height: 250px;
     width: 600px;
   }
`;  