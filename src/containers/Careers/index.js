import React from 'react';
import * as S from './careers.style'
import * as Positions from './Positions'
import simpleFiCareers from '../../assets/images/simplefi-careers.svg';
import Button from '../../components/UI/Button'
import { withRouter } from 'react-router'

const Careers = (props) => {

  const openPositions = [
    {
      id: 'comm-manager',
      title: 'Community and Marketing Lead',
      spec: Positions.CommunityManager
    },
    {
      id: 'junior-dev',
      title: 'Junior Blockchain Developer',
      spec: Positions.JuniorDev
    }
  ]
  let Position
  
  if (props.id) {
    Position = openPositions.find(el => el.id === props.id).spec
  }

  return (  
    <S.Container>
      {props.id ?
        <Position />
        :
        <>
          <S.Intro>
            <S.Text>
              <h2>Join the SimpleFi team!</h2>
              <p>We're on a mission to make investing in DeFi as simple and intuitive as possible.{" "}
                <span>
                  <a href = "mailto: development@simplefi.finance?Subject=Jobs:%20New%20Application" target="_blank" rel="noreferrer">Join us</a>
                </span>
                !
              </p>
            </S.Text>
            <img src={simpleFiCareers} alt="Welcome to SimpleFi" className="careers-media-image"/>
          </S.Intro>
          <S.OpenPositions>
            <h2> Open Positions </h2>
            <div>
              {openPositions && openPositions.map(el => (
                <Button key={el.id} onClick={() => props.history.push(`/careers/${el.id}`)}>
                  {el.title}
                </Button>
              ))}
            </div>
          </S.OpenPositions>  
        </>
      }
    </S.Container>
  )
}

export default withRouter(Careers);