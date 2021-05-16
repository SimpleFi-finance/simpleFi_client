import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  width: 100%;
  justify-content: center;
  border-radius: 30px;
  margin: 10px auto;
  background-color: ${({ theme }) => theme.opaqueGrey};

  h2 {
    flex: 1;
    margin-right: 20px;
    text-transform: capitalize;
    color: ${({theme}) => theme.text};
    display: block;
    font-size: 1.5em;
    margin-left: 0;
    font-weight: 500;
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  flex: 2;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

export const Headline = styled.div`
  display: flex;
  flex-direction: row;
  flex: 2;
  justify-content: space-evenly;
  
  align-items: center;
  position: relative;

  & > h3 {
    &:last-child {
      padding-right: 0;
    }
  }
`;

export const HeadlineEl = styled.h3`
  padding-right: 35px;
  font-size: 1.2em;
  color: ${({colorItem, theme}) => colorItem === 'green' ? theme.green : !colorItem ? theme.text : theme.red};
`;

export const DropdownButton = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin-top: 7px;
`;