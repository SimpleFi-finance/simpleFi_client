import styled from 'styled-components'

export const Nav = styled.div`
  display: grid;
  height: 60px;
  grid-template-columns: repeat(10, 1fr);
  margin: 5px 40px;
  border-bottom: 2px solid ${({ theme }) => theme.lightpurple};
  
  p {
    margin: auto;
    margin-left: 15px;
    font-size: 30px;
    letter-spacing: 2px;
    grid-column: 1 / 7;
  }
`;

export const HomepageNav = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  justify-content: space-evenly;
  grid-column: 8 / 10;

  button {
    cursor: pointer;
    color:${({ theme }) => theme.text};
    text-transform: capitalize;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const LogoContainer = styled.div`
  height: 100%;
  grid-column: 2/3;
`;