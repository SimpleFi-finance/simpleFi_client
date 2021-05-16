import React from "react";
import useModal from "../../hooks/useModal.hook";
import Modal from "./index";

let ModalContext;
let { Provider } = (ModalContext = React.createContext());

let ModalProvider = ({ children }) => {
  let { modal, handleModal, modalContent, backdrop } = useModal();
  return (
    <Provider value={{ modal, handleModal, modalContent, backdrop }}>
      <Modal />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };
