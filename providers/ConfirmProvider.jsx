import Alert from "@/components/ui/Alert";
import React, { useState, createContext, useContext } from "react";


const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [promiseResolver, setPromiseResolver] = useState(null);

  const confirm = (msg) => {
    setMessage(msg);
    setIsOpen(true);

    return new Promise((resolve) => {
      setPromiseResolver(() => resolve);
    });
  };

  const handleConfirm = () => {
    setIsOpen(false);
    promiseResolver(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    promiseResolver(false);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <Alert
        isOpen={isOpen}
        message={message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => useContext(ConfirmContext);
