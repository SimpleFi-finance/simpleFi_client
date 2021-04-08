import styled from 'styled-components'

export const Footer = styled.footer`
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 10px;
  color: white;
  align-items: center;

  div {
    display:  flex;
    flex-direction: row;
    align-items: center;
  }

  p {
    padding: 0 5px;
  }
`;

export const FooterGroup = styled.div`
  width: min-content;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 0 auto;
`

export const FooterElement = styled.a`
  height: 30px;
  padding: 2px 2px;
  cursor: pointer;
  text-transform: unset;
  text-decoration: unset;
  color: inherit;
  width: 50px;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`