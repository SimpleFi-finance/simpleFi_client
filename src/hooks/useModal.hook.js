import React, { useState } from "react";

const useModal = () => {
  let [modal, setModal] = useState(false);
  let [modalContent, setModalContent] = useState("I'm the Modal Content");
  let [backdrop, setBackdrop] = useState(false)
  
  let handleModal = (content = false, backdrop = false) => {
    setModal(!modal);
    if (content) {
      setModalContent(content);
    }
    if (backdrop) {
      setBackdrop(backdrop)
    }
  };

  return { modal, backdrop, handleModal, modalContent };
};

export default useModal;