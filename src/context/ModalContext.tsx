import React, { createContext, useState, useContext } from 'react';

interface ModalContextProps {
  isModalOpen: boolean;
  openModal: (propertyName?: string) => void;
  closeModal: () => void;
  selectedProperty: string;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState('');

  const openModal = (propertyName?: string) => {
    setSelectedProperty(propertyName || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, selectedProperty }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
}
export { ModalContext };
