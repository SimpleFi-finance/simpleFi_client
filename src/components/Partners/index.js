import React from 'react'
import styled from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip'
import * as logos from '../../assets/icons/protocols'
import { ReactComponent as TRGCLogo } from '../../assets/icons/partnerships/trgc_logo.svg'
import gagra from '../../assets/icons/partnerships/gagra_logo.jpeg'

const ProtocolLogoSt = styled.a`
  width: 70px;
  height: 70px;
  margin: 5px auto;
  background-color: white;
  border-radius: 50%;
  display: flex;
  cursor: pointer;
  img {
    object-fit: contain;
    width: 80%;
    height: 80%;
    border-radius: 50%;
    margin: auto;
  }
`;
const ContainerSt = styled.div`
  max-width: 80%;
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const SubectionSt = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 10px;
  justify-content: center;

  h2 {
    all: unset;
    margin: auto;
    text-align: center;
    flex: 3;
    color: ${({theme}) => theme.text};
    font-size: 1.8em;
    line-height: 2em;
  }

  div {
    margin: 20px auto;
    flex: 6;
    display: grid;
    grid-template-columns: 70px 140px 140px 70px;
    align-content: center;
    gap: 40px;
  }
`;

const ContactSt = styled.div`
  margin: 40px auto;
  font-size: 1.2em;
  line-height: 1.5em;
  a {
    all: unset;
    cursor: pointer;
    color: ${({theme}) => theme.activeItem};
    margin: 10px auto;
    text-decoration: underline;
  }
`;

const Partners = () => {
  const grants = [
    {
      link: 'https://uniswap.org/',
      img: logos.uni,
      alt: 'UNISWAP'
    },
    {
      link: 'https://thegraph.com/',
      img: logos.thegraph,
      alt: "THEGRAPH"
    }
  ]

  return (
    <ContainerSt>
      <SubectionSt>
        <h2>
          Grants
        </h2>
        <div>
          {grants.map((el, index) => (
              <Tooltip title={el.alt} key={el.link}>
                <ProtocolLogoSt
                  style={{
                    'gridColumn': `${index+ 2}`
                  }}
                  href={el.link}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img src={el.img} alt={el.alt}></img>
                </ProtocolLogoSt>
              </Tooltip>
            ))}
        </div>
      </SubectionSt>
      <SubectionSt>
        <h2>
          Stakeholders
        </h2>
        <div>
          <Tooltip title='TRGC'>
            <ProtocolLogoSt
              style={{
                'gridColumn': 2,
                borderRadius: '4px',
                width: '140px',
                margin: 'auto'
              }}
              href='https://trgc.io/'
              target="_blank"
              rel="noreferrer noopener"
            >
              <TRGCLogo style={{ width: '90%', height: '90%', margin: 'auto' }}/>
            </ProtocolLogoSt>
          </Tooltip>
          <Tooltip title='GAGRA'>
            <ProtocolLogoSt
              style={{
                'gridColumn': 3,
                borderRadius: '4px',
                width: '140px'
              }}
              href='https://www.gagra.vc/'
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src={gagra}
                alt='GAGRA'
                style={{
                  width: '90%',
                  height: '90%',
                  margin: 'auto'
                }}></img>
            </ProtocolLogoSt>
          </Tooltip>
        </div>
      </SubectionSt>
      <ContactSt>
        <p>Partner with us: </p>
        <a
          href="mailto:development@simplefi.finance?Subject=Partners:%20Partnership%20Opportunities"
          target="_blank"
          rel="noreferrer noopener"
        >get in touch</a>
      </ContactSt>
    </ContainerSt>
  )
}

export default Partners