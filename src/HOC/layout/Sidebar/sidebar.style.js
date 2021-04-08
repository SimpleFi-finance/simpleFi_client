import styled from 'styled-components'

export const Sidebar = styled.div`
  height: 100%;
  width: 70px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid white;
`

export const ThemeControl = styled.div`
  margin: 2px auto;
  color: ${({ theme }) => theme.accent};
  height: 30px;
  width: 30px;
`;

export const LogoContainer = styled.button`
  height: 60px;
  padding: 5px 2px;
  margin-top: 15px;
  margin-bottom: 60px;
  cursor: pointer;
`