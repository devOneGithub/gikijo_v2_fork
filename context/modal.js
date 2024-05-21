import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState({
    auth: false,
    forgotPassword: false,
    logout: false,
    shareJob: false,
    companyProfile: false,
    jobDetails: false,
    jobPost: false,
    publishJob: false,
    applyJob: false,
  });

  const toggleModal = (key) => {
    if (isModalOpen.hasOwnProperty(key)) {
      setIsModalOpen({
        ...isModalOpen,
        [key]: !isModalOpen[key],
      });
    } else {
      toast.error(`The key '${key}' does not exist in the state object.`);
    }
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};
