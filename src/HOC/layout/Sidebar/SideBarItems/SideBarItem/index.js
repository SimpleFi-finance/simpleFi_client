import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';


const SideBaritemSt = styled.li`
    margin: 5px;
    padding: 10px;
    text-align: 'center';
`;

const LinkSt = styled(NavLink)`
  color: ${({ theme })=> theme.text};
    text-decoration: none;
    box-sizing: border-box;
    border-radius: 4px;

    &:hover{
        color: ${({ theme }) => theme.hoverColor};
    }
    &.active{
        color: ${({ theme }) => theme.activeItem};
    }
`;

const SideBarItem = props => {
  return (
    <SideBaritemSt>
      <LinkSt
        onClick={props.clickEvent}
        to={props.link}
        exact={props.exact}
      >
        {props.children}
      </LinkSt>
    </SideBaritemSt>
  )
}

export default SideBarItem;