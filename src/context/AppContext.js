// AppContext.js
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";

const AppContext = createContext();
const initialEditorContent = `function greet(name) {
  console.log("Hello, " + name + "!");
}`;

export function AppProvider({ children }) {
  const [prompt, setPrompt] = useState("");
  const [geminiResponse, setGeminiResponse] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [emailVal, setEmailVal] = useState("");
  const editorContentRef = useRef(initialEditorContent);

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
    editorContentRef.current = value;
  };

  return (
    <AppContext.Provider
      value={{
        prompt,
        setPrompt,
        geminiResponse,
        setGeminiResponse,
        isLoading,
        setLoading,
        emailVal,
        setEmail,
        setEditorValue,
        editorContentRef,
        initialEditorContent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
