import { Editor } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import { queryGemini } from "@/utils/gemini";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";

const Form = () => {
  const editorRef = useRef(null);
  const {
    setResponse,
    loading,
    setLoading,
    emailVal,
    setEmail,
    setEditorValue,
    editorValueRef,
    initialEditorValue,
  } = useAppContext();

  const submitDisabled = loading || !emailVal;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const prompt = editorValueRef.current;

      if (prompt) {
        try {
          const response = await queryGemini(prompt);
          setResponse(response);
        } catch (error) {
          console.error("Error querying Gemini:", error);
          setResponse(
            "An error occurred while processing your request with Gemini."
          );
        }
      } else {
        setResponse("Please enter some code before submitting.");
      }

      // First, save the user's email
      // const emailResponse = await axios.post("/api/saveEmail", {
      //   email: emailVal,
      // });

      // if (emailResponse.data.success) {
      //   const prompt = showValue();
      //   if (prompt) {
      //     try {
      //       const response = await queryGemini(prompt);
      //       setResponse(response);
      //     } catch (error) {
      //       console.error("Error querying Gemini:", error);
      //       setResponse(
      //         "An error occurred while processing your request with Gemini."
      //       );
      //     }
      //   } else {
      //     setResponse("Please enter some code before submitting.");
      //   }
      // }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleEmail = ({ target }) => {
  //   setEmail(target.value);
  // };

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    alert("WORK IN PROGRESS COME BACK SOON");
    return editorRef.current.getValue();
  }

  function handleEditorChange(value, event) {
    setEditorValue(value);
    console.log("here is the current model value:", value);
  }

  return (
    <form className="flex flex-col items-center w-full max-w-screen-md">
      <div className="mb-8">
        <Editor
          width={536}
          height={301}
          defaultLanguage="javascript"
          defaultValue={initialEditorValue}
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
        />
      </div>
      {/* 
      <div className="relative w-full max-w-[500px] mb-5">
        <input
          className="w-full py-3 px-4 rounded-full bg-white bg-opacity-80 text-gray-700 placeholder-gray-700 focus:outline-none "
          placeholder="Enter your email"
          // required
          value={emailVal}
          onChange={handleEmail}
        />
      </div> */}

      <button
        className={`w-full py-3 rounded-full mb-12 max-w-[500px] ${
          submitDisabled ? "bg-red-400" : "bg-red-500"
        }`}
        onClick={handleSubmit}
        disabled={submitDisabled}
      >
        {loading ? "Loading..." : "Roast it!"}
      </button>
    </form>
  );
};

export default Form;
