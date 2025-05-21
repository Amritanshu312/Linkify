import Setting from "@/components/layout/settings/Setting";
import React, { useState, createContext, useContext } from "react";


const GlobalUtilsContext = createContext();

export const GlobalUtilsProvider = ({ children }) => {
  const [isSettingToggled, setIsSettingToggled] = useState(false)

  return (
    <GlobalUtilsContext.Provider value={{ setIsSettingToggled }}>
      {children}

      <Setting isSettingToggled={isSettingToggled} />
    </GlobalUtilsContext.Provider>
  );
};

export const useGlobalUtils = () => useContext(GlobalUtilsContext);
