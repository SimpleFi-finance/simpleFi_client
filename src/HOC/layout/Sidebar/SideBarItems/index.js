import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import styled from 'styled-components'
// import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
// import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
// import ShowChartIcon from '@material-ui/icons/ShowChart';
import SideBarItem from './SideBarItem'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
const NavigationItemsSt = styled.ul`
    margin: 0 auto;
    padding: 0px;
    list-style: none;
    display: flex;
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
      view: <Tooltip title="Dashboard">
        <AccountBalanceIcon color='inherit'/>
      </Tooltip>
    },
    // {
    //   title: 'Holding',
    //   link: '/holdings',
    //   view: <Tooltip title="Holdings">
    //     <AccountBalanceIcon color='inherit'/>
    //   </Tooltip>
    // },
    // {
    //   title: 'Earning',
    //   link: '/earnings',
    //   view: <Tooltip title="Earnings">
    //     <ShowChartIcon color='inherit'/>
    //   </Tooltip>
    // },
    // {
    //   title: 'Farming',
    //   link: '/farming',
    //   view: <Tooltip title="Farming">
    //     <MonetizationOnIcon color='inherit'/>
    //   </Tooltip>
    // }
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