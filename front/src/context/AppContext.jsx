import { createContext, useContext, useState } from "react";
import { getUser } from "../services/auth";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const [resumeData, setResumeData] = useState(null);

  return (
    <AppContext.Provider
      value={{ user, setUser, resumeData, setResumeData }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
