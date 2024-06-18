import { Editor } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import { oneDarkPro } from "@/utils/darktheme";
import { queryGemini } from "@/utils/gemini";

const Form = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const [emailVal, setEmail] = useState("");
  const editorRef = useRef(null);

  const handleQuery = async () => {
    const prompt = showValue();
    if (prompt) {
      setLoading(true);
      try {
        const response = await queryGemini(prompt);
        setResponse(response);
      } catch (error) {
        console.error("Error querying Gemini:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEmail = ({ target }) => {
    setEmail(target.value);
  };

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    // alert("WORK IN PROGRESS COME BACK SOON");
    return editorRef.current.getValue();
  }

  const handleEditorBeforeMount = (monaco) => {
    monaco.editor.defineTheme("OneDarkPro", {
      base: "vs-dark",
      inherit: true,
      ...oneDarkPro, // https://pheralb.dev/post/monaco-custom-theme  Todo : change it
    });
  };

  console.log(response, "this is hte response");

  return (
    <form className="flex flex-col items-center w-full max-w-screen-md">
      <div className="mb-8">
        <Editor
          width={536}
          height={301}
          defaultLanguage="javascript"
          defaultValue="// some comment"
          onMount={handleEditorDidMount}
          beforeMount={handleEditorBeforeMount}
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

      {response && (
        <div className="w-full max-w-[500px] bg-gray-100 p-4 rounded-md mt-4">
          <h3 className="text-lg font-bold">AI Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </form>
  );
};

export default Form;
