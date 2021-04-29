import React from 'react'
import * as S from './sidebar.style'
import Logo from '../../../components/UI/Logo'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'
import Brightness4Icon from '@material-ui/icons/Brightness4';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import Tooltip from '@material-ui/core/Tooltip'
import SideBarItems from './SideBarItems'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'

//TODO: fix styling of logo and spread of items in sidebar
const Sidebar = (props) => {
  return (
    <S.Sidebar>
      <S.LogoContainer onClick={() => props.history.push('/')}>
        <Logo type='icon'/>
      </S.LogoContainer>
      <SideBarItems style={{ 'grid-row': '2 / 3' }} />
      <S.BottomControls>
        <S.ThemeControl style={{ margin: '0 auto' }}>
          {props.themeUI === 'colour' ?
            <Tooltip title="Dark Theme">
              <Brightness4Icon
                style={{height: '100%', width: '100%'}}
                onClick={() => props.switchTheme()}
              />
            </Tooltip>
          :
            <Tooltip title="Colour Theme">
              <InvertColorsIcon
                style={{height: '100%', width: '100%'}}
                color="inherit"
                onClick={() => props.switchTheme()}
              />
            </Tooltip>
          }
        </S.ThemeControl>
        <Tooltip title="Docs" >
          <a
            href="https://docs.simplefi.finance"
            target="_blank"
            rel="noreferrer noopener"
            style={{ margin: 'auto' }}
          >
            <DescriptionOutlinedIcon
              style={{width: '100%', height: '30px', color: 'white'}}
            />
          </a>
        </Tooltip>
      </S.BottomControls>
    </S.Sidebar>
  )
}
    
const mapStateToProps = (state) => {
  return {
    themeUI: state.UI.theme
  }
}

const mapDispatch = (dispatch) => {
  return {
    switchTheme: () => dispatch(actions.switchTheme())
  }
}
export default connect(mapStateToProps, mapDispatch)(Sidebar);