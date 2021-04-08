import styled from 'styled-components'

export const Content = styled.div`
  height: calc(100vh - 150px);
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
  padding: 10px;
  height: 100%;
  width: ${({location})=> location !== '/' ? 'calc(100% - 70px)' : '100%'};
	background-color: transparent;
	position: fixed;
	top: 0;
  right: 0;
	z-index: 0;
	justify-content: center;
`;