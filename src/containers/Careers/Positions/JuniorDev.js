import React from 'react'
import * as S from './jobs.style'

const JuniorDev = () => {
  return (
    <>
      <S.Title>
        Junior Blockchain Developer
      </S.Title>
      <S.Section>
        <h3>About SimpleFi</h3>
        <p>SimpleFi is a next-gen DeFi investment tool that shows users their ROI across all protocols and makes it simple for them to manage their portfolios.</p>
        <p>The project is VC-funded, recently won a bounty at ETHDenver 2021 and is the recipient of grants from Uniswap and The Graph.</p>
        <p>We are an equal opportunity employer and value diversity in our team. We welcome qualified candidates of all races, creeds, genders, age, and sexuality to apply.</p>
      </S.Section>
      <S.Section>
        <h3>What We’re Looking For</h3>
        <p>We are looking for a junior software engineer to work in our data indexing and smart contracts team.</p>
        <p>Our ROI dashboard is built by leveraging The Graph for advanced blockchain data indexing. Our smart contracts allow users to effortlessly rebalance their investment portfolios, either manually or automatically.</p>
        <p>We also plan to launch a tokenized incentives program to drive community growth in the next few months.</p>
        <p>Our ambition for SimpleFi is to make it the main DeFi entrypoint for all users, from institutional funds to first-time retail investors, across all relevant L1 and L2 blockchain networks.</p>
      </S.Section>
      
      <S.Section>
        <h3>Responsibilities</h3>
        <ul>
          <li>Support our lead smart contract developer.</li>
          <li>Develop subgraphs for DeFi protocols.</li>
          <li>Collaborate with auditors to ensure code quality standards and security.</li>
          <li>Assist in the development of backend web services that interact with the Ethereum blockchain.</li>
          <li>Write scripts to automate the monitoring of our systems.</li>
          <li>Engage our community by documenting how our infrastructure works.</li>
        </ul>
      </S.Section>
      <S.Section>
        <h3>Desired Skills</h3>
        <ul>
          <li>Experience in developing subgraphs, or at least in Web Assembly</li>
          <li>Experience with developing smart contracts particularly for DeFi protocols.</li>
          <li>Expertise in backend developement, particularly with Node/Express</li>
          <li>An interest in the intersection of economic systems, software, and tokenomics.</li>
          <li>Attention to detail and a security-oriented mindset.</li>
          <li>Comfortable with a scripting language for task automation, preferably Javascript / Typescript.</li>
          <li>Have a collaborative, problem-solving attitude.</li>
        </ul>
      </S.Section>
      <S.Section>
        <h3>Strongly Recommended</h3>
        <p>We are looking for a junior software engineer that is interested in getting deep into DeFi applications.</p>
        <ul>
          <li>Experience working with subgraphs and oracles.</li>
          <li>Experience with DeFi protocols.</li>
          <li>Solidity or Vyper experience.</li>
          <li>Experience in working with external contributors and community members, particularly for OSS.</li>
          <li>Interested in Ethereum research (L1 and L2), and developments in other ecosystems (particularly BSC, Avalanche, Solana, Polkadot, etc.)</li>
          <li>Experience with Ethers.js and GraphQL.</li>
        </ul>
      </S.Section>
      <S.GetInTouch>
        <p> Interested ??? <a href="mailto:development@simplefi.finance?Subject=Jobs:%20Junior%20Blockchain%20Dev"> Get In Touch!</a> </p>
      </S.GetInTouch>
    </>
  )
}

export default JuniorDev