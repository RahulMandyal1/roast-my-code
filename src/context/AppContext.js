// AppContext.js
import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailVal, setEmail] = useState("");

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
