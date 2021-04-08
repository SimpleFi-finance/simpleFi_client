import * as actionTypes from '../actions/actionTypes.actions';
import {updateObject} from '../utils.store';

const initialState = {
  modal: {
    modalOpen: false,
		modalContent: undefined,
		closeOnOutsideClick : false
  },
  theme: 'colour',
  isMobile: false
}

const modalToggle = (state, action) => {
	const updatedState = {
		modalOpen: !state.modal.modalOpen,
		modalContent: action.payload.content,
		closeOnOutsideClick: action.payload.closeOnOutsideClick
	};
	return updateObject(state, { modal: updatedState})
}

const switchTheme = (state, action) => {
	const newTheme = state.theme === 'colour' ? 'dark' : 'colour'
	return updateObject(state, { theme: newTheme })
}

const reducer = (state = initialState, action) => {
	switch(action.type){
		case actionTypes.TOGGLE_MODAL:
			return modalToggle(state, action);
		case actionTypes.SWITCH_THEME:
			return switchTheme(state, action);
		default:
			return state;
	}
};

export default reducer;