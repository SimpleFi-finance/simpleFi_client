import styled from 'styled-components'

export const Content = styled.div`
  height: ${({ location }) => location === '/loading' ? '100%' : 'calc(100% - 150px)'};
  width: 100%;
	display: flex;
	overflow-y: auto;
`;

export const Layout = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
`;

export const Main = styled.div`
  margin: 0px;
	padding: ${({ location }) => location !== '/loading' ? '10px' : '0px'};
  height: 100%;
  width: ${({ noSidebar }) => !noSidebar ? 'calc(100% - 70px)' : '100%'};
	background-color: ${({ location }) => location !== '/loading' ? 'transparent' : 'white'};
	position: fixed;
	top: 0;
  right: 0;
	z-index: 0;
	justify-content: center;
`;