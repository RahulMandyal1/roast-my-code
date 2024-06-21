import { Editor } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import { queryGemini } from "@/utils/gemini";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";

const Form = () => {
  const editorRef = useRef(null);
  const { response, setResponse, loading, setLoading, emailVal, setEmail } =
    useAppContext();

  const handleQuery = async (e) => {
    e.preventDefault();

    if (!emailVal) {
      setResponse("Please enter your email before submitting.");
      return;
    }

    setLoading(true);

    try {
      // First, save the user's email
      const emailResponse = await axios.post("/api/saveEmail", {
        email: emailVal,
      });

      if (emailResponse.data.success) {
        const prompt = showValue();
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
      } else {
        setResponse(
          emailResponse.data.msg.join(", ") || "Failed to save email."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        setResponse(
          error.response.data.msg.join(", ") ||
            "An error occurred while saving your email."
        );
      } else if (error.request) {
        setResponse("No response received from the server. Please try again.");
      } else {
        setResponse("An error occurred while processing your request.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = ({ target }) => {
    setEmail(target.value);
  };

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    alert("WORK IN PROGRESS COME BACK SOON");
    return editorRef.current.getValue();
  }

  return (
    <form className="flex flex-col items-center w-full max-w-screen-md">
      <div className="mb-8">
        <Editor
          width={536}
          height={301}
          defaultLanguage="javascript"
          defaultValue="// some comment"
          onMount={handleEditorDidMount}
        />
      </div>

      <div className="relative w-full max-w-[500px] mb-5">
        <input
          className="w-full py-3 px-4 rounded-full bg-white bg-opacity-80 text-gray-700 placeholder-gray-700 focus:outline-none "
          placeholder="Enter your email"
          // required
          value={emailVal}
          onChange={handleEmail}
        />
      </div>

      <button
        className="w-full py-3 rounded-full mb-12 max-w-[500px] bg-red-400"
        onClick={handleQuery}
      >
        {loading ? "Loading..." : "Roast it!"}
      </button>
    </form>
  );
};

export default Form;
