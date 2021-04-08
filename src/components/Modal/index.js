import Backdrop from '../Backdrop'
import React from 'react'
import ReactDOM from "react-dom";
import { ModalContext } from './ModalContext'

const Modal = () => {
  let { modalContent, handleModal, modal, backdrop } = React.useContext(ModalContext);
  if (modal) {
    return ReactDOM.createPortal(
      <>
        {backdrop && <Backdrop show={true} action={() => handleModal()} />}
        {/* <div className="bg-white relative p-5 shadow-lg rounded flex flex-col items-start text-lg text-gray-800">
          <button
            className="absolute top-0 right-0 -mt-12 font-bold self-end rounded-full bg-red-200 mb-3 bg-white text-red-700 w-8 h-8"
            onClick={() => handleModal()}
          >
            &times;
          </button> */}
          {modalContent}
        {/* </div> */}
      </>,
      document.querySelector("#modal-root")
    );
  } else return null;
};

export default Modal;