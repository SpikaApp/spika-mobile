import React, { createContext, useEffect, useState } from "react";

type UIProviderProps = {
  children: React.ReactNode;
};

interface UIContext {
  openAlert: boolean;
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
  alertMessage: string;
  sendAlert: ({ message }: Alert) => void;
}

interface Alert {
  message: string;
}

export const UIContext = createContext<UIContext>({} as UIContext);

export const UIProvider = ({ children }: UIProviderProps) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  useEffect(() => {
    if (!openAlert) {
      setAlertMessage("");
    }
  }, [openAlert]);

  const sendAlert = ({ message }: Alert): void => {
    setAlertMessage(message);
    setOpenAlert(true);
  };

  return (
    <UIContext.Provider
      value={{
        openAlert,
        setOpenAlert,
        alertMessage,
        sendAlert,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
