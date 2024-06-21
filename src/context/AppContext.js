// AppContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailVal, setEmailVal] = useState("");

  // Load email from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("roastcode_email");
    if (storedEmail) {
      setEmailVal(storedEmail);
    }
  }, []);

  const setEmail = (newEmail) => {
    setEmailVal(newEmail);
    localStorage.setItem("roastcode_email", newEmail);
  };

  return (
    <AppContext.Provider
      value={{
        prompt,
        setPrompt,
        response,
        setResponse,
        loading,
        setLoading,
        emailVal,
        setEmail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
