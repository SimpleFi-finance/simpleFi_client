import React from 'react';
import * as S from './footer.style.js';
import {
  GithubLogo,
  TwitterLogo,
  LinkedinLogo,
  DiscordLogo,
  TelegramLogo
} from '../../../assets/icons/socials'

const Footer = ({ showLogos }) => {

  const socialIcons = [
    {
      link: "https://github.com/raphael-mazet/simplefi-client",
      el: GithubLogo  
    },
    {
      link: "https://twitter.com/simplefi_",
      el: TwitterLogo 
    },
    {
      link: "https://t.me/joinchat/H0UceruS5m_MZeB9",
      el: TelegramLogo  
    },
    {
      link: "https://discord.gg/EMcKxx69",
      el: DiscordLogo 
    },
    {
      link: "https://www.linkedin.com/company/simplefi-finance/",
      el: LinkedinLogo  
    }
  ]

  return (
    <S.Footer>
      <S.FooterGroup style={{marginRight: !showLogos ? '0' : ''}}>
        {socialIcons.map((el) => (
          <S.FooterElement key={el.link} href={el.link} target="_blank" rel="noreferrer" >
            <el.el fill={'white'} style={{height: '100%', width: '100%'}}/>
          </S.FooterElement>
          ))
        }
      </S.FooterGroup>
    </S.Footer>
  )
}

export default Footer
