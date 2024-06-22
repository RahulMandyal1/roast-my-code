// AppContext.js
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";

const AppContext = createContext();
const initialEditorValue = `function greet(name) {
  console.log("Hello, " + name + "!");
}`;

export function AppProvider({ children }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailVal, setEmailVal] = useState("");
  const editorValueRef = useRef(initialEditorValue);

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

  const setEditorValue = (value) => {
    editorValueRef.current = value;
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
        setEditorValue,
        editorValueRef,
        initialEditorValue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
