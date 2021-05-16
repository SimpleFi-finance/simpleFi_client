import React from "react"
import * as S from './layout.style'
import Navbar from './Nav'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

export const Layout = (props) => {

  const noSidebar = ['loading', 'careers', 'about'].find(path => props.history.location.pathname.includes(path)) 

  return (
    <>
      <S.Layout>
        {!noSidebar && props.history.location.pathname !== '/' && <Sidebar history={props.history} />}
        <S.Main location={props.history.location.pathname} noSidebar={noSidebar}>
          {props.history.location.pathname !== '/loading' &&
            <Navbar userAccount={props.userAccounts} history={props.history} />
          }
          <S.Content location={props.history.location.pathname} noSidebar={noSidebar}>
            {props.children}
          </S.Content>
          {props.history.location.pathname !== '/loading' &&
            <Footer showLogos={!!noSidebar}/>
          }
        </S.Main>
      </S.Layout>
    </>
  )
}

const mapState = state => {
  return {
    userAccounts: state.App.userAccounts
  }
}
export default connect(mapState)(withRouter(Layout));