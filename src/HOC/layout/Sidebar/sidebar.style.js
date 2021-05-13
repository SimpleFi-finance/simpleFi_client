import styled from 'styled-components'

export const Sidebar = styled.div`
  height: 100%;
  width: 70px;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 80px auto 150px;
  border-right: 1px solid white;
`

export const ThemeControl = styled.div`
  margin: auto;
  color: ${({ theme }) => theme.accent};
  height: 40px;
  width: 30px;
`;

export const LogoContainer = styled.button`
  grid-row: 1 / span 1;
  margin: 3px;
  cursor: pointer;
`

export const BottomControls = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  grid-row: 3 / 4;
`;