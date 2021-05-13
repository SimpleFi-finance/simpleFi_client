import React from 'react'
import styled from 'styled-components'
import * as tokensLogo from '../../assets/icons/protocols'
import Tooltip from '@material-ui/core/Tooltip'

const ContainerSt = styled.div`
  max-width: 80%;
  display: flex;
  flex-direction: column;
  margin: auto;

  h2 {
    all: unset;
    margin: auto;
    color: ${({theme}) => theme.text};
    font-size: 1.8em;
    line-height: 2em;
  }
`;

const ContentDescriptionSt = styled.div`
  width: 100%;
  display: flex;
  margin: 20px auto;
  flex-direction: column;
  h3 {
    font-size: 1.3em;
    line-height: 1.5em;
    margin: 2px auto;
    color: ${({theme}) => theme.text};
  }

  div {
    display: grid;
    grid-gap: 10px;
    margin: 15px;
    grid-template-columns: repeat(6, 1fr);
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

const ProtocolLogoSt = styled.a`
  width: 70px;
  height: 70px;
  margin: 4px 5px;
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

const About = () => {
  const colNumber = 8
  const trackedProtocols = [
    {
      link: 'https://www.aave.com',
      img: tokensLogo.aave,
      alt: 'AAVE'
    },
    {
      link: 'https://synthetix.io/',
      img: tokensLogo.snx,
      alt: 'SNX'
    },
    {
      link: 'https://uniswap.org/',
      img: tokensLogo.uni,
      alt: 'UNISWAP'
    },
    {
      link: 'https://curve.fi/',
      img: tokensLogo.curve,
      alt: "CURVE"
    }
  ]
  const protocolsInWork = [
    {
      link: 'https://compound.finance/',
      img: tokensLogo.compound,
      alt: "COMPOUND"
    },
    {
      link: 'https://chain.link/',
      img: tokensLogo.link,
      alt: "LINK"
    },
    {
      link: 'https://sushi.com/',
      img: tokensLogo.sushi,
      alt: "SUSHI"
    },
    {
      link: 'https://yearn.finance/',
      img: tokensLogo.yfi,
      alt: "YEARN"
    },
    {
      link: 'https://idle.finance/#/',
      img: tokensLogo.idle,
      alt: "IDLE"
    },
    {
      link: 'https://makerdao.com/en/',
      img: tokensLogo.dai,
      alt: "MAKER"
    },
    {
      link: 'https://instadapp.io/',
      img: tokensLogo.instadapp,
      alt: "INSTADAPP"
    },
    {
      link: 'https://polygon.technology/',
      img: tokensLogo.polygon,
      alt: "POLYGON"
    },
    {
      link: 'https://balancer.finance/',
      img: tokensLogo.balancer,
      alt: "BALANCER"
    },
    {
      link: 'https://cream.finance/',
      img: tokensLogo.cream,
      alt: "CREAM"
    },
    {
      link: 'https://integral.link/swap',
      img: tokensLogo.integral,
      alt: "INTEGRAL"
    },
    {
      link: 'https://dydx.exchange/',
      img: tokensLogo.dydx,
      alt: "DY/DX"
    },
    {
      link: 'https://app.1inch.io/',
      img: tokensLogo.oneInch,
      alt: "1INCH"
    },
    {
      link: 'https://mstable.org/',
      img: tokensLogo.mta,
      alt: "MSTABLE"
    }
  ]
  const calcGridPosition = (index) => {
    const pos = index + 1
    const isOdd = num => (num % 2) === 1

    if (!isOdd(pos)) {
      return {
        column: pos > colNumber ? pos - colNumber : pos,
        row: pos > colNumber ? Math.ceil(((pos)/ colNumber)) + 1  : 1
      }
    } else {

      return {
        column: pos > colNumber ? pos - colNumber + 2 : pos,
        row: pos > colNumber ? Math.ceil(((pos)/ colNumber)) + 2 : 2
      }
    }
  }

  return (
    <ContainerSt>
      <h2>
        What we do
      </h2>
      <p>
        SimpleFi is a free and open source tool for managing decentralised financial investments.
      </p>
      <ContentDescriptionSt>
        <h3>
          Protocols we support
        </h3>
        <div style={{gridTemplateRows: '40px'}}>
          {trackedProtocols.map((el, index) => (
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
      </ContentDescriptionSt>
      <ContentDescriptionSt>
        <h3>
          Protocols we are working on
        </h3>
        <div style={{gridTemplateRows: 'repeat(4, 40px)'}}>
          {protocolsInWork.map((el, index) => (
            <Tooltip title={el.alt} key={el.link}>
              <ProtocolLogoSt
                style={{
                  'gridColumn': `${calcGridPosition(index).column}`,
                  'gridRow': `${calcGridPosition(index).row}`
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
      </ContentDescriptionSt>
      <ContactSt>
        <p>Want your protocol in SimpleFi: </p>
        <a
          href="mailto:development@simplefi.finance"
          target="_blank"
          rel="noreferrer noopener"
        >get in touch</a>
      </ContactSt>
    </ContainerSt>
  )
}

export default About