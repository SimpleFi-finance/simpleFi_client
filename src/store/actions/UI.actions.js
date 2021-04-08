import * as actionTypes from './actionTypes.actions';

export const switchTheme = () => {
  return {
    type: actionTypes.SWITCH_THEME
  }
}

export const toggleModal = ({content = null, closeOnOutsideClick = false}) => {
  return {
    type: actionTypes.TOGGLE_MODAL,
    payload: {
      modalContent: content,
      closeOnOutsideClick: closeOnOutsideClick
    }
  }
}