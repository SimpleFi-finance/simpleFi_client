import styled from 'styled-components'

export const Nav = styled.div`
  display: grid;
  height: 60px;
  grid-template-columns: repeat(10, 1fr);
  margin: 5px 40px;
  border-bottom: 2px solid ${({ theme }) => theme.lightpurple};
  
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: auto;
    margin-left: 15px;
    font-size: 30px;
    letter-spacing: 2px;
    grid-column: 2 / 8;
    @media (max-width: 600px) {
      display: none;
    }
  }

  button {
    display: inline-flex;
    align-items: center;
    font-size: 1.1em;
    margin: auto 2px;
    cursor: pointer;
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
    margin: auto 10px;
    color:${({ theme }) => theme.text};
    text-transform: capitalize;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const LogoContainer = styled.div`
  height: 100%;
  min-width: 130px;
  grid-column: 2;
`;