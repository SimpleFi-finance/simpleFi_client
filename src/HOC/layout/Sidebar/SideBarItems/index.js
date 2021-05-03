import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import styled from 'styled-components'
import AppsIcon from '@material-ui/icons/Apps';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import SideBarItem from './SideBarItem'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

const NavigationItemsSt = styled.ul`
    margin: 0 auto;
    padding: 0px;
    padding-top: 40px;
    display: flex;
    list-style-type: none;
    flex-direction: column;
    height: 80%;
    cursor: pointer;
    color: ${({theme}) => theme.color};
    &:active{
        color: ${({theme})=> theme.activeItem}};
    }
`;

const SideBarItems = (props) => {

  const items = [
    {
      title: 'Dashboard',
      link: '/dashboard',
      view: <Tooltip title="Overview">
        <AppsIcon color='inherit'/>
      </Tooltip>
    },
    {
      title: 'Tokens',
      link: '/tokens',
      view: <Tooltip title="Tokens">
        <AccountBalanceIcon color='inherit'/>
      </Tooltip>
    },
    {
      title: 'Earning',
      link: '/earning',
      view: <Tooltip title="Earnings">
        <ShowChartIcon color='inherit'/>
      </Tooltip>
    },
    {
      title: 'Farming',
      link: '/farming',
      view: <Tooltip title="Farming">
        <MonetizationOnIcon color='inherit'/>
      </Tooltip>
    }
  ]
  return (
    <NavigationItemsSt>
      {items.map(item => (
        <SideBarItem
          key={item.title}
          link={item.link}
        >
          {item.view}
        </SideBarItem>
      ))}
    </NavigationItemsSt>
  )
}

export default SideBarItems;