import React, {useState, useEffect, useRef} from 'react';
import './Careers.css';
import simpleFiCareers from '../../assets/images/simplefi-careers.svg';

export default function Careers ({setSplash}) {

  const smartContEngRef = useRef(null);
  const frontendDevRef = useRef(null);
  const fullstackDevRef = useRef(null);

  useEffect(() => {
    setSplash(false)
  })

  function togglePosition (e, positionRef) {
    e.preventDefault();
    window.scrollTo(e.clientX, e.clientY);
    const position = positionRef.current.style;
    if (!position.display || position.display === 'none') {
      position.display = 'flex';
      position.animation = 'growDown 300ms ease-in-out forwards';
    } else {
      position.display = 'none';
    }
  }

  return (
    <div className='careers'>
      <div className='careers-info'>
        <div className="careers-main">
          <h2>Join the SimpleFi team!</h2>
          <h3>We're on a mission to make investing in DeFi as simple and intuitive as possible.{" "}
            <span>
              <a href = "mailto: development@simplefi.finance" target="_blank" rel="noreferrer">Join us</a>
            </span>
            !
          </h3>
          
          
        </div>
        <div className="careers-positions">
          <div className="positions-title">
            <h3>Open positions:</h3>
          </div>

          <button className='position-button' onClick={(e) => togglePosition(e, smartContEngRef)}>Blockchain Engineer</button>
          <button className='position-button' onClick={(e) => togglePosition(e, frontendDevRef)}>Lead Frontend Engineer</button>
          <button className='position-button' onClick={(e) => togglePosition(e, frontendDevRef)}>Lead Fullstack Engineer</button>
          
          <div className="position-details" ref={smartContEngRef}>
            <button onClick={(e) => togglePosition(e, smartContEngRef)}>X</button>
            <h2>Blockchain engineer (remote)</h2>
            <h3>About SimpleFi</h3>
            <p>SimpleFi is a next-gen DeFi dashboard that automatically calculates your ROI, makes it easy to manage your DeFi portfolio, and suggests what else you could invest in.</p>
            <p>The project is VC-funded, recently won the HackMoney EthGlobal hackathon and is the recipient of grants from Uniswap and The Graph.</p>
            <p>We’re looking for great developers who love DeFi, and encourage candidates of all races, creeds, genders, age, and sexual orientation to apply.</p>
            <h3>What We’re Looking For</h3>
            <p>We’re looking for a developer to join our smart contracts and data engineering team.</p>
            <p>You will work on <a>Tesser</a>, our award-winning decentralized DeFi migration tool, on our indexing infrastructure and on our token, governance and curation smart contracts.</p>
            <p>Help us make SimpleFi the most user-friendly and powerful DeFi dashboard out there!</p>
            <h3>Responsibilities</h3>
            <ul>
              <li>Research and implement our smart contract infrastructure within the blockchain team</li>
              <li>Develop subgraphs</li>
              <li>Collaborate with auditors to ensure code quality standards and security</li>
              <li>Collaborate with our front and backend teams</li>
              <li>Write documentation</li>
            </ul>
            <h3>Desired skills</h3>
            <ul>
              <li>Experience with developing smart contracts particularly for DeFi protocols</li>
              <li>Experience developing subgraphs</li>
              <li>An interest in the intersection of economic systems, software, and tokenomics</li>
              <li>Attention to detail and a security-oriented mindset</li>
              <li>A collaborative, problem-solving attitude</li>
            </ul>
            <h3>Strongly Recommended</h3>
            <ul>
              <li>Deep DeFi knowledge and interest</li>
              <li>Experience in working on OSS</li>
              <li>Experience writing in Solidity</li>
              <li>Interest in Ethereum research (L1 and L2), and of other ecosystems (BSC,
Avalanche, Solana, Polkadot, etc.)</li>
            </ul>
          </div>
            
          <div className="position-details" ref={frontendDevRef}>
            <button onClick={(e) => togglePosition(e, frontendDevRef)}>X</button>
            <h2>Lead Frontend developer</h2>
            <h3>About SimpleFi</h3>
            <p>SimpleFi is a Web3 startup that makes Decentralized Finance (DeFi) accessible to everyone. The project is VC-funded, recently won the HackMoney EthGlobal hackathon and is the recipient of grants from Uniswap and The Graph.</p>
            <p>We’re looking for great developers who love DeFi, and encourage candidates of all races, creeds, genders, age, and sexual orientation to apply.</p>
            <h3>What We’re Looking For</h3>
            <p>We’re looking for an experienced front end developer to join our team. You will work in close collaboration with our smart contract and back end engineering teams to build and grow the most powerful and intuitive DeFi dashboard.</p>
            <h3>Responsibilities</h3>
            <ul>
              <li>Build a scalable front-end that interacts with our API and various blockchains</li>
              <li>Build and rapidly iterate interfaces for SimpleFi’s suite of tools</li>
              <li>Write scripts to automate monitoring and tracking to maintain the system’s health</li>
              <li>Review code of other team members and engage with external collaborators</li>
            </ul>
            <h3>Desired skills</h3>
            <ul>
              <li>Experience with React, Redux and styled components</li>
              <li>Experience with REST APIs and GraphQL</li>
              <li>Experience working with SVG graphing libraries such as d3.js</li>
              <li>Problem solving and good team communication skills</li>
              <li>At least 2 years' experience in a similar position</li>
            </ul>
            <h3>Strongly Recommended</h3>
            <ul>
              <li>An interest in decentralized finance</li>
              <li>Understanding of the general concept behind Ethereum and smart contracts</li>
              <li>Experience in working on OSS</li>
            </ul>
          </div>

          <div className="position-details" ref={fullstackDevRef}>
            <button onClick={(e) => togglePosition(e, fullstackDevRef)}>X</button>
            <h2>Lead fullstack developer</h2>
            <h3>About SimpleFi</h3>
            <p>SimpleFi is a Web3 startup that makes Decentralized Finance (DeFi) accessible to everyone. The project is VC-funded, recently won the HackMoney EthGlobal hackathon and is the recipient of grants from Uniswap and The Graph.</p>
            <p>We’re looking for great developers who love DeFi, and encourage candidates of all races, creeds, genders, age, and sexual orientation to apply.</p>
            <h3>What We’re Looking For</h3>
            <p>We’re looking for an experienced full stack developer to join our team. You will work in close collaboration with our smart contract and front-end engineering teams to build and grow the most powerful and intuitive DeFi dashboard.</p>
            <h3>Responsibilities</h3>
            <ul>
              <li>Build interfaces for SimpleFi’s suite of tools</li>
              <li>Build and maintain a back-end that interacts with blockchains and delivers a DeFi
data API</li>
              <li>Assist the ML team in building out our predictive analytics infrastructure</li>
              <li>Write scripts to automate monitoring and tracking to maintain the system’s health</li>
              <li>Review code of other team members and engage with external collaborators</li>
            </ul>
            <h3>Desired skills</h3>
            <ul>
              <li>Experience with web development, front-end and back-end (full stack)</li>
              <li>Experience with Node, Express, Docker, SSE, React and styled components</li>
              <li>Problem solving and good team communication skills</li>
              <li>At least 5 years' experience in a similar position</li>
            </ul>
            <h3>Strongly Recommended</h3>
            <ul>
              <li>An interest in decentralized finance</li>
              <li>Understanding of the general concept behind Ethereum and smart contracts.</li>
              <li>Experience in working on OSS</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="careers-media">
        <img src={simpleFiCareers} alt="Welcome to SimpleFi" className="careers-media-image"/>
      </div>
    </div>
  )
}